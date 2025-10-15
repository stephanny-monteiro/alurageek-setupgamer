import { obterCarrinho, adicionarProduto, removerProduto, limparCarrinho } from "./api.js";
import { renderizarCarrinho, atualizarTotal } from "./dom.js";

// seletores
document.addEventListener("DOMContentLoaded", async () => {
    const modal = document.getElementById("carrinho-modal");
    const btnFechar = document.querySelector(".fechar");
    const listaCarrinho = document.getElementById("lista-carrinho");
    const btnFinalizar = document.querySelector(".btn-finalizar");
    const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
    const botoesCarrinho = document.querySelectorAll(".btn-carrinho"); // botoes dentro dos cards

    async function carregarCarrinho() {
        try {
            const itens = await obterCarrinho();
            renderizarCarrinho(itens);
            atualizarTotal(itens);
        } catch (error) {
            console.error("Erro ao carregar o carrinho:", error);
        }
    }

    async function atualizarCarrinho() {
        await carregarCarrinho();
    }

    // abrir modal ao clicar em Shop no cabecalho
    botaoAbrirCarrinho.addEventListener("click", async (e) => {
        e.preventDefault(); // previnir recaregamento da pagina
        modal.classList.add("ativo"); // para abrir
        await carregarCarrinho(); // carregar itens do carrinho
    });

    // fechar modal ao clicar no "X"
    btnFechar.addEventListener("click", () => {
        modal.classList.remove("ativo"); // para fechar
    });

    // fechar modal ao clicar fora da area de conteudo
    window.addEventListener("click", (e) => {
        if (e.target === modal) { // event.target é a referência exata do elemento HTML que foi clicado ou que disparou o evento
        modal.classList.remove("ativo"); // para fechar
        }
    });

    // adicionar itens ao carrinho
    botoesCarrinho.forEach((botao) => {
        botao.addEventListener("click", async (e) => { // e de event
            const item = e.target.closest(".lista-produtos--item"); // acha o card completo do produto
            const nome = item.querySelector(".item-nome").textContent.trim(); // pega o nome do produto
            const precoTexto = item.querySelector(".item-preco").textContent; // pega o preço do produto
            const preco = parseFloat( // converte o preço para número
                precoTexto
                .replace("R$", "")
                .replace(/\./g, "") // remove pontos de milhar
                .replace(",", ".") // troca virgula decimal por ponto
                .trim() // o trim() remove espacos em branco desnecessarios
            );
            const novoItem = { nome, preco }; // cria o objeto do novo item
            await adicionarProduto(novoItem); // adiciona o item ao carrinho via API
            await atualizarCarrinho(); // recarrega o carrinho
        });
    });

    // remover itens do carrinho
    listaCarrinho.addEventListener("click", async (e) => {
        if (e.target.classList.contains("btn-remover")) { // verifica se o elemento clicado tem .btn-remover
            const id = e.target.getAttribute("data-id"); // pega o id do item a ser removido
            await removerProduto(id); // remove o item via API
            await atualizarCarrinho();
        }
    });

    // finalizar compra
    btnFinalizar.addEventListener("click", async () => {
        const itens = await obterCarrinho();
        if (itens.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }
        alert("Compra finalizada com sucesso!");
        await limparCarrinho();
        await atualizarCarrinho(); // recarrega interface

        modal.classList.remove("ativo"); // fecha o modal
    });
});
