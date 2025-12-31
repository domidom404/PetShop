 import api from "../api/api";

export default {
  list() { return api.get("/consultas"); },
  create(data) { return api.post("/consultas", data); },
  delete(id) { return api.delete(`/consultas/${id}`); }
};
