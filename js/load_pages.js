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
  var n = weekFromHash();
  // no #week-N (back to the plain address) means this week
  loadWeek(n && n <= CURRENT_WEEK ? n : CURRENT_WEEK, true);
});
