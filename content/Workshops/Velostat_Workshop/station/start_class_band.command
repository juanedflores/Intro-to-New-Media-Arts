#!/bin/bash
# Double-click to start the Class Band relay: each student's button plays
# its own sound and animation (opens the page in your browser). Close this
# Terminal window, or press Ctrl+C, to stop it.
cd "$(dirname "$0")"
python3 relay.py --band
