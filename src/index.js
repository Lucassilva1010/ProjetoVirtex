const express = require("express")
const tbRotas = require("./Rotas/routers") 
const { escolherLeitor } = require("../src/leitor")

const app = express();

app.use(express.json());

app.use("/info", tbRotas);

app.get("/", (req,res)=>{
    res.send("Conectado")
})

function iniciarServidor(){
    escolherLeitor("D:/Lucas/testeVirtex/Inputs", "OntInfo - Huawei.txt")
    app.listen(port,  ()=>{
        console.log("rodando: " + port)
    })
}

const port = 8016;
iniciarServidor()