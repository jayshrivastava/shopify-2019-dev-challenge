const productsCtrl = require('./controllers/product');
const cartCtrl = require('./controllers/cart')
const Boom = require('boom');
const _ = require('lodash');

module.exports = function(app){

    app.get('/products', async function (req, res) {
    
        const allProducts  = await productsCtrl.getAll();

        res.send(allProducts);
    });

    app.get('/products/available', async function (req, res) {
    
        const allAvailableProducts = await productsCtrl.getAllAvailable();

        res.send(allAvailableProducts);
    });

    app.get('/cart/add', async function (req, res) {

        const { id } = req.query;

        if (!id) {

            res.send('400 Bad Request This route requires a valid Id param');
        }

        let result = await cartCtrl.addProduct(id);

        if (result == 1) {
            res.send('A product with that Id does not exist');
        }

        if (result == 2) {
            res.send('You cannot add any more of that item because your cart already contains the maximum quanitity');
        }

        if (result == 2) {
            res.send('That item is out of stock');
        }

        res.send(result);
    });

    app.get('/cart/complete', async function (req, res) {

        let result = await cartCtrl.finalize();

        const products  = await productsCtrl.getAll();

        res.send(products);
    });

    app.get('/cart', async function (req, res) {

        const cart  = await cartCtrl.getAll();

        res.send(cart);
    });

    app.get('/products/seed', async function (req, res) {

        const result = await productsCtrl.seed();

        res.send(result);
    });
}