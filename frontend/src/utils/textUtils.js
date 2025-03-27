export function extraerParte(texto) {
  const inicio = texto.indexOf("TEXTO");
  const inicioTextoClaro = texto.indexOf("Texto Claro:", inicio + 1);
  const fin = texto.indexOf("ADJUNTOS");

  if (inicioTextoClaro !== -1) {
    console.log("[textUtils.js] Extraído desde índice:", inicioTextoClaro + 13, "hasta:", fin);
    return texto.slice(inicioTextoClaro + 13, fin).trim();
  }

  console.log("[textUtils.js] Extraído desde índice:", inicio + 6, "hasta:", fin);
  return texto.slice(inicio + 6, fin).trim();
}