// The menu button only does something below the 1050px breakpoint (the
// same one used elsewhere for the .desktop/.mobile layout switch): it
// opens/closes the mobile offcanvas drawer. On desktop the sidebar is
// already always visible, so the button intentionally does nothing.
function toggleMenu(event) {
  if (window.innerWidth <= 1050) {
    event.preventDefault();
    UIkit.offcanvas("#offcanvas-usage").toggle();
  }
}

// The syllabus page (content/syllabus/syllabus.html, built from
// syllabus.md) shown in the main column, at index.html#syllabus.
function load_syllabus(fromHistory) {
  if (!fromHistory && location.hash !== "#syllabus") {
    history.pushState(null, "", "#syllabus");
  }
  // no week is selected while the syllabus is open
  $(".week-nav-list > li.uk-active").removeClass("uk-active");
  $.get(
    "content/syllabus/syllabus.html",
    function (data) {
      var doc = new DOMParser().parseFromString(data, "text/html");
      var article = doc.getElementById("ArticleBodyMain");
      $("#right-col").html(article ? article.innerHTML : "");
      window.scrollTo(0, 0);
      // again here: on a fresh page load UIkit's switcher starts after the
      // line above and marks the first week active
      $(".week-nav-list > li.uk-active").removeClass("uk-active");
      markSyllabusWeeks();
      $(".sy-jump button").on("click", function () {
        var target = document.getElementById(this.dataset.jump);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      });
    },
    "text",
  );
}

// In the semester plan: highlight this week, link past weeks to their pages,
// and leave upcoming weeks as plain text (their pages aren't open yet).
function markSyllabusWeeks() {
  if (typeof CURRENT_WEEK === "undefined") return;
  $(".sy-week").each(function () {
    var n = Number(this.dataset.week);
    if (n === CURRENT_WEEK) $(this).addClass("is-current");
    else if (n < CURRENT_WEEK) $(this).addClass("is-past");
    else {
      var link = $(this).find("h3 > a");
      link.replaceWith('<span class="sy-wk">' + link.text() + "</span>");
    }
  });
}

// ---------- Topics index (index.html#topics) ----------
// Every topic card from the weeks that have opened, gathered on one page,
// grouped by unit, with a search box and type filters. Built from the week
// pages themselves, so there's nothing extra to maintain.
var TOPIC_TYPES = [
  { key: "workshop", label: "Workshops" },
  { key: "lesson", label: "Lessons" },
  { key: "external", label: "Readings & Links" },
  { key: "video", label: "Videos" },
  { key: "assignment", label: "Assignments" },
];

function unitForWeek(n) {
  var unit = null;
  WEEK_SECTIONS.forEach(function (s) {
    if (s.start <= n) unit = s.title;
  });
  return unit || "Overview";
}

function load_topics(fromHistory) {
  if (!fromHistory && location.hash !== "#topics") {
    history.pushState(null, "", "#topics");
  }
  $(".week-nav-list > li.uk-active").removeClass("uk-active");
  $("#right-col").html(
    '<section id="topics" class="level1"><h1>Topics</h1><p class="tp-loading">Gathering topics…</p></section>',
  );
  window.scrollTo(0, 0);

  var weeks = [];
  for (var i = 1; i <= CURRENT_WEEK; i++) weeks.push(i);
  var requests = weeks.map(function (n) {
    var dir = "week_" + String(n).padStart(2, "0");
    return fetch("content/weeks/" + dir + "/week" + n + ".html")
      .then(function (r) {
        return r.ok ? r.text() : "";
      })
      .then(function (html) {
        return { week: n, html: html };
      })
      .catch(function () {
        return { week: n, html: "" };
      });
  });

  Promise.all(requests).then(function (pages) {
    // one entry per link; a topic repeated in several weeks lists them all
    var byHref = {};
    var order = [];
    pages.forEach(function (page) {
      if (!page.html) return;
      var doc = new DOMParser().parseFromString(page.html, "text/html");
      doc.querySelectorAll("a.topic-card").forEach(function (card) {
        var href = card.getAttribute("href");
        if (!byHref[href]) {
          byHref[href] = {
            card: card,
            type: card.dataset.type || "lesson",
            title: (card.querySelector(".cardtitle") || card).textContent.trim(),
            tags: card.querySelector(".topic-tags")
              ? card.querySelector(".topic-tags").textContent.trim()
              : "",
            unit: unitForWeek(page.week),
            weeks: [],
          };
          order.push(href);
        }
        if (byHref[href].weeks.indexOf(page.week) === -1)
          byHref[href].weeks.push(page.week);
      });
    });
    // after the first load, keep the visitor where they were on this page
    if (location.hash !== "#topics") return;
    renderTopics(order.map(function (h) {
      return byHref[h];
    }));
  });
}

