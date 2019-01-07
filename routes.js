const productsCtrl = require('./controllers/products')

module.exports = function(app){

    app.get('/', async function (req, res) {
    
        const allProducts  = await productsCtrl.getAll();

        res.send(allProducts);
    });

}