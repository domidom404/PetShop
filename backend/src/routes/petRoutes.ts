import { Router } from "express";
import { criarPet, listarPets } from "../controllers/petController";

const router = Router();

router.get("/", listarPets);
router.post("/", criarPet);

export default router;
