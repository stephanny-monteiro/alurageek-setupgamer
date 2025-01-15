// botões-rolagem lateral
const container = document.querySelector('.produtos-lista');
const nextButton = document.querySelector('.seta-direita'); // botão-proximo.
const previousButton = document.querySelector('.seta-esquerda'); // botao-anterior.

nextButton.addEventListener('click', () => {
    container.scrollBy({ left: 200, behavior: 'smooth' });
});

previousButton.addEventListener('click', () => {
    container.scrollBy({ left: -200, behavior: 'smooth' });
});