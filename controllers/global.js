const navbar = document.querySelector("header");
const menuButton = document.querySelector(".menu-button");

    menuButton.addEventListener("click", () => {
    navbar.classList.toggle("show-menu");
})

// Selecionando todos os botões de adicionar e remover
const buttonsPlus = document.querySelectorAll('.item-carrinho button:nth-of-type(2)');
const buttonsMinus = document.querySelectorAll('.item-carrinho button:nth-of-type(1)');
const buttonsRemove = document.querySelectorAll('.item-carrinho button:nth-of-type(3)');

// Adicionando event listeners para os botões de adicionar
buttonsPlus.forEach(button => {
    button.addEventListener('click', () => {
        const input = button.parentElement.querySelector('input');
        input.value = parseInt(input.value) + 1;
        atualizarTotal();
    });
});

// Adicionando event listeners para os botões de remover
buttonsMinus.forEach(button => {
    button.addEventListener('click', () => {
        const input = button.parentElement.querySelector('input');
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
            atualizarTotal();
        }
    });
});

// Adicionando event listeners para os botões de remover completamente um item
buttonsRemove.forEach(button => {
    button.addEventListener('click', () => {
        button.parentElement.parentElement.remove();
        atualizarTotal();
    });
});

// Função para atualizar o total do carrinho
function atualizarTotal() {
    let total = 0;
    const precos = document.querySelectorAll('.item-carrinho p:nth-of-type(3)');
    precos.forEach(preco => {
        total += parseInt(preco.textContent.replace('Preço: ', '').replace(' kz', '')) * parseInt(preco.parentElement.querySelector('input').value);
    });
    document.querySelector('.total h3').textContent = `Total: ${total} kz`;
}