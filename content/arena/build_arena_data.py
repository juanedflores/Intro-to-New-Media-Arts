#!/usr/bin/env python3
"""Snapshot every student's public Are.na channels into data.json.

The Are.na Studios page (content/arena.html) reads data.json instead of
calling the API from each visitor's browser: it loads faster and stays
clear of Are.na's rate limit. Re-run this whenever you want fresh content:

    python3 content/arena/build_arena_data.py

No token is needed - it only reads public channels. Takes a few minutes
because requests are spaced out to avoid the rate limit.
"""

import json
import os
import sys
import time
import urllib.error
import urllib.request

API = "https://api.are.na/v3"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "data.json")

# Members of the ART 150 Fall 2026 group (are.na/art-150-fall-2026).
# The API doesn't list group members, so keep this in sync by hand.
STUDENTS = [
    "abdullah-abid",  # invited, hasn't joined the group yet
    "akxell-mendoza",
    "amy-lora",
    "arisbeth-aceves",
    "ben-broz",
    "dang-nguyen-vqo2zbznbq0",
    "denise-burciaga",
    "hillary-samaniego",
    "itzel-garcia-s-8gtpf_grs",
    "jing-chen-_twncguy20i",
    "julia-szafranski",
    "kirtan-patel-ylp_92zih8w",
    "lucas-lee-cd24req3nfo",
    "maurizio-brown",
    "mia-espinoza",
    "nataly-rios",
    "panthi-patel",
    "quang-duc-lam-nguyen",
    "selah-morales",
    "vi-bao-truong",
]

# Channels whose title doesn't say what they are.
KIND_OVERRIDES = {
    "art-project-1-oyc0h-aoqg": "drawing",  # Nataly's drawing machine
}

BLOCKS_PER_CHANNEL = 24  # enough to fill a spread without a huge file
DELAY = 1.5  # seconds between requests


def get(path):
    """GET a v3 endpoint, backing off when Are.na rate-limits us."""
    for attempt in range(6):
        time.sleep(DELAY)
        req = urllib.request.Request(API + path, headers={"User-Agent": "art150-arena-snapshot"})
        try:
            body = urllib.request.urlopen(req, timeout=30).read().decode()
            return json.loads(body)
        except (urllib.error.HTTPError, json.JSONDecodeError, urllib.error.URLError) as e:
            wait = 15 * (attempt + 1)
            print(f"  {path}: {e} - retrying in {wait}s", file=sys.stderr)
            time.sleep(wait)
    raise RuntimeError(f"giving up on {path}")


def kind(title):
    """Group channels by what the assignment asked for."""
    t = title.lower()
    if "research" in t:
        return "research"
    if "portfolio" in t:
        return "portfolio"
    if any(w in t for w in ("draw", "robot", "machine", "bot", "snail", "paint")):
        return "drawing"
    return "other"


def text_of(field):
    if isinstance(field, dict):
        return field.get("plain") or field.get("markdown") or ""
    return field or ""


def block(b):
    if b.get("type") == "Channel":
        # a channel saved inside another channel
        # nested channels name their creator "owner", not "user"
        owner = (b.get("owner") or b.get("user") or {}).get("slug", "")
        return {
            "type": "Channel",
            "title": (b.get("title") or "").strip(),
            "slug": b.get("slug"),
            "owner": owner,
            "url": f"https://www.are.na/{owner}/{b.get('slug')}",
            "count": (b.get("counts") or {}).get("contents", 0),
        }
    img = b.get("image") or {}
    out = {
        "type": b.get("type"),
        "title": b.get("title") or "",
        "url": f"https://www.are.na/block/{b['id']}",
    }
    if img:
        out["thumb"] = (img.get("small") or {}).get("src") or img.get("src")
        out["large"] = (img.get("large") or {}).get("src") or img.get("src")
        out["ratio"] = img.get("aspect_ratio") or 1
    if b.get("type") == "Text":
        out["text"] = text_of(b.get("content"))[:600]
    if b.get("type") == "Link" and b.get("source"):
        out["source"] = b["source"].get("url")
    desc = text_of(b.get("description"))
    if desc:
        out["description"] = desc[:400]
    return out


def main():
    students = []
    for slug in STUDENTS:
        user = get(f"/users/{slug}")
        print(f"{user.get('name')} ({slug})")
        channels = []
        listing = get(f"/users/{slug}/contents?type=Channel&per=100")
        for c in listing.get("data", []):
            if c.get("visibility") == "private":
                continue
            contents = get(f"/channels/{c['slug']}/contents?per={BLOCKS_PER_CHANNEL}")
            blocks = [block(b) for b in contents.get("data", [])]
            channels.append(
                {
                    "title": c["title"].strip(),
                    "slug": c["slug"],
                    "kind": KIND_OVERRIDES.get(c["slug"], kind(c["title"])),
                    "url": f"https://www.are.na/{slug}/{c['slug']}",
                    "count": (c.get("counts") or {}).get("contents", len(blocks)),
                    "updated": c.get("updated_at"),
                    "blocks": blocks,
                }
            )
            print(f"  {c['title'].strip()}: {len(blocks)} blocks")
        students.append(
            {
                "name": user.get("name") or slug,
                "slug": slug,
                "initials": user.get("initials") or "",
                "url": f"https://www.are.na/{slug}",
                "channels": channels,
            }
        )

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
