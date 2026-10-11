// No. 05, Untitled, by Julia Szafranski
// A box tilted at an angle: each marker slides across the sheet in a
// nearly straight line, one color after another.
const COLORS_05 = ["#2f8ea3", "#6b3b98", "#8a6aa8", "#2f8ea3", "#6b3b98", "#a3407e"];
drawingSketch("05", {
  settings: { weight: 3, speed: 16, wobble: 0.015, jitter: 0.25 },
  *instructions(bot, step, p) {
    // 1. Tilt box at an acute angle.
    step(1);
    const tilt = -0.025; // the lines run slightly uphill
    for (let i = 0; i < COLORS_05.length; i++) {
      // 2. Set timer for 45 seconds. Spend 15 seconds inserting first color,
      //    and let run (from top to bottom).
      // 3. For minute #2, replace color and let run for 45 more seconds.
      // 4. Repeat the above steps for colors #3, #4 and #5.
      step(i === 0 ? 2 : i === 1 ? 3 : 4);
      yield* bot.runFor(15); // inserting the marker
      bot.color = COLORS_05[i];
      bot.place(p.random(0.01, 0.08), 0.1 + i * 0.15, tilt);
      bot.turn = 0;
      bot.switchOn();
      yield* bot.runFor(43);
      bot.turn = p.random([-3, 3]); // a little hook as it comes to rest
      yield* bot.runFor(2);
      bot.switchOff();
    }
    // 5. Runtime complete.
    step(5);
  },
});
