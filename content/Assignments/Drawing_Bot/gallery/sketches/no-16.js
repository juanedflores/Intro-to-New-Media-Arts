// No. 16, Be a Snail, by Mia Espinoza
// A snail-shell robot (a black & white film can) that wanders in, circles
// and wanders off.
drawingSketch("16", {
  settings: { color: "#2f6b62", weight: 2.4, speed: 0, wobble: 0.4 },
  *instructions(bot, step, p) {
    // 1. Locate start button.
    step(1);
    // 2. Insert pen.
    step(2);
    // 3. Put snail on paper.
    step(3);
    bot.place(0.42, 0, Math.PI / 2 + 0.1);
    // 4. Start snail.
    step(4);
    bot.switchOn();
    yield* bot.runFor(2); // sometimes the snail will not start...
    bot.speed = 45; // ...mess around with wires
    // 5. The snail should run and have a mind of its own! (for 30 seconds)
    step(5);
    yield* bot.runFor(6);
    bot.turn = -0.3;
    yield* bot.runFor(17);
    bot.turn = 0.05;
    yield* bot.runFor(7);
    bot.switchOff();
  },
});
