const express = require("express");
const { engine } = require("express-handlebars")
const app = express()

    // configuração para converter o body da requisição para json (body-parser descontinuado)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

    // template engine handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars'); 

app.get('/', (req, res) => {
    res.render('index')
})

const PORT = 9130

app.listen(PORT, ()=>{
    console.log('O servidor está rodando na porta ' + PORT);
});