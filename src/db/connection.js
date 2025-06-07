const { default: knex } = require("knex");

const init = require("./initDB")

const db = knex(
    {
        client: 'sqlite3',
        connection: {
            filename: __dirname + '/database.db'
        }
    }
)

exports.db = db;