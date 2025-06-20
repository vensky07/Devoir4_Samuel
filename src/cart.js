let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    ShoppingCart.innerHTML = basket.map((x) => {
      let { id, item } = x;
      let search = shopItemsData.find((y) => y.id === id) || {};
      return `
        <div class="cart-item">
          <img width="100" src=${search.img} alt="" />
          <div class="details">
            <div class="title-price-x">
              <h4 class="title-price">
                <p>${search.name}</p>
                <p class="cart-item-price">$ ${search.price}</p>
              </h4>
              <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
            </div>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
            <h3>$ ${(item * search.price).toFixed(2)}</h3>
          </div>
        </div>
      `;
    }).join("");
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
      <h2>Cart is Empty</h2>
      <a href="index.html">
        <button class="HomeBtn">Back to home</button>
      </a>
    `;
  }
};

generateCartItems();

let increment = (id) => {
  let search = basket.find((x) => x.id === id);
  if (!search) {
    basket.push({ id, item: 1 });
  } else {
    search.item += 1;
  }
  update(id);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let search = basket.find((x) => x.id === id);
  if (!search || search.item === 0) return;
  search.item -= 1;
  basket = basket.filter((x) => x.item !== 0);
  update(id);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search?.item || 0;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  basket = basket.filter((x) => x.id !== id);
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket.map((x) => {
      let search = shopItemsData.find((y) => y.id === x.id);
      return x.item * (search?.price || 0);
    }).reduce((x, y) => x + y, 0);
    label.innerHTML = `
      <h2>Total Bill: $ ${amount.toFixed(2)}</h2>
      <button class="checkout">Checkout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
  }
};

TotalAmount();
