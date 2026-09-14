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

function load_syllabus() {
  var html = `
    <iframe src="https://drive.google.com/file/d/1jGIHRsBMFxKVJi8767oNcbbqxm6r9Vwp/preview" width="100%" height="1200px" allow="autoplay"></iframe>
  `;

  $("#right-col").html(html);
  setTimeout(() => {
    console.log("Delayed for 1 second.");
    $(".pdf").width("99%");
    $("#right-col").css({ overflow: "auto" });
  }, "1000");
}

function loadWeek(n) {
  var dir = "week_" + String(n).padStart(2, "0");
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
  },
  { start: 6, title: "E-Textiles / Wearables" },
  { start: 7, title: "Intro to Arduino" },
  { start: 8, title: "Midterm: Creative Interfaces" },
  { start: 11, title: "Final Assignment" },
];

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
        ? '<a href="' +
          section.href +
          '" onclick="window.location.href=\'' +
          section.href +
          "'; return false;\">" +
          section.title +
          "</a>"
        : section.title;
      items += '<li class="uk-nav-header">' + headerContent + "</li>";
    }
    var cls =
      i < currentWeek ? "" : i === currentWeek ? "uk-active" : "uk-inactive";
    items +=
      '<li class="' +
      cls +
      '"><a onclick="loadWeek(' +
      i +
      ')" href="#">Week ' +
      i +
      "</a></li>";
  }
  $(".week-nav-list").html(items);
}
