document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formCadastro");
  const mensagem = document.getElementById("mensagem");

  // Função para exibir mensagens
  function mostrarMensagem(texto, tipo = "erro") {
    mensagem.textContent = texto;
    mensagem.className = tipo;
    setTimeout(() => mensagem.textContent = "", 4000);
  }

  // Máscara simples de CPF e telefone
  const cpfInput = document.getElementById("cpf");
  const telefoneInput = document.getElementById("telefone");
  const cepInput = document.getElementById("cep");

  cpfInput.addEventListener("input", () => {
    cpfInput.value = cpfInput.value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  });

  telefoneInput.addEventListener("input", () => {
    telefoneInput.value = telefoneInput.value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  });

  cepInput.addEventListener("input", () => {
    cepInput.value = cepInput.value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d{3})/, "$1-$2");
  });

  // Validação em tempo real
  form.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
      if (!input.checkValidity()) {
        input.classList.add("erro");
      } else {
        input.classList.remove("erro");
      }
    });
  });

  // Envio do formulário
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      mostrarMensagem("⚠️ Por favor, preencha todos os campos corretamente.");
      return;
    }

    // Salvar no LocalStorage (simulação de backend)
    const dados = Object.fromEntries(new FormData(form));
    localStorage.setItem("cadastroUsuario", JSON.stringify(dados));

    form.reset();
    mostrarMensagem("✅ Cadastro realizado com sucesso!", "sucesso");
  });
});
