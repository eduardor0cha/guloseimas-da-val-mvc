const express = require("express");
const app = express()

app.get('/', (req, res) => {
    res.send("Guloseimas da Val");
})

const PORT = 9130

app.listen(PORT, ()=>{
    console.log('O servidor está rodando na porta ' + PORT);
});