// form.js - Validação e consistência dos formulários
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = form.querySelector('input[name="nome"]');
    const email = form.querySelector('input[name="email"]');
    const msg = form.querySelector('textarea[name="mensagem"]');
    const erros = [];

    if (!nome || nome.value.trim().length < 3)
      erros.push("O nome deve ter pelo menos 3 caracteres.");
    if (!email || !email.value.includes("@"))
      erros.push("Digite um e-mail válido.");
    if (!msg || msg.value.trim().length < 10)
      erros.push("A mensagem deve ter pelo menos 10 caracteres.");

    const alerta = document.createElement("div");
    alerta.className = erros.length === 0 ? "alert success" : "alert error";

    if (erros.length === 0) {
      alerta.textContent = "Formulário enviado com sucesso!";
      localStorage.setItem("cadastroUsuario", JSON.stringify({
        nome: nome.value,
        email: email.value,
        mensagem: msg.value
      }));
      form.reset();
    } else {
      alerta.innerHTML = `<strong>Erros:</strong><ul>${erros.map(e => `<li>${e}</li>`).join("")}</ul>`;
    }

    const anterior = document.querySelector(".alert");
    if (anterior) anterior.remove();
    form.insertAdjacentElement("beforebegin", alerta);

    setTimeout(() => alerta.remove(), 6000);
  });
});
