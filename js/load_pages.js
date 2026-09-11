// One menu button per page toggles a different target depending on
// viewport width: the mobile offcanvas drawer below 915px (the same
// breakpoint used elsewhere for the .desktop/.mobile layout switch),
// or a small inline menu above it.
//
// The small-menu panel is toggled via the plain "hidden" attribute
// rather than UIkit.toggle(...).toggle(): that component's internal
// toggled-state tracking doesn't reliably match the element's actual
// DOM state when created fresh via the JS API instead of a
// declarative uk-toggle attribute, and gave inconsistent results
// across pages in testing. The offcanvas drawer is a genuinely
// animated component (slide-in, backdrop, escape handling), so it
// still goes through UIkit's own API rather than being reimplemented.
function toggleMenu(desktopTargetId) {
  if (window.innerWidth > 915) {
    document.getElementById(desktopTargetId).toggleAttribute("hidden");
  } else {
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

function renderWeekNav(currentWeek, totalWeeks) {
  var items = "";
  for (var i = 1; i <= totalWeeks; i++) {
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
