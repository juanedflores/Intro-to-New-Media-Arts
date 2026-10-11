// No. 04, Untitled, by Amy Lora
// A paintbrush robot. It paints until the brush runs dry, then gets more
// paint and starts again from the next mark on the paper.
const STARTS_04 = [
  { x: 0.2, y: 0.33, color: "#3f8f3a" },
  { x: 0.42, y: 0.66, color: "#2c7468" },
  { x: 0.62, y: 0.3, color: "#4a3b7c" },
];
drawingSketch("04", {
  settings: { kind: "paint", weight: 8, speed: 45, turn: 0.5, wobble: 1.4, inkUse: 1 / 380 },
  // the sheet came marked with three starting points
  paper(p) {
    STARTS_04.forEach((s, i) => {
      handwrite(p, `start ${i + 1}`, s.x, s.y + 0.05, { size: 17, color: s.color, underline: true });
    });
  },
  *instructions(bot, step, p) {
    for (let i = 0; i < 3; i++) {
      const s = STARTS_04[i];
      // 1, 5, 8. Add paint to brush.
      step([1, 5, 8][i]);
      bot.color = s.color;
      bot.ink = 1;
      // 2. Turn on drawing robot (held in the air).
      if (i === 0) {
        step(2);
        bot.on = true;
      }
      // 3, 6, 9. Place in start.
      step([3, 6, 9][i]);
      bot.place(s.x, s.y - 0.02);
      bot.blob(2);
      // 4, 7, 10. Let run until paint runs out.
      step([4, 7, 10][i]);
      yield* bot.runUntil(() => bot.stopped(), 60);
    }
    bot.switchOff();
  },
});
