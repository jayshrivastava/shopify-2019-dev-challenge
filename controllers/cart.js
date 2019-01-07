const cartModel = require('./../models/cart');
const productModel = require('../models/product');
const _ = require('lodash');

class CartCtrl {
    static getAll() {
        const products = cartModel.getAll();

        return products;
    }

    static async addProduct(id) {

        let availableProducts = await productModel.getAll();

        availableProducts = _.filter(availableProducts, (product) => {
            return product.inventory_count !== 0;
        });

        let currentCart = await cartModel.getAll();

        // Check for Existance

        let item = _.find(availableProducts, (product) => {
            return product.id == id;
        });
        
        if (!item) {
            return 1;
        }

        // Check Quanitities
        let cartItem = _.find(currentCart, (product) => {

            return product.id == id;
        });

        if (cartItem) {

            if (cartItem.quantity + 1 > item.inventory_count) {

                console.log('yo');
                return 2;
            }
            cartItem.quantity += 1;
    
            let result = await cartModel.updateQuantity(cartItem.id, cartItem.quantity);

        } else {

            let result = await cartModel.addItem(item.id);
        }

        let products = await cartModel.getAll();
        return products;
    }
}

module.exports = CartCtrl;
