"""Sensor station housing for Fusion (ART 150, DIY Pressure Sensor Workshop).

Builds the station housing as a native parametric Fusion design: every key
measurement is a user parameter (Modify > Change Parameters), and the
sketches and extrudes are driven by them, so changing one updates the model.

Same design as ../../station_housing.scad:
  - a hood over a USB charger plugged into a Tripp Lite PS3612 power strip
    (outlets up); the long walls continue down the strip's sides as a skirt,
    the short walls rest on its top
  - corner guides that center it over the charger
  - the HiLetgo Nano IO Shield press-fits UPSIDE DOWN into a pocket under the
    lid (crush ribs grip it; corner pads keep its solder joints off the lid),
    with the Nano and screw terminals hanging down into the housing. Lid and
    board come out as one piece: flip it over to wire or re-upload.
    Power comes from the charger through a USB cable with bare wires screwed
    into the IO board's VIN and GND terminals
  - front panel: five columns of holes (signal over GND) for the clip leads,
    labeled A0-A4, and two posts inside for a protection perfboard
  - lid: plate, inner lip (its ends are the pocket's end walls), side rims,
    corner pads, crush ribs (no lettering: write the station number on it)

Run: Utilities > Scripts and Add-Ins > + (next to My Scripts) > "Script or
add-in from device" > choose this StationHousing folder > Run.
It builds everything in a new design.
Model coordinates: X along the strip, Y across it, Z up from the strip's top.
"""

import os
import traceback

import adsk.core
import adsk.fusion

# name, expression, comment
PARAMS = [
    ("strip_w", "44.5 mm", "Power strip: width of its top (outlet) face"),
    ("skirt_d", "12 mm", "How far the skirt reaches down the strip's sides"),
    ("charger", "30.5 mm", "Charger: its square face"),
    ("charger_h", "35 mm", "Charger: body height above the outlet, without prongs"),
    ("board_l", "55 mm", "IO board length"),
    ("board_w", "37 mm", "IO board width"),
    ("board_t", "1.6 mm", "IO board thickness"),
    ("solder_gap", "2.5 mm", "Gap between lid and board for the solder joints on its back"),
    ("press", "0.15 mm", "Pocket clearance around the board (the crush ribs make it a press fit)"),
    ("rib", "0.3 mm", "How far the crush ribs stick into the pocket"),
    ("rim", "1.6 mm", "Thickness of the lid's lip and the pocket's side rims"),
    ("wall", "2.2 mm", "Wall thickness"),
    ("fit", "0.6 mm", "Clearance for sliding fits"),
    ("wall_h", "102.6 mm", "Wall height above the strip (the board hangs from the lid at the top)"),
    ("hole_d", "3.2 mm", "Clip-lead wire holes"),
    ("sig_z", "72 mm", "Signal (A0-A4) hole height"),
    ("gnd_z", "62 mm", "GND hole height"),
    ("col_pitch", "11 mm", "Spacing between the five hole columns"),
    ("perf_post_x", "20 mm", "Perfboard posts at +/- this X"),
    ("perf_post_z", "46 mm", "Perfboard post height"),
    ("perf_post_len", "5 mm", "Perfboard post length from the wall"),
    # derived
    ("lip", "solder_gap + board_t", "Depth of the lid's lip and rims: down to the board's component face (derived)"),
    ("int_l", "board_l + press + 2 * rim + 0.4 mm", "Inside length: the lip's ends hold the board (derived)"),
    ("int_w", "strip_w + fit", "Inside width: hugs the strip (derived)"),
    ("out_l", "int_l + 2 * wall", "Outside length (derived)"),
    ("out_w", "int_w + 2 * wall", "Outside width (derived)"),
    ("top_z", "wall_h", "Top of the walls (derived)"),
    ("guide_c", "charger / 2 + fit / 2", "Charger guide offset from center (derived)"),
]

app = adsk.core.Application.get()
ui = app.userInterface
design = None
root = None
step = "starting"
skipped = []  # dimensions/constraints Fusion refused (sketch stays correct, just less parametric)
collisions = []  # reference parts that run into the printed body


def safe(what, fn, *args):
    """Add a dimension or constraint; if Fusion says the sketch is already
    fully defined (over-constrained), skip it and note it instead of stopping."""
    try:
        return fn(*args)
    except RuntimeError as e:
        if "CONSTRAINT" in str(e).upper():
            skipped.append(f"{step}: {what}")
            return None
        raise

