const Usuario = require("../models/usuarioModel")
const errors = require("restify-errors")
const usuarioView = require("../views/usuarioView")

//função que retorna todos os usuários
async function getAll(req, res){
  try{
    const usuarios = await Usuario.getAll()
    res.send(usuarioView.viewAllUsuarios(usuarios))
  }
  catch (err){
    res.send(new errors.InternalServerError("Erro ao buscar usuários"))
  }
}

//função que retorna um usuário baseado em seu ID
async function getById(req, res){
  const id = req.params.idUser
  try{
    const usuario = await Usuario.getById(id)
      if (!usuario){
        res.send(404, {message: `O usuário com ID ${id} não foi encontrado`})
      }
      res.send(usuarioView.viewUsuario(usuario))
  }
  catch (err){
    res.send(new errors.InternalServerError(`Erro ao buscar usuário com ID ${id}`))
  }
}

//função que cria um usuário baseado nos dados fornecidos
async function create(req, res){ 
  try{
    const [id] = await Usuario.create(req.body)
    const usuarioNew = await Usuario.getById(id)
    res.send(201, usuarioView.viewUsuario(usuarioNew))
  }
  catch (err){
    res.send(new errors.InternalServerError("Erro ao criar usuário"))
  }
}

//função que atualiza os dados de um usuário baseado nos dados fornecidos
async function update(req, res){
  const id = req.params.idUser
  try{
    const usuarioUpdated = await Usuario.update(id, req.body)
    if (!usuarioUpdated){
      res.send(404, {message: `O usuário com ID ${id} não foi encontrado`})
    }
    res.send(200, {success: true})
  }
  catch (err){
    res.send(new errors.InternalServerError(`Erro ao atualizar usuário com ID ${id}`))
  }
}

//função que deleta um usuário baseado no seu ID
async function remove(req, res){
  const id = req.params.idUser
  try{
    const usuarioDeleted = await Usuario.remove(id)
    if (!usuarioDeleted){
      res.send(404, {message: `O usuário com ID ${id} não foi encontrado`})
    }
    res.send(200, {success: true})
  }
  catch (err){
    res.send(new errors.InternalServerError(`Erro ao remover usuário com ID ${id}`))
  }
}

//função que atualiza parcialmente os dados de um usuário
async function patch(req, res){
  const id = req.params.idUser
  try {
    const usuarioAtual = await Usuario.getById(id)
    if (!usuarioAtual){
      return res.send(404, {message: `O usuário com ID ${id} não foi encontrado`})
    }

    const dadosAtualizados = {...usuarioAtual, ...req.body}
    await Usuario.patch(id, dadosAtualizados)
    res.send(200, {success: true})
  } catch (err){
    res.send(new errors.InternalServerError(`Erro ao aplicar patch no usuário com ID ${id}`))
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