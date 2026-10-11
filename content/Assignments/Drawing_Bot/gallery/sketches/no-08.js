// No. 08, Untitled, by Hillary Samaniego
// A purple marker robot that spins in tight, even circles while slowly
// creeping across the page, like a spirograph.
drawingSketch("08", {
  settings: { color: "#5a3a8c", weight: 2.5, speed: 75, turn: 1.15, wobble: 0.2, drift: [5, -3.5] },
  *instructions(bot, step, p) {
    // 1. Take the lid off the marker and place it in the center of a sheet of paper.
    step(1);
    bot.place(0.4, 0.62);
    // 2. Turn it on & set the timer for 20 seconds to change directions
    //    (or until it stops moving). (optional)
    step(2);
    bot.switchOn();
    yield* bot.runFor(20);
    bot.turn = -bot.turn;
    // 3. Let it navigate its way/pattern through the paper; only move it if necessary.
    step(3);
    yield* bot.runFor(40);
    if (bot.offPage(-60)) bot.moveNear(0.5, 0.5, 0.05);
    // 4. If it falls apart then that's its final point. If it keeps going,
    //    we can create a pattern for 5 minutes.
    step(4);
    bot.drain = 1 / 60;
    yield* bot.runUntil(() => bot.stopped(), 300);
    bot.switchOff();
  },
});
