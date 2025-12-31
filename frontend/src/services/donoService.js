import api from "../api/api";

export default {
  list() { return api.get("/dono"); },
  create(dono) { return api.post("/dono", dono); },
  // se seu backend tiver /dono (singular), mude para "/dono"
};
