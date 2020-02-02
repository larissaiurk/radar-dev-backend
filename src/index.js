const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

//mudar o usuário <username> e a senha <password> - alterar também o nome do banco <test>
mongoose.connect('mongodb+srv://admin:318798@cluster0-j9yts.mongodb.net/week10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// use - vai ser útil para todas as rotas da aplicação
//json deve vir antes das rotas, pela configuracao, ele le de cima para baixo
app.use(express.json());
app.use(routes);

app.listen(3333);

