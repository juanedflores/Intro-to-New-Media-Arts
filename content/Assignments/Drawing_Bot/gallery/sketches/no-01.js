// No. 01, Untitled, by Maurizio Brown
// A green marker robot with an antenna: bending the antenna changes how
// tightly it circles and which way it creeps.
drawingSketch("01", {
  settings: { color: "#22665a", weight: 3.5, speed: 70, turn: 1.2, wobble: 0.8, drift: [6, -2] },
  *instructions(bot, step, p) {
    // 1. Let robot run for 20 s.
    step(1);
    bot.place(0.33, 0.42);
    bot.switchOn();
    yield* bot.runFor(20);
    // 2. Move the antenna however you see fit.
    step(2);
    bot.turn = p.random([-1, 1]) * p.random(0.9, 1.6);
    bot.drift = [p.random(-10, 10), p.random(-6, 8)];
    // 3. Let the robot run for 40 s.
    step(3);
    yield* bot.runFor(40);
    // 4. Move the antenna again.
    step(4);
    bot.turn = p.random([-1, 1]) * p.random(0.6, 1.4);
    bot.drift = [p.random(4, 14), p.random(-8, 8)];
    // 5. Let the robot run until it stops moving or goes off the page.
    step(5);
    bot.drain = 1 / 45;
    yield* bot.runUntil(() => bot.stopped() || bot.offPage(), 120);
    bot.switchOff();
  },
});
