const Usuario = require("../models/usuarioModel")
const errors = require("restify-errors")
const usuarioView = require("../views/usuarioView")
const Cache = require("../utils/cacheUtils").Cache;

let by_id_cache = new Cache(20);

function cachedById(id) {

  for(let i = 0; i < by_id_cache._count; ++i)
  {
    let curr = by_id_cache.Peek(i);
    if(curr.id === id)
      return curr;
  }

  return null;
}

function decacheById(id) {
  for(let i = 0; i < by_id_cache._count; ++i)
  {
    let curr = by_id_cache.Peek(i);
    if(curr.id === id)
    {
      by_id_cache.Remove(i);
      return;
    }
  }
}

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
    let usuario = cachedById(id);
    let do_cache = false;
    if (usuario === null)
    {
      usuario = await Usuario.getById(id);
      do_cache = true;
    }

      if (!usuario){
        res.send(404, {message: `O usuário com ID ${id} não foi encontrado`})
      }
      else if(do_cache)
      {
        by_id_cache.Push(usuario);
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
    else {
      decacheById(id);
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
    else {
      decacheById(id);
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
    else {
      decacheById(id);
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