HORIZONTAL = adsk.fusion.DimensionOrientations.HorizontalDimensionOrientation
VERTICAL = adsk.fusion.DimensionOrientations.VerticalDimensionOrientation
POSITIVE = adsk.fusion.ExtentDirections.PositiveExtentDirection
NEGATIVE = adsk.fusion.ExtentDirections.NegativeExtentDirection
NEW = adsk.fusion.FeatureOperations.NewBodyFeatureOperation
JOIN = adsk.fusion.FeatureOperations.JoinFeatureOperation
CUT = adsk.fusion.FeatureOperations.CutFeatureOperation
AXES = {"x": (1, 0, 0), "y": (0, 1, 0), "z": (0, 0, 1)}


# ---------------------------------------------------------------- helpers

def mm(expr):
    """Evaluate a parameter expression to millimeters."""
    return design.unitsManager.evaluateExpression(expr, "mm") * 10.0


def vi(expr):
    return adsk.core.ValueInput.createByString(expr)


def pt(sk, x, y, z):
    """World point in mm -> sketch-space point."""
    return sk.modelToSketchSpace(adsk.core.Point3D.create(x / 10.0, y / 10.0, z / 10.0))


def orient(sk, axis):
    """Dimension orientation in this sketch for a world axis."""
    d = sk.xDirection
    a = AXES[axis]
    return HORIZONTAL if abs(d.x * a[0] + d.y * a[1] + d.z * a[2]) > 0.9 else VERTICAL


def normal(sk):
    x, y = sk.xDirection, sk.yDirection
    return adsk.core.Vector3D.create(
        x.y * y.z - x.z * y.y, x.z * y.x - x.x * y.z, x.x * y.y - x.y * y.x
    )


def toward(sk, axis, sign):
    """Extent direction that points along +/- a world axis."""
    n = normal(sk)
    a = AXES[axis]
    return POSITIVE if (n.x * a[0] + n.y * a[1] + n.z * a[2]) * sign > 0 else NEGATIVE


def world(p):
    """A sketch point's world position in mm."""
    w = p.worldGeometry
    return (w.x * 10.0, w.y * 10.0, w.z * 10.0)


def text_pt(sk, p, dx=2, dy=2):
    g = p.geometry
    return adsk.core.Point3D.create(g.x + dx / 10.0, g.y + dy / 10.0, 0)


def dim(sk, p1, p2, axis, expr):
    """Distance dimension along a world axis, driven by an expression."""
    d = safe(f"{sk.name} {axis} = {expr}", sk.sketchDimensions.addDistanceDimension,
             p1, p2, orient(sk, axis), text_pt(sk, p2))
    if d:
        d.parameter.expression = expr
    return d


def diameter(sk, circ, expr):
    d = safe(f"{sk.name} diameter = {expr}", sk.sketchDimensions.addDiameterDimension,
             circ, text_pt(sk, circ.centerSketchPoint, 4, 4))
    if d:
        d.parameter.expression = expr
    return d


def lines_along(lines, axis):
    i = "xyz".index(axis)
    out = []
    for ln in lines:
        a, b = world(ln.startSketchPoint), world(ln.endSketchPoint)
        if abs(a[i] - b[i]) > 1e-4:
            out.append(ln)
    return out


def corner(lines, target):
    """The rectangle corner nearest a world point (mm)."""
    best, bd = None, 1e9
    for ln in lines:
        for p in (ln.startSketchPoint, ln.endSketchPoint):
            w = world(p)
            d = sum((w[k] - target[k]) ** 2 for k in range(3))
            if d < bd:
                best, bd = p, d
    return best


def rect(sk, a, b, size=None, pos=None):
    """Rectangle between world corners a and b (mm).
    size: {axis: expr} for side lengths; pos: (corner_xyz, {axis: expr})
    dimensions a corner's distance from the sketch origin."""
    lines = sk.sketchCurves.sketchLines.addTwoPointRectangle(pt(sk, *a), pt(sk, *b))
    if size:
        for axis, expr in size.items():
            ln = lines_along(lines, axis)[0]
            dim(sk, ln.startSketchPoint, ln.endSketchPoint, axis, expr)
    if pos:
        c, exprs = pos
        p = corner(lines, c)
        for axis, expr in exprs.items():
            dim(sk, sk.originPoint, p, axis, expr)
    return lines


