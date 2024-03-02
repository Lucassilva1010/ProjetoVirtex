const express = require("express")
const tbRotas = require("./Rotas/routers") 
const { escolherLeitor } = require("../src/leitor")

const app = express();

app.use(express.json());

app.use("/info", tbRotas);

app.get("/", (req,res)=>{
    res.send("Conectado")
})

const port= 3000;


app.listen(port,  ()=>{
    console.log("rodando: " + port)
})

escolherLeitor("D:/Lucas/testeVirtex/Inputs", "OntInfo - Huawei.txt" ).then()
