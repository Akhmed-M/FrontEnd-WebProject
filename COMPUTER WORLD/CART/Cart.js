/*-----------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------*/

// CONSTANTS

// Class names of needed information in accessories.html cards
const TITLE_CLASS = "card-title";
const IMAGE_CLASS = "img";
const MODEL_CLASS = "model-info";
const BRAND_CLASS = "brand-info";
const PRICE_CLASS = "price";
const AMOUNT_CLASS = "cnt";

const SUBMIT_BTN_CLASS = "addToCartBtn";

// Text
const REMOVE_BTN_TXT = "Remove All";

// For yourcart html page
const cartContainer = document.getElementById("cart-container");
const totalCost = document.getElementById("totalCost");
const clearCartBtn = document.getElementById("clearCartBtn");
const emptyCartMessage = document.getElementById("emptyCartMessage");
const durationOfAnimation = 600; // Removal Animation

// For Other html pages
const Buttons = document.getElementsByClassName("addToCartBtn");

// On Load
document.addEventListener("DOMContentLoaded", run);

/*-----------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------*/

// FUNCTIONS THAT RUN ONLOAD

function run() {
  // Add Functionality to addToCart buttons in `Product.html`
  for (let button of Buttons) button.addEventListener("click", addToCart);
  if (clearCartBtn == null) return; // Stop of product page

  // Page = `Cart.html`
  clearCartBtn.addEventListener("click", clearCart);
  setEmptyCartMessage();
  createSavedProducts();
} // on load

function createSavedProducts() {
  for (let product of Load("products")) createProductElement(product);
  setSavedTotalCost();
}

let CARD_CLASS = "card";
let INFO_SECTION_CLASS = "info-section";
let BUY_SECTION_CLASS = "buy-section";
let INFO_CLASS = "info";
let COUNTER_CLASS = "counter";
let MINUS_BTN_CLASS = "minusBtn";
let PLUS_BTN_CLASS = "plusBtn";

function createElement_withClassName(type, className) {
  let element = document.createElement(type);
  element.classList.add(className);
  return element;
}

function createProductElement(product) {
  if (cartContainer == null) return; // page is not cart.html

  let card = createElement_withClassName("div", CARD_CLASS);
  let cardTitle = createElement_withClassName("div", TITLE_CLASS);

  let img = createElement_withClassName("img", IMAGE_CLASS);

  let infoSection = createElement_withClassName("div", INFO_SECTION_CLASS);
  let info = createElement_withClassName("div", INFO_CLASS);
  let modelInfo = createElement_withClassName("div", MODEL_CLASS);
  let brandInfo = createElement_withClassName("div", BRAND_CLASS);

  let price = createElement_withClassName("div", PRICE_CLASS);
  let buySection = createElement_withClassName("div", BUY_SECTION_CLASS);

  let submitBtn = createElement_withClassName("button", SUBMIT_BTN_CLASS);
  let counter = createElement_withClassName("div", COUNTER_CLASS);
  let minusBtn = createElement_withClassName("button", MINUS_BTN_CLASS);
  let amount = createElement_withClassName("span", AMOUNT_CLASS);

  // Text divs
  let modelText = createElement_withClassName("div");
  let brandText = createElement_withClassName("div");

  // Link
  cartContainer.appendChild(card);

  card.appendChild(cardTitle);
  card.appendChild(img);
  card.appendChild(infoSection);
  card.appendChild(price);
  card.appendChild(buySection);

  infoSection.appendChild(info);
  info.appendChild(modelText);
  info.appendChild(modelInfo);
  info.appendChild(brandText);
  info.appendChild(brandInfo);

  buySection.appendChild(submitBtn);
  buySection.appendChild(counter);

  counter.appendChild(minusBtn);
  counter.appendChild(amount);

  // Add attributes/text/functionality
  cardTitle.innerText = product["Title"];
  img.setAttribute("src", product["Image"]);

  modelText.innerText = "Model";
  brandText.innerText = "Brand";
  modelInfo.innerText = product["Model"];
  brandInfo.innerText = product["Brand"];

  price.innerHTML = `<span>${product["Price"]}</span>$`;
  submitBtn.innerText = REMOVE_BTN_TXT;
  submitBtn.addEventListener("click", removeFromCart);

  amount.innerText = `${product["Amount"]}`;
  minusBtn.innerText = "-";

  minusBtn.addEventListener("click", decrementAmount);
} // May change according to accessories.html page

function setSavedTotalCost() {
  if (totalCost == null) return; // if page!=yourcart return

  let Total = Load("Total");
  if (Total.length == 0) Total[0] = 0;
  totalCost.innerText = `${Total[0]}`;
} // Sets totalCost element on `Cart.html` to value in LocalStorage

// This one is also activated when we try to removeAllProducts or at least one
function setEmptyCartMessage() {
  if (Load("products").length == 0) {
    emptyCartMessage.style = "display: block;";
  } else emptyCartMessage.style = "display: none;";
} // Checks if cart is empty => sets a message

/*-----------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------*/

// FUNCTIONS ACTIVATED BY `Cart.html` (set by createSavedProducts function)