def centered_rect(sk, axis1, expr1, axis2, expr2, at):
    """Rectangle centered on the sketch origin; at = height of the plane on
    the third axis, for placing the corners."""
    h1, h2 = mm(expr1) / 2, mm(expr2) / 2
    a = [0, 0, 0]
    b = [0, 0, 0]
    i1, i2 = "xyz".index(axis1), "xyz".index(axis2)
    i3 = 3 - i1 - i2
    a[i1], a[i2], a[i3] = -h1, -h2, at
    b[i1], b[i2], b[i3] = h1, h2, at
    lines = rect(sk, a, b, size={axis1: expr1, axis2: expr2})
    diag = sk.sketchCurves.sketchLines.addByTwoPoints(
        corner(lines, a), corner(lines, b)
    )
    diag.isConstruction = True
    safe(f"{sk.name} centered on origin", sk.geometricConstraints.addMidPoint, sk.originPoint, diag)
    return lines


def plane(base, expr, name):
    inp = root.constructionPlanes.createInput()
    inp.setByOffset(base, vi(expr))
    p = root.constructionPlanes.add(inp)
    p.name = name
    return p


def sketch(on, name):
    sk = root.sketches.add(on)
    sk.name = name
    return sk


def all_profiles(sk):
    col = adsk.core.ObjectCollection.create()
    for p in sk.profiles:
        col.add(p)
    return col


def ring_profiles(sk):
    """Profiles with a hole in them (rings, not the disks inside)."""
    col = adsk.core.ObjectCollection.create()
    for p in sk.profiles:
        if p.profileLoops.count > 1:
            col.add(p)
    return col


def extrude(profiles, op, dist, direction=POSITIVE, start=None, bodies=None, name=None):
    inp = root.features.extrudeFeatures.createInput(profiles, op)
    inp.setOneSideExtent(adsk.fusion.DistanceExtentDefinition.create(vi(dist)), direction)
    if start:
        inp.startExtent = adsk.fusion.OffsetStartDefinition.create(vi(start))
    if bodies:
        inp.participantBodies = bodies
    f = root.features.extrudeFeatures.add(inp)
    if name:
        f.name = name
    return f


def cut_through(profiles, bodies, name):
    """Cut straight through, both ways from the sketch. (A symmetric "All"
    extent builds without errors but cuts nothing here, so use a depth that
    is always bigger than the whole housing.)"""
    inp = root.features.extrudeFeatures.createInput(profiles, CUT)
    inp.setSymmetricExtent(vi("2 * (top_z + skirt_d) + 50 mm"), True)
    inp.participantBodies = bodies
    f = root.features.extrudeFeatures.add(inp)
    f.name = name
    return f


def mirror(features, plane_, name):
    col = adsk.core.ObjectCollection.create()
    for f in features:
        col.add(f)
    f = root.features.mirrorFeatures.add(root.features.mirrorFeatures.createInput(col, plane_))
    f.name = name
    return f


def on_axis_line(sk, axis, length=100):
    """Construction line from the sketch origin along a world axis, to hang
    points on."""
    end = [0, 0, 0]
    end["xyz".index(axis)] = length
    ln = sk.sketchCurves.sketchLines.addByTwoPoints(sk.originPoint, pt(sk, *end))
    ln.isConstruction = True
    gc = sk.geometricConstraints
    safe(f"{sk.name} axis line", gc.addHorizontal if orient(sk, axis) == HORIZONTAL else gc.addVertical, ln)
    return ln


def add_text(sk, s, height, center, box, flip_to=None, bold=True):
    """Text centered at a world point; flip_to=(xaxis, yaxis) makes it read
    with +xaxis to the right and +yaxis up."""
    cx, cy, cz = center
    bw, bh = box
    # box corners in world, on the sketch plane
    n = normal(sk)
    if abs(n.z) > 0.9:  # horizontal sketch
        a, b = (cx - bw / 2, cy - bh / 2, cz), (cx + bw / 2, cy + bh / 2, cz)
    else:  # vertical sketch facing Y
        a, b = (cx - bw / 2, cy, cz - bh / 2), (cx + bw / 2, cy, cz + bh / 2)
    pa, pb = pt(sk, *a), pt(sk, *b)
    lo = adsk.core.Point3D.create(min(pa.x, pb.x), min(pa.y, pb.y), 0)
    hi = adsk.core.Point3D.create(max(pa.x, pb.x), max(pa.y, pb.y), 0)
    inp = sk.sketchTexts.createInput2(s, height / 10.0)
    inp.setAsMultiLine(
        lo, hi,
        adsk.core.HorizontalAlignments.CenterHorizontalAlignment,
        adsk.core.VerticalAlignments.MiddleVerticalAlignment,
        0,
    )
    inp.fontName = "Arial"
    if bold:
        inp.textStyle = adsk.fusion.TextStyles.TextStyleBold
    if flip_to:
        xa, ya = AXES[flip_to[0]], AXES[flip_to[1]]
        xd, yd = sk.xDirection, sk.yDirection
        if xd.x * xa[0] + xd.y * xa[1] + xd.z * xa[2] < 0:
            inp.isHorizontalFlip = True
        if yd.x * ya[0] + yd.y * ya[1] + yd.z * ya[2] < 0:
            inp.isVerticalFlip = True
    return sk.sketchTexts.add(inp)


