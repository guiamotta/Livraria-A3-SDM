const Livro = require("../models/livroModel")
const errors = require("restify-errors")
const livroView = require("../views/livroView")

//função que retorna todos os livros
async function getAll(req, res){
  try{
    const livros = await Livro.getAll()
    res.send(livroView.viewAllLivros(livros))
  }
  catch (err){
    res.send(new errors.InternalServerError("Erro ao buscar livros"))
  }
}

//função que retorna um livro baseado em seu ID
async function getById(req, res){
  const id = req.params.idBook
  try{
    const livro = await Livro.getById(id)
      if (!livro){
        res.send(404, {message: `O livro com ID ${id} não foi encontrado`})
      }
      res.send(livroView.viewLivro(livro))
  }
  catch (err){
    res.send(new errors.InternalServerError(`Erro ao buscar livro com ID ${id}`))
  }
}

//função que cria um usuário baseado nos dados fornecidos
async function create(req, res){ 
  try{
    const [id] = await Livro.create(req.body)
    const livroNew = await Livro.getById(id)
    res.send(201, livroView.viewLivro(livroNew))
  }
  catch (err){
    res.send(new errors.InternalServerError("Erro ao criar livro"))
  }
}

//função que atualiza os dados de um usuário baseado nos dados fornecidos
async function update(req, res){
  const id = req.params.idBook
  try{
    const livroDeleted = await Livro.update(id, req.body)
    if (!livroDeleted){
      res.send(404, {message: `O livro com ID ${id} não foi encontrado`})
    }
    res.send(200, {success: true})
  }
  catch (err){
    res.send(new errors.InternalServerError(`Erro ao atualizar livro com ID ${id}`))
  }
}

//função que deleta um usuário baseado no seu ID
async function remove(req, res){
  const id = req.params.idBook
  try{
    const livroDeleted = await Livro.remove(id)
    if (!livroDeleted){
      res.send(404, {message: `O livro com ID ${id} não foi encontrado`})
    }
    res.send(200, {success: true})
  }
  catch (err){
    res.send(new errors.InternalServerError(`Erro ao remover livro com ID ${id}`))
  }
}

//função que atualiza parcialmente os dados de um livro
async function patch(req, res){
  const id = req.params.idBook
  try {
    const livroAtual = await Livro.getById(id)
    if (!livroAtual){
      return res.send(404, {message: `O livro com ID ${id} não foi encontrado`})
    }

    const dadosAtualizados = {...livroAtual, ...req.body}
    await Livro.update(id, dadosAtualizados)
    res.send(200, {success: true})
  } catch (err) {
    res.send(new errors.InternalServerError(`Erro ao aplicar patch no livro com ID ${id}`))
  }
}

//exporta as funções
module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  patch
}