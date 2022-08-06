class ProductList {
    constructor() {
        this.container = document.querySelector('.products-container');
        this.productsService = new ProductsService();
        this.renderProducts();
    }
    async renderProducts() {
        let productListDomString = '';
        const products = await this.productsService.getProducts();
        const idList = [];
        for (let i = 0; i <= 3; i++){
            let randomIndex = Math.floor(Math.random() * 8) + 1;
            while (idList.includes(randomIndex)){
                randomIndex = Math.floor(Math.random() * 8) + 1;
            }

            idList.push(randomIndex);
            productListDomString += this.createProductDomString(products[randomIndex]);
            }
        // products.some(product => {
        //     productListDomString += this.createProductDomString(product);
        // });
        this.container.innerHTML = productListDomString;
        this.addEventListeners();
    }
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
    addEventListeners() {
        document.querySelectorAll('#btn-info').forEach(btn => {
            btn.addEventListener('click', this.showProductInfo.bind(this));
        });
        document.querySelectorAll('#btn-buy').forEach(btn => {
            btn.addEventListener('click', this.addProductToCart.bind(this));
        });
    }
    async showProductInfo(event) {
        const id = event.target.dataset.id;
        const product = await this.productsService.getProductById(id);
        const modal = document.querySelector('#product-info-modal');
        modal.querySelector('.modal-title').innerHTML = product.title;
        modal.querySelector('.product-image').src = `img/${product.image}`;
        modal.querySelector('.product-description').innerHTML = product.description;
        modal.querySelector('.product-price').innerHTML = `$${ product.price }`;
        modal.querySelector('#btn-buy').dataset.id = product.id;
    }
    addProductToCart(event) {
        const id = event.target.dataset.id;
        const cart = new Cart();
        cart.addProduct(id);
        cart.updateCart();
        window.showAlert("Thanks! Now you can go to the cart.");
    }
    // hideProductInfo(event) {
    //     const id = event.target.dataset.id;
    //     const modal = document.querySelector('#product-info-modal');
    //     modal.
    // }
}
new ProductList();