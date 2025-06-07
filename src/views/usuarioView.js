//formata a saída JSON de um usuario
function viewUsuario(usuario) {
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.preco,
    cpf: usuario.cpf,
    senha: usuario.senha
  }
}

//formata a saída JSON de todos os usuarios
function viewAllUsuarios(usuarios) {
  return usuarios.map(viewUsuario)
}

module.exports = {
  viewUsuario,
  viewAllUsuarios
}