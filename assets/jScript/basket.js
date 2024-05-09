const product = document.getElementById("products");

function getProduct() {
  product.innerHTML = ``;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  db = cart;
  db.map((item, index) => {
    let box = document.createElement("div");
    box.className = "col-12 col-lg-4 col-xl-4 mb-4";
    box.innerHTML = `
        <div class="product-cart">
        <img src="${item.productImage}" alt="${item.title}">
        <h5>${item.productName}</h5>
        <p>$${item.productPrice}</p>
        <p>Count: ${item.count || 1} eded</p>
  <p class="card-text">${item.productDescriptions.slice(0, 100)}...</p>
        <button class="btn btn-danger" onclick="removeCart(${index})">Delete Cart</button>
        <button class="btn btn-primary" onclick="addWishlist(${item.id})">Add Wishlist</button>
        </div>`;
    product.appendChild(box);
  });
}

getProduct();

function removeCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  getProduct();
}

function addWishlist(id) {
  let list = JSON.parse(localStorage.getItem("list")) || [];
  productItem = list.find((item) => item.id == id);
  if (productItem) {
    alert("Bu mehsul artiq sevimliler sehifesine elave olunub");
  } else {
    list.push(db.find((item) => item.id == id));
  }
  localStorage.setItem("list", JSON.stringify(list));
}
