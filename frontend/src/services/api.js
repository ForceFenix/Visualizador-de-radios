export const uploadPDFs = async (formData) => {
  const response = await fetch("http://localhost:4000/api/files/upload", {
    method: "POST",
    body: formData
  });

  if (!response.ok) throw new Error("Falló la carga");
  return response.json();
};