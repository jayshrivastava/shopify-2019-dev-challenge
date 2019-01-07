const Base = require('./base')

class Product extends Base {
    static get tableName() {
        return 'products';
    }

    static get idColumn() {
        return 'id';
    }
    
    static getAll() {
        return this.query().orderBy(this.idColumn);
    }
}

module.exports = Product;
