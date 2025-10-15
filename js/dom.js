// Função responsavel por renderizar os itens do carrinho
export function renderizarCarrinho(itens) {
    const listaCarrinho = document.getElementById("lista-carrinho");
    listaCarrinho.innerHTML = ""; // limpa o conteúdo anterior

    // feedback visual
    if (itens.length === 0) { // se o carrinho estiver vazio
        const vazio = document.createElement("li");
        vazio.textContent = "Seu carrinho está vazio 🛒";
        vazio.classList.add("carrinho-vazio");
        listaCarrinho.appendChild(vazio);
        return; // sai da função
    }

    // cria elementos para cada item do carrinho
    itens.forEach((item) => {
        const li = document.createElement("li");
        li.classList.add("carrinho-item");

        const nome = document.createElement("span");
        nome.classList.add("carrinho-nome");
        nome.textContent = item.nome;

        const preco = document.createElement("span");
        preco.classList.add("carrinho-preco");
        const precoFormatado = new Intl.NumberFormat("pt-BR", {
            style: "currency", // formata como moeda
            currency: "BRL", // real brasileiro
            minimumFractionDigits: 2, // duas casas decimais
        }).format(item.preco); // formata o preco
        preco.textContent = precoFormatado;

        const botaoRemover = document.createElement("button");
        botaoRemover.classList.add("btn-remover");
        botaoRemover.textContent = "❌";
        botaoRemover.setAttribute("data-id", item.id); // atributo para identificar o item

        li.append(nome, preco, botaoRemover); // adiciona nome preco e botao ao item da lista
        listaCarrinho.appendChild(li); // adiciona o item a lista do carrinho
    });
}

// Atualiza o valor total
export function atualizarTotal(itens) {
    const total = itens.reduce((soma, item) => soma + item.preco, 0); // soma os precos dos itens
    const totalElemento = document.getElementById("total");
    
    if (totalElemento) {
        const totalFormatado = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(total);
        totalElemento.textContent = `Total: ${totalFormatado}`;
    } else {
        console.warn("Elemento #total não encontrado no DOM."); // warn() alerta leve
    }
}
