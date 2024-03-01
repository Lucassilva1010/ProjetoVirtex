const readline = require("readline");
const fs = require("fs");

const lineReader = readline.createInterface({
    input: fs.createReadStream("D:/Lucas/testeVirtex/Inputs/OntInfo - Huawei.txt")
});

// Índice da coluna que você deseja extrair (0 para a primeira coluna, 1 para a segunda coluna, etc.)
const columnIndex = 0;
let lineCount = 0;
let arrObjJSON = [];

// Função para ler o arquivo
lineReader.on("line", (data) => {
    let arquivoJSON;
    lineCount++;
    if (lineCount < 9 || lineCount > 117) {
        // Ignora as primeiras 7 linhas
        return;
    }
        let texto = data.split(",");
        // Verifica se o índice da coluna desejada está dentro do alcance
    if (columnIndex >= 0 && columnIndex < texto.length) {
        let dadoColuna = texto[columnIndex].trim();
        let novaColuna = dadoColuna.split(" "); 
        let semEspacoEmBranco = novaColuna.filter(x => x.trim() !== "");

        // console.log(semEspacoEmBranco[3]);

        let myObj = {
          port: semEspacoEmBranco[1],
          ont_id: semEspacoEmBranco[2],
          sn: semEspacoEmBranco[3],
          control_flag: semEspacoEmBranco[4],
          run_state: semEspacoEmBranco[5],
          config_state: semEspacoEmBranco[6],
          match_state: semEspacoEmBranco[7]
        }

        arquivoJSON = JSON.stringify(myObj);
        
    } else {
        console.log(`Linha inválida: não possui a coluna ${columnIndex + 1}`);
    }
    arrObjJSON.push(arquivoJSON);
});

lineReader.on("close", () => {
  console.log(arrObjJSON);
});