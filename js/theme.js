// Light / dark mode. Loaded in <head> on every site page (not the slide
// decks or the drawing-machines gallery, which stay light) so the theme is
// set before the page paints. A visitor's choice is remembered; until they
// pick one, the page follows their device setting.
//
// The toggle sits at the right end of the top bar; on phones, where the bar
// has no room, it moves to the top of the slide-out menu instead.
(function () {
  var KEY = "art150-theme";
  var root = document.documentElement;
  var media = window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;

  function saved() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }
  function current() {
    return saved() || (media && media.matches ? "dark" : "light");
  }
  function apply(theme) {
    root.setAttribute("data-theme", theme);
    var dark = theme === "dark";
    var label = dark ? "Switch to light mode" : "Switch to dark mode";
    var icon =
      '<span class="fas ' +
      (dark ? "fa-sun" : "fa-moon") +
      '" aria-hidden="true"></span>';
    var bar = document.getElementById("theme_toggle");
    if (bar) {
      bar.setAttribute("aria-pressed", dark ? "true" : "false");
      bar.setAttribute("aria-label", label);
      bar.title = label;
      bar.innerHTML = icon;
    }
    var menu = document.getElementById("theme_toggle_menu");
    if (menu) {
      menu.setAttribute("aria-pressed", dark ? "true" : "false");
      menu.innerHTML = icon + (dark ? " Light mode" : " Dark mode");
    }
  }
  function toggle() {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(KEY, next);
    } catch (e) {}
    apply(next);
  }

  apply(current());

  // follow the device setting live, unless the visitor has chosen
  if (media && media.addEventListener) {
    media.addEventListener("change", function () {
      if (!saved()) apply(current());
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("theme_toggle")) return;
    var nav =
      document.querySelector("nav.uk-navbar-container") ||
      document.querySelector("body > nav");
    if (nav) {
      var btn = document.createElement("button");
      btn.id = "theme_toggle";
      btn.type = "button";
      btn.addEventListener("click", toggle);
      nav.appendChild(btn);
    }
    // the site menu on most pages; the table of contents on blog posts
    var drawer =
      document.querySelector("#offcanvas-usage .bar-wrap") ||
      document.querySelector(".uk-offcanvas-bar");
    if (drawer) {
      var item = document.createElement("button");
      item.id = "theme_toggle_menu";
      item.type = "button";
      item.addEventListener("click", toggle);
      drawer.insertBefore(item, drawer.firstChild);
    }
    apply(current());
  });
})();
