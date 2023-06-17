// MINUS/PLUS BUTTONS SETUP

let accessoriesContainer = document.querySelector(".accessories");
let plusBtns = document.querySelectorAll(".plusBtn");
let minusBtns = document.querySelectorAll(".minusBtn");

for (let i = 0; i < plusBtns.length; i++) {
  plusBtns[i].setAttribute("data-count", i + 1);
  minusBtns[i].setAttribute("data-count", i + 1);
}

plusBtns.forEach((ele) => {
  ele.addEventListener("click", () => {
    let count = ele.nextElementSibling;
    count.innerHTML++;
  });
});

minusBtns.forEach((ele) => {
  ele.addEventListener("click", () => {
    let count = ele.previousElementSibling;
    if (count.innerHTML !== "0") {
      count.innerHTML--;
    }
  });
});
