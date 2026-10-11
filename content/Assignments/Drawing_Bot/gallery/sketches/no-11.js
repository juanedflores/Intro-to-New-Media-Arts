// No. 11, Untitled, by Arisbeth Aceves
// A thin pink pen on a robot built at an angle: sometimes it circles,
// sometimes it doesn't, and it's reset each time it stops.
drawingSketch("11", {
  settings: { color: "#b06a7a", kind: "pen", weight: 1.3, alpha: 200, speed: 55, wobble: 0.5, jitter: 0.35 },
  *instructions(bot, step, p) {
    // 1. Robot constructed at 120° angle.
    step(1);
    const angle = p.radians(120);
    // 2. Take off pen cap.
    step(2);
    bot.place(0.45, 0.35);
    for (let i = 0; i < 5; i++) {
      // 3. Robot moves in circle or not.
      step(3);
      const circles = p.random() < 0.65;
      bot.turn = circles ? angle / 4.6 : p.random(-0.1, 0.1);
      bot.switchOn();
      // 4. Stops at circle or half circle.
      step(4);
      const start = bot.heading;
      const goal = p.random([p.PI, p.TWO_PI]);
      yield* bot.runUntil(() => Math.abs(bot.heading - start) >= goal, circles ? 60 : 6);
      bot.switchOff();
      // 5. Then resets circle.
      step(5);
      bot.moveNear(0.5, 0.45, 0.12);
    }
  },
});
