const { Model } = require('objection');

const env = require('./../env');

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: env.db_host,
        user: env.db_user,
        password: env.db_password,
        database: env.db_name,
        port: 3306
    }
});

Model.knex(knex);

class Base extends Model {
}

module.exports = Base;
