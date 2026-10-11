// No. 06, Untitled, by Itzel Garcia
// A slow-wheeled robot with a brown pen. It shakes more than it rolls, so
// it leaves dots, blots and short squiggles in a small area.
drawingSketch("06", {
  settings: { color: "#3b2216", weight: 3.5, speed: 4, wobble: 3, jitter: 0.9, lift: 2, land: 1.5 },
  *instructions(bot, step, p) {
    bot.place(0.5, 0.5);
    for (let i = 0; i < 3; i++) {
      // 1. Turn on switch, let run 30 sec.
      // 3. Repeat step 1. Let the repeat happen for 3 times.
      step(i === 0 ? 1 : 3);
      bot.switchOn();
      bot.blob(2.5);
      yield* bot.runFor(30);
      // 2. Turn off after 30 sec, then relocate.
      step(2);
      bot.switchOff();
      bot.blob(3);
      bot.moveNear(0.5, 0.5, 0.18);
    }
  },
});
