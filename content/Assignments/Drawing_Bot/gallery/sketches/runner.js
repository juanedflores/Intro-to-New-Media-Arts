// Plays the drawing-machine sketches (sketches/no-01.js ... no-19.js).
//
// Each sketch file calls drawingSketch("05", { ... }) with:
//   color, weight, ...   the robot's settings (see bot.js)
//   paper(p)             optional: anything pre-marked on the sheet
//   *instructions(bot, step, p)
//                        the instruction card as code; call step(n) when
//                        instruction n starts, so the page can highlight it
//
// mountSketch() draws one on a canvas, sped up: SPEEDUP seconds of robot
// time pass every second, so a five-minute run takes about ten seconds.

const SKETCHES = {};
const SPEEDUP = 30;

function drawingSketch(no, def) {
  SKETCHES[no] = def;
}

// host: element to put the canvas in; aspect: height / width of the page.
// Returns { replay(), pause(), resume() }.
function mountSketch(no, host, { aspect = 0.72, width = 800, instant = false, onStep = () => {}, onDone = () => {} } = {}) {
  const def = SKETCHES[no];
  let p5ref;
  let running;
  let finished = false;
  let paused = false;
  let run = 0; // the first run is the same every time; replays vary

  new p5((p) => {
    p5ref = p;
    p.setup = () => {
      p.pixelDensity(Math.min(2, window.devicePixelRatio || 1));
      p.createCanvas(width, Math.round(width * aspect)).parent(host);
      start();
    };
    p.draw = () => {
      if (finished) return;
      const steps = Math.round((SPEEDUP * (1 / 60)) / DT);
      for (let i = 0; i < steps; i++) {
        if (running.next().done) {
          finished = true;
          onStep(0);
          onDone();
          p.noLoop();
          return;
        }
      }
    };
  });

  function start() {
    const p = p5ref;
    const seed = 1000 + Number(no) * 17 + run * 7919;
    p.randomSeed(seed);
    p.noiseSeed(seed);
    drawPaper(p);
    if (def.paper) def.paper(p);
    const bot = new DrawingBot(p, def.settings || {});
    running = def.instructions(bot, onStep, p);
    finished = false;
    if (instant) {
      // draw the whole run at once (no animation)
      while (!running.next().done);
      finished = true;
      p.noLoop();
      onDone();
      return;
    }
    if (!paused) p.loop();
  }

  return {
    replay() {
      run++;
      paused = false;
      start();
    },
    pause() {
      paused = true;
      p5ref.noLoop();
    },
    resume() {
      paused = false;
      if (!finished) p5ref.loop();
    },
  };
}
