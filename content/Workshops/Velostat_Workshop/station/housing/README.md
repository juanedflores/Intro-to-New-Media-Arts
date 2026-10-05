# Sensor station housing

A 3D-printed hood that sits on a table's power strip (Tripp Lite PS3612, outlets
up) over a plugged-in USB charger, and holds the station's Arduino Nano 33 IoT
on its HiLetgo Nano IO Shield about 9 cm above the strip's aluminum, so the
Wi-Fi works.

The design is a parametric Fusion model, built by a script:
`fusion/StationHousing/StationHousing.py`. Run it in Fusion (Utilities >
Scripts and Add-Ins > StationHousing > Run); change sizes in Modify > Change
Parameters. It also adds a "Reference parts (not printed)" component that
shows every part in place, and checks that none of them run into the housing
(the result is saved to `last_run.txt` next to the script).

- **Body:** the hood over the charger and strip. Inside, a cap plate rests on
  the charger's back (its top) and holds it down, with an opening for the USB
  plug. Print it upside down (Place on Face > the top rim) without supports:
  the cap prints as a ~45 mm bridge, which the MK3S+ handles (a little sag
  underneath doesn't matter). Or print it upright with supports.
- **Lid:** plain on top (write the station number on it). The IO board
  press-fits upside down into the pocket underneath: crush ribs grip it and
  corner pads keep its solder joints off the plastic. Print it face down.

To print: right-click a body > Save As Mesh (STL/3MF), slice in PrusaSlicer
(PLA, 0.2 mm, Original Prusa MK3S+). If the press fit is too tight or loose,
adjust `rib` (and `press`); if the hood doesn't fit the strip or charger,
adjust `strip_w`, `charger`, `charger_h` or `fit`.

## Power

The Nano is powered through its **VIN** pin, not its USB port: a straight
micro-USB plug won't fit between the end of the board and the wall.

- Use a **USB-A to bare-wire cable** ("USB pigtail"), or cut a cheap USB cable.
  **Check with a multimeter which wire is +5V** (usually red) and which is
  GND (usually black) before connecting; tape off any other wires.
- Screw **+5V into the IO board's VIN terminal** and **GND into the GND
  terminal next to it**. On a Nano these are side by side at the end of the
  analog-pin row (A0–A7), opposite the USB port. VIN takes 5V fine.
- Strip the cable's jacket back far enough that only the two thin wires pass
  the board: wires go up the **3.5 mm gap between the board's long side and
  the front wall**.
- To re-upload a sketch: take the lid off, lift the board off its ledges and
  plug your laptop into the Nano's USB port as usual.

## Wiring inside (per station)

Students build the whole voltage divider on their own breadboard (Part 3 of
the DIY Pressure Sensor workshop) and connect two jumper wires to the station's
alligator clips: their **V<sub>out</sub>** to a column's top clip (A0–A4) and their
breadboard's **GND** to the clip below it.

Students' power modules may still be on **5V**, and the Nano 33 IoT's pins only
take 3.3V, so every input goes through a small protection perfboard (mounted on
the two posts inside the front wall):

```
 clip lead (A0 hole) ──[ 10kΩ ]──┬──────────► IO board A0 terminal
                                 │
                              [ 100kΩ ]        (repeat for A1–A4)
                                 │
 clip lead (GND hole) ───────────┴── GND bus ─► IO board GND terminal
```

- **10kΩ in series** limits the current if a student's V<sub>out</sub> is 5V, so the
  pin can't be damaged.
- **100kΩ to GND** makes an empty input read 0 ("plug in a sensor" on the grid)
  instead of noise, with almost no effect on the students' circuits.
- The five GND leads join one bus on the perfboard, and a single wire goes to
  the IO board's GND terminal.

## Assembly

1. Wire the perfboard and screw it to the posts; feed the ten clip leads out
   through the front holes (A0–A4 on top, GND below) and add the clips.
2. Turn the lid upside down and press the IO board into its pocket,
   terminals facing up, with the **Nano's analog side (A0–A7, VIN) toward the
   front** of the lid. Plug in the Nano.
3. Plug the charger into the strip and the power cable into the charger, and
   lower the hood over it until it sits on the strip (the cable and its plug
   pass up through the opening in the charger cap).
4. With the lid still upside down beside the hood, screw the perfboard's
   A0–A4 and GND wires and the power cable's two wires into the IO board's
   terminals (power: +5V to VIN, GND to GND). Leave a few cm of slack.
5. Flip the lid over onto the hood. To re-upload a sketch later, lift the lid
   off, flip it, and plug a laptop into the Nano.
