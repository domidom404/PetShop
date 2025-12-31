import express from "express";
import cors from "cors";

import donoRoutes from "./routes/donoRoutes";
import petRoutes from "./routes/petRoutes";
import consultaRoutes from "./routes/consultaRoutes";
import vacinaRoutes from "./routes/vacinaRoutes";
import produtoRoutes from "./routes/produtoRoutes";
import vendaRoutes from "./routes/vendaRoutes";
import cadastroCompletoRoutes from "./routes/cadastroCompletoRoutes";


const app = express();

app.use(cors());
app.use(express.json());

// Rotas principais
app.use("/api/donos", donoRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/consultas", consultaRoutes);
app.use("/api/vacinas", vacinaRoutes);
app.use("/api/produtos", produtoRoutes);
app.use("/api/vendas", vendaRoutes);
app.use("/api/cadastro-completo", cadastroCompletoRoutes);


app.listen(3001, () => {
  console.log("Backend rodando em http://localhost:3001");
});
