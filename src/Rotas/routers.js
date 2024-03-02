const express = require("express")
const pool = require("../Bd/bd")

const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());


const router = express.Router()
const { arrObjJSON } = require('../leitor.js');

console.log(arrObjJSON)  //Verificar aqui por que ela está vindo com o valor indefinido, não tras os vlaores do Json

router.get("/", async (req,res)=>{
  const { rows } = await pool.query("Select * From huawei");
  res.send(rows)
  
});
router.post('/insert', async (req, res) => {
  const dados = req.body.arrObjJSON; // Assumindo que o corpo da requisição contém um objeto com a chave "dados" que contém o array de objetos
  try {
      // Iteração sobre o array e inserção dos dados no banco de dados
         await pool.query('INSERT INTO huawei (slot_port, ont_id, sn, run_state) VALUES ($1, $2, $3, $4)',[dados.port, obj.ont_id, obj.sn, obj.run_state]);
  
      res.status(200).send('Dados inseridos com sucesso');
    } catch (error) {
      console.error('Erro ao inserir dados:', error);
      res.status(500).send('Erro ao inserir dados no banco de dados');
    }
  });
  

module.exports = router