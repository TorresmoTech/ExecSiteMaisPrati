document.addEventListener("DOMContentLoaded", () => {

    const campoCEP = document.getElementById("cep");

    campoCEP.addEventListener("blur", buscarCEP);

});


async function buscarCEP() {

    const cep = document
        .getElementById("cep")
        .value
        .replace(/\D/g, "");

    if (cep.length !== 8) {

        limparCampos();

        return;

    }

    try {

        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        const dados = await resposta.json();

        if (dados.erro) {

            alert("CEP não encontrado.");

            limparCampos();

            return;

        }

        preencherCampos(dados);

    } catch (erro) {

        console.error("Erro ao consultar o ViaCEP:", erro);

        alert("Não foi possível consultar o CEP.");

    }

}

function preencherCampos(dados) {

    document.getElementById("rua").value = dados.logradouro;

    document.getElementById("cidade").value = dados.localidade;

    document.getElementById("estado").value = dados.uf;

}

function limparCampos() {

    document.getElementById("rua").value = "";

    document.getElementById("cidade").value = "";

    document.getElementById("estado").value = "";

}