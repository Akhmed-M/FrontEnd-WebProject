const toggle = document.getElementById("toggle");
toggle.addEventListener("click", toggleMode);

setMode();

// TOGGLE MODE SETUP
function toggleMode() {
  if (toggle.checked) {
    document.documentElement.style.setProperty(
      "--mainColor",
      "hsl(3, 81%, 42%)"
    );
    document.documentElement.style.setProperty(
      "--themeColor1",
      "rgb(206, 202, 202)"
    );
    document.documentElement.style.setProperty(
      "--themeColor2",
      "rgb(141, 141, 141)"
    );
    document.documentElement.style.setProperty("--textColor", "black");
    document.documentElement.style.setProperty("--productTheme", "black");
    document.documentElement.style.setProperty("--productTextColor", "#b7b2b2");
    document.documentElement.style.setProperty("--white", "black");
  } else {
    document.documentElement.style.setProperty(
      "--mainColor",
      "hsl(3, 81%, 42%)"
    );
    document.documentElement.style.setProperty(
      "--themeColor1",
      "rgb(21, 19, 19)"
    );
    document.documentElement.style.setProperty(
      "--themeColor2",
      "rgb(35, 33, 33)"
    );
    document.documentElement.style.setProperty("--textColor", "#b7b2b2");
    document.documentElement.style.setProperty("--productTheme", "gray");
    document.documentElement.style.setProperty("--productTextColor", "black");
    document.documentElement.style.setProperty("--white", "white");
  }
  saveMode();
}

// LIGHT/DARK MODE LOCALSTORAGE SETUP
function setMode() {
  let Mode = Load("Mode"); // dark/light
  toggle.checked = Mode[0];
  toggleMode();
}
function saveMode() {
  let Mode = Load("Mode"); // dark/light
  Mode[0] = toggle.checked;
  Save("Mode", Mode);
}

function Load(name) {
  if (localStorage.getItem(name) === null) return [];
  return JSON.parse(localStorage.getItem(name));
} // Loads item 'name' from Local Storage (if exists)
function Save(name, item) {
  localStorage.setItem(name, JSON.stringify(item));
} // Saves item in Local Storage (as 'name')
