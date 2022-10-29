const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Produto = new Schema({
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  sabor: {
    type: String,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
  },
  estoque: {
    type: Number,
    required: true,
  },
  exibirAoCliente: {
    type: Schema.Types.boolean,
    default: false,
  },
  dataDeCriacao: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.model("produtos", Produto);
