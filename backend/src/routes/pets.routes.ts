import { Router } from "express";
import { getPets } from "../controllers/pets.controller";

const router = Router();

router.get("/", getPets);

export default router;
