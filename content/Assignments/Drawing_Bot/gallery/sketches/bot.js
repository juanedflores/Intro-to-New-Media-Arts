// A simulated vibration-motor drawing robot, for p5.js (instance mode).
//
// The real robots are a motor with an off-center weight, a found object and
// a pen. The motor shakes the whole thing, and the way it's built makes it
// walk: in circles, in straight-ish lines, or nowhere at all. This class
// fakes that: each step the robot moves forward a little, turns a little,
// wobbles (Perlin noise), jitters (random shaking) and, if its pen is
// touching the paper, leaves a mark.
//
// Positions given to place() and moveTo() are fractions of the page:
// place(0, 0) is the top-left corner, place(0.5, 0.5) the middle.
// Speeds are in pixels per second, turns in radians per second, times in
// seconds of robot time (the sketch plays them back sped up).
//
// Each sketch's instructions are a generator function: everything happens
// instantly except bot.runFor() / bot.runUntil(), which let the robot run
// and are used with `yield*`, e.g.
//
//   yield* bot.runFor(20); // "let the robot run for 20 s"

const DT = 1 / 30; // seconds of robot time per step

class DrawingBot {
  constructor(p, settings = {}) {
    this.p = p;
    this.x = p.width / 2;
    this.y = p.height / 2;
    this.heading = 0;
    this.on = false;
    this.t = 0; // robot time (s)

    // how it moves
    this.speed = 30; // px/s
    this.turn = 0; // rad/s: + clockwise; speed / turn = circle radius
    this.wobble = 0.4; // rad/s of wandering steering (Perlin noise)
    this.jitter = 0.3; // px of random shaking per step
    this.drift = [0, 0]; // px/s the whole robot creeps sideways

    // its pen
    this.color = "#222222";
    this.weight = 2; // px
    this.kind = "marker"; // "marker", "pen", "crayon" or "paint"
    this.alpha = 235; // 0-255
    this.lift = 0; // how often the pen bounces off the paper (per s)
    this.land = 4; // how quickly it comes back down (per s)
    this.touching = true;

    // its batteries, and ink for a paintbrush
    this.battery = 1; // 1 = new; the robot slows down as it drains
    this.drain = 0; // battery used per second
    this.ink = 1; // only "paint" runs out
    this.inkUse = 0; // ink used per pixel travelled

    this.seed = p.random(1000);
    Object.assign(this, settings);
  }

  // ---- things you do to the robot (instant) ----

  // put it down at a spot on the page (fractions of the page), facing a
  // direction (radians; leave it out for a random direction)
  place(fx, fy, heading = this.p.random(this.p.TWO_PI)) {
    this.x = fx * this.p.width;
    this.y = fy * this.p.height;
    this.heading = heading;
  }

  // pick it up and put it down somewhere near a spot
  moveNear(fx, fy, spread = 0.08) {
    this.place(
      fx + this.p.random(-spread, spread),
      fy + this.p.random(-spread, spread),
    );
  }

  switchOn() {
    this.on = true;
    this.blob(1.3); // the pen sits still a moment and pools a little ink
  }

  switchOff() {
    this.on = false;
    this.blob(1.1);
  }

  // a push with a finger: it slides, still drawing
  push(dx, dy) {
    const steps = 10;
    for (let i = 0; i < steps; i++) {
      this.moveBy((dx * this.p.width) / steps, (dy * this.p.height) / steps);
    }
  }

  newBatteries() {
    this.battery = 1;
  }

  // a drop of ink (or a dab of paint) where the pen is resting
  blob(size = 1.4) {
    if (!this.touching || this.ink <= 0) return;
    const p = this.p;
    p.noStroke();
    const c = p.color(this.color);
    c.setAlpha(this.alpha);
    p.fill(c);
    const d = this.weight * size * p.random(1, 1.6);
    p.ellipse(this.x, this.y, d, d * p.random(0.7, 1));
  }

  // ---- letting it run (use these with yield*) ----

  *runFor(seconds) {
    for (let t = 0; t < seconds; t += DT) {
      this.step();
      yield;
    }
  }

  // run until `done()` says so (or for `max` seconds at most)
  *runUntil(done, max = 300) {
    for (let t = 0; t < max && !done(); t += DT) {
      this.step();
      yield;
    }
  }

