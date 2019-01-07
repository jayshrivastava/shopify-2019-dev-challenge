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
}

module.exports = ProductModel;
