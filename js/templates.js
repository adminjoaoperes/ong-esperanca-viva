// templates.js
export async function loadTemplate(page) {
  try {
    const response = await fetch(page);
    if (!response.ok) throw new Error("Erro ao carregar a página.");
    return await response.text();
  } catch (error) {
    console.error("Erro no carregamento:", error);
    return `<section><h2>Erro ao carregar o conteúdo solicitado.</h2></section>`;
  }
}
