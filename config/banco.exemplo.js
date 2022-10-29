/* crie um arquivo 'banco.js' nesse mesmo diretório, 
copie as configurações abaixo 
e use as credenciais do MongoDB */
if (process.env.NODE_ENV == "production") {
  module.exports = { mongoURI: "" };
}
