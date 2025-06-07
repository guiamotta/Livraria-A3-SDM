//formata a saída JSON de um livro
function viewLivro(livro) {
  return {
    id: livro.id,
    titulo: livro.titulo,
    categoria: livro.categoria,
  }
}

//formata a saída JSON de todos os livros
function viewAllLivros(livros) {
  return livros.map(viewLivro)
}

module.exports = {
  viewLivro,
  viewAllLivros
}