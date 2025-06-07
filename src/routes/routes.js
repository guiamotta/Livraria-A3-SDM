const usuarioController = require("../controllers/usuarioController")
const livroController = require("../controllers/livroController")
const emprestimoController = require("../controllers/emprestimoController")

//define os endpoints
function registerRoutes(server) {
  server.get("/", (req, res, next) => {
    res.send({resposta: "Sejam bem-vindos à Livraria"});
    next();
  })

  //endpoints usuario
  server.get("/usuarios", usuarioController.getAll)
  server.get("/usuarios/:idUser", usuarioController.getById)
  server.post("/usuarios", usuarioController.create)
  server.put("/usuarios/:idUser", usuarioController.update)
  server.del("/usuarios/:idUser", usuarioController.remove)

  //endpoints livro
  server.get("/livros", livroController.getAll)
  server.get("/livros/:idBook", livroController.getById)
  server.post("/livros", livroController.create)
  server.put("/livros/:idBook", livroController.update)
  server.del("/livros/:idBook", livroController.remove)

  //endpoints emprestimo
  server.get("/emprestimos", emprestimoController.getAll);
  server.get("/emprestimos/usuarios/:idUser", emprestimoController.getByUserId);
  server.get("/emprestimos/livros/:idBook", emprestimoController.getByBookId);
  server.get("/emprestimos/usuarios/:idUser/livros/:idBook", emprestimoController.getUserBookRent);
  server.post("/emprestimos", emprestimoController.create);
  server.put("/emprestimos/usuarios/:idUser/livros/:idBook", emprestimoController.update);
  server.patch("/emprestimos/usuarios/:idUser/livros/:idBook", emprestimoController.patch);
  server.del("/emprestimos/usuarios/:idUser/livros/:idBook", emprestimoController.remove);

}

module.exports = registerRoutes