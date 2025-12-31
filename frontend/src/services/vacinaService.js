 import api from "../api/api";

export default {
  list() { return api.get("/vacinas"); },
  create(data) { return api.post("/vacinas", data); },
  delete(id) { return api.delete(`/vacinas/${id}`); }
};
