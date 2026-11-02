#!/usr/bin/env python3
"""Save every student's "Creative Interfaces" channel into this folder.

The gallery (index.html) reads data.json and images/ instead of calling
Are.na from each visitor's browser, so nothing it shows depends on Are.na.
Re-run this when someone posts late or edits their channel:

    python3 content/Assignments/Creative_Interfaces/gallery/build_gallery_data.py

No token is needed - it only reads public channels. Takes a couple of minutes
because requests are spaced out to avoid the rate limit. A run that fails
leaves the current gallery as it was.
"""

import json
import os
import re
import shutil
import sys
import time
import urllib.error
import urllib.request

API = "https://api.are.na/v3"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "data.json")
IMAGES = os.path.join(HERE, "images")
IMAGES_NEW = IMAGES + ".new"

# Everyone who presented at the midterm critique, in the order of the Are.na
# Studios snapshot (content/arena/build_arena_data.py). Keep in sync by hand.
STUDENTS = [
    ("Abdullah Abid", "abdullah-abid"),
    ("Akxell Mendoza", "akxell-mendoza"),
    ("Amy Lora", "amy-lora"),
    ("Arisbeth Aceves", "arisbeth-aceves"),
    ("Ben Broz", "ben-broz"),
    ("Dang Nguyen", "dang-nguyen-vqo2zbznbq0"),
    ("Hillary Samaniego", "hillary-samaniego"),
    ("Itzel Garcia", "itzel-garcia-s-8gtpf_grs"),
    ("Jing Chen", "jing-chen-_twncguy20i"),
    ("Kirtan Patel", "kirtan-patel-ylp_92zih8w"),
    ("Lucas Lee", "lucas-lee-cd24req3nfo"),
    ("Maurizio Brown", "maurizio-brown"),
    ("Mia Espinoza", "mia-espinoza"),
    ("Nataly Rios", "nataly-rios"),
    ("Panthi Patel", "panthi-patel"),
    ("Quang Duc Lam Nguyen", "quang-duc-lam-nguyen"),
    ("Selah Morales", "selah-morales"),
    ("Vi Bao Truong", "vi-bao-truong"),
]

# A student whose midterm channel has some other name: their Are.na
# slug -> the channel's slug (the last part of the channel's URL).
CHANNEL_OVERRIDES = {}

# How a midterm channel is recognized by its title, best match first.
TITLE_MATCHES = [r"creative\s*interface", r"interface", r"mid\s*-?\s*term"]

# A file name posing as a title ("uploads/.../IMG_2041.jpg") says nothing.
FILE_NAME = r"^uploads/|\.(jpe?g|png|gif|heic|webp|mov|mp4)$"

EXTENSIONS = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
    "video/mp4": ".mp4",
    "video/quicktime": ".mov",
}

DELAY = 1.5  # seconds between API requests


def fetch(url):
    """Download a URL, backing off when Are.na rate-limits us."""
    for attempt in range(6):
        req = urllib.request.Request(url, headers={"User-Agent": "art150-gallery-snapshot"})
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                return r.read(), r.headers.get_content_type()
        except urllib.error.URLError as e:
            if getattr(e, "code", None) == 404:
                raise
            wait = 15 * (attempt + 1)
            print(f"  {url}: {e} - retrying in {wait}s", file=sys.stderr)
            time.sleep(wait)
    raise RuntimeError(f"giving up on {url}")


def get(path):
    """GET a v3 endpoint, or None if it doesn't exist."""
    time.sleep(DELAY)
    try:
        return json.loads(fetch(API + path)[0])
    except urllib.error.HTTPError:
        return None


def save(url, slug, name):
    """Download a file into the student's folder; returns the page's path to it."""
    body, content_type = fetch(url)
    relative = f"{slug}/{name}{EXTENSIONS[content_type]}"
    path = os.path.join(IMAGES_NEW, relative)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "wb") as f:
        f.write(body)
    return f"images/{relative}"


def text_of(field):
    if isinstance(field, dict):
        return field.get("plain") or field.get("markdown") or ""
    return field or ""


def rank(channel):
    for i, pattern in enumerate(TITLE_MATCHES):
        if re.search(pattern, channel.get("title") or "", re.I):
            return i
    return None


def midterm_channel(slug):
    if slug in CHANNEL_OVERRIDES:
        return get(f"/channels/{CHANNEL_OVERRIDES[slug]}")
    listing = get(f"/users/{slug}/contents?type=Channel&per=100")
    matches = [
        c
        for c in (listing or {}).get("data", [])
        if c.get("visibility") != "private" and rank(c) is not None
    ]
    matches.sort(key=lambda c: (rank(c), -(c.get("counts") or {}).get("contents", 0)))
    return matches[0] if matches else None


def channel_blocks(channel):
    """Every block in the channel, however many pages that takes."""
    blocks = []
    page = 1
    while True:
        contents = get(f"/channels/{channel['slug']}/contents?per=100&page={page}")
        if contents is None:
            raise RuntimeError(f"can't read channel {channel['slug']}")
        blocks += contents["data"]
        if not contents["meta"]["has_more_pages"]:
            return blocks
        page += 1


def block(b, slug):
    img = b.get("image") or {}
    att = b.get("attachment") or {}
    title = b.get("title") or ""
    out = {
        "type": b.get("type"),
        "title": "" if re.search(FILE_NAME, title, re.I) else title,
        "description": text_of(b.get("description")),
        "url": f"https://www.are.na/block/{b['id']}",
    }
    if img:
        # the resized copies, not the originals: those are huge, and photos
        # straight from a phone can have GPS coordinates in them
        small = (img.get("small") or {}).get("src") or img["src"]
        large = (img.get("large") or {}).get("src") or img["src"]
        out["thumb"] = save(small, slug, f"{b['id']}_thumb")
        out["large"] = save(large, slug, str(b["id"]))
    if b.get("type") == "Text":
        out["text"] = text_of(b.get("content"))
    if b.get("type") == "Attachment" and (att.get("content_type") or "").startswith("video/"):
        out["video"] = save(att["url"], slug, f"{b['id']}_video")
    if (b.get("source") or {}).get("url"):
        out["source"] = b["source"]["url"]
    return out


def main():
    shutil.rmtree(IMAGES_NEW, ignore_errors=True)
    os.makedirs(IMAGES_NEW)

    students = []
    for name, slug in STUDENTS:
        channel = midterm_channel(slug)
        blocks = []
        if channel:
            blocks = [block(b, slug) for b in channel_blocks(channel) if b.get("type") != "Channel"]
        pictures = sum(1 for b in blocks if b.get("large") or b.get("video"))
        print(f"{name}: {channel['title'].strip() if channel else 'NO CHANNEL'}, {pictures} pictures")
        students.append(
            {
                "name": name,
                "slug": slug,
                "channel": channel
                and {
                    "title": channel["title"].strip(),
                    "slug": channel["slug"],
                    "url": f"https://www.are.na/{slug}/{channel['slug']}",
                    "description": text_of(channel.get("description")),
                },
                "blocks": blocks,
            }
        )

    shutil.rmtree(IMAGES, ignore_errors=True)
    os.rename(IMAGES_NEW, IMAGES)
    data = {
        "group": "https://www.are.na/art-150-fall-2026",
        "updated": time.strftime("%Y-%m-%d"),
        "students": students,
    }
    with open(OUT, "w") as f:
        json.dump(data, f, indent=1, ensure_ascii=False)
    print(f"wrote {OUT}")


if __name__ == "__main__":
    main()
