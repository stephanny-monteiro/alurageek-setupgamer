const API_URL = 'https://setupgamer-api.onrender.com/carrinho';

// GET - Buscar todos os itens do carrinho
export async function obterCarrinho() {
    try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) throw new Error("Erro ao buscar carrinho"); // verifica se a resposta foi bem-sucedida
        return await resposta.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

// POST - Adicionar item ao carrinho
export async function adicionarProduto(item) {
    try {
        const resposta = await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, // informa que o corpo da requisição é JSON
            body: JSON.stringify(item) // converte o objeto produto para JSON
        }); 
        if (!resposta.ok) throw new Error("Erro ao adicionar item");
        return await resposta.json();
    } catch (error) {
        console.error(error);
    }
}

// DELETE - Remover item do carrinho pelo ID
export async function removerProduto(id) {
    try {
        const resposta = await fetch(`${API_URL}/${id}`, {method: 'DELETE'});
        if (!resposta.ok) throw new Error("Erro ao remover item");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

// Limpa  o carrinho
export async function limparCarrinho() {
    const itens = await obterCarrinho(); // pega os itens atuais do carrinho
    for (const item of itens) {
        await removerProduto(item.id); // remove cada item individualmente
    }
}
