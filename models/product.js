const Base = require('./base')

class ProductModel extends Base {
    
    static get tableName() {
        return 'products';
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
            .update({ inventory_count: value })
    }

    static restoreA() {
        return this.query()
            .where({ id: 1 })
            .update({ inventory_count: 45 });
    }

    static restoreB() {
        return this.query()
        .where({ id: 2 })
        .update({ inventory_count: 30 })
    }

    static restoreC() {
        return this.query()
        .where({ id: 3 })
        .update({ inventory_count: 2 })
    }

    static restoreD() {
        return this.query()
        .where({ id: 4 })
        .update({ inventory_count: 0 })
    }

}

module.exports = ProductModel;
