const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const app = express();
const administrador = require("./routes/administrador");
const usuario = require("./routes/usuario");
const mongoose = require("mongoose");
gerarArquivoDeBanco();
const banco = require("./config/banco");

/* configuração para converter o body da requisição para json (body-parser descontinuado) */
app.use(express.json());
app.use(express.static(path.join(__dirname, "/views")));
app.use(express.urlencoded({ extended: true }));

/* template engine handlebars */
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

/* Configuração de MongoDB e Mongoose */
mongoose.Promise = global.Promise;
mongoose
  .connect(
    banco.mongoURI != null
      ? banco.mongoURI
      : "mongodb://localhost/guloseimas-da-val"
  )
  .then(() => {
    /* pode ser o link ou o db.mongoURI */
    console.log("Conectado ao banco de dados MongoDB!");
  })
  .catch((err) => {
    console.log(
      "Houve um erro na conexão com o banco de dados MongoDB! " + err
    );
  });

/* ROTAS */
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", (req, res) => {
  res.render("home");
});

Produto.find().lean().then((produtos)=>{
  res.render("produtos", { produtos })
});

app.use("/admin", administrador);
app.use("/user", usuario);

/* Função que gera arquivo de configuração de banco */
function gerarArquivoDeBanco() {
  const fs = require("fs");
  const caminho = "./config/banco.js";

  if (fs.existsSync(caminho)) {
    console.log("O arquivo banco.js existe! :)");
  } else {
    fs.writeFile(caminho, "", (erro) => {
      if (!erro) {
        console.log(
          "Arquivo banco.js criado! Leia o arquivo ./config/banco.exemplo.js :)"
        );
      } else {
        console.log("Não foi possível criar banco.js: " + erro);
      }
    });
  }
}

/* RODAR SERVIDOR */
const PORTA = 9130;

app.listen(PORTA, () => {
  console.log("O servidor está rodando na porta " + PORTA);
});
