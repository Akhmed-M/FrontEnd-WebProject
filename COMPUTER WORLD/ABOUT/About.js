// HELP & FAQ
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      panel.classList.remove("show");
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      panel.classList.add("show");
    }
  });
}
// FORM VALIDATION
function validate() {
  var error = document.getElementById("errors");
  const regName = /^[a-zA-Z]+ ?[a-zA-Z ]*$/;
  const name = document.getElementById("name").value;
  const form = document.getElementById("form");
  form.addEventListener("submit", (event) => {
    if (!regName.test(name)) {
      event.preventDefault();
      error.innerHTML = "Invalid username";
      error.style.color = "red";
    } else {
      error.innerHTML = "thank you for contacting us";
      error.style.color = "green";
      event.preventDefault();
    }
  });
}
