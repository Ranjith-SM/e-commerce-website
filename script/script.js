const userlogout = () => {
  location.replace("/e-commerce-website/login.html");
};

const adminlogout = () => {
  location.replace("/e-commerce-website/login.html");
};

let RefProduct = [
  {
    id: 1,
    Name: "realme c51",
    desc: "An apple mobile which is nothing like apple",
    price: 549,
    img: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/b/i/x/-original-imagt4qptrkzwmxa.jpeg?q=70",
  },
  {
    id: 2,
    Name: "realme narzo 60x 5g",
    desc: "An apple mobile which is nothing like apple",
    price: 549,
    img: "https://m.media-amazon.com/images/I/818UhQ1kpdL._SX679_.jpg",
  },
  {
    id: 3,
    Name: "moto Razr",
    desc: "An apple mobile which is nothing like apple",
    price: 549,
    img: "https://m.media-amazon.com/images/I/41ly8nt+vAL._SY300_SX300_.jpg",
  },
  {
    id: 4,
    Name: "realme11 pro+ 5g",
    desc: "An apple mobile which is nothing like apple",
    price: 549,
    img: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/t/k/m/11-pro-5g-rmx3741-realme-original-imagq6asfa6hg5eu.jpeg?q=70"
   },
  {
    id: 5,
    Name: "moto razr 40",
    desc: "An apple mobile which is nothing like apple",
    price: 549,
    img: "https://motorolain.vtexassets.com/arquivos/ids/155576-800-auto?width=800&height=auto&aspect=true",
  },
  {
    id: 6,
    Name: "moto g32",
    desc: "An apple mobile which is nothing like apple",
    price: 549,
    img: "https://m.media-amazon.com/images/I/51HIYwQudTL._SY741_.jpg",
  },
];
let refPersons = [
  { id: 1, name: "Admin", email: "admin@kumaran.com", password: "admin" },
  { id: 2, name: "Ranjith", email: "ranjith@kumaran.com", password: "ranjith" },
  { id: 3, name: "Kaviya", email: "kaviya@kumaran.com", password: "kaviya" },
  { id: 4, name: "Mohan", email: "mohan@kumaran.com", password: "mohan" },
];

window.addEventListener("load", () => {
  if (!localStorage.getItem("items")) {
    localStorage.setItem("items", JSON.stringify(RefProduct));
  }

  if (!localStorage.getItem("person")) {
    localStorage.setItem("person", JSON.stringify(refPersons));
  }

  if (location.pathname === "/e-commerce-website/admin/home.html") {
    ProductInAdminPage();
  }

  if (location.pathname === "/e-commerce-website/index.html") {
    ProductInindexPage();
    usershow();
  }

  if (
    location.pathname === "/e-commerce-website/index.html" ||
    location.pathname === "/e-commerce-website/cart.html" ||
    location.pathname === "/e-commerce-website/orders.html"
  ) {
    CartCount();
  }

  if (location.pathname === "/e-commerce-website/cart.html") {
    ProductIncartPage();
  }

  if (location.pathname === "/e-commerce-website/orders.html") {
    ProductinOrderPage();
  }

  if (location.pathname === "/e-commerce-website/admin/order.html") {
    OrderAdminPage();
  }

  if (location.pathname === "/e-commerce-website/admin/add-product.html") {
    const parameter = new URL(document.location).searchParams;
    const Id = parameter.get("id");

    if (Id) {
      const products = JSON.parse(localStorage.getItem("items"));
      const product = products.find((product) => product.id === parseInt(Id));
      loadproducts(product);
    }
  }
});

// randomly generated number
const RandomNumber = (max = 500) => {
  return Math.floor(Math.random() * max);
};

// creating user id
const RandomId = (type = "person") => {
  let jsonArray = JSON.parse(localStorage.getItem(type));
  for (let i = 0; i < 10000; i++) {
    const randomId = RandomNumber();

    const checkingId = jsonArray.find((obj) => obj.id === randomId);
    if (!checkingId) {
      return randomId;
    }
  }
};

// sign In
const signInfn = () => {
  let mailformat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const email = document.getElementById("emailsign");
  const password = document.getElementById("passsign");
  const errors = document.getElementById("errors");

  if (email.value.length > 0 && password.value.length > 0) {
    if (email.value.match(mailformat)) {
      let persons = JSON.parse(localStorage.getItem("person"));

      const curruser = persons.find(
        (person) =>
          person.email === email.value && person.password === password.value
      );
      if (curruser) {
        sessionStorage.setItem("personId", curruser.id);
        if (email.value === "admin@kumaran.com")
          location.href = "/e-commerce-website/admin/home.html";
        else location.replace("/e-commerce-website/index.html");
      } else {
        errors.innerText = "Invalid Credentials";
      }
    } else errors.innerText = "please enter a valid email";
  } else {
    errors.innerText = "please enter email and password";
    email.focus();
  }
};

