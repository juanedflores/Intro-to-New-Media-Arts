// No. 12, Untitled, by Lucas Lee
// A robot on legs that swings around in huge circles, when it moves at all.
drawingSketch("12", {
  settings: { color: "#2f6e66", weight: 3.5, speed: 70, turn: -0.3, wobble: 0.3 },
  *instructions(bot, step, p) {
    // 1. Ensure legs are upright & turn on.
    step(1);
    bot.place(0.62, 0.08, Math.PI);
    bot.switchOn();
    for (let tries = 0; tries < 3; tries++) {
      // 2. Watch it spin. If it stops, whisper words of encouragement and
      //    try to adjust legs.
      step(2);
      yield* bot.runFor(p.random(14, 20));
      bot.speed = 0; // it stops
      yield* bot.runFor(3); // "you can do it"
      bot.speed = 70;
      bot.turn = -p.random(0.27, 0.34); // legs adjusted
    }
    // 3. If that doesn't work (no movement for ~60 s), turn off.
    //    (He'll go again tomorrow.)
    step(3);
    bot.speed = 0;
    yield* bot.runFor(60);
    bot.switchOff();
  },
});
