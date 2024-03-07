const readline = require("readline");
const fs = require("fs");
const pool = require("../src/Bd/bd")


async function escolherLeitor(caminhoArquivo, nomeArquivo) {
    if (nomeArquivo == "OntInfo - Huawei.txt") {
        console.log(caminhoArquivo, nomeArquivo)
        const caminho  = `${caminhoArquivo}/${nomeArquivo}`
        
        leitorArquivoHuawei(caminho)
        console.log(caminho)
    }
}

 function leitorArquivoHuawei(caminhoArquivo) {
    const lineReader = readline.createInterface({
        input: fs.createReadStream(caminhoArquivo)
    });
    
     pool.connect();
    // Índice da coluna que você deseja extrair (0 para a primeira coluna, 1 para a segunda coluna, etc.)
    const columnIndex = 0;
    let lineCount = 0;

    // Função para ler o arquivo
    lineReader.on("line", async (data) => {
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

            //tranformação dos aquivos em Objeto
            let myObj = {
                port: semEspacoEmBranco[1],
                ont_id: semEspacoEmBranco[2],
                sn: semEspacoEmBranco[3],
                run_state: semEspacoEmBranco[5],
            }

            await inserirDados(myObj)

        } else {
            console.log(`Linha inválida: não possui a coluna ${columnIndex + 1}`);
        }

    });

    lineReader.on("close", async () => {
        await pool.end();
    })

}


async function inserirDados(dado) {
    try {
        const obj = dado;

        const query = {
            text: 'INSERT INTO huawei (slot_port, ont_id, sn, run_state) VALUES ($1, $2, $3, $4)',
            values: [obj.port, obj.ont_id, obj.sn, obj.run_state]
        }
        await pool.query(query);
        console.log(`Dados da linha ${dado} inseridos com sucesso!`);

    } catch (error) {
        console.error('Erro ao inserir dados:', error);
    }
}


module.exports = { escolherLeitor }

