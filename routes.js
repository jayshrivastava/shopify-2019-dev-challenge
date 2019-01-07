const productsCtrl = require('./controllers/products')

module.exports = function(app){

    app.get('/', async function (req, res) {
    
        const allProducts  = await productsCtrl.getAll();

        res.send(allProducts);
    });

    app.get('/available', async function (req, res) {
    
        const allAvailableProducts = await productsCtrl.getAllAvailable();

        res.send(allAvailableProducts);
    });

}