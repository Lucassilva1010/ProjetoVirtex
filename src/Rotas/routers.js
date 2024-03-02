const express = require("express")
const pool = require("../Bd/bd")
const bodyParser = require("body-parser");
const { arrObjJSON } = require('../leitor.js');

const router = express.Router()

router.get("/", async (req,res)=>{
  const { rows } = await pool.query("Select * From huawei");
  res.send(rows)
  
});

module.exports = router