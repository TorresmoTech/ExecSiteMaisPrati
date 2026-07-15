document.addEventListener("DOMContentLoaded", () => {

    configurarBotaoHero();
    configurarFormulario();
    animarCards();

});

function configurarBotaoHero() {

    const botao = document.getElementById("btnSaibaMais");

    botao.addEventListener("click", () => {

        alert("Obrigado pelo interesse! Agora preencha o formulário de consultoria.");

        document
            .getElementById("contato")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

}

function configurarFormulario() {

    const formulario = document.getElementById("formConsultoria");

    formulario.addEventListener("submit", function (event) {

        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        if (nome === "" || email === "" || mensagem === "") {

            alert("Preencha todos os campos obrigatórios.");

            return;

        }

        if (!validarEmail(email)) {

            alert("Digite um e-mail válido.");

            return;

        }

        alert(
            "Consultoria solicitada com sucesso!\n\n" +
            "Obrigado pelo contato, " + nome + "."
        );

        formulario.reset();

    });

}

function validarEmail(email) {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

}

function animarCards() {

    const cards = document.querySelectorAll(".card");

    cards.forEach((card, indice) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";

        setTimeout(() => {

            card.style.transition = "all .6s ease";

            card.style.opacity = "1";
            card.style.transform = "translateY(0px)";

        }, indice * 180);

    });

}

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (window.scrollY > 50) {

        header.style.background = "#101010";
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,.5)";

    } else {

        header.style.background = "#181818";
        header.style.boxShadow = "none";

    }

});


const secoes = document.querySelectorAll("section");
const links = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let secaoAtual = "";

    secoes.forEach((secao) => {

        const topo = secao.offsetTop - 120;

        if (window.scrollY >= topo) {

            secaoAtual = secao.getAttribute("id");

        }

    });

    links.forEach((link) => {

        link.classList.remove("ativo");

        if (link.getAttribute("href") === "#" + secaoAtual) {

            link.classList.add("ativo");

        }

    });

});