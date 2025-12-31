import { Router } from "express";
import { cadastroCompleto } from "../controllers/donoController";

const router = Router();

router.post("/", cadastroCompleto); // POST /api/donos/

export default router;
