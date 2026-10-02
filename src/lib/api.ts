import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ??
        "Algum problema ocorreu. Por favor, tente novamente.";

      return Promise.reject({
        ...error,
        userMessage: message,
      });
    }

    return Promise.reject(error);
  },
);
