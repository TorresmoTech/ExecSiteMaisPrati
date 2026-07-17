// ================================
// ViaCEP - Torresmo Tech
// ================================

document.addEventListener("DOMContentLoaded", () => {

    const cepInput = document.getElementById("cep");

    if (!cepInput) return;

    cepInput.addEventListener("blur", buscarCEP);

});

async function buscarCEP() {

    let cep = document.getElementById("cep").value;

    cep = cep.replace(/\D/g, "");

    if (cep.length !== 8) {

        limparEndereco();
        return;

    }

    try {

        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        if (!response.ok) {
            throw new Error("Erro ao consultar o ViaCEP.");
        }

        const dados = await response.json();

        if (dados.erro) {

            limparEndereco();
            return;

        }

        document.getElementById("rua").value = dados.logradouro || "";
        document.getElementById("bairro").value = dados.bairro || "";
        document.getElementById("cidade").value = dados.localidade || "";
        document.getElementById("estado").value = dados.uf || "";

    }

    catch (erro) {

        console.error("Erro ViaCEP:", erro);

        limparEndereco();

    }

}

function limparEndereco() {

    document.getElementById("rua").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";

}