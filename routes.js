const productsCtrl = require('./controllers/product');
const cartCtrl = require('./controllers/cart')
const _ = require('lodash');
const Joi = require('joi');

module.exports = function(app){

    app.get('/products', async function (req, res) {
    
        let products; 

        const { available } = req.query;

        let isTrueSet = (available === 'true');

        if (isTrueSet === true) {

            products = await productsCtrl.getAllAvailable();
        } else {

            products = await productsCtrl.getAll();
        }

        res.send(products);
    });

    app.get('/cart/add', async function (req, res) {

        let { id } = req.query;

        const schema = Joi.number().integer();

        if (!id || !_.isNull(schema.validate(id).error)) {

            res.send('400 Bad Request This route requires a valid Id param');
        }

        let result = await cartCtrl.addProduct(id);

        // No product w/ that ID exists
        if (result == 1) {
            res.send('A product with that Id does not exist');
        }

        // Max Quantity already added to cart
        if (result == 2) {
            res.send('You cannot add any more of that item because your cart already contains the maximum quanitity');
        }

        // Item is out of stock
        if (result == 3) {
            res.send('That item is out of stock');
        }

        // returns cart
        res.send(result);
    });

    app.get('/cart/complete', async function (req, res) {

        let result = await cartCtrl.finalize();

        let products = await productsCtrl.getAll();

        res.send(products);
    });

    app.get('/cart', async function (req, res) {

        const cart  = await cartCtrl.getAll();

        res.send(cart);
    });

    app.get('/seed', async function (req, res) {

        const result = await productsCtrl.seed();

        res.send(result);
    });

    app.get('/' function(req, res) {

        res.send('Hello! Welcome to my demo store. To get started, take a look at my docs: https://docs.google.com/document/d/10cMZbEKedTUVhjr9BGujyjxBn--PgvurcqpknggAfYA/edit?usp=sharing');
    });
}