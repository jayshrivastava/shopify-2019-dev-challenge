const Base = require('./base')

class CartModel extends Base {

    static get tableName() {
        return 'cart';
    }

    static get idColumn() {
        return 'id';
    }
    
    static getAll() {
        return this.query()
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
            .insert({ product_id: id, quantity: 1, title: title})
    }
}

module.exports = CartModel;
