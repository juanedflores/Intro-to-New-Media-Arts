// No. 07, Untitled, by Jing Chen
// A green marker robot that walks in loose circles.
drawingSketch("07", {
  settings: { color: "#245f55", weight: 3, speed: 85, turn: 0.95, wobble: 0.6, drift: [5, 1] },
  *instructions(bot, step, p) {
    // 1. Place machine on the paper.
    step(1);
    bot.place(0.48, 0.4);
    bot.switchOn();
    // 2. Let it run for 20 seconds.
    step(2);
    yield* bot.runFor(20);
    // 3. Move it to one corner of paper.
    step(3);
    bot.place(0.36, 0.5);
    bot.drift = [3, -1];
    // 4. Let it run for 30 seconds.
    step(4);
    yield* bot.runFor(30);
    // 5. Keep moving the machine.
    step(5);
    for (let i = 0; i < 5; i++) {
      bot.place(p.random(0.15, 0.85), p.random(0.65, 0.92));
      yield* bot.runFor(p.random(0.8, 2.2));
    }
    // 6. Observe the drawing.
    step(6);
    bot.switchOff();
  },
});
