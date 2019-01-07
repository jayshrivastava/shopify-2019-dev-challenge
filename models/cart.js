const Base = require('./base')

class CartModel extends Base {
    static get tableName() {
        return 'cart';
    }

    static get idColumn() {
        return 'id';
    }
    
    static getAll() {
        return this.query().orderBy(this.idColumn);
    }

    static updateQuantity(id, value) {
        return this.query()
            .where({ id: id })
            .update({ quantity: value })
    }

    static addItem(id) {
        return this.query()
            .insert({ productid: id, quantity: 1})
    }
}

module.exports = CartModel;