# ---------------------------------------------------------------- the model

def build():
    global step, design, root
    step = "new design"
    doc = app.documents.add(adsk.core.DocumentTypes.FusionDesignDocumentType)
    doc.name = "Sensor Station Housing"
    design = adsk.fusion.Design.cast(app.activeProduct)
    design.designType = adsk.fusion.DesignTypes.ParametricDesignType
    root = design.rootComponent
    XY, XZ, YZ = root.xYConstructionPlane, root.xZConstructionPlane, root.yZConstructionPlane

    step = "parameters"
    for name, expr, comment in PARAMS:
        design.userParameters.add(name, vi(expr), "mm", comment)

    int_w, int_l = mm("int_w"), mm("int_l")
    top_z, skirt_d = mm("top_z"), mm("skirt_d")
    c = mm("guide_c")

    # -------- body: outer box, hollowed, channel for the strip
    step = "outer box"
    sk = sketch(XY, "Footprint")
    centered_rect(sk, "x", "out_l", "y", "out_w", 0)
    f = extrude(sk.profiles.item(0), NEW, "top_z + skirt_d", POSITIVE, start="-skirt_d", name="Box")
    body = f.bodies.item(0)
    body.name = "Station body"
    B = [body]

    step = "hollow"
    sk = sketch(XY, "Cavity")
    centered_rect(sk, "x", "int_l", "y", "int_w", 0)
    cut_through(sk.profiles.item(0), B, "Hollow")

    step = "strip channel"
    sk = sketch(XY, "Strip channel")
    centered_rect(sk, "x", "out_l + 10 mm", "y", "int_w", 0)
    extrude(sk.profiles.item(0), CUT, "skirt_d + 1 mm", NEGATIVE, bodies=B, name="Strip channel")

    # -------- charger guides: an L in one corner, mirrored to all four
    step = "charger guides"
    pl = plane(XY, "3 mm", "Charger guides plane")
    sk = sketch(pl, "Charger guide")
    rect(sk, (c - 6, c, 3), (c + 2, int_w / 2, 3),
         size={"x": "8 mm", "y": "int_w / 2 - guide_c"},
         pos=((c - 6, c, 3), {"x": "guide_c - 6 mm", "y": "guide_c"}))
    rect(sk, (c, c - 6, 3), (c + 2, c, 3),
         size={"x": "2 mm", "y": "6 mm"},
         pos=((c, c - 6, 3), {"x": "guide_c", "y": "guide_c - 6 mm"}))
    g1 = extrude(all_profiles(sk), JOIN, "charger_h - 6 mm", bodies=B, name="Charger guide")
    g2 = mirror([g1], YZ, "Charger guides (mirror X)")
    mirror([g1, g2], XZ, "Charger guides (mirror Y)")

    # -------- front panel: holes (one column, patterned to five)
    step = "front holes"
    sk = sketch(XZ, "Lead holes")
    axis_line = on_axis_line(sk, "z")
    C = sk.sketchCurves.sketchCircles
    for zexpr in ("sig_z", "gnd_z"):
        circ = C.addByCenterRadius(pt(sk, 0, 0, mm(zexpr)), mm("hole_d") / 20.0)
        safe("hole on center line", sk.geometricConstraints.addCoincident, circ.centerSketchPoint, axis_line)
        diameter(sk, circ, "hole_d")
        dim(sk, sk.originPoint, circ.centerSketchPoint, "z", zexpr)
    holes = extrude(all_profiles(sk), CUT, "out_w", toward(sk, "y", -1), bodies=B, name="Lead holes")
    pin = root.features.rectangularPatternFeatures.createInput(
        _col([holes]), root.xConstructionAxis, vi("5"), vi("col_pitch"),
        adsk.fusion.PatternDistanceType.SpacingPatternDistanceType,
    )
    pin.isSymmetricInDirectionOne = True
    root.features.rectangularPatternFeatures.add(pin).name = "Lead holes (5 columns)"

    step = "perfboard posts"
    sk = sketch(XZ, "Perfboard post")
    px, pz = mm("perf_post_x"), mm("perf_post_z")
    C = sk.sketchCurves.sketchCircles
    o = C.addByCenterRadius(pt(sk, px, 0, pz), 0.275)
    i = C.addByCenterRadius(o.centerSketchPoint, 0.11)
    for circ, e in ((o, "5.5 mm"), (i, "2.2 mm")):
        diameter(sk, circ, e)
    dim(sk, sk.originPoint, o.centerSketchPoint, "x", "perf_post_x")
    dim(sk, sk.originPoint, o.centerSketchPoint, "z", "perf_post_z")
    ny = normal(sk).y
    p1 = extrude(ring_profiles(sk), JOIN, "perf_post_len", toward(sk, "y", +1),
                 start=("-int_w / 2" if ny > 0 else "int_w / 2"), bodies=B, name="Perfboard post")
    mirror([p1], YZ, "Perfboard posts (mirror)")

    step = "front labels"
    sk = sketch(XZ, "Front labels")
    pitch = mm("col_pitch")
    for k in range(5):
        add_text(sk, f"A{k}", 4, ((k - 2) * pitch, 0, mm("sig_z") + 6), (10, 6), flip_to=("x", "z"))
    add_text(sk, "GND", 3.5, (0, 0, mm("gnd_z") - 7), (20, 6), flip_to=("x", "z"))
    texts = adsk.core.ObjectCollection.create()
    for t in sk.sketchTexts:
        texts.add(t)
    extrude(texts, JOIN, "0.6 mm", toward(sk, "y", -1),
            start=("-out_w / 2" if normal(sk).y > 0 else "out_w / 2"), bodies=B, name="Front labels")

    step = "vents"
    sk = sketch(XZ, "Vents (long walls)")
    for z in (8, 14, 20, 26):
        rect(sk, (-8, 0, z), (8, 0, z + 2.5))
    cut_through(all_profiles(sk), B, "Vents (long walls)")
    sk = sketch(YZ, "Vents (short walls)")
    for z in (8, 14, 20, 26):
        rect(sk, (0, -8, z), (0, 8, z + 2.5))
    cut_through(all_profiles(sk), B, "Vents (short walls)")

    # -------- lid
    step = "lid plate"
    lid_pl = plane(XY, "top_z", "Lid plane")
    sk = sketch(lid_pl, "Lid plate")
    centered_rect(sk, "x", "out_l", "y", "out_w", top_z)
    f = extrude(sk.profiles.item(0), NEW, "wall", name="Lid plate")
    lid = f.bodies.item(0)
    lid.name = "Lid"
    LID = [lid]

    step = "lid lip"
    # the lip keeps the lid in place in the walls; its inside length is the
    # board plus "press", so its two ends are the pocket's end walls
    sk = sketch(lid_pl, "Lid lip")
    centered_rect(sk, "x", "int_l - 0.4 mm", "y", "int_w - 0.4 mm", top_z)
    centered_rect(sk, "x", "int_l - 0.4 mm - 2 * rim", "y", "int_w - 0.4 mm - 2 * rim", top_z)
    extrude(ring_profiles(sk), JOIN, "lip", NEGATIVE, bodies=LID, name="Lid lip")

    # the board's long sides: a rim on each, mirrored
    step = "pocket side rims"
    bl2 = (mm("board_l") + mm("press")) / 2   # half the pocket's length
    bw2 = (mm("board_w") + mm("press")) / 2   # half the pocket's width
    rim_t = mm("rim")
    sk = sketch(lid_pl, "Pocket side rim")
    rect(sk, (-bl2, bw2, top_z), (bl2, bw2 + rim_t, top_z),
         size={"x": "board_l + press", "y": "rim"},
         pos=((-bl2, bw2, top_z), {"x": "board_l / 2 + press / 2", "y": "board_w / 2 + press / 2"}))
    r1 = extrude(sk.profiles.item(0), JOIN, "lip", NEGATIVE, bodies=LID, name="Pocket side rim")
    mirror([r1], XZ, "Pocket side rims (mirror)")

    # pads at the board's corners (no parts there) hold it off the lid
    step = "pocket corner pads"
    sk = sketch(lid_pl, "Corner pad")
    rect(sk, (bl2 - 4, bw2 - 4, top_z), (bl2, bw2, top_z),
         size={"x": "4 mm", "y": "4 mm"},
         pos=((bl2, bw2, top_z), {"x": "board_l / 2 + press / 2", "y": "board_w / 2 + press / 2"}))
    c1 = extrude(sk.profiles.item(0), JOIN, "solder_gap", NEGATIVE, bodies=LID, name="Corner pad")
    c2 = mirror([c1], YZ, "Corner pads (mirror X)")
    mirror([c1, c2], XZ, "Corner pads (mirror Y)")

    # crush ribs: small bumps on the pocket walls that squash as the board
    # goes in, so it grips without the pocket having to be perfectly sized
    step = "crush ribs"
    rb = mm("rib")
    sk = sketch(lid_pl, "Crush rib (side)")
    rect(sk, (mm("board_l") / 4 - 0.5, bw2 - rb, top_z), (mm("board_l") / 4 + 0.5, bw2, top_z),
         size={"x": "1 mm", "y": "rib"},
         pos=((mm("board_l") / 4 - 0.5, bw2 - rb, top_z),
              {"x": "board_l / 4 - 0.5 mm", "y": "board_w / 2 + press / 2 - rib"}))
    k1 = extrude(sk.profiles.item(0), JOIN, "lip", NEGATIVE, bodies=LID, name="Crush rib (side)")
    k2 = mirror([k1], YZ, "Crush ribs, side (mirror X)")
    mirror([k1, k2], XZ, "Crush ribs, side (mirror Y)")
    sk = sketch(lid_pl, "Crush rib (end)")
    rect(sk, (bl2 - rb, -0.5, top_z), (bl2, 0.5, top_z),
         size={"x": "rib", "y": "1 mm"},
         pos=((bl2 - rb, 0.5, top_z), {"x": "board_l / 2 + press / 2 - rib", "y": "0.5 mm"}))
    k3 = extrude(sk.profiles.item(0), JOIN, "lip", NEGATIVE, bodies=LID, name="Crush rib (end)")
    mirror([k3], YZ, "Crush ribs, end (mirror)")

    comp = build_reference()
    step = "interference check"
    global collisions
    collisions = interference(comp, body)

    step = "done"
    app.activeViewport.fit()


