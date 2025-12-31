import api from "../api/api";

export const cadastrarDonoCompleto = (dados) => {
  return api.post("/donos/cadastro-completo", dados);
};
