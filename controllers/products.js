const productsModel = require('./../models/products')
const _ = require('lodash');

class ProductCtrl {
    static getAll() {
        const products = productsModel.getAll();

        return products;
    }

    static async getAllAvailable() {
        let products = await productsModel.getAll();

        products = _.filter(products, (product) => {
            return product.inventory_count !== 0;
        });

        return products;
    }
}

module.exports = ProductCtrl;
