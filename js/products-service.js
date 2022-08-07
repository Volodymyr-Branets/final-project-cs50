class ProductsService {
    constructor() {
        if (!ProductsService._instance) ProductsService._instance = this;
        return ProductsService._instance;
    }
    // Get products from array in json file (Can be changed to server part)
    async getProducts() {
        if (!this.products) {
            this.products = await( await fetch('api/products.json') ).json();
        }
        return this.products;
    }
    // Search product by id
    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(product => product.id === id);
    }
}