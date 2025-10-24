/* -----------------------------------
   🌱 ONG Esperança Viva
   Script de Formulário Interativo
   Autor: João [Seu Sobrenome]
   Última atualização: Outubro/2025
----------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formCadastro");

  /* === FUNÇÕES DE MÁSCARA === */
  const aplicarMascara = (campo, tipo) => {
    campo.addEventListener("input", () => {
      let valor = campo.value.replace(/\D/g, ""); // Remove não numéricos

      if (tipo === "cpf") {
        campo.value = valor
          .replace(/^(\d{3})(\d)/, "$1.$2")
          .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
          .replace(/\.(\d{3})(\d)/, ".$1-$2")
          .slice(0, 14);
      }

      if (tipo === "cep") {
        campo.value = valor.replace(/^(\d{5})(\d)/, "$1-$2").slice(0, 9);
      }

      if (tipo === "telefone") {
        campo.value = valor
          .replace(/^(\d{2})(\d)/g, "($1) $2")
          .replace(/(\d{5})(\d{4})$/, "$1-$2")
          .slice(0, 15);
      }
    });
  };

  /* === APLICAÇÃO DAS MÁSCARAS === */
  aplicarMascara(document.getElementById("cpf"), "cpf");
  aplicarMascara(document.getElementById("cep"), "cep");
  aplicarMascara(document.getElementById("telefone"), "telefone");

  /* === FUNÇÃO DE VALIDAÇÃO === */
  const validarFormulario = () => {
    let valido = true;
    const campos = form.querySelectorAll("input[required]");
    const mensagens = [];

    campos.forEach((campo) => {
      if (!campo.value.trim()) {
        valido = false;
        mensagens.push(`O campo "${campo.previousElementSibling.textContent}" é obrigatório.`);
        campo.style.borderColor = "red";
      } else {
        campo.style.borderColor = "#bbb";
      }

      // Validação simples de e-mail
      if (campo.type === "email" && campo.value) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(campo.value)) {
          valido = false;
          mensagens.push("Digite um e-mail válido.");
          campo.style.borderColor = "red";
        }
      }
    });

    if (!valido) {
      exibirMensagem(mensagens.join("\n"), false);
    }

    return valido;
  };

  /* === FUNÇÃO PARA EXIBIR MENSAGENS === */
  const exibirMensagem = (texto, sucesso = true) => {
    let mensagem = document.getElementById("mensagem-form");

    if (!mensagem) {
      mensagem = document.createElement("div");
      mensagem.id = "mensagem-form";
      mensagem.setAttribute("role", "alert");
      mensagem.style.marginTop = "1rem";
      form.appendChild(mensagem);
    }

    mensagem.textContent = texto;
    mensagem.style.color = sucesso ? "green" : "red";
    mensagem.style.fontWeight = "500";
  };

  /* === ENVIO DO FORMULÁRIO === */
  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (validarFormulario()) {
      exibirMensagem("Cadastro enviado com sucesso! 🎉", true);
      form.reset();
    }
  });
});
