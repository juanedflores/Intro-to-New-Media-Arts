#!/bin/bash
# Double-click to start the Class Sensor Grid relay: one tile per student's
# board (opens the page in your browser). Close this Terminal window, or
# press Ctrl+C, to stop it.
cd "$(dirname "$0")"
python3 relay.py --class