  offPage(margin = 10) {
    const p = this.p;
    return (
      this.x < -margin ||
      this.y < -margin ||
      this.x > p.width + margin ||
      this.y > p.height + margin
    );
  }

  stopped() {
    return this.battery <= 0.02 || (this.kind === "paint" && this.ink <= 0);
  }

  // ---- the simulation ----

  step() {
    const p = this.p;
    this.t += DT;
    if (!this.on || this.battery <= 0) return;
    this.battery = Math.max(0, this.battery - this.drain * DT);
    const power = Math.min(1, this.battery * 3); // fades out near the end

    // steering: its built-in turn plus a slow random wander
    const wander = (p.noise(this.seed, this.t * 0.6) - 0.5) * 2;
    this.heading += (this.turn + this.wobble * wander) * power * DT;

    // the pen bounces off the paper now and then
    if (this.touching && p.random() < this.lift * DT) this.touching = false;
    else if (!this.touching && p.random() < this.land * DT) this.touching = true;

    const v = this.speed * power;
    this.moveBy(
      Math.cos(this.heading) * v * DT + this.drift[0] * power * DT + p.randomGaussian(0, this.jitter),
      Math.sin(this.heading) * v * DT + this.drift[1] * power * DT + p.randomGaussian(0, this.jitter),
    );
  }

  moveBy(dx, dy) {
    const x0 = this.x;
    const y0 = this.y;
    this.x += dx;
    this.y += dy;
    if (this.touching) this.mark(x0, y0, this.x, this.y);
  }

  // the line the pen leaves, by kind of pen
  mark(x0, y0, x1, y1) {
    const p = this.p;
    const len = Math.hypot(x1 - x0, y1 - y0);
    const c = p.color(this.color);
    // marker lines get a little thicker and thinner as the pen presses
    const press = 0.85 + 0.3 * p.noise(this.seed + 50, this.t * 2);

    if (this.kind === "crayon") {
      // waxy: lots of small specks around the path, with gaps
      p.noStroke();
      const n = Math.max(1, Math.round(len * 2));
      for (let i = 0; i < n; i++) {
        if (p.random() < 0.35) continue;
        const f = p.random();
        c.setAlpha(this.alpha * p.random(0.3, 1));
        p.fill(c);
        const r = this.weight / 2;
        p.circle(
          p.lerp(x0, x1, f) + p.random(-r, r),
          p.lerp(y0, y1, f) + p.random(-r, r),
          p.random(1, 2.6),
        );
      }
      return;
    }

    if (this.kind === "paint") {
      if (this.ink <= 0) return;
      this.ink = Math.max(0, this.ink - len * this.inkUse);
      // thick and wet at first, thin and streaky as the brush dries
      const wet = Math.sqrt(this.ink);
      if (wet < 0.35 && p.random() > wet * 2.5) return;
      c.setAlpha(this.alpha * (0.55 + 0.45 * wet));
      p.stroke(c);
      p.strokeWeight(Math.max(0.8, this.weight * wet * press));
      p.line(x0, y0, x1, y1);
      return;
    }

    // "marker" and "pen"
    c.setAlpha(this.alpha);
    p.stroke(c);
    p.strokeWeight(this.kind === "pen" ? this.weight : this.weight * press);
    p.line(x0, y0, x1, y1);
  }
}

// Paper: off-white with a faint grain.
function drawPaper(p) {
  p.background("#fbfaf6");
  p.noStroke();
  for (let i = 0; i < (p.width * p.height) / 120; i++) {
    p.fill(120, 110, 90, p.random(4, 10));
    p.circle(p.random(p.width), p.random(p.height), p.random(1, 2.5));
  }
}

// Handwriting on the paper before the robot runs (pre-marked sheets).
function handwrite(p, text, fx, fy, { size = 18, color = "#2b6b5f", underline = false } = {}) {
  p.push();
  p.noStroke();
  p.fill(color);
  p.textFont("Marker Felt, Bradley Hand, Comic Sans MS, cursive");
  p.textSize(size);
  p.textAlign(p.CENTER, p.CENTER);
  const x = fx * p.width;
  const y = fy * p.height;
  p.text(text, x, y);
  if (underline) {
    p.stroke(color);
    p.strokeWeight(2);
    const w = p.textWidth(text) / 2 + 4;
    p.line(x - w, y + size * 0.7, x + w, y + size * 0.75);
  }
  p.pop();
}
