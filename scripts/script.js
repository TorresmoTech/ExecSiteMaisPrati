document.addEventListener("DOMContentLoaded", () => {

    const btnSaibaMais = document.getElementById("btnSaibaMais");

    if (btnSaibaMais) {
        btnSaibaMais.addEventListener("click", () => {
            document
                .getElementById("contato")
                .scrollIntoView({
                    behavior: "smooth"
                });
        });
    }

    const formulario = document.getElementById("formConsultoria");

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();
        const dados = {
            nome: document.getElementById("nome").value.trim(),
            email: document.getElementById("email").value.trim(),
            telefone: document.getElementById("telefone")?.value.trim() || "",
            cep: document.getElementById("cep").value.trim(),
            rua: document.getElementById("rua").value.trim(),
            numero: document.getElementById("numero")?.value.trim() || "",
            complemento: document.getElementById("complemento")?.value.trim() || "",
            bairro: document.getElementById("bairro")?.value.trim() || "",
            cidade: document.getElementById("cidade").value.trim(),
            estado: document.getElementById("estado").value.trim(),
            mensagem: document.getElementById("mensagem").value.trim(),
            assunto: document.getElementById("assunto")?.value || ""
        };
        try {
            await salvarConsultoria(dados);
            alert("Consultoria enviada com sucesso!");
            formulario.reset();
        } catch (erro) {
            console.error("Erro:", erro);
            alert("Não foi possível enviar a consultoria.");
        }
    });
});