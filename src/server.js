const restify = require("restify")
const registerRoutes = require("./routes/routes")

//cria o servidor
const server = restify.createServer( {
    name: "Livraria" ,
    version: "1.0.0"
})

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

registerRoutes(server)

server.listen(2003, function(){
    console.log("%s executando em: http://localhost:%s", server.name, server.address().port)
} )