const express = require("express");
const route = express();

route.get("/teste", (req, res) => {
  res.send("Rota de usuario teste funciona! ");
});

route.get("/produtos", (req, res) => {
  res.render("produtos/produto");
});

// Produto.find().lean().then((produtos)=>{
//   res.render("produtos", { produtos })
// });

module.exports = route;
