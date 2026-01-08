import { lerDados, salvarDados } from './fileManager.js';

export async function adicionarProduto(produto) {
    const inventario = await lerDados();
    
    const maiorId = inventario.reduce((max, p) => (p.id > max ? p.id : max), 0);
    const novoId = maiorId + 1;

    const novoProduto = {
        id: novoId,
        ...produto
    };

    inventario.push(novoProduto);
    await salvarDados(inventario);
    return novoProduto;
}

export async function listarProdutos() {
    return await lerDados();
}

export async function buscarProduto(termo) {
    const inventario = await lerDados();
    return inventario.filter(p => 
        String(p.id) === termo || 
        p.nome.toLowerCase().includes(termo.toLowerCase())
    );
}

export async function atualizarProduto(id, novosDados) {
    const inventario = await lerDados();
    const idNumerico = Number(id);
    const index = inventario.findIndex(p => p.id === idNumerico);

    if (index === -1) {
        throw new Error('Produto não encontrado!');
    }

    inventario[index] = {
        ...inventario[index],
        ...novosDados
    };

    await salvarDados(inventario);
    return inventario[index];
}

export async function removerProduto(id) {
    const inventario = await lerDados();
    const idNumerico = Number(id);
    const novoInventario = inventario.filter(p => p.id !== idNumerico);

    if (inventario.length === novoInventario.length) {
        throw new Error('Produto não encontrado!');
    }

    await salvarDados(novoInventario);
}