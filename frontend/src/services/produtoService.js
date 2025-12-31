import api from "../api/api";

export default {
  list() { return api.get("/produtos"); },
  create(produto) { return api.post("/produtos", produto); }
};
