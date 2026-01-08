import inquirer from 'inquirer';
import { 
    adicionarProduto, 
    listarProdutos, 
    buscarProduto, 
    atualizarProduto, 
    removerProduto 
} from './productController.js';

async function menuPrincipal() {
    console.clear();
    console.log("=== AGILSTORE - GERENCIAMENTO DE INVENTÁRIO ===");

    const { opcao } = await inquirer.prompt([
        {
            type: 'list',
            name: 'opcao',
            message: 'O que você deseja fazer?',
            choices: [
                '1. Adicionar Produto',
                '2. Listar Produtos',
                '3. Atualizar Produto',
                '4. Excluir Produto',
                '5. Buscar Produto',
                '6. Sair'
            ]
        }
    ]);

    switch (opcao) {
        case '1. Adicionar Produto':
            await handleAdicionar();
            break;
        case '2. Listar Produtos':
            await handleListar();
            break;
        case '3. Atualizar Produto':
            await handleAtualizar();
            break;
        case '4. Excluir Produto':
            await handleExcluir();
            break;
        case '5. Buscar Produto':
            await handleBuscar();
            break;
        case '6. Sair':
            process.exit(0);
    }

    await pause();
    menuPrincipal();
}

async function handleAdicionar() {
    const respostas = await inquirer.prompt([
        { name: 'nome', message: 'Nome do produto:' },
        { name: 'categoria', message: 'Categoria:' },
        { name: 'quantidade', message: 'Quantidade em estoque:', type: 'number' },
        { name: 'preco', message: 'Preço unitário:', type: 'number' }
    ]);

    if (!respostas.nome || !respostas.categoria) {
        console.log("Erro: Nome e Categoria são obrigatórios.");
        return;
    }

    await adicionarProduto(respostas);
    console.log("Produto adicionado com sucesso!");
}

async function handleListar() {
    const produtos = await listarProdutos();
    console.table(produtos);
}

async function handleBuscar() {
    const { termo } = await inquirer.prompt([
        { name: 'termo', message: 'Digite o ID ou parte do NOME para buscar:' }
    ]);
    
    const resultados = await buscarProduto(termo);
    
    if (resultados.length === 0) {
        console.log("Nenhum produto encontrado.");
    } else {
        console.table(resultados);
    }
}

async function handleAtualizar() {
    const { id } = await inquirer.prompt([
        { name: 'id', message: 'Informe o ID do produto que deseja atualizar:' }
    ]);

    const produtos = await buscarProduto(id);
    const produtoAtual = produtos.find(p => String(p.id) === id);

    if (!produtoAtual) {
        console.log("Produto não encontrado com este ID.");
        return;
    }

    console.log(`Editando: ${produtoAtual.nome}`);

    const novosDados = await inquirer.prompt([
        { name: 'nome', message: `Nome (${produtoAtual.nome}):` },
        { name: 'categoria', message: `Categoria (${produtoAtual.categoria}):` },
        { name: 'quantidade', message: `Quantidade (${produtoAtual.quantidade}):` },
        { name: 'preco', message: `Preço (${produtoAtual.preco}):` }
    ]);

    const dadosParaSalvar = {};
    if (novosDados.nome) dadosParaSalvar.nome = novosDados.nome;
    if (novosDados.categoria) dadosParaSalvar.categoria = novosDados.categoria;
    if (novosDados.quantidade) dadosParaSalvar.quantidade = Number(novosDados.quantidade);
    if (novosDados.preco) dadosParaSalvar.preco = Number(novosDados.preco);

    await atualizarProduto(id, dadosParaSalvar);
    console.log("Produto atualizado com sucesso!");
}

async function handleExcluir() {
    const { id } = await inquirer.prompt([
        { name: 'id', message: 'Informe o ID do produto para excluir:' }
    ]);

    const { confirmacao } = await inquirer.prompt([
        { type: 'confirm', name: 'confirmacao', message: 'Tem certeza que deseja excluir?' }
    ]);

    if (confirmacao) {
        try {
            await removerProduto(id);
            console.log("Produto removido.");
        } catch (error) {
            console.log("Erro: " + error.message);
        }
    }
}

async function pause() {
    await inquirer.prompt([{ name: 'enter', message: 'Pressione ENTER para continuar...' }]);
}

menuPrincipal();