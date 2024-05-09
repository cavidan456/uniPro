window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  // Eğer sayfa scroll edilen miktar 50 pikselden fazlaysa
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    // Div'in class'ını değiştir
    document.getElementById("scrolHead").classList.remove("header-js");
    document.getElementById("scrolHead").classList.add("scrolled");
  } else {
    // Sayfa yukarı doğru scroll edildiğinde, div'in class'ını geri değiştir
    document.getElementById("scrolHead").classList.remove("scrolled");
    document.getElementById("scrolHead").classList.add("header-js");
  }
}

// get products

const products = document.getElementById("products");

// const api = "https://65dde09adccfcd562f55af2a.mockapi.io/products"

let limit = 3;
let page = 1;

async function getProduct() {
  const res = await axios.get(
    `https://65dde09adccfcd562f55af2a.mockapi.io/products/?limit=${limit}&page=${page}`
  );
  const data = res.data;
  db = data;
  products.innerHTML = ``
  db.forEach((item) => {
    let box = document.createElement("div");
    box.className = "col-12 col-lg-4 col-xl-4 mb-3";
    box.innerHTML = `
    <div class="card">
<img class="card-img-top" src="${item.productImage}" alt="Card image cap">
<div class="card-body">
  <h5 class="card-title">${item.productName}</h5>
  <p class="card-text">${item.productPrice} Manat</p>
  <p class="card-text">${item.productDescriptions.slice(0, 100)}...</p>
  <button class="btn btn-primary" onclick="addBasket(${
    item.id
  })">Add Basket</button>
  <button class="btn btn-fixed" onclick="addList(${
    item.id
  })"><i class="fa-regular fa-heart"></i></button>
</div>
</div>`;
    products.appendChild(box);
  });
  limit = limit + 3
}
getProduct();

function addBasket(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  productItem = cart.find((item) => item.id == id);
  if (productItem) {
    productItem.count = (productItem.count || 1) + 1;
  } else {
    cart.push(db.find((item) => item.id == id));
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addList(id) {
  let list = JSON.parse(localStorage.getItem("list")) || [];
  productItem = list.find((item) => item.id == id);
  if (productItem) {
    alert("Bu mehsul artiq sevimliler sehifesine elave olunub");
  } else {
    list.push(db.find((item) => item.id == id));
  }
  localStorage.setItem("list", JSON.stringify(list));
}

// filter function in array method sort

async function sortAz() {
  const res = await axios.get(
    `https://65dde09adccfcd562f55af2a.mockapi.io/products`
  );
  const data = res.data;
  let db = data.sort((a, b) => {
    if (a.productName < b.productName) {
      return -1;
    }
    return 0;
  });
  products.innerHTML = ``
  db.forEach((item) => {
    let box = document.createElement("div");
    box.className = "col-12 col-lg-4 col-xl-4 mb-3";
    box.innerHTML = `
    <div class="card">
<img class="card-img-top" src="${item.productImage}" alt="Card image cap">
<div class="card-body">
  <h5 class="card-title">${item.productName}</h5>
  <p class="card-text">${item.productPrice} Manat</p>
  <p class="card-text">${item.productDescriptions.slice(0, 100)}...</p>
  <button class="btn btn-primary" onclick="addBasket(${
    item.id
  })">Add Basket</button>
  <button class="btn btn-fixed" onclick="addList(${
    item.id
  })"><i class="fa-regular fa-heart"></i></button>
</div>
</div>`;
    products.appendChild(box);
  });
}

async function sortZa() {
  const res = await axios.get(
    `https://65dde09adccfcd562f55af2a.mockapi.io/products`
  );
  const data = res.data;
  let db = data.sort((a, b) => {
    if (a.productName > b.productName) {
      return -1;
    }
    return 0;
  });
  products.innerHTML = ``
  db.forEach((item) => {
    let box = document.createElement("div");
    box.className = "col-12 col-lg-4 col-xl-4 mb-3";
    box.innerHTML = `
    <div class="card">
<img class="card-img-top" src="${item.productImage}" alt="Card image cap">
<div class="card-body">
  <h5 class="card-title">${item.productName}</h5>
  <p class="card-text">${item.productPrice} Manat</p>
  <p class="card-text">${item.productDescriptions.slice(0, 100)}...</p>
  <button class="btn btn-primary" onclick="addBasket(${
    item.id
  })">Add Basket</button>
  <button class="btn btn-fixed" onclick="addList(${
    item.id
  })"><i class="fa-regular fa-heart"></i></button>
</div>
</div>`;
    products.appendChild(box);
  });
}

async function sortPrice() {
  const res = await axios.get(
    `https://65dde09adccfcd562f55af2a.mockapi.io/products`
  );
  const data = res.data;
  let db = data.sort((a, b) => a.productPrice -b.productPrice);
  products.innerHTML = ``
  db.forEach((item) => {
    let box = document.createElement("div");
    box.className = "col-12 col-lg-4 col-xl-4 mb-3";
    box.innerHTML = `
    <div class="card">
<img class="card-img-top" src="${item.productImage}" alt="Card image cap">
<div class="card-body">
  <h5 class="card-title">${item.productName}</h5>
  <p class="card-text">${item.productPrice} Manat</p>
  <p class="card-text">${item.productDescriptions.slice(0, 100)}...</p>
  <button class="btn btn-primary" onclick="addBasket(${
    item.id
  })">Add Basket</button>
  <button class="btn btn-fixed" onclick="addList(${
    item.id
  })"><i class="fa-regular fa-heart"></i></button>
</div>
</div>`;
    products.appendChild(box);
  });
}

const selectMain = document.getElementById("sortMain")

selectMain.addEventListener("change" , function () {
  const selectValue = selectMain.value
  if (selectValue === "abc") {
    sortAz()
} else if (selectValue === "cba") {
    sortZa();
} else if (selectValue === "price") {
    sortPrice();
}
})


// delete all sort and pagenations function

const sortDefault = document.getElementById("sortDefault")

function reloadFunk() {
  window.location.reload()
}

sortDefault.addEventListener("click" , reloadFunk)

// search name

const inpMain = document.getElementById("inpMain")

async function searchName() {
  const res = await axios.get(
    `https://65dde09adccfcd562f55af2a.mockapi.io/products/?productName=${inpMain.value}`
  );
  const data = res.data;
  db = data;
  products.innerHTML = ``
  db.forEach((item) => {
    let box = document.createElement("div");
    box.className = "col-12 col-lg-4 col-xl-4 mb-3";
    box.innerHTML = `
    <div class="card">
<img class="card-img-top" src="${item.productImage}" alt="Card image cap">
<div class="card-body">
  <h5 class="card-title">${item.productName}</h5>
  <p class="card-text">${item.productPrice} Manat</p>
  <p class="card-text">${item.productDescriptions.slice(0, 100)}...</p>
  <button class="btn btn-primary" onclick="addBasket(${
    item.id
  })">Add Basket</button>
  <button class="btn btn-fixed" onclick="addList(${
    item.id
  })"><i class="fa-regular fa-heart"></i></button>
</div>
</div>`;
    products.appendChild(box);
  });
}

inpMain.addEventListener("input" , searchName)