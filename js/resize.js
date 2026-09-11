function resize_function() {
  w = document.documentElement.clientWidth;
  if (w > 900) {
    UIkit.offcanvas("#offcanvas-usage").hide();
  }
}
