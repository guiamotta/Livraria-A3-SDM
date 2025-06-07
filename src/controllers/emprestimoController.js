const Emprestimo = require("../models/emprestimoModel")
const errors = require("restify-errors")
const emprestimoView = require("../views/emprestimoView")

//função que retorna todos os emprestimos
async function getAll(req, res){
  try{
    const emprestimos = await Emprestimo.getAll()
    res.send(await emprestimoView.viewAllEmprestimos(emprestimos))
  }
  catch (err){
    res.send(new errors.InternalServerError("Erro ao buscar emprestimos"))
  }
}

async function getByUserId(req, res){
  const id = req.params.idUser
  try{
    const emprestimos = await Emprestimo.getAllRentedByUserId(id);
      res.send(await emprestimoView.viewAllEmprestimos(emprestimos));
  }
  catch (err){
    res.send(new errors.InternalServerError(`Erro ao buscar emprestimos pelo cliente com ID ${id}`))
  }
}

async function getByBookId(req, res){
  const id = req.params.idBook
  try{
    const emprestimos = await Emprestimo.getAllByBookId(id);
      res.send(emprestimos);
  }
  catch (err){
    res.send(new errors.InternalServerError(`Erro ao buscar emprestimos pelo cliente com ID ${id}`))
  }
}

async function getUserBookRent(req, res){
  const id_user = req.params.idUser;
  const id_book = req.params.idBook;
  try{
    const emprestimo = await Emprestimo.getRentListing(id_user, id_book)
      if (!emprestimo){
        res.send(404, {message: `O aluguel do livro com ID ${id_book} feito pelo usuário com ID ${id_user} não foi encontrado`})
      }
      res.send(await emprestimoView.viewEmprestimo(emprestimo))
  }
  catch (err){
    res.send(new errors.InternalServerError(`Erro ao buscar o aluguel do livro com ID ${id_book} feito pelo usuário com ID ${id_user}.`))
  }
}

//função que cria um emprestimo baseado nos dados fornecidos
async function create(req, res){ 
  try {
    await Emprestimo.create(req.body)

    const { id_usuario, id_livro } = req.body
    const emprestimoNew = await Emprestimo.getRentListing(id_usuario, id_livro)

    res.send(201, await emprestimoView.viewEmprestimo(emprestimoNew))
  } catch (err) {
    console.error("Erro ao criar emprestimo:", err)
    res.send(new errors.InternalServerError("Erro ao criar emprestimo"))
  }
}

//função que atualiza os dados de um emprestimo baseado nos dados fornecidos
async function update(req, res){
    const id_user = req.params.idUser;
    const id_book = req.params.idBook;
    try{
        const listingUpdated = await Emprestimo.updateRentListing(id_user, id_book, req.body);
            if (!listingUpdated) {
            res.send(404, {message: `O aluguel do livro com ID ${id_book} feito pelo usuário com ID ${id_user} não foi encontrado.`})
        }
        res.send(200, {success: true})
    }
  catch (err){
    res.send(new errors.InternalServerError(`Erro ao atualizar o aluguel do livro com ID ${id_book} feito pelo usuário com ID ${id_user}.`))
  }
}

//função que atualiza os dados de um emprestimo baseado nos dados fornecidos
async function remove(req, res){
    const id_user = req.params.idUser;
    const id_book = req.params.idBook;
    try{
        const listingDeleted = await Emprestimo.removeRentListing(id_user, id_book, req.body);
            if (!listingDeleted) {
            res.send(404, {message: `O aluguel do livro com ID ${id_book} feito pelo usuário com ID ${id_user} não foi encontrado.`})
        }
        res.send(200, {success: true})
    }
  catch (err){
    res.send(new errors.InternalServerError(`Erro ao remover o emprestimo do usuário com ID ${id_user} do livro com ID ${id_book}`))
  }
}

async function patch(req, res){
  const id_user = req.params.idUser;
    const id_book = req.params.idBook;
  try {
    const emprestimoAtual = await Emprestimo.getRentListing(id_user, id_book);
    if (!emprestimoAtual){
      return res.send(404, {message: `O aluguel do livro com ID ${id_book} feito pelo usuário com ID ${id_user} não foi encontrado.`})
    }

    const dadosAtualizados = {...emprestimoAtual, ...req.body}
    await Emprestimo.patchRentListing(id_user, id_book, dadosAtualizados)
    res.send(200, {success: true})
  } catch (err) {
    res.send(new errors.InternalServerError(`Erro ao aplicar patch no aluguel do livro com ID ${id_book} feito pelo usuário com ID ${id_user}.`))
  }
}

module.exports = {
    getAll,
    getByUserId,
    getByBookId,
    getUserBookRent,
    create,
    update,
    remove,
    patch
}