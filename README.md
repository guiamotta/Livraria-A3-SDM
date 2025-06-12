# 📘 A3 - Sistemas Distribuídos e Mobile

-----

**O padrão de projeto escolhido para a Livraria foi o Model-View-Controller (MVC). A
motivação para a escolha foi principalmente a sua boa separação de
responsabilidades, o que facilita a organização, manutenção e escalabilidade do
código. O MVC consiste da divisão do código em três camadas interconectadas:**

- Model consiste na parte lógica da aplicação que gerencia o comportamento
dos dados através de regras de negócios, lógica e funções. Aguarda a
chamada das funções, que permite o acesso aos dados.

- View é a representação dos dados, como uma tabela ou um diagrama. É
onde os dados solicitados do Model são exibidos. No caso da API, os dados
são representados em forma de JSON.

- Controller faz a mediação da entrada e saída, comandando o View e o
Model para serem alterados de forma apropriada conforme o usuário
solicitou.

**Para além do Model, View e Controller, o código também possui um componente
DB dedicado à conexão ao banco de dados ./db/connection.js e outro chamado
Routes dedicado à definição dos endpoints ./routes/routes.js.**

-----

# 🛍️ Livraria API
## Este projeto implementa uma API RESTful para gerenciamento de usuários, livros e empréstimos de uma livraria, utilizando o padrão de arquitetura Model-View-Controller (MVC).

# 📐 Arquitetura MVC
## A aplicação está dividida em três camadas principais:

### 🔹 Model
**Responsável pela lógica da aplicação e regras de negócio. Gerencia os dados e expõe métodos para manipulá-los.**

**Arquivos:**

- usuarioModel.js

- livroModel.js

- emprestimoModel.js

**Métodos:**

- getAll — Busca todos os registros.

- getById — Busca um registro pelo ID.

- create — Adiciona um novo registro.

- update — Atualiza um registro existente.

- remove — Remove um registro.

- patch - Atualiza parcialmente um registro existente.

### 🔹 View
**Responsável pela apresentação dos dados. No caso da API, os dados são retornados em JSON.**

**Arquivos:**

- usuarioView.js

- livroView.js

- emprestimoView.js

**Funções:**

- view — Formata uma única saída.

- viewAll — Formata múltiplas saídas.

### 🔹 Controller
**Realiza a comunicação entre o Model e a View. Recebe as requisições, aciona os métodos do Model e retorna os dados formatados pela View.**

**Arquivos:**

- usuarioController.js

- livroController.js

- emprestimoController.js

## 📁 Outros Componentes

### 📄 server.js
- Cria e inicia o servidor Restify.

**Execute com o comando:** 
```
node server.js
```

### 🔌 src/db/connection.js
- Inicializa e realiza a conexão com o banco de dados SQLite3.

### 🌐 src/routes/routes.js
- Define os endpoints da API e encaminha as requisições para os respectivos controladores.

### 📚 src/utils/cacheUtils.js
- Implementação de cache que é utilizada em livros e usuários.

### 🗃️ Banco de Dados
- A API conecta-se ao seguinte banco SQLite3:

```
`CREATE TABLE IF NOT EXISTS usuario(
                    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                    nome varchar(128) NOT NULL,
                    email varchar(64) NOT NULL,
                    cpf varchar(11),
                    senha varchar(30)
                )

`CREATE TABLE IF NOT EXISTS livro(
                    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                    titulo varchar(128) NOT NULL,
                    categoria varchar(64) NOT NULL
                )
`CREATE TABLE IF NOT EXISTS livro_emprestado(
                    id_usuario INTEGER NOT NULL,
                    id_livro INTEGER NOT NULL,
                    data_emprestimo DATE NOT NULL,
                    data_entrega DATE NOT NULL
                )
```
### 🚀 Tecnologias Utilizadas
- Node.js
- Restify
- SQLite3
- Postman (Testes)
