// No. 02, Untitled, by Nataly Rios
// A toy car pushing a blue crayon in a wide, slow circle. The crayon gets
// blunt, so it's turned to a sharper point between runs.
drawingSketch("02", {
  settings: { color: "#3552ad", kind: "crayon", weight: 9, alpha: 170, speed: 14, turn: 0.095, wobble: 0.12, jitter: 0.5 },
  *instructions(bot, step, p) {
    // 1. Place car/robot on paper.
    step(1);
    bot.place(0.5, 0.2, 0);
    // 2. Turn switch on.
    step(2);
    bot.switchOn();
    // 3. Let run for 2 minutes, then turn off.
    step(3);
    yield* bot.runFor(120);
    bot.switchOff();
    // 4. Move location.
    step(4);
    bot.moveNear(0.55, 0.55, 0.06);
    // 5. Turn crayon for sharper point.
    step(5);
    bot.weight = 4;
    bot.alpha = 255;
    // 6. Let run for 1 minute, then turn off.
    step(6);
    bot.speed = 3; // limitation: slow
    bot.wobble = 1.5; // limitation: not controllable
    bot.switchOn();
    yield* bot.runFor(60);
    bot.switchOff();
    // 7. Move location.
    step(7);
    bot.moveNear(0.6, 0.45, 0.06);
    // 8. Turn for sharper point.
    step(8);
    bot.weight = 3.5;
    // 9. Let run for 2 minutes.
    step(9);
    bot.switchOn();
    yield* bot.runFor(120);
    bot.switchOff();
  },
});