function renderTopics(topics) {
  var units = [];
  topics.forEach(function (t) {
    if (units.indexOf(t.unit) === -1) units.push(t.unit);
  });
  var present = TOPIC_TYPES.filter(function (ty) {
    return topics.some(function (t) {
      return t.type === ty.key;
    });
  });

  var html =
    '<section id="topics" class="level1"><h1>Topics</h1>' +
    '<div class="tp-bar">' +
    '<input type="search" class="tp-search" placeholder="Search topics, e.g. breadboard, Arduino, Velostat" aria-label="Search topics">' +
    '<div class="tp-filters" role="group" aria-label="Filter by type">' +
    '<button data-type="all" aria-pressed="true">All</button>' +
    present
      .map(function (ty) {
        return '<button data-type="' + ty.key + '" aria-pressed="false">' + ty.label + "</button>";
      })
      .join("") +
    "</div></div>" +
    '<p class="tp-count" aria-live="polite"></p>';

  units.forEach(function (unit) {
    html += '<section class="tp-unit"><h2>' + unit + '</h2><div class="topics-grid">';
    topics
      .filter(function (t) {
        return t.unit === unit;
      })
      .forEach(function (t) {
        var weeks = t.weeks
          .map(function (n) {
            return '<a href="#week-' + n + '" data-week-link="' + n + '">Week ' + n + "</a>";
          })
          .join(" ");
        // the link's address often names the topic too (velostat_workshop.html)
        var path = (t.card.getAttribute("href") || "").replace(/[\/_.\-#]+/g, " ");
        var search = (t.title + " " + t.tags + " " + path).toLowerCase();
        html +=
          '<div class="tp-item" data-type="' + t.type + '" data-search="' +
          search.replace(/"/g, "&quot;") + '">' +
          t.card.outerHTML +
          '<p class="tp-weeks">' + weeks + "</p></div>";
      });
    html += "</div></section>";
  });
  html += '<p class="tp-empty" hidden>No topics match. Try another word, or clear the filters.</p></section>';
  $("#right-col").html(html);

  var root = document.getElementById("topics");
  var search = root.querySelector(".tp-search");
  var type = "all";
  function apply() {
    var q = search.value.trim().toLowerCase();
    var shown = 0;
    root.querySelectorAll(".tp-item").forEach(function (item) {
      var ok = (type === "all" || item.dataset.type === type) && (!q || item.dataset.search.indexOf(q) !== -1);
      item.hidden = !ok;
      if (ok) shown++;
    });
    root.querySelectorAll(".tp-unit").forEach(function (unit) {
      unit.hidden = !unit.querySelector(".tp-item:not([hidden])");
    });
    root.querySelector(".tp-empty").hidden = shown > 0;
    root.querySelector(".tp-count").textContent =
      shown + (shown === 1 ? " topic" : " topics") + " from Weeks 1–" + CURRENT_WEEK;
  }
  search.addEventListener("input", apply);
  root.querySelectorAll(".tp-filters button").forEach(function (b) {
    b.addEventListener("click", function () {
      type = b.dataset.type;
      root.querySelectorAll(".tp-filters button").forEach(function (x) {
        x.setAttribute("aria-pressed", x === b);
      });
      apply();
    });
  });
  root.querySelectorAll("[data-week-link]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      loadWeek(Number(a.dataset.weekLink));
    });
  });
  apply();
}

