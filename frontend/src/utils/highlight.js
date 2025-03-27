export function highlightText(text, filtros) {
  let resaltado = text;
  filtros.forEach(filtro => {
    filtro.keywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      resaltado = resaltado.replace(regex, `<mark style="background-color: ${filtro.color};">$1</mark>`);
      console.log("[highlight.js] Buscando", `"${keyword}"`, "con regex:", regex);
      const coincidencias = [...text.matchAll(regex)];
      console.log("[highlight.js] Coincidencias encontradas:", coincidencias.length);
    });
  });
  return resaltado;
}