const signUpfn = () => {
  let mailformat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const name = document.getElementById("namer");
  const email = document.getElementById("emailr");
  const password = document.getElementById("passr");
  const cPassword = document.getElementById("cpassr");
  const errorr = document.getElementById("errorr");

  if (
    email.value.length > 0 &&
    password.value.length > 0 &&
    name.value.length > 0 &&
    cPassword.value.length > 0
  ) {
    if (email.value.match(mailformat)) {
      if (password.value === cPassword.value) {
        let persons = JSON.parse(localStorage.getItem("person"));
        console.log(persons);
        const exuser = persons.find((person) => person.email === email.value);
        if (exuser) {
          errorr.innerText = "User with this email already exists";
        } else {
          persons.push({
            id: RandomId(),
            name: name.value,
            email: email.value,
            password: password.value,
          });
        }

        localStorage.setItem("person", JSON.stringify(persons));
        window.location.replace("/e-commerce-website/login.html");
      } else {
        errorr.innerText = "Password doesn't match!!!";
      }
    } else errorr.innerText = "Please Enter Valid Email";
  } else {
    errorr.innerText = "all fields are required ,  please enter the details";
  }
  if (name.value == "") name.focus();
  if (email.value == "") email.focus();
  if (password.value == "" && password.value.length < 4) {
    password.focus();
    errorr.innerText = "please enter password atleast 8 characters.";
  }
  if (cPassword.value == "" && cPassword.value.length < 4) cPassword.focus();
};

const productupdate = () => {
  const name = document.getElementById("name");
  const pid = document.getElementById("id");
  const price = document.getElementById("price");
  const description = document.getElementById("Desc");
  const image = document.getElementById("img-input");

  let items = JSON.parse(localStorage.getItem("items"));

  let id = pid.value;
  if (id) {
    const item = items.find((item) => item.id === parseInt(id));

    items = items.filter((item) => item.id !== parseInt(id));
    items.push({
      ...item,
      Name: name.value,
      desc: description.value,
      price: price.value,
      img: image.value,
    });
  } else {
    items.push({
      id: RandomId("items"),
      Name: name.value,
      desc: description.value,
      price: price.value,
      img: image.value,
    });
  }

  localStorage.setItem("items", JSON.stringify(items));
  location.href = "/e-commerce-website/admin/home.html";
};

const ProductInAdminPage = () => {
  const itemstable = document.getElementById("productsBody");
  const items = JSON.parse(localStorage.getItem("items"));

  let productbody = "";
  for (let item of items) {
    productbody += `<tr>
    <td><img src="${item.img}" alt="image" class="img-fluid img-thumbnail" style="width:100px;height:"50px;"/></td>
    <td>${item.Name}</td>
    <td>${item.desc}</td>
    <td> ₹ ${item.price}</td>
    <td class="d-flex justify-content-center">
      <button class="btn btn-primary me-2" onClick="editProduct(${item.id})">Edit</button>
      <button class="btn btn-danger" onClick="deleteProduct(${item.id})">Delete</button>
    </td>
  </tr>`;
  }

  itemstable.innerHTML = productbody;
};

// delete product - admin page
const deleteProduct = (id) => {
  const items = JSON.parse(localStorage.getItem("items"));
  const filtereditems = items.filter((item) => item.id !== id);
  localStorage.setItem("items", JSON.stringify(filtereditems));
  ProductInAdminPage();
};

// edit product - admin page
const editProduct = (id) => {
  location.href = `/e-commerce-website/admin/add-product.html?id=${id}`;
};

// loading products value in add-product page
const loadproducts = (items) => {
  const name = document.getElementById("name");
  const pid = document.getElementById("id");
  const price = document.getElementById("price");
  const description = document.getElementById("Desc");
  const image = document.getElementById("img-input");
  const edittitle = document.getElementById("edit-title");
  const button = document.getElementById("btn");

  pid.value = items.id;
  name.value = items.Name;
  price.value = items.price;
  description.value = items.desc;
  image.value = items.img;
  edittitle.innerText = "Edit Product";
  button.innerHTML = "Update Product";

  location.href = "/e-commerce-website/admin/home.html";
};

