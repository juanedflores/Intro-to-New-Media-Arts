// No. 18, Untitled, by Selah Morales
// Each run starts in the middle and heads out in a new direction: a star.
drawingSketch("18", {
  settings: { color: "#2d6560", weight: 5, speed: 22, wobble: 0.8, jitter: 0.7 },
  *instructions(bot, step, p) {
    const middle = [0.45, 0.48];
    // 1. Turn on while in the middle of the paper.
    step(1);
    bot.place(...middle);
    bot.switchOn();
    let heading = bot.heading;
    while (bot.t < 70) {
      // 2. Once the person believes the line is long enough, place back into
      //    the middle facing a different direction.
      step(2);
      const enough = p.random(0.16, 0.3) * p.width;
      const [cx, cy] = [middle[0] * p.width, middle[1] * p.height];
      yield* bot.runUntil(() => p.dist(bot.x, bot.y, cx, cy) > enough, 20);
      heading += p.random(0.6, 1.3);
      bot.place(...middle, heading);
      // 3. Repeat steps until time is over.
      step(3);
    }
    bot.switchOff();
  },
});
