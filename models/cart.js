const Base = require('./base')

class CartModel extends Base {

    static get tableName() {
        return 'cartitems';
    }

    // Cart ID Defaults to 1 since there is only 1 cart
    static get cartId() {
        return 1;
    }

    static get idColumn() {
        return 'id';
    }
    
    static getAll() {
        return this.query()
            .leftJoin('cart', 'cartitems.cart_id', 'cart.id')
            .orderBy(this.idColumn);
    }

    static updateQuantity(id, value) {
        return this.query()
            .where({ id: id })
            .update({ quantity: value })
    }

    static deleteItem(id) {
        return this.query()
            .where({ id: id })
            .del()
    }

    static addItem(id, title) {
        return this.query()
            .insert({ 
                product_id: id, 
                quantity: 1, 
                title: title, 
                cart_id: this.cartId
            })
    }
}

module.exports = CartModel;
