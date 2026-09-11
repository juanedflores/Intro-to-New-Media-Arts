const node = document.querySelector("#trigger1");

function onClassChange(node, callback) {
  let lastClassString = node.classList.toString();

  const mutationObserver = new MutationObserver((mutationList) => {
    for (const item of mutationList) {
      if (item.attributeName === "class") {
        const classString = node.classList.toString();
        if (classString !== lastClassString) {
          if (classString === "read active") {
            callback(mutationObserver);
            lastClassString = classString;
            break;
          }
        }
      }
    }
  });

  mutationObserver.observe(node, { attributes: true });

  return mutationObserver;
}

// #trigger1 is a page-specific transcript marker (e.g. the Keyboard post's
// "code breakdown" section) - pages without one just skip this feature.
if (node) {
  onClassChange(node, (observer) => {
    console.log("triggered");
    scrollToHeading();
  });
}

function scrollToHeading() {
  const section = document.getElementById("keyboardserial-code-breakdown");
  if (section) {
    section.scrollIntoView({
      behavior: "smooth", // Smooth scrolling animation
      block: "start", // Aligns the top of the element to the top of the viewport
    });
  }
}
