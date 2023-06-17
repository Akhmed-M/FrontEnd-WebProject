/* Slider */
let slideIndex = 1;
showSlides(slideIndex);
setInterval(function () {
  plusSlides(1);
}, 3000);
function plusSlides(n) {
  showSlides((slideIndex += n));
}
function currentSlide(n) {
  showSlides((slideIndex = n));
}
function showSlides(n) {
  /*let slides = document.getElementsByClassName("mySlides");*/
  let slides = document.querySelectorAll(".mySlides");
  slides = Array.from(slides); /* creating an array of the slides object */
  /*let dots = document.getElementsByClassName("dot");*/
  let dots = document.querySelectorAll(".dot");
  dots = Array.from(dots); /* creating an array of the dots object */
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  let i;
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
/* Greeting Box */
let alertContainer = document.querySelector(".alert-container");
function showAlert() {
  alertContainer.style.opacity = "0.96";
}
function disappear() {
  alertContainer.style.opacity = "0";
  setTimeout(function () {
    alertContainer.remove();
  }, 500);
}
showAlert();

