// No. 15, Koinobori, by Dang Nguyen
// The card is notes on how the machine is built. The distance between
// motor and pen decides the path: close = a circle, far = a straight line,
// in between = a curve.
drawingSketch("15", {
  settings: { color: "#2f5e5a", weight: 2.2, speed: 40 },
  *instructions(bot, step, p) {
    // 1. To prevent an awkward out-of-battery situation, I have a
    //    convenient battery-change mechanic.
    step(1);
    bot.newBatteries();
    // 2. Place any type of pen here. Both pen and marker fit, as it's elastic.
    step(2);
    bot.weight = 2.2;
    // 3. The length between engine and marker can change for different
    //    movement: closer will be a circle, further will be a straight line,
    //    middle length will be a curve. But to stabilize the pen, I glued it already.
    step(3);
    const penLength = 0.5; // 0 = close, 1 = far
    bot.turn = 0.55 * (1 - penLength);
    // 4. This piece will prevent it from falling.
    step(4);
    bot.wobble = 0.15;
    // 5. In use, it can move quite freely based on this length.
    step(5);
    bot.place(0.36, 0.08, 0);
    bot.switchOn();
    yield* bot.runFor(22);
    bot.switchOff();
    bot.place(0.7, 0.5, -0.6);
    bot.turn = 0;
    bot.wobble = 1.6;
    bot.lift = 0.8;
    bot.switchOn();
    yield* bot.runUntil(() => bot.offPage(), 20);
    bot.switchOff();
  },
});
