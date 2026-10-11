// No. 10, Untitled, by Kirtan Patel
// A dark green marker robot that loops in place until it gets a push.
drawingSketch("10", {
  settings: { color: "#24524f", weight: 2.5, speed: 35, turn: 0.9, wobble: 0.6 },
  *instructions(bot, step, p) {
    // 1. Place the bot on paper.
    step(1);
    bot.place(0.58, 0.22);
    // 2. Start the motor and let it draw.
    step(2);
    bot.switchOn();
    yield* bot.runFor(14);
    // → maybe a push sometimes
    bot.push(-0.2, 0.3);
    bot.turn = -0.25;
    yield* bot.runFor(22);
    bot.push(-0.08, 0.06);
    bot.turn = 0.6;
    yield* bot.runFor(5);
    bot.switchOff();
  },
});
