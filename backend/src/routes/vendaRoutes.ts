import { Router } from "express";
import { criarVenda, listarVendas } from "../controllers/vendaController";

const router = Router();

router.post("/vendas", criarVenda);
router.get("/vendas", listarVendas);

export default router;
