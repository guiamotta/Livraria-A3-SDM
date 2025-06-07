const connection = require("../db/connection")
const db = connection.db;

const Livro = {
  //método para retornar todos os livros
  getAll: () => db("livro"),
  //método para retornar um livro dado um id
  getById: (id) => db("livro").where("id", id).first(),
  //método para criar um livro a partir dos dados fornecidos
  create: (data) => db("livro").insert(data),
  //método para atualizar os dados de um livro de certo id a partir dos dados fornecidos
  update: (id, data) => db("livro").where("id", id).update(data),
  //método para deletar um livro com certo id
  remove: (id) => db("livro").where("id", id).delete(),
  //método para atualizar parcialmente os dados
  patch: (id, data) => db("livro").where("id", id).update(data)
}

module.exports = Livro