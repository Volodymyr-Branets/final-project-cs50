class Cart {
  constructor() {
    if (!Cart._instance) Cart._instance = this;
    this.container = document.querySelector(".cart-container");
    this.productsService = new ProductsService();
    this.updateCart();
    this.addEventListeners();
    this.updateBadge();
    this.renderCart();
    return Cart._instance;
  }
  // Function for listen
  addEventListeners() {
    document
      .querySelector(".cart")
      .addEventListener("click", this.renderCart.bind(this));
    document
      .querySelector(".order")
      .addEventListener("click", this.order.bind(this));
    this.saveCart();
    this.updateCart();
  }
  // Rendering cart
  async renderCart() {
    this.updateCart();
    let total = 0;
    // Render header
    let cartDomString = `
        <div class="row">
            <div class="col-5"><strong>Product</strong></div>
            <div class="col-3"><strong>Price</strong></div>
            <div class="col-2"><strong>Quantity</strong></div>
        </div>
        <hr/>`;
    // Render product list in cart
    for (const id in this.cart) {
      const product = await this.productsService.getProductById(id);
      total += product.price * this.cart[id];
      cartDomString += this.createCartProductDomString(product);
    }
    // Render footer total
    cartDomString += `
    <div class="row">
        <div class="col-5"><strong>TOTAL</strong></div>
        <div class="col-3"><strong>$${total.toFixed(2)}</strong></div>
    </div>`;

    this.container.innerHTML = cartDomString;
    // Change products quantity buttons
    this.container
      .querySelectorAll(".plus")
      .forEach((el) =>
        el.addEventListener("click", (ev) =>
          this.changeQuantity(ev, this.addProduct)
        )
      );
    this.container
      .querySelectorAll(".minus")
      .forEach((el) =>
        el.addEventListener("click", (ev) =>
          this.changeQuantity(ev, this.deleteProduct)
        )
      );
  }
  // Change products quantity function (increment or decrement)
  changeQuantity(ev, operation) {
    const id = ev.target.dataset.id;
    operation.call(this, id);
    this.renderCart();
  }
  deleteProduct(id) {
    if (this.cart[id] > 1) {
      this.cart[id] -= 1;
    } else {
      delete this.cart[id];
    }
    this.saveCart();
    this.updateBadge();
  }
  // Make product row in cart
  createCartProductDomString(product) {
    return `
        <div class="row" data-id="${product.id}">
            <div class="col-5">${product.title}</div>
            <div class="col-3">${product.price}</div>
            <div class="col-2">${this.cart[product.id]}</div>
            <div class="col-1"><button data-id=${
              product.id
            } class="btn btn-sm plus">+</button></div>
            <div class="col-1"><button data-id=${
              product.id
            } class="btn btn-sm minus">-</button></div>
        </div>
        <hr/>`;
  }
  // Adding product to cart
  addProduct(id) {
    this.cart[id] = this.cart[id] ? this.cart[id] + 1 : 1;
    this.saveCart();
    this.updateBadge();
  }
  // Function for save our cart at local storage
  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }
  // Update badge
  updateBadge() {
    document.querySelector(".cart-badge").innerHTML = Object.keys(
      this.cart
    ).length;
  }
  // Updating cart from existing storage
  updateCart() {
    this.cart = JSON.parse(localStorage.getItem("cart") || "{}");
  }
  // Make order
  async order(event) {
    // Check if cart is empty
    if (Object.keys(this.cart).length === 0) {
      window.showAlert("Please choose products to order", false);
      return;
    }
    // Render order message
    let orderList = "";
    let listNumber = 1;
    let totalAmount = 0;
    for (const id in this.cart) {
      const product = await this.productsService.getProductById(id);
      orderList += `${listNumber}. ${product.title} ($${
        product.price
      }/piece) - ${this.cart[id]} pieces - $${
        product.price * this.cart[id]
      } total\n`;
      listNumber++;
      totalAmount += product.price * this.cart[id];
    }
    orderList += `Total amount: $${totalAmount}`;
    const form = document.querySelector(".form-contacts");
    if (form.checkValidity()) {
      const data = new FormData();
      data.append("Order", orderList);
      data.append("Client name", form.querySelector("input[name=name]").value);
      data.append(
        "Client phone number",
        form.querySelector("input[name=phone]").value
      );
      data.append(
        "Client email",
        form.querySelector("input[name=email]").value
      );
      event.preventDefault();
      fetch("https://formspree.io/f/xdojnkvy", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: data,
      })
        .then((response) => {
          if (response.status === 200) {
            return response.text();
          } else {
            throw new Error("Cannot send form");
          }
        })
        .then((responseText) => {
          form.reset();
          this.cart = {};
          this.saveCart();
          this.updateBadge();
          this.renderCart();
          window.showAlert("Thanks for your order! We will call you soon.");
          document.querySelector("#modal-cart .close-btn").click();
        })
        .catch((error) =>
          window.showAlert("There is an error: " + error, false)
        );
    } else {
      window.showAlert("Please fill form correctly", false);
    }
  }
}

new Cart();
