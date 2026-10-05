// Sensor station housing (ART 150, DIY Pressure Sensor Workshop)
//
// A hood that sits on a Tripp Lite PS3612 power strip (outlets facing up)
// over a plugged-in USB charger cube, and holds an Arduino Nano 33 IoT on a
// HiLetgo Nano IO Shield (screw-terminal breakout) up high, away from the
// strip's aluminum so the Wi-Fi works.
//
//   - long walls continue down the strip's sides as a skirt; the short walls
//     rest on the strip's top, so it sits over the strip and can't slide
//   - corner guides center it over the charger (the charger carries no load:
//     plug the charger and USB cable in first, then lower the hood over them)
//   - the IO board rests on ledges near the top and the lid's posts hold it
//     down (no screws, no guessing the board's mounting holes); wires pass
//     the board along its long sides (3.5 mm gap to each wall)
//   - power: a USB cable from the charger with bare wires screwed into the IO
//     board's VIN and GND terminals (a micro-USB plug won't fit at the end)
//   - front panel: five columns A0-A4, each a signal hole over a GND hole for
//     the station's clip leads; posts inside for a small protection perfboard
//   - lid: engraved station number and a window over the Nano's LED
//
// All sizes in mm. Measure your parts and adjust the numbers below.
// Print: body upside down (open top on the bed), lid face down, no supports.
// Export one part at a time:
//   openscad -D 'part="body"' -o body.stl station_housing.scad
//   openscad -D 'part="lid"' -D station=1 -o lid_1.stl station_housing.scad
//   openscad -D 'part="fit_test"' -o fit_test.stl station_housing.scad

part = "preview";   // "body", "lid", "fit_test", "preview" (assembled) or "section" (cutaway)
station = 1;        // number engraved on the lid

/* [Power strip: Tripp Lite PS3612, outlets up] */
strip_w = 44.5;     // width of the strip's top (outlet) face
skirt_d = 12;       // how far the skirt reaches down the strip's sides

/* [Charger: UorMe 5V 1A cube] */
charger = 30.5;     // the cube's square face
charger_h = 35;     // body height above the outlet (without prongs)

/* [IO board: HiLetgo Nano IO Shield] */
board_l = 55;
board_w = 38;
board_t = 1.6;
board_clear = 16;   // tallest part above the board (Nano on its headers)

/* [Layout] */
wall = 2.2;
fit = 0.6;          // clearance for sliding fits
shelf_z = 85;       // board shelf height above the strip (room for the cable)
ledge = 4;          // how far the shelf ledges reach under the board's ends

// front panel holes, one column per student (x positions)
cols = [-22, -11, 0, 11, 22];
sig_z = 72;         // signal (A0-A4) hole height
gnd_z = 62;         // GND hole height
hole_d = 3.2;       // clip-lead wire holes

// protection perfboard (10k series + 100k pull-down per input) on the front wall
perf_post_x = 20;   // posts at +/- this x
perf_post_z = 46;   // below the holes, so leads drop down to it
perf_post_len = 5;

// Nano status LED window (Nano's USB end faces +x)
led_x = 16;
led_y = 4;
led_d = 6;

// derived
int_l = board_l + 2 * fit + 0.2;   // inside length (along the strip)
int_w = strip_w + fit;             // inside width = hugs the strip
out_l = int_l + 2 * wall;
out_w = int_w + 2 * wall;
top_z = shelf_z + board_t + board_clear;

$fn = 40;
font = "Liberation Sans:style=Bold";

// ---------------------------------------------------------------- body
module body() {
  difference() {
    union() {
      // long walls, down the strip's sides (the skirt)
      for (s = [-1, 1])
        translate([-out_l / 2, s > 0 ? int_w / 2 : -out_w / 2, -skirt_d])
          cube([out_l, wall, top_z + skirt_d]);
      // short walls, resting on the strip's top
      for (s = [-1, 1])
        translate([s > 0 ? int_l / 2 : -out_l / 2, -out_w / 2, 0])
          cube([wall, out_w, top_z]);
      charger_guides();
      shelf_ledges();
      perf_posts();
      front_labels();
    }
    front_holes();
    vents();
  }
}

// four corner guides that center the hood over the charger cube
module charger_guides() {
  c = charger / 2 + fit / 2;
  for (sx = [-1, 1], sy = [-1, 1]) {
    // post at the cube's corner...
    translate([sx * (c + 1.5) - 1.5, sy * (c + 1.5) - 1.5, 3])
      cube([3, 3, charger_h - 6]);
    // ...joined to the nearest long wall
    translate([sx * (c + 1.5) - 1, sy > 0 ? c : -int_w / 2, 3])
      cube([2, int_w / 2 - c, charger_h - 6]);
  }
}

