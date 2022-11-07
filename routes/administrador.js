const express = require("express");
const route = express();
const mongoose = require("mongoose");
require("../models/Produto");
const Produto = mongoose.model("produtos");
const Handlebars = require("express-handlebars");
const dayjs = require("dayjs");
const envio = require("../middleware/envio");

const hbs = Handlebars.create({});

hbs.handlebars.registerHelper("formatDate", function (date) {
  return dayjs(date.toString()).format("DD/MM/YYYY");
});

/* o famoso mock. de mentirinha! */
const produtosDeMentirinha = [
  {
    nome: "bolo de murango",
    descricao: "o favorito do pica-pau",
    sabor: "morango",
    preco: "30",
    estoque: "3",
    exibirAoCliente: true,
    dataDeCriacao: "01/04/2022",
  },
  {
    nome: "copo da felicidade",
    descricao: "fique feliz :)",
    sabor: "chocolate",
    preco: "8",
    estoque: "5",
    exibirAoCliente: true,
    dataDeCriacao: "01/04/2022",
  },
  {
    nome: "bolo de chocolate",
    descricao: "muito docinho",
    sabor: "chocolate",
    preco: "45",
    estoque: "7",
    exibirAoCliente: true,
    dataDeCriacao: "01/04/2022",
  },
];

route.get("/produtos/novo", (req, res) => {
  res.render("produtos/admin/criar");
});

route.get("/produtos", (req, res) => {
  Produto.find()
    .lean()
    .then((produtos) => {
      res.render("produtos/admin/listar", {
        produtos: produtos,
        //produtos: produtosDeMentirinha,
      });
    })
    .catch((erro) => {
      console.log("erro ao listar produtos!");
      console.log("erro ao listar produtos: " + erro);
      res.redirect("/");
    });
});

route.get("/produtos/editar/:id", (req, res) => {
  Produto.findOne({ _id: req.params.id })
    .lean()
    .then((produto) => {
      res.render("produtos/admin/editar", {
        produto: produto,
        //produto: produtosDeMentirinha[0]
      });
    })
    .catch(() => {
      console.log("produto não encontrado!");
      return res.redirect("/admin/produtos");
    });
});

route.post("/produtos/editar", (req, res) => {
  Produto.findOne({ _id: req.body.id })
    .lean()
    .then((produto) => {
      produto.nome = req.body.nome;
      produto.descricao = req.body.descricao;
      produto.sabor = req.body.sabor;
      produto.preco = req.body.preco;
      produto.estoque = req.body.estoque;
      produto.exibirAoCliente = req.body.exibirAoCliente;
      produto.dataDeCriacao = req.body.dataDeCriacao;
      produto
        .save()
        .then(() => {
          console.log("produto editado!");
          res.redirect("/admin/produtos");
        })
        .catch((erro) => {
          console.log("erro ao editar produto: " + erro);
        });
    })
    .catch((erro) => {
      console.log("Erro ao editar produto: " + erro);
      res.redirect("/produtos");
    });
});

/*route.post("/produtos/imagem", envio.single("file"), (req, res) => {
  if (req.file === undefined)
    return res.send("Você precisa enviar um arquivo.");

  const imgUrl = `http://localhost:${9130}/arquivo/${req.file.filename}`;

  return res.send(imgUrl);
});*/

route.post("/produtos/criar", envio.single("image"), async (req, res) => {
  if (req.file === undefined)
    return res.send("Você precisa enviar um arquivo.");

  const imgUrl = `http://localhost:${9130}/arquivo/${req.file.filename}`;

  const produto = new Produto({
    nome: req.body.nome,
    descricao: req.body.descricao,
    sabor: req.body.sabor,
    preco: req.body.preco,
    estoque: req.body.estoque,
    exibirAoCliente: req.body.exibirAoCliente == "on" ? true : false,
    dataDeCriacao: req.body.dataDeCriacao,
    imgUrl: imgUrl,
  });

  produto
    .save()
    .then(() => {
      console.log("produto criado!");
      res.redirect("/admin/produtos");
    })
    .catch((erro) => {
      console.log("Erro ao criar produto: " + err);
      res.redirect("/admin/produtos");
    });
});

route.get("/produtos/:id", (req, res) => {
  Produto.findOne({ _id: req.body.id })
    .lean()
    .then((produto) => res.render("produtos/produto", produto));
});

route.get("/teste", (req, res) => {
  res.send("Rota de administrador teste funciona! ");
});

module.exports = route;
