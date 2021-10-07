export default async function getDataByCep(cep) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      mode: "cors",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return false;
  }
}
