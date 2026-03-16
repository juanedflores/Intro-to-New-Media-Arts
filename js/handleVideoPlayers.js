// const mainplayer_el = new Plyr(document.getElementById("mainplayer"));
// const transcriptdiv = new Plyr(document.getElementById("hypertranscript"));

console.log("loaded plyr");

function getSubstringAfterThirdSlash(str) {
  let startIndex = 0;
  // Loop three times to find the index after the third slash
  for (let i = 0; i < 3; i++) {
    // Find the next slash starting from the current startIndex
    const slashIndex = str.indexOf("/", startIndex);

    // If a slash is not found, or it's the last character, handle the case (e.g., return the original string or an error)
    if (slashIndex === -1 || slashIndex === str.length - 1) {
      return "Invalid string format or fewer than 3 slashes";
    }
    // Update the start index to search from the character after the found slash
    startIndex = slashIndex + 1;
  }

  // Use the substring method to get everything from the calculated startIndex to the end
  return str.substring(startIndex);
}

function getTranscript() {
  pageTitle = document.title;
  full_href = window.location.href;
  indexFirst = getSubstringAfterThirdSlash(full_href);
  directoryPath = indexFirst.substring(0, indexFirst.lastIndexOf("/"));
  console.log(directoryPath);
  $.get(
    `transcript.html`,
    function (data) {
      html = $.parseHTML(data);
      console.log(html[0]);
      // $("#hypertranscript").html(html[0].innerHTML);
      $("#rightPanel").append(html[0].innerHTML);
      // console.log($("#hypertranscript"));
    },
    "text",
  );
  let minimizedMode = false;
  let autoScroll = true;
  let doubleClick = false;
  let webMonetization = false;
  let playOnClick = false;

  new HyperaudioLite(
    "hypertranscript",
    "hyperplayer",
    minimizedMode,
    autoScroll,
    doubleClick,
    webMonetization,
    playOnClick,
  );

  // $("#rightPanel").load(document.URL + " #rightPanel");
}

$(document).ready(function () {
  // getTranscript();
});

// getTranscript();

// console.log(player_js);

// player = new Plyr(player_el, {
//   title: "Example Title",
// });

// player = new Plyr(mainplayer_el, {
//   controls: playerControls,
//   debug: false,
//   clickToPlay: false,
//   vimeo: vimeoOptions,
//   index: currentEndIndex,
// });
//

// player_js.on("ready", (event) => {
//   const instance = event.detail.plyr;
//   console.log(instance);
// });
//
