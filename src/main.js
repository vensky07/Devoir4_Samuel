let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  shop.innerHTML = shopItemsData.map((x) => {
    let { id, name, price, desc, img } = x;
    let search = basket.find((x) => x.id === id) || {};
    return `
      <div id="product-id-${id}" class="item">
        <img width="220" src=${img} alt="">
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${search.item || 0}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
};

generateShop();

let increment = (id) => {
  let search = basket.find((x) => x.id === id);
  if (!search) {
    basket.push({ id, item: 1 });
  } else {
    search.item += 1;
  }
  update(id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let search = basket.find((x) => x.id === id);
  if (!search || search.item === 0) return;
  search.item -= 1;
  basket = basket.filter((x) => x.item !== 0);
  update(id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search?.item || 0;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
