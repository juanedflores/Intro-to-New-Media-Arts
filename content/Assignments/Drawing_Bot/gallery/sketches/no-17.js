// No. 17, Untitled, by Quang Duc Lam Nguyen
// A heavy, shaky robot with a thick marker, put down in each corner of the
// page in turn. It lurches toward the middle, leaving fat, blotchy lines.
const CORNERS_17 = [
  [0.36, 0.82],
  [0.6, 0.12],
  [0.68, 0.85],
  [0.34, 0.14],
];
drawingSketch("17", {
  settings: { color: "#2a5c58", weight: 6, speed: 34, wobble: 0.9, jitter: 1.1 },
  *instructions(bot, step, p) {
    for (let i = 0; i < 4; i++) {
      // 1. Put at "bottom left," 10 seconds.
      // 2. Put at "top right," 10 seconds.
      // 3. Put at "bottom right," 10 seconds.
      // 4. Put at "top left," 10 seconds.
      step(i + 1);
      const [x, y] = CORNERS_17[i];
      bot.place(x, y, Math.atan2(0.5 - y, (0.5 - x) * 1.4) + p.random(-0.3, 0.3));
      bot.switchOn();
      yield* bot.runFor(10);
      bot.switchOff();
    }
    // 5. Put anywhere.
    step(5);
    bot.place(p.random(0.3, 0.7), p.random(0.3, 0.7));
    bot.switchOn();
    yield* bot.runFor(6);
    bot.switchOff();
  },
});
