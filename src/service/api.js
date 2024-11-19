import axios from 'axios';

const apiKey = 'ec7940f6d87b9620243c09320683e9ce'; 
const baseURL = 'https://api.openweathermap.org/data/2.5/';

export async function buscarClima(latitude, longitude) {
  try {
    const resposta = await axios.get(`${baseURL}weather`, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: apiKey,
        units: 'metric',
        lang: 'pt_br',
      },
    });

    return resposta.data;
  } catch (erro) {
    console.error('Erro ao buscar os dados:', erro);
    throw erro;
  }
}
