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
      $(all[i]).css('background-color', '#dddddd');
    }
  }
}

table_hl();
sections();
//toc_scroll();

var iframe = document.getElementById('circuitFrame');

// Wait for the circuit simulator to load
iframe.contentWindow.oncircuitjsloaded = function () {
  // Simulator is loaded, initialize your code here
  sim = iframe.contentWindow.CircuitJS1;

  // Set up callbacks for updates, analysis, and time steps (all optional)
  sim.onupdate = didUpdate;
  sim.ontimestep = didStep;
  sim.onanalyze = didAnalyze;
};