# ---------------------------------------------------------------- reference parts
# Simple stand-ins for the parts that go in the housing, in their assembled
# positions, so it's clear how it fits together. They're in their own
# component ("Reference parts (not printed)"): hide it with its eye icon.
# Placed from the parameter values at build time (they don't follow later
# parameter changes).

COLORS = {
    "strip": (190, 192, 196), "charger": (35, 35, 38), "metal": (200, 200, 205),
    "plug": (120, 120, 125), "pcb_io": (60, 140, 70), "terminal": (40, 170, 90),
    "header": (25, 25, 25), "nano": (0, 130, 140), "module": (210, 210, 215),
    "perf": (225, 195, 140), "cable": (60, 60, 60),
    "red": (200, 40, 35), "black": (20, 20, 20),
}
_appearances = {}


def appearance(key):
    """A colored copy of a library appearance (cached); None if unavailable."""
    if key in _appearances:
        return _appearances[key]
    found = None
    try:
        lib = None
        for name in ("Fusion Appearance Library", "Fusion 360 Appearance Library"):
            lib = app.materialLibraries.itemByName(name)
            if lib:
                break
        base = None
        for i in range(lib.appearances.count):
            a = lib.appearances.item(i)
            if "plastic" in a.name.lower() and "glossy" in a.name.lower():
                base = a
                break
        base = base or lib.appearances.item(0)
        found = design.appearances.addByCopy(base, f"Reference - {key}")
        r, g, b = COLORS[key]
        for prop in found.appearanceProperties:
            if isinstance(prop, adsk.core.ColorProperty) or prop.objectType == adsk.core.ColorProperty.classType():
                try:
                    adsk.core.ColorProperty.cast(prop).value = adsk.core.Color.create(r, g, b, 0)
                except Exception:
                    pass
    except Exception:
        found = None
    _appearances[key] = found
    return found


