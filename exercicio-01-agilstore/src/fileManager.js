import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CAMINHO_ARQUIVO = path.join(__dirname, '../data/inventario.json');


export async function lerDados() {
    try {
        const dados = await fs.readFile(CAMINHO_ARQUIVO, 'utf-8');
        return JSON.parse(dados);
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            return [];
        }
        console.error('Erro desconhecido ao ler dados:', erro);
        throw erro;
    }
}

export async function salvarDados(produtos) {
    try {
        const conteudo = JSON.stringify(produtos, null, 2);
        
        await fs.writeFile(CAMINHO_ARQUIVO, conteudo, 'utf-8');
    } catch (erro) {
        console.error('Erro ao salvar os dados:', erro);
        throw erro;
    }
}