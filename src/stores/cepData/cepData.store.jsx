import axios from 'axios';
import { toast } from 'react-toastify';

export async function fetchCepData(cep) {
  try {
    const result = await axios.get(`https://opencep.com/v1/${cep}`);
    return result;
  } catch (e) {
    console.error(e);
    toast.error(
      'Ocorreu um erro ao buscar os dados pelo CEP. Por favor preencha manualmente.',
    );
  }
}