// loading products in home page
const ProductInindexPage = () => {
  const productstable = document.getElementById("products");
  const items = JSON.parse(localStorage.getItem("items"));

  let tablebody = "";
  for (let item of items) {
    tablebody += `<div class="col-3 mt-4">
    <div
      class="border rounded border-primary-subtle w-100 d-flex flex-column p-2"
    >
      <img src="${item.img}" alt="image" style="min-width:160px;height:200px" />
      <p class="fs-5 my-1 mt-2 text-center">${item.Name}</p>
      <p class="fs-4 my-1 mb-2 text-center">₹ ${item.price}</p>
      <button class="btn btn-success" onClick="addToCart(${item.id})">Add to Cart</button>
    </div>
  </div>`;
  }

  productstable.innerHTML = tablebody;
};


const addToCart = (id) => {
  let items = JSON.parse(localStorage.getItem("items"));
  const item = items.find((product) => product.id === parseInt(id));

  if (!sessionStorage.getItem("personId")) {
    location.href = "/e-commerce-website/login.html";
  } else {
    let personId = parseInt(sessionStorage.getItem("personId"));
    let cartarray = [];
    if (localStorage.getItem("cart")) {
      cartarray = JSON.parse(localStorage.getItem("cart"));
    }

    const cartProduct = cartarray.find(
      (cart) => cart.personId === parseInt(personId) && cart.id === parseInt(id)
    );
    if (cartProduct) {
      cartarray = cartarray.map((cart) => {
        if (cart.id === parseInt(id) && cart.personId === parseInt(personId)) {
          return { ...cart, count: cart.count + 1 };
        } else {
          return cart;
        }
      });
    } else {
      cartarray.push({ personId: parseInt(personId), count: 1, ...item });
    }

    localStorage.setItem("cart", JSON.stringify(cartarray));
    CartCount();
  }
};

