const express = require("express")
const tbRotas = require("./Rotas/routers") 

const app = express();

app.use(express.json());

app.use("/info", tbRotas);

app.get("/", (req,res)=>{
    res.send("Conectado")
})

const port= 3000;


app.listen(port, ()=>{
    console.log("rodando: " + port)
})
