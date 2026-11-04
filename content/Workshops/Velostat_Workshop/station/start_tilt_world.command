#!/bin/bash
# Double-click to start Tilt World: a board on a 9V battery moves you through
# a VR world over Wi-Fi (opens the page in your browser). Close this Terminal
# window, or press Ctrl+C, to stop it.
cd "$(dirname "$0")"
python3 relay.py --tilt
