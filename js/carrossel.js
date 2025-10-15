// botoes-rolagem lateral
const container = document.querySelector('.lista-produtos');
const nextButton = document.querySelector('.seta-direita'); // botao-proximo
const previousButton = document.querySelector('.seta-esquerda'); // botao-anterior
const cards = document.querySelectorAll('.lista-produtos--item'); // seleciona todos os cards

// funcao para calcular a largura de um card-desktop e mobile
function getCardWidth() {
    if (cards.length === 0) return 0; // se nao houver cards retorna 0

    const cardWidth = cards[0].offsetWidth; // largura real do card
    const containerStyle = window.getComputedStyle(container); // pega o estilo computado do container
    const gap = parseInt(containerStyle.gap) || 10; // gap do grid/flex

    return cardWidth + gap; // largura do card + gap
}

nextButton.addEventListener('click', () => {
    container.scrollBy({ left: getCardWidth(), behavior: 'smooth' }); // rola o container suavemente para a direita
});

previousButton.addEventListener('click', () => {
    container.scrollBy({ left: -getCardWidth(), behavior: 'smooth' }); // rola o container suavemente para a esquerda
});

// garante que o carrossel comece no início ao carregar a página
window.addEventListener('load', () => {
    container.scrollLeft = 0;
});