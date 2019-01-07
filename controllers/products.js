const productsModel = require('./../models/products')

class ProductsCtrl {
    static getAll() {
        const products = productsModel.getAll();

        return products;
    }
}

module.exports = ProductsCtrl;
