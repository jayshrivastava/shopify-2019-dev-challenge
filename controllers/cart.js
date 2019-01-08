const cartModel = require('./../models/cart');
const productModel = require('../models/product');
const _ = require('lodash');

class CartCtrl {
    static async getAll() {
        const cartItems = await cartModel.getAll();

        const products = await productModel.getAll();

        let price = 0;

        _.forEach(cartItems, (item) => {

            let p = _.find(products, (product) => {

                return product.id == item.product_id;
            });

            price += p.price * item.quantity;

        });

        cartItems.push({
            total_price: price
        });

        return cartItems;
    }

    static async finalize() {

        const cartItems = await cartModel.getAll();

        const products = await productModel.getAll();

        _.forEach(cartItems, async (item) => {

            let product = _.find(products, (product) => {

                return product.id == item.product_id;
            });

            let result = await productModel.updateQuantity(item.product_id, product.inventory_count - item.quantity);

            let result2 = await cartModel.deleteItem(item.id);
        });

        return;
    }

    static async addProduct(id) {

        let availableProducts = await productModel.getAll();

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

            return product.product_id == id;
        });

        if (cartItem) {

            if (cartItem.quantity + 1 > item.inventory_count) {

                return 2;
            }
            cartItem.quantity += 1;
    
            let result = await cartModel.updateQuantity(cartItem.id, cartItem.quantity);
        } else {

            if (item.inventory_count == 0) {

                return 3;
            }

            let result = await cartModel.addItem(item.id);
        }

        let products = await this.getAll();

        return products;
    }
}

module.exports = CartCtrl;
