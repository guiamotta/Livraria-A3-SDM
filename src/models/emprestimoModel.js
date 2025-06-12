const connection = require("../db/connection")
const db = connection.db

const Emprestimo = {
    //Método para retornar todos os emprestimos.
    getAll: () => db("livro_emprestado"),
    //Método para retornar todos os livros que um usuário alugou.
    getAllRentedByUserId: (id) => db("livro_emprestado").where("id_usuario", id),
    //Método para retornar todos os alugueis de um livro.
    getAllByBookId: (id) =>  db("livro_emprestado").where("id_livro", id),
    //Método para criar um aluguel especifico que um usuário fez de um livro.
    create: (data) => db("livro_emprestado").insert(data),
    //Método para retornar um aluguel especifico que um usuário fez de um livro.
    getRentListing: (user_id, book_id) => db("livro_emprestado").where("id_usuario", user_id).andWhere("id_livro", book_id).first(),
    //Método para atualizar um aluguel especifico que um usuário fez de um livro.
    updateRentListing: (user_id, book_id, data) => db("livro_emprestado").where("id_usuario", user_id).andWhere("id_livro", book_id).update(data),
    //Método para remover um aluguel especifico que um usuário fez de um livro.
    removeRentListing: (user_id, book_id) => db("livro_emprestado").where("id_usuario", user_id).andWhere("id_livro", book_id).delete(),
    //método para atualizar parcialmente os dados
    patchRentListing: (user_id, book_id, data) => db("livro_emprestado").where("id_usuario", user_id).andWhere("id_livro", book_id).update(data)
}

module.exports = Emprestimo