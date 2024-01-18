// lib/axiosConfig.ts
import axios, { AxiosError, AxiosResponse } from "axios";
// import { toast } from "react-toastify";

const axiosInstance = axios.create({
  // Configurações globais do Axios, se necessário
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Interceptador de resposta de sucesso
    return response.data;
  },
  (error: AxiosError) => {
    // Interceptador de resposta de erro
    console.log("erro no axios response");
    // Se o erro for 500, exibir um toast de erro
    if (error.response?.status === 500) {
      alert("Erro interno do servidor (500)");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
