import { Router } from "express";
import donoRoutes from "./donoRoutes";
import petRoutes from "./petRoutes";
import produtoRoutes from "./produtoRoutes";
import vendaRoutes from "./vendaRoutes";
import consultaRoutes from "./consultaRoutes";
import vacinaRoutes from "./vacinaRoutes";

const router = Router();

router.use("/donos", donoRoutes);
router.use("/pets", petRoutes);
router.use("/produtos", produtoRoutes);
router.use("/vendas", vendaRoutes);
router.use("/consultas", consultaRoutes);
router.use("/vacinas", vacinaRoutes);

export default router;
