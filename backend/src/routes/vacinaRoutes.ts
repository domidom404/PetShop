import { Router } from "express";
import { registrarVacina, listarVacinas } from "../controllers/vacinaController";

const router = Router();

router.post("/", registrarVacina);
router.get("/", listarVacinas);

export default router;
