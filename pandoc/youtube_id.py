"""Print a markdown file's YouTube video ID (from its `video:` frontmatter
field) to stdout, or nothing if there is no video. Used by the Blog/Arduino
Makefiles to decide whether to also build a video-walkthrough variant of a
page, and to pass the bare video ID to the split template.
"""

import re
import sys

import yaml

path = sys.argv[1]

with open(path) as f:
    content = f.read()

parts = content.split("---", 2)
if len(parts) < 3:
    sys.exit(0)

metadata = yaml.safe_load(parts[1]) or {}
video = metadata.get("video")
if not video:
    sys.exit(0)

match = re.search(r"(?:v=|youtu\.be/|embed/)([A-Za-z0-9_-]{11})", video)
if match:
    print(match.group(1))
