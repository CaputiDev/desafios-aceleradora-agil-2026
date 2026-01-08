const fs = require('fs');

const caminhoListaProdutos = '../data/inventario.json';

function lerDados(){
    try{
        const dadosBrutos = fs.readFileSync(caminhoListaProdutos, 'utf8');
        const dadosJSON = JSON.parse(dadosBrutos);

        return dadosJSON;

    }catch(err){
        console.error('Erro ao ler o arquivo:', err);
    }
}