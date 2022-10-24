const express = require("express");
const app = express()

    // configuração para converter o body da requisição para json (body-parser descontinuado)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Guloseimas da Val");
})

const PORT = 9130

app.listen(PORT, ()=>{
    console.log('O servidor está rodando na porta ' + PORT);
});