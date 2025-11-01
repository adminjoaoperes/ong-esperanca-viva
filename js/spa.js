// spa.js
import { loadTemplate } from "./templates.js";

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");
  const main = document.querySelector("main");

  async function navigate(event) {
    event.preventDefault();
    const page = event.target.getAttribute("href");
    const content = await loadTemplate(page);
    main.innerHTML = content;
    window.history.pushState({ page }, "", page);
  }

  links.forEach(link => link.addEventListener("click", navigate));

  window.addEventListener("popstate", e => {
    if (e.state?.page) {
      loadTemplate(e.state.page).then(html => main.innerHTML = html);
    }
  });
});
