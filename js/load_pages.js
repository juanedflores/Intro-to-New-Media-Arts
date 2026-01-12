function load_syllabus() {
  var html = `
  <object data="PML_Syllabus_2025.pdf" class="pdf" width="100%" title="Embedded PDF Viewer">
    <p>
      Your browser does not support PDFs.
      <a href="PML_Syllabus_2025.pdf">Download the PDF</a>
    </p>
  </object>
  `;

  // <iframe src="https://drive.google.com/file/d/1u4V9_REBTXOC-I3yt9WG8pIREeVYiro6/preview" width="100%" height="1000px" allow="autoplay"></iframe>
  var html = `
    <iframe src="https://drive.google.com/file/d/1MyRKBB3byx7iTgvKjPeehdOYpvGhXSbV/preview" width="100%" height="1200px" allow="autoplay"></iframe>
  `;

  //var html = `
  //  <iframe class="pdf"
  //    src="PML_Syllabus_2025.pdf"
  //    width="100%" height="1000px">
  //  </iframe>
  //`;
  //
  //var html = `
  //  <embed class="pdf" src="PML_Syllabus_2025.pdf" width="100%" height="100%">
  //`;

  $("#right-col").html(html);
  setTimeout(() => {
    console.log("Delayed for 1 second.");
    //$('.pdf').height('5000px');
    $(".pdf").width("99%");
    $("#right-col").css({ overflow: "auto" });
    //$('.pdf').contentWindow.location.reload(true);
  }, "1000");

  //$('#right-col').css({ overflow: 'hidden' });
  //$('#ArticleBody').html(html);
}

function load_materials() {
  $.get(
    "menu/material_sources/material_sources.html",
    function (data) {
      html = $.parseHTML(data);
      $("#right-col").html(html[31].innerHTML);
    },
    "text",
  );
}

function load_resources() {
  $.get(
    "menu/resources/resources.html",
    function (data) {
      html = $.parseHTML(data);
      $("#right-col").html(html[31].innerHTML);
    },
    "text",
  );
  $("table").addClass("uk-table");
  $("table").addClass("uk-table-striped");
  $("table").addClass("uk-table-hover");
  $("table").addClass("uk-table-middle");
}

function week1() {
  $.get(
    "weeks/week1/week1.html",
    function (data) {
      html = $.parseHTML(data);
      $("#right-col").html(html[31].innerHTML);
    },
    "text",
  );
}

function week2() {
  $.get(
    "weeks/week2/week2.html",
    function (data) {
      html = $.parseHTML(data);
      $("#right-col").html(html[31].innerHTML);
    },
    "text",
  );
}

function week3() {
  $.get(
    "weeks/week3/week3.html",
    function (data) {
      html = $.parseHTML(data);
      $("#right-col").html(html[31].innerHTML);
    },
    "text",
  );
}

function week4() {
  $.get(
    "weeks/week4/week4.html",
    function (data) {
      html = $.parseHTML(data);
      $("#right-col").html(html[31].innerHTML);
    },
    "text",
  );
}

function week5() {
  console.log("HFDSF");
  $.get(
    "weeks/week5/week5.html",
    function (data) {
      html = $.parseHTML(data);
      $("#right-col").html(html[31].innerHTML);
    },
    "text",
  );
}

function week6() {
  $.get(
    "weeks/week6/week6.html",
    function (data) {
      html = $.parseHTML(data);
      $("#right-col").html(html[31].innerHTML);
    },
    "text",
  );
}

function week7() {
  $.get(
    "weeks/week7/week7.html",
    function (data) {
      html = $.parseHTML(data);
      $("#right-col").html(html[31].innerHTML);
    },
    "text",
  );
}

function week8() {
  $.get(
    "weeks/week8/week8.html",
    function (data) {
      html = $.parseHTML(data);
      $("#right-col").html(html[31].innerHTML);
    },
    "text",
  );
}

function week9() {
  $.get(
    "weeks/week9/week9.html",
    function (data) {
      html = $.parseHTML(data);
      $("#right-col").html(html[31].innerHTML);
    },
    "text",
  );
}

function week10() {
  $.get(
    "weeks/week10/week10.html",
    function (data) {
      html = $.parseHTML(data);
      $("#right-col").html(html[31].innerHTML);
    },
    "text",
  );
}

function week11() {
  $.get(
    "weeks/week11/week11.html",
    function (data) {
      html = $.parseHTML(data);
      $("#right-col").html(html[31].innerHTML);
    },
    "text",
  );
}

function week12() {
  $.get(
    "weeks/week12/week12.html",
    function (data) {
      html = $.parseHTML(data);
      $("#right-col").html(html[31].innerHTML);
    },
    "text",
  );
}

function week13() {
  $.get(
    "weeks/week13/week13.html",
    function (data) {
      html = $.parseHTML(data);
      $("#right-col").html(html[31].innerHTML);
    },
    "text",
  );
}

function week14() {
  $.get(
    "weeks/week14/week14.html",
    function (data) {
      html = $.parseHTML(data);
      $("#right-col").html(html[31].innerHTML);
    },
    "text",
  );
}

function week15() {
  $.get(
    "weeks/week15/week15.html",
    function (data) {
      html = $.parseHTML(data);
      $("#right-col").html(html[31].innerHTML);
    },
    "text",
  );
}
