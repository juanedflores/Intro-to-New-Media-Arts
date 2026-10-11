// No. 03, Untitled, by Panthi Patel
// A blue pen that skips and scratches: the robot is slow and very
// sensitive, so it scribbles short strokes and dots instead of shapes.
drawingSketch("03", {
  settings: { color: "#2b4fae", weight: 3, speed: 14, turn: 0.12, wobble: 0.5, jitter: 0.2, lift: 1.1, land: 1 },
  *instructions(bot, step, p) {
    // 1. Turn the switch on.
    step(1);
    bot.place(0.3, 0.45);
    bot.switchOn();
    // 2. Keep it running for 1 min.
    step(2);
    yield* bot.runFor(60);
    // 3. After a min, switch its position to another point and keep it running for 1 min.
    step(3);
    bot.turn = -bot.turn;
    bot.moveNear(0.55, 0.3);
    yield* bot.runFor(60);
    // 4. Switch its position again to another point and keep it running for about 2 min.
    step(4);
    bot.moveNear(0.75, 0.6);
    yield* bot.runFor(120);
    // 5. Yet again, switch its position one last time to a different point and keep it running for about 1 min.
    step(5);
    bot.moveNear(0.45, 0.65);
    yield* bot.runFor(60);
    bot.switchOff();
  },
});
