// No. 14, Untitled, by Vi Bao Truong
// A dark green marker robot that swings in a wide U. Each run starts a
// little lower, so the U's stack up.
drawingSketch("14", {
  settings: { color: "#2c5f5a", weight: 3.5, speed: 30, turn: -0.11, wobble: 0.25, jitter: 0.4 },
  *instructions(bot, step, p) {
    let y = 0.02;
    // 1. Let it run for 30 s.
    step(1);
    bot.place(0.27, y, Math.PI / 2);
    bot.switchOn();
    yield* bot.runFor(30);
    for (let i = 0; i < 4; i++) {
      // 2. Move it to a little lower point from the start point.
      // 4. Keep repeating the same action with a lower point from the previous one.
      step(i === 0 ? 2 : 4);
      y += 0.05;
      bot.place(0.27 + p.random(-0.02, 0.02), y, Math.PI / 2);
      // 3. Let it run for 20 s.
      if (i === 0) step(3);
      yield* bot.runFor(p.random(20, 30));
    }
    bot.switchOff();
  },
});
