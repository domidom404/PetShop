import { Request, Response } from "express";
import  db  from "../database/connection";
import { ResultSetHeader } from "mysql2";

export const criarVenda = async (req: Request, res: Response) => {
  try {
    const { id_dono, id_produto, quantidade, valor_total } = req.body;

    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO vendas (id_dono, id_produto, quantidade, valor_total) VALUES (?, ?, ?, ?)",
      [id_dono, id_produto, quantidade, valor_total]
    );

    res.json({ id_venda: result.insertId, message: "Venda registrada!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao registrar venda." });
  }
};

export const listarVendas = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM view_vendas");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar vendas." });
  }
};