function decrementAmount() {
  // NOTE: amount > 0 ==> Because it exists on the page (it called this function)
  let Card = event.target.parentElement.parentElement.parentElement; // Card Div

  let amountSpan = DeepSearch(Card, AMOUNT_CLASS);
  if (amountSpan.innerHTML == 1) return removeFromCart(Card, "self"); // amount=1 && want to decrement => REMOVE

  // decrement
  amountSpan.innerHTML--;

  // Save new amount to product in LocalStorage
  let product = fillProduct(Card);
  let products = Load("products");
  products[productExists(product)]["Amount"] = amountSpan.innerHTML;
  Save("products", products);

  //  Set new totalCost (totalCost -= price*count)
  product["Amount"] = -1; // to decrement
  updateTotalCost(product);
}

function removeFromCart(Card, Caller = "RemoveBtn") {
  if (Caller == "RemoveBtn") {
    Card = event.target.parentElement.parentElement; // Card Div (dependant on location)
  }
  let product = fillProduct(Card);
  animatedRemoval(Card);

  // Update totalCost
  Save("Total", [Load("Total")[0] - product["Price"] * product["Amount"]]);
  setSavedTotalCost();

  Save("products", removeAndReturn(Load("products"), product));

  // After card removal: if cart is empty => setEmptyCartMessage
  setTimeout(() => {
    setEmptyCartMessage();
  }, durationOfAnimation);
} // Removes a product COMPLETELY from Cart page

function clearCart() {
  localStorage.removeItem("products");
  localStorage.removeItem("Total");
  removeAllProducts(); // Remove products HTML in `Cart.html`
  setSavedTotalCost();
}

function removeAllProducts() {
  const Cards = document.getElementsByClassName("card");
  for (let card of Cards) {
    animatedRemoval(card);
  }

  // Set EmptyCartMessage after animiation is done
  setTimeout(() => {
    setEmptyCartMessage();
  }, durationOfAnimation);
}

function animatedRemoval(element) {
  const minusBtn = DeepSearch(element, MINUS_BTN_CLASS);
  minusBtn.removeEventListener("click", decrementAmount);
  $(element).hide(durationOfAnimation, () => {
    $(this).remove();
  });
}

/*-----------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------*/

// FUNCTIONS ACTIVATED BY OTHER PAGES

function addToCart() {
  let parent = event.target.parentElement; // parent of addToCart button (buy-section)
  let product = fillProduct(parent.parentElement); // fillProduct(card)
  saveToLocalProducts(product);

  // Reset counter
  let amountSpan = DeepSearch(parent, AMOUNT_CLASS);
  amountSpan.innerHTML = "0";
}

function updateTotalCost(product) {
  let Total = Load("Total");
  let cost = product["Price"] * product["Amount"];

  // Update Total
  if (Total.length) Total[0] += cost;
  else Total.push(cost); // if LocalStorage empty

  // Save changes to LocalStorage
  Save("Total", Total);
  setSavedTotalCost();
} // totalCost += price*amount

function saveToLocalProducts(product) {
  if (product["Amount"] == 0) return;

  let products = Load("products");
  let index = productExists(product);

  // check if product exist => set new amount
  if (index >= 0) {
    products[index]["Amount"] =
      parseInt(products[index]["Amount"]) + parseInt(product["Amount"]); // due to bugs use parseInt
  } else products.push(product); // doesn't exist => add it

  // Save changes to LocalStorage
  Save("products", products);
  updateTotalCost(product);
}

/*-------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------*/
// MULTI-USE FUNCTIONS

function Load(name) {
  if (localStorage.getItem(name) === null) return [];
  return JSON.parse(localStorage.getItem(name));
} // Loads item 'name' from Local Storage (if exists)

function Save(name, item) {
  localStorage.setItem(name, JSON.stringify(item));
} // Saves item in Local Storage (as 'name')

function productExists(product, products = Load("products")) {
  for (let i = 0; i < products.length; i++)
    if (products[i]["Title"] == product["Title"]) return i; // FOUND
  return -1; // NOT FOUND
} // Checks whether a product exists in LocalStorage or not && returns its index if found

function removeAndReturn(List, Item) {
  List.splice(productExists(Item), 1);
  return List;
}

function DeepSearch(Div, className) {
  if (Div == null) return null;

  // Check if current div is the target
  if (Div.classList.contains(className)) return Div;

  // Check if it has children
  let Children = Div.children;
  if (Children.length == 0) return null; // NOT FOUND

  // Search its children
  let element;
  for (let child of Children) {
    element = DeepSearch(child, className);
    if (element != null) break; // Found and no need to continue search
  }
  return element;
} // Searches an element `Div` and ALL its children for an element with class name `className`
// Not the most effecient in terms of time complexity BUT is unique due to its generality

function fillProduct(Card) {
  // Product Info
  let title, price, img, amount;
  let model, brand;

  // Get div elements inside `Card` using their class names
  title = DeepSearch(Card, TITLE_CLASS);
  model = DeepSearch(Card, MODEL_CLASS);
  brand = DeepSearch(Card, BRAND_CLASS);
  price = DeepSearch(Card, PRICE_CLASS);
  img = DeepSearch(Card, IMAGE_CLASS);
  amount = DeepSearch(Card, AMOUNT_CLASS);

  // Extract data
  title = title.innerText;
  model = model.innerText;
  brand = brand.innerText;
  price = parseInt(price.childNodes[0].innerText);
  img = img.src; // Image Source
  amount = parseInt(amount.innerText); // Amount

  // Fill product object
  let product = {
    Title: title,
    Price: price,
    Image: img, // Cart.html and Products.html MUST share the same folder
    Model: model,
    Brand: brand,
    Amount: amount,
  };
  return product;
} // Takes argument `Card` the product's div

/*-------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------*/
