 import api from "../api/api";

export default {
  list() { return api.get("/vendas"); },
  create(data) { return api.post("/vendas", data); },
  delete(id) { return api.delete(`/vendas/${id}`); }
};
