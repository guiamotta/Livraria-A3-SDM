const Livro = require("../models/livroModel")
const Usuario = require("../models/usuarioModel")

async function viewEmprestimo(emprestimo) {
  const usuario = await Usuario.getById(emprestimo.id_usuario)
  const livro = await Livro.getById(emprestimo.id_livro)

  return {
    id_usuario: emprestimo.id_usuario,
    usuario: usuario ? {
      nome: usuario.nome,
      email: usuario.email,
      cpf: usuario.cpf,
    } : null,
    id_livro: emprestimo.id_livro,
    livro: livro ? {
      titulo: livro.titulo,
      categoria: livro.categoria,
    } : null,
    data_emprestimo: emprestimo.data_emprestimo,
    data_entrega: emprestimo.data_entrega,
  }
}

async function viewAllEmprestimos(emprestimos) {
  const results = []
  for (const emprestimo of emprestimos) {
    results.push(await viewEmprestimo(emprestimo))
  }
  return results
}

module.exports = {
  viewEmprestimo,
  viewAllEmprestimos
}
