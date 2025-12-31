import api from "../api/api";

export default {
  list() { return api.get("/pets"); },
  create(pet) { return api.post("/pets", pet); }
};
