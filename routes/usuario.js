const express = require("express");
const route = express();

route.get("/teste", (req, res) => {
  res.send("Rota de usuario teste funciona! ");
});

// route.get("/usuario/produtos", (req, res) => {
//   res.render("home");
// });

// Produto.find().lean().then((produtos)=>{
//   res.render("produtos", { produtos })
// });

module.exports = route;
