const connection = require("../db/connection")
const db = connection.db;

const Usuario = {
  //método para retornar todos os usuarios
  getAll: () => db("usuario"),
  //método para retornar um usuario dado um id
  getById: (id) => db("usuario").where("id", id).first(),
  //método para criar um usuario a partir dos dados fornecidos
  create: (data) => db("usuario").insert(data),
  //método para atualizar os dados de um usuario de certo id a partir dos dados fornecidos
  update: (id, data) => db("usuario").where("id", id).update(data),
  //método para deletar um usuario com certo id
  remove: (id) => db("usuario").where("id", id).delete(),
  //método para atualizar parcialmente os dados
  patch: (id, data) => db("usuario").where("id", id).update(data)

}

module.exports = Usuario