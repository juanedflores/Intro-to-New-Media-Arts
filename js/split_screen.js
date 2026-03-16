console.log("loaded split_screen");

resizer = document.getElementById("resizer");
const leftPanel = document.getElementById("leftPanel");
const hyperplayerdiv = document.getElementById("hyperplayer");
const transcriptdiv = document.getElementById("hypertranscript");

let isResizing = false;

resizer.addEventListener("mousedown", (e) => {
  isResizing = true;

  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", stopResize);
});

function resize(e) {
  if (isResizing) {
    let newWidth = Math.max(100, e.clientX);
    leftPanel.style.width = `${newWidth}px`;
    playerwidth = hyperplayerdiv.offsetWidth;
    transcriptdiv.style.width = `${playerwidth}px`;
  }
}

function stopResize() {
  isResizing = false;

  document.removeEventListener("mousemove", resize);
  document.removeEventListener("mouseup", stopResize);
}

window.addEventListener("load", (event) => {
  let playerwidth = hyperplayerdiv.offsetWidth;
  transcriptdiv.style.width = `${playerwidth}px`;
});