def box(x0, x1, y0, y1, z0, z1):
    """Temporary box between two corners, in mm."""
    tb = adsk.fusion.TemporaryBRepManager.get()
    c = adsk.core.Point3D.create((x0 + x1) / 20.0, (y0 + y1) / 20.0, (z0 + z1) / 20.0)
    obb = adsk.core.OrientedBoundingBox3D.create(
        c, adsk.core.Vector3D.create(1, 0, 0), adsk.core.Vector3D.create(0, 1, 0),
        abs(x1 - x0) / 10.0, abs(y1 - y0) / 10.0, abs(z1 - z0) / 10.0)
    return tb.createBox(obb)


def rod(a, b, d):
    """Temporary cylinder from point a to point b (mm), diameter d."""
    tb = adsk.fusion.TemporaryBRepManager.get()
    return tb.createCylinderOrCone(
        adsk.core.Point3D.create(a[0] / 10.0, a[1] / 10.0, a[2] / 10.0), d / 20.0,
        adsk.core.Point3D.create(b[0] / 10.0, b[1] / 10.0, b[2] / 10.0), d / 20.0)


def build_reference():
    global step
    step = "reference parts"
    occ = root.occurrences.addNewComponent(adsk.core.Matrix3D.create())
    comp = occ.component
    comp.name = "Reference parts (not printed)"
    base = comp.features.baseFeatures.add()
    base.startEdit()

    def add(name, color, *shapes):
        tb = adsk.fusion.TemporaryBRepManager.get()
        solid = shapes[0]
        for extra in shapes[1:]:
            tb.booleanOperation(solid, extra, adsk.fusion.BooleanTypes.UnionBooleanType)
        body = comp.bRepBodies.add(solid, base)
        body.name = name
        a = appearance(color)
        if a:
            body.appearance = a
        return body

    sw, ch, cz = mm("strip_w"), mm("charger"), mm("charger_h")
    bt, tz = mm("board_t"), mm("top_z")
    pcb_up = tz - mm("solder_gap")   # board's back (solder side), facing the lid
    pcb_dn = pcb_up - bt             # board's component face, facing down
    il, iw = mm("int_l"), mm("int_w")

    # power strip (a section of it), outlets facing up
    add("Power strip (Tripp Lite PS3612)", "strip", box(-100, 100, -sw / 2, sw / 2, -31.75, 0))
    # charger cube, its prongs in the outlet
    add("USB charger", "charger", box(-ch / 2, ch / 2, -ch / 2, ch / 2, 0, cz))
    add("Charger prongs", "metal",
        box(-6.35 - 0.8, -6.35 + 0.8, -3.2, 3.2, -16, 0), box(6.35 - 0.8, 6.35 + 0.8, -3.2, 3.2, -16, 0))
    # power: USB-A plug in the charger; the cable's jacket ends below the
    # board, and its red (+5V) and black (GND) wires go up the front gap to
    # the IO board's VIN and GND screw terminals (which hang under the board)
    gap_y = -(mm("board_w") / 2 + iw / 2) / 2  # middle of the front gap
    vin_x, gnd_x = -17.8, -15.2                  # VIN, GND: end of the analog-side row
    term_z = pcb_dn - 5                          # wire entry height on the terminals
    jacket_end = (-16.5, gap_y + 1, pcb_dn - 30)
    add("USB-A plug (power cable)", "plug", box(-8, 8, -4.5, 4.5, cz, cz + 26))
    add("Power cable (USB-A to bare wire)", "cable",
        rod((0, 0, cz + 26), (0, 0, cz + 32), 4), rod((0, 0, cz + 32), jacket_end, 4))
    add("Red wire to VIN", "red",
        rod(jacket_end, (vin_x, gap_y, jacket_end[2] + 4), 1.6),
        rod((vin_x, gap_y, jacket_end[2] + 4), (vin_x, gap_y, term_z), 1.6),
        rod((vin_x, gap_y, term_z), (vin_x, -mm("board_w") / 2 + 2, term_z), 1.6))
    add("Black wire to GND", "black",
        rod(jacket_end, (gnd_x, gap_y, jacket_end[2] + 4), 1.6),
        rod((gnd_x, gap_y, jacket_end[2] + 4), (gnd_x, gap_y, term_z), 1.6),
        rod((gnd_x, gap_y, term_z), (gnd_x, -mm("board_w") / 2 + 2, term_z), 1.6))
    # IO board, upside down in the lid's pocket: the screw terminals and the
    # header sockets hang below it
    bl, bw = mm("board_l"), mm("board_w")
    add("Nano IO Shield (PCB, upside down)", "pcb_io", box(-bl / 2, bl / 2, -bw / 2, bw / 2, pcb_dn, pcb_up))
    add("Screw terminals", "terminal",
        box(-19, 19, bw / 2 - 7.5, bw / 2, pcb_dn - 10, pcb_dn),
        box(-19, 19, -bw / 2, -bw / 2 + 7.5, pcb_dn - 10, pcb_dn))
    add("Header sockets", "header",
        box(-19, 19, 7.62 - 1.25, 7.62 + 1.25, pcb_dn - 8.5, pcb_dn),
        box(-19, 19, -7.62 - 1.25, -7.62 + 1.25, pcb_dn - 8.5, pcb_dn))
    # Nano 33 IoT hanging from the sockets, face down, analog side (A0-A7,
    # VIN) toward the front (-Y): Wi-Fi module at -X, micro-USB at +X
    nz = pcb_dn - 8.5            # top of the Nano's PCB (against the sockets)
    add("Arduino Nano 33 IoT", "nano", box(-22.5, 22.5, -9, 9, nz - 1.6, nz))
    add("Nano Wi-Fi module (keep clear of metal)", "module", box(-22.5, -12, -7, 7, nz - 4, nz - 1.6))
    add("Nano micro-USB port", "metal", box(17, 23.5, -3.8, 3.8, nz - 4.6, nz - 1.6))
    # protection perfboard on the two posts inside the front wall
    py = -iw / 2 + mm("perf_post_len")
    add("Protection perfboard", "perf",
        box(-25, 25, py, py + 1.6, mm("perf_post_z") - 10, mm("perf_post_z") + 10))

    base.finishEdit()
    return comp


