"""Build a HyperaudioLite transcript.html (word-by-word timed spans) for a
Blog post's video.

Two ways to get the timing data:

1. Live from a YouTube video ID - pulls the auto-generated ("ASR") caption
   track, which has real per-word timestamps:

     python3 transcript_from_youtube.py VIDEO_ID -o ../content/Blog/POST/transcript.html

   YouTube blocks this caption endpoint for a lot of datacenter/cloud IPs.
   If it fails, it fails loudly with an explanation - it will not write a
   silently-empty transcript. Try again from a normal home network if so.

2. From a caption file you download yourself - go to YouTube Studio for the
   video -> Subtitles -> download the auto-generated track as .srt or .vtt,
   then:

     python3 transcript_from_youtube.py --captions captions.srt -o ../content/Blog/POST/transcript.html

   This only has line-level timestamps, not per-word, so word timing within
   each line is estimated by splitting the line's time span evenly across
   its words. Less precise than option 1, but it always works since it's
   just YouTube's official downloadable file, no scraping involved.
"""

import argparse
import json
import re
import sys
import urllib.request

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"
)


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=15) as resp:
        return resp.read()


def words_from_youtube(video_id):
    watch_html = fetch(f"https://www.youtube.com/watch?v={video_id}").decode(
        "utf-8", errors="replace"
    )

    match = re.search(r'"captionTracks":(\[.*?\])', watch_html)
    if not match:
        sys.exit(
            f"No caption tracks found for video {video_id}. Either the video "
            "has captions disabled, or YouTube didn't include them on this "
            "page load. Try --captions with a downloaded .srt/.vtt instead."
        )

    tracks = json.loads(match.group(1))
    track = next(
        (t for t in tracks if t.get("kind") == "asr" and t.get("languageCode", "").startswith("en")),
        next((t for t in tracks if t.get("languageCode", "").startswith("en")), tracks[0]),
    )

    caption_json = fetch(track["baseUrl"] + "&fmt=json3")
    if not caption_json.strip():
        sys.exit(
            "YouTube returned an empty caption response. This usually means "
            "it's blocking automated access from this network (common on "
            "cloud/sandboxed environments) - try running this from your own "
            "machine, or use --captions with a file downloaded from YouTube "
            "Studio (Subtitles -> Download) instead."
        )

    data = json.loads(caption_json)
    words = []
    for event in data.get("events", []):
        start = event.get("tStartMs")
        duration = event.get("dDurationMs", 0)
        segs = event.get("segs")
        if start is None or not segs:
            continue

        last_offset = 0
        seg_starts = []
        for seg in segs:
            text = seg.get("utf8", "")
            if not text.strip():
                continue
            offset = seg.get("tOffsetMs", last_offset)
            last_offset = offset
            seg_starts.append((start + offset, text))

        for i, (word_start, text) in enumerate(seg_starts):
            if i + 1 < len(seg_starts):
                word_end = seg_starts[i + 1][0]
            else:
                word_end = start + duration
            words.append((text, word_start, max(word_end - word_start, 0)))

    if not words:
        sys.exit("Fetched a caption track but it had no words in it.")

    return words


TIMESTAMP_RE = re.compile(r"(\d+):(\d\d):(\d\d)[.,](\d+)")


def _timestamp_to_ms(ts):
    h, m, s, ms = TIMESTAMP_RE.match(ts).groups()
    ms = (ms + "000")[:3]
    return ((int(h) * 60 + int(m)) * 60 + int(s)) * 1000 + int(ms)


def words_from_captions_file(path):
    with open(path, encoding="utf-8") as f:
        content = f.read()

    blocks = []
    for chunk in re.split(r"\n\s*\n", content):
        m = re.search(
            # the trailing [^\n]* swallows VTT cue settings (e.g.
            # "align:start position:0%") that can follow the timestamps on
            # the same line, so they don't get treated as caption text.
            r"(\d+:\d\d:\d\d[.,]\d+)\s*-->\s*(\d+:\d\d:\d\d[.,]\d+)[^\n]*",
            chunk,
        )
        if not m:
            continue
        start_ms = _timestamp_to_ms(m.group(1))
        end_ms = _timestamp_to_ms(m.group(2))
        text = chunk[m.end():].strip()
        text = re.sub(r"<[^>]+>", "", text)  # strip VTT styling tags
        text = " ".join(text.split())
        if text:
            blocks.append((start_ms, end_ms, text))

    if not blocks:
        sys.exit(f"Couldn't find any timed caption blocks in {path}.")

    # YouTube's auto-generated captions are often a "rolling" transcript:
    # each cue repeats the tail end of the previous cue's words and appends
    # a few new ones (a sliding window), rather than clean non-overlapping
    # lines. Diff each cue against the previous one and keep only the words
    # that are actually new, so they don't get duplicated in the output.
    words = []
    previous_words = []
    for start_ms, end_ms, text in blocks:
        current_words = [w for w in text.split(" ") if w]
        overlap = _overlap_length(previous_words, current_words)
        span = max(end_ms - start_ms, 0)
        slot = span / len(current_words) if current_words else 0
        for i in range(overlap, len(current_words)):
            words.append((current_words[i] + " ", round(start_ms + i * slot), round(slot)))
        previous_words = current_words

    return words


def _overlap_length(previous_words, current_words):
    """Length of the longest suffix of previous_words that's also a
    prefix of current_words - i.e. how many leading words of the current
    cue were already shown by the end of the previous one."""
    max_check = min(len(previous_words), len(current_words))
    for length in range(max_check, 0, -1):
        if previous_words[-length:] == current_words[:length]:
            return length
    return 0


def render_html(words):
    spans = []
    for i, (text, start_ms, duration_ms) in enumerate(words):
        text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        closer = "\n      >" if i + 1 < len(words) else ">"
        spans.append(f'<span data-m="{start_ms}" data-d="{duration_ms}">{text}</span{closer}')

    body = "".join(spans)
    return f"<article>\n  <section>\n    <p>\n      {body}</p>\n  </section>\n</article>\n"


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("video_id", nargs="?", help="YouTube video ID (e.g. PbKzEAgl-Fg)")
    parser.add_argument("--captions", help="Path to a downloaded .srt or .vtt caption file")
    parser.add_argument("-o", "--output", required=True, help="Path to write transcript.html to")
    args = parser.parse_args()

    if bool(args.video_id) == bool(args.captions):
        parser.error("pass exactly one of: a video ID, or --captions <file>")

    words = words_from_youtube(args.video_id) if args.video_id else words_from_captions_file(args.captions)

    with open(args.output, "w", encoding="utf-8") as f:
        f.write(render_html(words))

    print(f"Wrote {len(words)} words to {args.output}")


if __name__ == "__main__":
    main()
