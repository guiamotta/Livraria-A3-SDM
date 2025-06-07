const { default: knex } = require("knex");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "database.db");

if (fs.existsSync(dbPath)) {
    console.log("O arquivo database.db não foi criado pois ele já existe!");
}
else{
    fs.writeFileSync(dbPath, "");

    const db_initializer = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, async (err) => {
        if (err) return console.error(err.message);

        console.log("Conexão bem sucedida");

        await init_all();

        db_initializer.close((err) => {
            if (err) {
                console.warn("Erro ao encerrar o inicializador");
                console.log(err);
                return;
            }

            console.log("O inicializador foi encerrado com sucesso");
        });

        // Testando knex
        const db = knex({
            client: 'sqlite3',
            connection: {
                filename: dbPath
            },
            useNullAsDefault: true
        });

        db.select('tbl_name').from('sqlite_master').where({ type: 'table' }).then(
            (values) => {
                console.log("knex funcionando");
                console.log(values);
                db.destroy();
            }).catch((err) => {
                console.log("knex error");
                console.log(err);
                db.destroy();
            });
    });

    function init_all() {
        return Promise.all([
            init_users(),
            init_books(),
            init_rent()
        ]);
    }

    function init_users() {
        return new Promise((resolve) => {
            db_initializer.run(
                `CREATE TABLE IF NOT EXISTS usuario(
                    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                    nome varchar(128) NOT NULL,
                    email varchar(64) NOT NULL,
                    cpf varchar(11),
                    senha varchar(30)
                )`,
                (err) => {
                    if (err) {
                        console.log("Erro ao criar tabela usuario");
                        console.log(err);
                    } else {
                        console.log("Tabela usuario criada");
                    }
                    resolve();
                }
            );
        });
    }

    function init_books() {
        return new Promise((resolve) => {
            db_initializer.run(
                `CREATE TABLE IF NOT EXISTS livro(
                    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                    titulo varchar(128) NOT NULL,
                    categoria varchar(64) NOT NULL
                )`,
                (err) => {
                    if (err) {
                        console.log("Erro ao criar tabela livro");
                        console.log(err);
                    } else {
                        console.log("Tabela livro criada");
                    }
                    resolve();
                }
            );
        });
    }

    function init_rent() {
        return new Promise((resolve) => {
            db_initializer.run(
                `CREATE TABLE IF NOT EXISTS livro_emprestado(
                    id_usuario INTEGER NOT NULL,
                    id_livro INTEGER NOT NULL,
                    data_emprestimo DATE NOT NULL,
                    data_entrega DATE NOT NULL
                )`,
                (err) => {
                    if (err) {
                        console.log("Erro ao criar tabela livro_emprestado");
                        console.log(err);
                    } else {
                        console.log("Tabela livro_emprestado criada");
                    }
                    resolve();
                }
            );
        });
    }
}