// ledges under the board's two short ends, chamfered below so they print
// without supports; small blocks keep the board centered across
module shelf_ledges() {
  for (s = [-1, 1]) {
    translate([s > 0 ? int_l / 2 - ledge : -int_l / 2, -int_w / 2, shelf_z - ledge])
      hull() {
        translate([s > 0 ? ledge - 0.01 : 0, 0, 0]) cube([0.01, int_w, 0.01]);
        translate([0, 0, ledge]) cube([ledge, int_w, 0.01]);
        translate([s > 0 ? ledge - 0.01 : 0, 0, ledge]) cube([0.01, int_w, 0.01]);
      }
    // centering blocks on the ledge, either side of the board
    for (t = [-1, 1])
      translate([s > 0 ? int_l / 2 - ledge : -int_l / 2,
                 t > 0 ? board_w / 2 + fit / 2 : -int_w / 2, shelf_z])
        cube([ledge, int_w / 2 - board_w / 2 - fit / 2, 3]);
  }
}

module perf_posts() {
  for (s = [-1, 1])
    translate([s * perf_post_x, -int_w / 2, perf_post_z])
      rotate([-90, 0, 0])
        difference() {
          cylinder(d = 5.5, h = perf_post_len);
          cylinder(d = 2.2, h = perf_post_len + 1);  // M2.5 self-tapping screw
        }
}

module front_holes() {
  for (x = cols, z = [sig_z, gnd_z])
    translate([x, -out_w / 2 - 1, z]) rotate([-90, 0, 0]) cylinder(d = hole_d, h = wall + 2);
}

// raised labels on the front: A0-A4 over the signal holes, GND under the row
module front_labels() {
  for (i = [0 : len(cols) - 1])
    translate([cols[i], -out_w / 2 + 0.01, sig_z + 6])
      rotate([90, 0, 0]) linear_extrude(0.6)
        text(str("A", i), size = 4, font = font, halign = "center", valign = "center");
  translate([0, -out_w / 2 + 0.01, gnd_z - 7])
    rotate([90, 0, 0]) linear_extrude(0.6)
      text("GND", size = 3.5, font = font, halign = "center", valign = "center");
}

// slots low on the walls so the charger stays cool
module vents() {
  for (z = [8 : 6 : 26]) {
    for (s = [-1, 1])
      translate([-12, s * (out_w / 2) - 2, z]) cube([24, 4, 2.5]);
    for (s = [-1, 1])
      translate([s * (out_l / 2) - 2, -10, z]) cube([4, 20, 2.5]);
  }
}

// ---------------------------------------------------------------- lid
lip = 4;
module lid() {
  difference() {
    union() {
      // top plate (the side you see)
      translate([-out_l / 2, -out_w / 2, 0]) cube([out_l, out_w, wall]);
      // lip that drops inside the walls
      translate([-int_l / 2 + 0.2, -int_w / 2 + 0.2, -lip])
        difference() {
          cube([int_l - 0.4, int_w - 0.4, lip]);
          translate([1.6, 1.6, -1]) cube([int_l - 3.6, int_w - 3.6, lip + 2]);
        }
      // posts that press the board's corners down
      for (sx = [-1, 1], sy = [-1, 1])
        translate([sx * (board_l / 2 - 4), sy * (board_w / 2 - 4), -board_clear])
          cylinder(d = 4, h = board_clear);
    }
    // LED window
    translate([led_x, led_y, -1]) cylinder(d = led_d, h = wall + 2);
    // engraved station number and title
    translate([-4, 0, wall - 0.6])
      linear_extrude(1)
        text(str(station), size = 22, font = font, halign = "center", valign = "center");
    translate([-4, -out_w / 2 + 6, wall - 0.6])
      linear_extrude(1)
        text("STATION", size = 4.5, font = font, halign = "center", valign = "center");
  }
}

// ---------------------------------------------------------------- output
if (part == "body") {
  // upside down: the open top sits on the bed
  translate([0, 0, top_z]) rotate([180, 0, 0]) body();
} else if (part == "lid") {
  // face down
  translate([0, 0, wall]) rotate([180, 0, 0]) lid();
} else if (part == "fit_test") {
  // just the bottom: skirt + charger guides, to check the fit on the strip
  // and over the charger before the full print (about 20 minutes)
  translate([0, 0, 30]) rotate([180, 0, 0])
    intersection() {
      body();
      translate([-100, -100, -skirt_d - 1]) cube([200, 200, 30 + skirt_d + 1]);
    }
} else if (part == "section") {
  // cut in half lengthwise, to see the inside
  difference() {
    union() { body(); translate([0, 0, top_z]) lid(); }
    translate([-100, 0, -50]) cube([200, 100, 250]);
  }
  %translate([-charger / 2, -charger / 2, 0]) cube([charger, charger, charger_h]);
  %translate([-board_l / 2, -board_w / 2, shelf_z]) cube([board_l, board_w, board_t]);
  %translate([-120, -strip_w / 2, -31.75]) cube([240, strip_w, 31.75]);
} else {
  // assembled preview, with the strip and charger as ghosts
  body();
  translate([0, 0, top_z]) lid();
  %translate([-120, -strip_w / 2, -31.75]) cube([240, strip_w, 31.75]);  // strip
  %translate([-charger / 2, -charger / 2, 0]) cube([charger, charger, charger_h]);  // charger
  %translate([-board_l / 2, -board_w / 2, shelf_z]) cube([board_l, board_w, board_t]);  // IO board
}
