// SCROLLING FUNCTIONALITY
const scrollTopButton = document.querySelector("#scroll-top-button");
scrollTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 0) {
    scrollTopButton.style.opacity = "1";
  } else {
    scrollTopButton.style.opacity = "0";
  }
});