const CartCount = () => {
  const cartCountref = document.getElementById("cartCount");
  const personId = parseInt(sessionStorage.getItem("personId"));

  if (!personId) {
    location.href = "/e-commerce-website/login.html";
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const userCart = cart.filter((c) => c.personId === personId);
  const cartCount = userCart.reduce((acc, curr) => acc + curr.count, 0);

  cartCountref.innerText = `Cart - ${cartCount}`;
};

const ProductIncartPage = () => {
  const cartTable = document.getElementById("cart-items");
  const total = document.getElementById("total");
  const subtotal = document.getElementById("subtotal");
  const shipping = document.getElementById("shipping");
  const Tax = document.getElementById("tax");
  const emptyCart = document.getElementById("emptyCart");
  const table = document.getElementById("table");

  let shival = (shipping.value = 100);
  let taxval = (Tax.value = 100);

  if (localStorage.getItem("cart")) {
    const carts = JSON.parse(localStorage.getItem("cart"));

    if (sessionStorage.getItem("personId")) {
      const personId = parseInt(sessionStorage.getItem("personId"));
      const userCart = carts.filter((cart) => cart.personId === personId);

      if (userCart.length > 0) {
        table.classList.remove("visually-hidden");
        emptyCart.classList.add("visually-hidden");
      } else {
        emptyCart.classList.remove("visually-hidden");
        table.classList.add("visually-hidden");
      }

      let body = "";
      let totalprice = 0;
      for (let cartItem of userCart) {
        totalprice =
          totalprice + parseInt(cartItem.count) * parseInt(cartItem.price);
        const count = cartItem.count * cartItem.price;
        body += `<tr>
                  <td>${cartItem.Name}</td>
                  <td>${cartItem.count}</td>
                  <td>${cartItem.price}</td>
                  <td>₹ ${count}</td>
                  <td> <button class="btn btn-danger" onClick="deletecart(${cartItem.id})">Delete</button> </td>
                </tr>`;
      }
      cartTable.innerHTML = body;

      subtotal.innerText = ` ₹ ${totalprice}`;
      shipping.innerText = `₹ ${shival}`;
      Tax.innerText = `₹ ${taxval}`;
      total.innerText = `₹ ${totalprice + shival + taxval}`;
    } else {
      location.href = "/e-commerce-website/login.html";
    }
  }
};

const deletecart = (id) => {
  const carts = JSON.parse(localStorage.getItem("cart"));
  const updatedcart = carts.filter((cart) => cart.id !== id);
  localStorage.setItem("cart", JSON.stringify(updatedcart));
  ProductIncartPage();
};

// checkout
const Checkout = () => {
  debugger;
  if (sessionStorage.getItem("personId")) {
    if (localStorage.getItem("cart")) {
      const carts = JSON.parse(localStorage.getItem("cart"));
      const personId = parseInt(sessionStorage.getItem("personId"));
      const userCart = carts.filter((cart) => cart.personId === personId);

      let orders = [];
      if (localStorage.getItem("orders")) {
        orders = JSON.parse(localStorage.getItem("orders"));
      }
      orders.push({
        timestamp: Date.now(),
        userId: personId,
        status: "Pending",
        products: userCart,
      });

      console.log(orders.value);

      const otherUserCart = carts.filter((cart) => cart.personId !== personId);
      localStorage.setItem("cart", JSON.stringify(otherUserCart));
      localStorage.setItem("orders", JSON.stringify(orders));
      console.log(orders);
      CartCount();
      location.href = "/e-commerce-website/orders.html";
    } else {
      location.href = "/e-commerce-website/index.html";
    }
  } else {
    location.href = "/e-commerce-website/login.html";
  }
};

const ProductinOrderPage = () => {
  const tableRef = document.getElementById("order-items");

  if (sessionStorage.getItem("personId")) {
    if (localStorage.getItem("orders")) {
      const orders = JSON.parse(localStorage.getItem("orders"));
      const userId = parseInt(sessionStorage.getItem("personId"));
      const userOrder = orders.filter((order) => order.userId === userId);

      let orderbody = "";
      for (let order of userOrder) {
        let product = "";
        let total = 0;
        for (let prod of order.products) {
          product += `<p>${prod.count} * ${prod.Name}</p>`;
          total += prod.count * prod.price;
        }

        const date = new Date(order.timestamp);
        const formattedDate =
          date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

        orderbody += `<tr>
            <td>${order.timestamp}</td>
            <td>${formattedDate}</td>
            <td>${product}</td>
            <td>₹ ${total}</td>
            <td>${order.status}</td>
          </tr>`;
      }
      tableRef.innerHTML = orderbody;
    } else {
      location.href = "/e-commerce-website/index.html";
    }
  } else {
    location.href = "/e-commerce-website/login.html";
  }
};

const OrderAdminPage = () => {
  const tableRef = document.getElementById("order-items");

  if (sessionStorage.getItem("personId")) {
    if (localStorage.getItem("orders")) {
      const orders = JSON.parse(localStorage.getItem("orders"));

      let aobody = "";
      for (let order of orders) {
        let product = "";
        let total = 0;
        for (let prod of order.products) {
          product += `<p>${prod.count} * ${prod.Name}</p>`;
          total += prod.count * prod.price;
        }

        const date = new Date(order.timestamp);
        const formattedDate =
          date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

        const persons = JSON.parse(localStorage.getItem("person"));
        const orderedperson = persons.find(
          (user) => user.id === parseInt(order.userId)
        );

        aobody += `<tr>
            <td>${order.timestamp}</td>
            <td>${formattedDate}</td>
            <td>${orderedperson.name}</td>
            <td>${product}</td>
            <td>₹ ${total}</td>
            <td>
              <select class="form-select" id="status-${order.timestamp}">
                <option value="Pending">Pending</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </td>
          </tr>`;
      }
      tableRef.innerHTML = aobody;

      for (let order of orders) {
        const statusRef = document.getElementById(`status-${order.timestamp}`);
        statusRef.value = order.status;
        statusRef.addEventListener("change", () => {
          const lastUpdatedOrders = JSON.parse(localStorage.getItem("orders"));
          const updatedOrders = lastUpdatedOrders.map((o) => {
            if (o.timestamp === order.timestamp) {
              return { ...o, status: statusRef.value };
            } else return o;
          });
          localStorage.setItem("orders", JSON.stringify(updatedOrders));
        });
      }
    } else {
      location.href = "/e-commerce-website/index.html";
    }
  } else {
    location.href = "/e-commerce-website/login.html";
  }
};

const usershow = () => {
  let guest = document.getElementById("Guest");
  let user = document.getElementById("user");

  let persons = JSON.parse(localStorage.getItem("person"));
  let personId = parseInt(sessionStorage.getItem("personId"));
  const curruser = persons.find((person) => person.id === personId);

  user.innerText = `Welcome    ${curruser.name}`;

  if (sessionStorage.getItem("personId")) {
    user.classList.remove("visually-hidden");
    guest.classList.add("visually-hidden");
  } else {
    guest.classList.add("visually-hidden");
    user.classList.remove("visually-hidden");
  }
};
