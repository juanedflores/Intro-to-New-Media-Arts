function load_syllabus() {
  var html = `
  <object data="PML_Syllabus_2025.pdf" class="pdf" width="100%" title="Embedded PDF Viewer">
    <p>
      Your browser does not support PDFs.
      <a href="PML_Syllabus_2025.pdf">Download the PDF</a>
    </p>
  </object>
  `;

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

function load_materials() {
  $.get(
    "menu/material_sources/material_sources.html",
    function (data) {
      html = $.parseHTML(data);
      $("#right-col").html(html[33].innerHTML);
    },
    "text",
  );
}

function load_resources() {
  $.get(
    "menu/resources/resources.html",
    function (data) {
      html = $.parseHTML(data);
      $("#right-col").html(html[33].innerHTML);
    },
    "text",
  );
  $("table").addClass("uk-table");
  $("table").addClass("uk-table-striped");
  $("table").addClass("uk-table-hover");
  $("table").addClass("uk-table-middle");
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
