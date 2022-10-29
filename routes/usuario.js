const express = require("express");
const route = express();

route.get("/teste", (req, res) => {
  res.send("Rota de usuario teste funciona! ");
});

module.exports = route;
