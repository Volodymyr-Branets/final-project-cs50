// Make all products list
class ProductList {
  constructor() {
    this.container = document.querySelector(".products-container");
    this.productsService = new ProductsService();
    this.renderProducts();
  }
  // Render products
  async renderProducts() {
    let productListDomString = "";
    const products = await this.productsService.getProducts();
    products.forEach((product) => {
      productListDomString += this.createProductDomString(product);
    });
    this.container.innerHTML = productListDomString;
    this.addEventListeners();
  }
  // Create product card
  createProductDomString(product) {
    return `<article class="card col-12 col-sm-6 col-md-4 col-lg-3 bg-dark text-light">
                    <img src="img/${product.image}" class="rounded card-img-top m-1" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                        <a href="#" id="btn-info" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#product-info-modal" data-id=${product.id}>Info</a>
                        <a href="#" id="btn-buy" class="btn btn-warning btn-buy" data-id=${product.id}> $${product.price} Buy</a>
                    </div>
                </article>`;
  }
  // Add listeners
  addEventListeners() {
    document.querySelectorAll("#btn-info").forEach((btn) => {
      btn.addEventListener("click", this.showProductInfo.bind(this));
    });
    document.querySelectorAll("#btn-buy").forEach((btn) => {
      btn.addEventListener("click", this.addProductToCart.bind(this));
    });
  }
  // Create modal window for product
  async showProductInfo(event) {
    const id = event.target.dataset.id;
    const product = await this.productsService.getProductById(id);
    const modal = document.querySelector("#product-info-modal");
    modal.querySelector(".modal-title").innerHTML = product.title;
    modal.querySelector(".product-image").src = `img/${product.image}`;
    modal.querySelector(".product-description").innerHTML = product.description;
    modal.querySelector(".product-price").innerHTML = `$${product.price}`;
    modal.querySelector("#btn-buy").dataset.id = product.id;
  }
  // Function for add product to cart
  addProductToCart(event) {
    const id = event.target.dataset.id;
    const cart = new Cart();
    cart.addProduct(id);
    window.showAlert("Thanks! Go to cart and make order.");
  }
}
new ProductList();