// Each week has its own address (index.html#week-6), so a week can be
// linked to and the browser's back/forward buttons move between weeks.
// `fromHistory` is true when the address already changed (back/forward or a
// pasted link), so we don't push another history entry.
function weekFromHash() {
  var m = location.hash.match(/^#week-(\d+)$/);
  return m ? Number(m[1]) : null;
}

function loadWeek(n, fromHistory) {
  if (!fromHistory && weekFromHash() !== n) {
    history.pushState(null, "", "#week-" + n);
  }
  // highlight the week in both copies of the nav (sidebar and phone menu)
  $(".week-nav-list > li:not(.uk-nav-header)").each(function () {
    var a = $(this).children("a");
    if (a.data("week") === n) $(this).addClass("uk-active");
    else $(this).removeClass("uk-active");
  });
  var dir = "week_" + String(n).padStart(2, "0");
  window.scrollTo(0, 0);
  $.get(
    "content/weeks/" + dir + "/week" + n + ".html",
    function (data) {
      var doc = new DOMParser().parseFromString(data, "text/html");
      var article =
        doc.getElementById("ArticleBodyMain") ||
        doc.getElementById("ArticleBody");
      $("#right-col").html(article ? article.innerHTML : "");
    },
    "text",
  );
}

// Which week starts each section, for the headers in the week nav. Weeks
// before the first entry get no header.
const WEEK_SECTIONS = [
  { start: 1, title: "Overview and Special Topics" },
  { start: 3, title: "Intro to Circuits" },
  {
    start: 4,
    title: "Drawing Robot",
    href: "content/Assignments/Drawing_Bot/drawing_bot.html",
    extra: {
      title: "Gallery",
      href: "content/Assignments/Drawing_Bot/gallery/index.html",
    },
  },
  { start: 6, title: "E-Textiles / Wearables" },
  { start: 7, title: "Intro to Arduino" },
  { start: 8, title: "Midterm: Creative Interfaces" },
  { start: 11, title: "Final Assignment" },
];

function navLink(href, title) {
  return (
    '<a href="' +
    href +
    '" onclick="window.location.href=\'' +
    href +
    "'; return false;\">" +
    title +
    "</a>"
  );
}

function renderWeekNav(currentWeek, totalWeeks) {
  var items = "";
  for (var i = 1; i <= totalWeeks; i++) {
    var section = WEEK_SECTIONS.find(function (s) {
      return s.start === i;
    });
    if (section) {
      // A real href alone isn't enough here: uk-switcher (below) intercepts
      // clicks on any <a> inside this list and prevents the default
      // navigation, same reason the week links use onclick+loadWeek()
      // instead of a real href. Force the navigation ourselves.
      var headerContent = section.href
        ? navLink(section.href, section.title)
        : section.title;
      // Optional second link shown beside the header (e.g. a gallery).
      if (section.extra) {
        headerContent +=
          ' <span class="nav-header-sep">/</span> ' +
          navLink(section.extra.href, section.extra.title);
      }
      items += '<li class="uk-nav-header">' + headerContent + "</li>";
    }
    var cls =
      i < currentWeek ? "" : i === currentWeek ? "uk-active" : "uk-inactive";
    items +=
      '<li class="' +
      cls +
      '"><a onclick="loadWeek(' +
      i +
      ')" data-week="' +
      i +
      '" href="#week-' +
      i +
      '">Week ' +
      i +
      "</a></li>";
  }
  $(".week-nav-list").html(items);
}

// back/forward between weeks (and the syllabus)
window.addEventListener("popstate", function () {
  if (typeof CURRENT_WEEK === "undefined") return; // not the week page
  if (location.hash === "#syllabus") return load_syllabus(true);
  if (location.hash === "#topics") return load_topics(true);
  var n = weekFromHash();
  // no #week-N (back to the plain address) means this week
  loadWeek(n && n <= CURRENT_WEEK ? n : CURRENT_WEEK, true);
});
