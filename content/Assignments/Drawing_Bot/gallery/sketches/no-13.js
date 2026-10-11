// No. 13, Untitled, by Ben Broz
// Drawn on a sheet pre-marked "Shift 1–4" and "Now Hiring $7.25/hr."
// Each shift, the robot is clocked in at its circle and works a little
// longer, until it's burnt out.
const SHIFTS_13 = [0.25, 0.42, 0.59, 0.76];
drawingSketch("13", {
  settings: { color: "#2b6b5f", weight: 1.8, speed: 60, turn: 0.9, wobble: 0.7 },
  paper(p) {
    SHIFTS_13.forEach((x, i) => {
      handwrite(p, `Shift ${i + 1}`, x, 0.25, { size: 17 });
      p.noFill();
      p.stroke("#2b6b5f");
      p.strokeWeight(4);
      p.circle(x * p.width, 0.37 * p.height, 0.085 * p.width);
    });
    handwrite(p, "Now Hiring", 0.74, 0.72, { size: 15 });
    handwrite(p, "7.25/Hr", 0.74, 0.86, { size: 15 });
  },
  *instructions(bot, step, p) {
    const minimumWage = 7.25;
    for (let shift = 0; shift < 4; shift++) {
      // 1. Clock in and work for minimum wage. They can't afford any more.
      // 2. Stay under full time. They can't afford any more.
      // 3. Paid every two weeks. They can't afford any more.
      // 4. Wait till you're burnt out. You can't afford any more.
      step(shift + 1);
      bot.place(SHIFTS_13[shift] + p.random(-0.02, 0.02), 0.37 + p.random(-0.02, 0.02));
      bot.switchOn();
      if (shift < 3) {
        yield* bot.runFor(minimumWage * (1 + shift * 0.6));
      } else {
        bot.drain = 1 / 25;
        yield* bot.runUntil(() => bot.stopped());
      }
      bot.switchOff();
    }
  },
});
