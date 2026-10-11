// No. 19, Untitled, by Abdullah Abid
// A thin black pen on a stick, glued in. It sweeps a big arc until the
// batteries give out; then they're changed and the pen is swapped.
drawingSketch("19", {
  settings: { color: "#222222", kind: "pen", weight: 1.3, speed: 26, turn: 0.12, wobble: 0.35, jitter: 0.35 },
  *instructions(bot, step, p) {
    // 1. Have or insert a writing utensil in the proper compartment.
    step(1);
    // 2. Remove cap of said writing utensil (if any).
    step(2);
    // 3. Place a blank piece of paper on a flat surface.
    step(3);
    // 4. Turn on the device.
    step(4);
    bot.drain = 1 / 32;
    // 5. Place device anywhere on paper (preferably in the middle).
    step(5);
    bot.place(0.24, 0.9, -Math.PI / 2 - 0.1);
    bot.switchOn();
    yield* bot.runUntil(() => bot.stopped() || bot.offPage(), 60);
    // 6. If needed, change batteries by removing cover.
    step(6);
    bot.newBatteries();
    bot.drain = 1 / 10;
    // 7. If you want, remove glue from bottom of utensil.
    //    7.1 Take out utensil.
    //    7.2 Replace current utensil with an appropriate circumference size.
    step(7);
    bot.weight = 1;
    // 8. Glue back the utensil on stick.
    step(8);
    bot.lift = 1.5;
    bot.wobble = 2;
    // 9. Repeat.
    step(9);
    for (let i = 0; i < 4; i++) {
      bot.moveNear(p.random(0.3, 0.8), p.random(0.1, 0.9), 0);
      bot.newBatteries();
      yield* bot.runUntil(() => bot.stopped(), 15);
    }
    bot.switchOff();
  },
});
