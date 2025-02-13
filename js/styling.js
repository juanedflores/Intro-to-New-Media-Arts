function table_hl() {
  $('table').addClass('uk-table');
  $('table').addClass('uk-table-striped');
  $('table').addClass('uk-table-hover');
  $('table').addClass('uk-table-middle');
}

//function toc_scroll() {
//  $('div > ul > li > a').attr('uk-scroll');
//}

function sections() {
  var all = $('.level2');
  for (var i = 0; i < all.length; i++) {
    if (i % 2 == 0) {
      $(all[i]).css('background-color', 'white');
    } else {
      $(all[i]).css('background-color', 'rgb(238, 221, 195)');
    }
  }
}

table_hl();
sections();

var iframe = document.getElementById('circuitFrame');

if (iframe) {
  // Wait for the circuit simulator to load
  iframe.contentWindow.oncircuitjsloaded = function () {
    // Simulator is loaded, initialize your code here
    sim = iframe.contentWindow.CircuitJS1;

    // Set up callbacks for updates, analysis, and time steps (all optional)
    sim.onupdate = didUpdate;
    sim.ontimestep = didStep;
    sim.onanalyze = didAnalyze;
  };
} else {
  console.log('no');
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    //var scrollToPosition = $(anchor).offset().top - headerHeight;
    console.log('hi');
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  });
});

function resize_function() {
  w = document.documentElement.clientWidth;
  if (w > 900) {
    UIkit.offcanvas('#offcanvas-usage').hide();
  }
}
