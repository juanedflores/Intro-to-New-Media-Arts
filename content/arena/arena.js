// Are.na Studios: three levels on one table, no scrolling.
//   1. every student, as a stack of their latest prints
//   2. one student, their channels as stacks
//   3. one channel, its blocks dealt out flat
// Content comes from data.json (see build_arena_data.py). The URL hash
// keeps the current level, e.g. #julia-szafranski/research-chkqchrrymg,
// so a specific student or channel can be linked to directly.

(function () {
  const table = document.getElementById("table");
  const crumbs = document.querySelector(".crumbs");
  const filterButtons = [...document.querySelectorAll(".filters button")];
  const viewer = document.getElementById("viewer");

  const KIND_LABEL = { research: "Research", portfolio: "Portfolio", drawing: "Drawing Machine", other: "Other" };
  const TYPE_TAG = { Link: "Link", Attachment: "File", Embed: "Video", Channel: "Channel" };

  let data = null;
  let kind = "all"; // channel filter
  let dealt = []; // blocks on the table at level 3, for viewer arrows
  let viewing = -1;

  // ---------- helpers ----------

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;

  // Small deterministic random so each stack keeps the same messiness.
  function seeded(str) {
    let h = 2166136261;
    for (const ch of str) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
    return () => {
      h = Math.imul(h ^ (h >>> 15), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      return ((h ^= h >>> 16) >>> 0) / 4294967296;
    };
  }

  // Columns/rows that make n cells as large as possible inside the table.
  // `aspect` is the cell's preferred width/height.
  function fitGrid(n, aspect) {
    const style = getComputedStyle(table);
    const gap = Math.max(6, Math.min(16, table.clientWidth / 90));
    const w = table.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    const h = table.clientHeight - gap - parseFloat(style.paddingBottom);
    let best = { cols: 1, rows: n, size: 0 };
    for (let cols = 1; cols <= n; cols++) {
      const rows = Math.ceil(n / cols);
      const cw = (w - gap * (cols - 1)) / cols;
      const ch = (h - gap * (rows - 1)) / rows;
      const size = Math.min(cw, ch * aspect); // usable width of one cell
      if (size > best.size) best = { cols, rows, size };
    }
    table.style.setProperty("--cols", best.cols);
    table.style.setProperty("--rows", best.rows);
    table.style.setProperty("--gap", `${gap}px`);
  }

  const channelsFor = (student) =>
    student.channels.filter((c) => kind === "all" || c.kind === kind);

  const visual = (b) => b.thumb || b.type === "Text" || b.type === "Channel";

  // Up to `max` blocks for a stack's prints, alternating between channels
  // so a student's stack shows a bit of everything. Photos come first;
  // text notes and nested channels only fill in when there aren't enough.
  function pickPrints(channels, max) {
    const roundRobin = (test) => {
      const queues = channels.map((c) => c.blocks.filter(test));
      const out = [];
      while (queues.some((q) => q.length)) for (const q of queues) if (q.length) out.push(q.shift());
      return out;
    };
    return [...roundRobin((b) => b.thumb), ...roundRobin((b) => visual(b) && !b.thumb)].slice(0, max);
  }

  function printHTML(b, extra = "") {
    if (!b) return `<div class="print empty" ${extra}>Nothing posted yet</div>`;
    if (b.type === "Text") {
      return `<div class="print note" ${extra}>${esc((b.text || b.title).slice(0, 220))}</div>`;
    }
    if (b.type === "Channel") {
      return `<div class="print folder" ${extra}>${esc(b.title)}<small>${plural(b.count, "block")}</small></div>`;
    }
    const tag = TYPE_TAG[b.type] ? `<span class="kind">${TYPE_TAG[b.type]}</span>` : "";
    return `<div class="print" ${extra}><img src="${esc(b.thumb)}" alt="${esc(b.title)}" loading="lazy">${tag}</div>`;
  }

  // A pile of prints with a label. Offsets are seeded by `seed`.
  function stackHTML({ seed, prints, title, sub, i, attrs }) {
    const rand = seeded(seed);
    const pile = (prints.length ? prints : [null])
      .slice()
      .reverse() // last in the DOM sits on top
      .map((b, k, arr) => {
        const top = k === arr.length - 1;
        const r = top ? (rand() - 0.5) * 6 : (rand() - 0.5) * 18;
        const x = top ? 0 : (rand() - 0.5) * 8;
        const y = top ? 0 : (rand() - 0.5) * 6;
        return printHTML(b, `style="--r:${r.toFixed(1)}deg;--x:${x.toFixed(1)}%;--y:${y.toFixed(1)}%"`);
      })
      .join("");
    return `<button class="stack" style="--i:${i}" ${attrs}>
        <div class="pile">${pile}</div>
        <span class="label"><strong>${esc(title)}</strong><small>${esc(sub)}</small></span>
      </button>`;
  }

  // ---------- levels ----------

  function renderStudents() {
    table.classList.remove("dealt");
    fitGrid(data.students.length, 0.9);
    table.innerHTML = data.students
      .map((s, i) => {
        const chans = channelsFor(s);
        const blocks = chans.reduce((n, c) => n + c.blocks.length, 0);
        const sub = chans.length ? `${plural(chans.length, "channel")} · ${plural(blocks, "block")}` : "no channel yet";
        return stackHTML({
          seed: s.slug,
          prints: pickPrints(chans, 4),
          title: s.name,
          sub,
          i,
          attrs: `data-student="${esc(s.slug)}" aria-label="${esc(s.name)}: ${esc(sub)}"`,
        });
      })
      .join("");
    setCrumbs([]);
  }

  function renderStudent(s) {
    table.classList.remove("dealt");
    const chans = channelsFor(s);
    if (!chans.length) {
      fitGrid(1, 1);
      table.innerHTML = `<p class="message">${esc(s.name)} has no ${esc(KIND_LABEL[kind] || "")} channel yet.
        <br><a href="${esc(s.url)}" target="_blank" rel="noopener" style="color:var(--tape)">See their Are.na profile ↗</a></p>`;
    } else {
      fitGrid(chans.length, 0.95);
      table.innerHTML = chans
        .map((c, i) =>
          stackHTML({
            seed: c.slug,
            prints: pickPrints([c], 5),
            title: c.title,
            sub: `${KIND_LABEL[c.kind]} · ${plural(c.count, "block")}`,
            i,
            attrs: `data-channel="${esc(c.slug)}" aria-label="${esc(c.title)}, ${plural(c.count, "block")}"`,
          })
        )
        .join("");
    }
    setCrumbs([{ label: s.name, url: s.url }]);
  }

  function renderChannel(s, c) {
    table.classList.add("dealt");
    dealt = c.blocks;
    const rand = seeded(c.slug + "deal");
    if (!dealt.length) {
      fitGrid(1, 1);
      table.innerHTML = `<p class="message">This channel is empty for now.
        <br><a href="${esc(c.url)}" target="_blank" rel="noopener" style="color:var(--tape)">Open it on Are.na ↗</a></p>`;
    } else {
      fitGrid(dealt.length, 1.15);
      table.innerHTML = dealt
        .map((b, i) => {
          const r = ((rand() - 0.5) * 5).toFixed(1);
          const label = `${esc(b.title || TYPE_TAG[b.type] || b.type)}`;
          const attrs = `style="--i:${i};--r:${r}deg" data-block="${i}" role="button" tabindex="0" aria-label="${label}"`;
          return printHTML(b, attrs);
        })
        .join("");
    }
    setCrumbs([
      { label: s.name, hash: s.slug, url: s.url },
      { label: c.title, url: c.url },
    ]);
  }

  function setCrumbs(trail) {
    const parts = [
      trail.length
        ? `<button data-go="">Are.na Studios</button>`
        : `<span class="here">Are.na Studios · ART 150 Fall 2026</span>`,
    ];
    trail.forEach((t, k) => {
      parts.push(`<span class="sep">/</span>`);
      parts.push(
        k === trail.length - 1
          ? `<span class="here">${esc(t.label)}</span>`
          : `<button data-go="${esc(t.hash)}">${esc(t.label)}</button>`
      );
    });
    crumbs.innerHTML = parts.join("");
    const here = trail[trail.length - 1];
    const link = document.querySelector(".group-link");
    link.href = here ? here.url : data.group;
    link.textContent = here ? "Open on Are.na ↗" : "Group on Are.na ↗";
  }

  // ---------- routing ----------

  function current() {
    const [studentSlug, channelSlug] = decodeURIComponent(location.hash.slice(1)).split("/");
    const s = data.students.find((x) => x.slug === studentSlug);
    const c = s && s.channels.find((x) => x.slug === channelSlug);
    return { s, c };
  }

  function render() {
    const { s, c } = current();
    if (c) renderChannel(s, c);
    else if (s) renderStudent(s);
    else renderStudents();
  }

  const go = (hash) => {
    if (location.hash.slice(1) === hash) render();
    else location.hash = hash;
  };

  table.addEventListener("click", (e) => {
    const el = e.target.closest("[data-student],[data-channel],[data-block]");
    if (!el) return;
    if (el.dataset.student) go(el.dataset.student);
    else if (el.dataset.channel) go(`${current().s.slug}/${el.dataset.channel}`);
    else openViewer(Number(el.dataset.block));
  });
  table.addEventListener("keydown", (e) => {
    const el = e.target.closest("[data-block]");
    if (el && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      openViewer(Number(el.dataset.block));
    }
  });
  crumbs.addEventListener("click", (e) => {
    const b = e.target.closest("[data-go]");
    if (b) go(b.dataset.go);
  });
  filterButtons.forEach((b) =>
    b.addEventListener("click", () => {
      kind = b.dataset.kind;
      filterButtons.forEach((x) => x.setAttribute("aria-pressed", x === b));
      // a channel that no longer matches the filter: step back to its student
      const { s, c } = current();
      if (c && kind !== "all" && c.kind !== kind) go(s.slug);
      else render();
    })
  );
  window.addEventListener("hashchange", render);

  // ---------- viewer ----------

  function openViewer(i) {
    const b = dealt[i];
    if (!b) return;
    if (b.type === "Channel") {
      // a channel by a classmate: open it here; anyone else's: on Are.na
      const owner = data.students.find((s) => s.channels.some((c) => c.slug === b.slug));
      if (owner) go(`${owner.slug}/${b.slug}`);
      else window.open(b.url, "_blank", "noopener");
      return;
    }
    viewing = i;
    const media = viewer.querySelector(".viewer-media");
    media.innerHTML = b.large
      ? `<img src="${esc(b.large)}" alt="${esc(b.title)}">`
      : `<div class="note-full">${esc(b.text || b.title)}</div>`;
    viewer.querySelector(".viewer-meta").textContent =
      `${TYPE_TAG[b.type] || b.type} · ${i + 1} of ${dealt.length}`;
    viewer.querySelector("#viewer-title").textContent = b.title || "Untitled";
    viewer.querySelector(".viewer-desc").textContent = b.description || "";
    const link = viewer.querySelector(".viewer-link");
    link.href = b.source || b.url;
    link.textContent = b.source ? "Open link ↗" : "Open on Are.na ↗";
    viewer.hidden = false;
    viewer.querySelector(".viewer-close").focus();
  }

  function closeViewer() {
    viewer.hidden = true;
    const el = table.querySelector(`[data-block="${viewing}"]`);
    if (el) el.focus();
    viewing = -1;
  }

  viewer.addEventListener("click", (e) => {
    if (e.target === viewer || e.target.closest(".viewer-close")) closeViewer();
  });

  document.addEventListener("keydown", (e) => {
    if (!viewer.hidden) {
      if (e.key === "Escape") closeViewer();
      if (e.key === "ArrowRight") openViewer((viewing + 1) % dealt.length);
      if (e.key === "ArrowLeft") openViewer((viewing - 1 + dealt.length) % dealt.length);
      return;
    }
    if (e.key === "Escape" && location.hash) {
      const { s, c } = current();
      go(c ? s.slug : "");
    }
  });

  // ---------- size the table under the navbar, then load ----------

  function measure() {
    const nav = document.querySelector("nav.uk-navbar-container");
    const h = nav ? nav.getBoundingClientRect().height : 80;
    document.documentElement.style.setProperty("--nav-h", `${h}px`);
  }
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      measure();
      if (data) render();
    }, 120);
  });

  measure();
  // the site's navbar settles its height after UIkit loads; follow it
  const nav = document.querySelector("nav.uk-navbar-container");
  if (nav && "ResizeObserver" in window) {
    let lastH = 0;
    new ResizeObserver(() => {
      const h = nav.getBoundingClientRect().height;
      if (Math.abs(h - lastH) < 1) return;
      lastH = h;
      measure();
      if (data) render();
    }).observe(nav);
  }
  fetch("arena/data.json")
    .then((r) => r.json())
    .then((d) => {
      data = d;
      measure();
      render();
    })
    .catch(() => {
      table.innerHTML = `<p class="message">Couldn't load the Are.na snapshot (arena/data.json).</p>`;
    });
})();
