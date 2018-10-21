$(document).ready(function() {
  // soft scrolling to all links
  $('a').on('click', function(event) {
    if (this.hash !== "") {
      // behavior
      event.preventDefault();

      // store hash
      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function() {

        window.location.hash = hash;
      });
    } // end if
  });
});