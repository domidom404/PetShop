import { Router } from "express";
import { marcarConsulta, listarConsultas } from "../controllers/consultaController";

const router = Router();

router.post("/", marcarConsulta);
router.get("/", listarConsultas);

export default router;

