const carrossel = document.getElementById('carrosselLivros');
const btnProximo = document.getElementById('proximo');
const btnAnterior = document.getElementById('anterior');
const larguraLivro = 240;
let scrollAtual = 0;

if (carrossel && btnProximo && btnAnterior) {
    btnProximo.addEventListener('click', () => {
        scrollAtual += larguraLivro;
        if (scrollAtual > carrossel.scrollWidth - carrossel.clientWidth) {
            scrollAtual = 0;
        }
        carrossel.scrollTo({ left: scrollAtual, behavior: 'smooth' });
    });

    btnAnterior.addEventListener('click', () => {
        scrollAtual -= larguraLivro;
        if (scrollAtual < 0) {
            scrollAtual = carrossel.scrollWidth - carrossel.clientWidth;
        }
        carrossel.scrollTo({ left: scrollAtual, behavior: 'smooth' });
    });
}

const formContato = document.getElementById("formContato");

if (formContato) {
    formContato.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const motivo = document.getElementById("motivo").value;
        const mensagem = document.getElementById("mensagem").value.trim();
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nome || !email || !motivo || !mensagem) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        if (!emailValido.test(email)) {
            alert("Por favor, informe um e-mail válido.");
            return;
        }

        alert("Sua solicitação foi registrada com sucesso!");
        formContato.reset();
    });
}

function pesquisarLivro() {
    const termo = document.getElementById("pesquisa").value.trim().toLowerCase();
    const livros = document.querySelectorAll(".livro");

    let encontrado = false;

    livros.forEach((livro) => {
        const titulo = livro.querySelector("img").alt.toLowerCase();
        const autor = livro.querySelector("h3").textContent.toLowerCase();
        const genero = livro.querySelector("p").textContent.toLowerCase();

        if (
            titulo.includes(termo) ||
            autor.includes(termo) ||
            genero.includes(termo)
        ) {
            livro.style.display = "block";
            encontrado = true;
        } else {
            livro.style.display = "none";
        }
    });

    if (!termo) {
        livros.forEach(livro => livro.style.display = "block");
    } else if (!encontrado) {
        const modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
        modal.show();
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("pesquisa");
    if (input) {
        input.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                pesquisarLivro();
            }
        });
    }
});