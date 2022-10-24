const express = require("express");
const { engine } = require("express-handlebars")
const path = require("path")
const app = express()

    // configuração para converter o body da requisição para json (body-parser descontinuado)
app.use(express.json());
app.use(express.static(path.join(__dirname, '/views')))
app.use(express.urlencoded({ extended: true }));

    // template engine handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars'); 

// ROTAS
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/home', (req, res) => {
    res.render('home')
})


// RODAR SERVIDOR

const PORT = 9130

app.listen(PORT, ()=>{
    console.log('O servidor está rodando na porta ' + PORT);
});