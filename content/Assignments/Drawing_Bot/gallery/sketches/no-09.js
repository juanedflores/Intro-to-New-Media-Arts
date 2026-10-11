// No. 09, Untitled, by Akxell Mendoza
// The pen barely touches the paper: the robot leaves a few small marks
// wherever it's put down.
drawingSketch("09", {
  settings: { color: "#2d6b56", weight: 3, speed: 3, wobble: 3, jitter: 0.5, lift: 3, land: 0.5 },
  *instructions(bot, step, p) {
    // 1. Take cap off.
    step(1);
    bot.place(0.55, 0.55);
    // 2. Turn on and let run for 30 sec.
    step(2);
    bot.switchOn();
    yield* bot.runFor(30);
    // 3. Grab and move robot to the top left and let run for 30 sec.
    step(3);
    bot.moveNear(0.15, 0.25, 0.04);
    yield* bot.runFor(30);
    // 4. Move to bottom right and let run for 30 sec.
    step(4);
    bot.moveNear(0.8, 0.8, 0.04);
    yield* bot.runFor(30);
    // 5. Keep running for 30 sec.
    step(5);
    yield* bot.runFor(30);
    // 6. Turn off robot.
    step(6);
    bot.switchOff();
  },
});