def interference(comp, body):
    """Reference parts that run into the printed body (name, cm3)."""
    hits = []
    tb = adsk.fusion.TemporaryBRepManager.get()
    for ref in comp.bRepBodies:
        if ref.name.startswith(("Power strip", "Charger prongs")):
            continue  # these are meant to sit under / inside the strip
        try:
            a = tb.copy(ref)
            b = tb.copy(body)
            tb.booleanOperation(a, b, adsk.fusion.BooleanTypes.IntersectionBooleanType)
            if a.volume > 0.001:
                hits.append((ref.name, a.volume))
        except Exception:
            pass
    return hits


def _col(items):
    col = adsk.core.ObjectCollection.create()
    for it in items:
        col.add(it)
    return col


def write_log(result, details):
    """Save the outcome next to this script (last_run.txt), so it can be read
    without copying it out of Fusion's message box."""
    try:
        path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "last_run.txt")
        with open(path, "w") as f:
            f.write(f"result: {result}\n")
            f.write(f"collisions with the housing ({len(collisions)}):\n")
            for name, vol in collisions:
                f.write(f"  - {name}: {vol:.2f} cm3\n")
            f.write(f"skipped ({len(skipped)}):\n")
            for item in skipped:
                f.write(f"  - {item}\n")
            # what got built: each body's size and volume, and each step's health
            if root:
                f.write("\nbodies:\n")
                for body in root.bRepBodies:
                    bb = body.boundingBox
                    size = [(bb.maxPoint.x - bb.minPoint.x) * 10, (bb.maxPoint.y - bb.minPoint.y) * 10,
                            (bb.maxPoint.z - bb.minPoint.z) * 10]
                    f.write(f"  {body.name}: {size[0]:.1f} x {size[1]:.1f} x {size[2]:.1f} mm, "
                            f"volume {body.volume:.1f} cm3, z {bb.minPoint.z * 10:.1f} to {bb.maxPoint.z * 10:.1f}\n")
                f.write("  (expected: Station body about 52 cm3, Lid about 8.5 cm3 with the default parameters)\n")
                f.write("\ntimeline:\n")
                for item in design.timeline:
                    try:
                        ent = item.entity
                        health = getattr(ent, "healthState", None)
                        note = getattr(ent, "errorOrWarningMessage", "") or ""
                        f.write(f"  {getattr(ent, 'name', item.name)}: health {health} {note}\n")
                    except Exception:
                        f.write(f"  {item.name}\n")
            if details:
                f.write("\n" + details)
    except Exception:
        pass


def run(context):
    try:
        del skipped[:]
        del collisions[:]
        build()
        msg = ("Built the station housing.\n\n"
               "Change measurements in Modify > Change Parameters.\n"
               "Bodies: 'Station body' and 'Lid' (print the body upside down, the lid face down).")
        write_log("built", "")
        if collisions:
            msg += ("\n\nThese parts run into the housing (see last_run.txt):\n- "
                    + "\n- ".join(name for name, _ in collisions))
        if skipped:
            msg += ("\n\nFusion refused these (the shape is still right; they just aren't "
                    "tied to parameters). Send this list to fix them:\n- " + "\n- ".join(skipped))
        ui.messageBox(msg, "Sensor Station Housing")
    except Exception:
        write_log(f"stopped at step: {step}", traceback.format_exc())
        ui.messageBox(
            f"Stopped at step: {step}\n\n{traceback.format_exc()}\n\n"
            "Everything before this step was built. Send this message to fix the script.",
            "Sensor Station Housing",
        )
