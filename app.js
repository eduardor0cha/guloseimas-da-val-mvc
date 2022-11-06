const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const app = express();
const administrador = require("./routes/administrador");
const usuario = require("./routes/usuario");
const mongoose = require("mongoose");
gerarArquivoDeBanco();
const banco = require("./config/banco");
const Grid = require("gridfs-stream");

/* configuração para converter o body da requisição para json (body-parser descontinuado) */
app.use(express.json());
app.use(express.static(path.join(__dirname, "/views")));
app.use(express.urlencoded({ extended: true }));

/* template engine handlebars */
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

/* Configuração de MongoDB e Mongoose */
let gfs;
mongoose.Promise = global.Promise;
mongoose
  .connect(
    banco.mongoURI != null
      ? banco.mongoURI
      : "mongodb+srv://nossouser:nossasenha123@cluster0.muxyzuo.mongodb.net/guloseimas-da-val-database?retryWrites=true&w=majority"
  )
  .then(() => {
    /* pode ser o link ou o db.mongoURI */
    console.log("Conectado ao banco de dados MongoDB!");

    const conn = mongoose.connection;
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("imagens");
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

// Produto.find().lean().then((produtos)=>{
//   res.render("produto", { produtos })
// })

app.use("/admin", administrador);
app.use("/user", usuario);

app.get("/arquivo/:filename", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gfs.createReadStream({ filename: file.filename });
    readStream.pipe(res);
  } catch (erro) {
    res.send("Arquivo não encontrado.");
  }
});

app.delete("/arquivo/:filename", async (req, res) => {
  try {
    await gfs.files.deleteOne({ filename: req.params.filename });
    res.send("Arquivo excluído com sucesso.");
  } catch (erro) {
    res.send("Erro ao excluir o arquivo.");
  }
});

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
