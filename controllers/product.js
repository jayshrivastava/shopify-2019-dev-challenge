const productsModel = require('../models/product')
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

    static async seed() {

        let result = await productsModel.restoreA();
        result = await productsModel.restoreB();
        result = await productsModel.restoreC();
        result = await productsModel.restoreD();


        let products = await productsModel.getAll();

        return products;
    }
}

module.exports = ProductCtrl;
