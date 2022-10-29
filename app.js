const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const app = express();
const administrador = require("./routes/administrador");
const usuario = require("./routes/usuario");
const mongoose = require("mongoose");
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

app.use("/admin", administrador);
app.use("/user", usuario);
/* RODAR SERVIDOR */
const PORT = 9130;

app.listen(PORT, () => {
  console.log("O servidor está rodando na porta " + PORT);
});
