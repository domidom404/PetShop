import { Request, Response } from "express";
import db from "../database/connection";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const criarProduto = async (req: Request, res: Response) => {
  const { nome, preco, categoria, estoque } = req.body;

  try {
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO produto (nome, preco, categoria, estoque) VALUES (?, ?, ?, ?)",
      [nome, preco, categoria, estoque]
    );

    res.json({ id_produto: result.insertId });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
};

export const listarProdutos = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM produto"
    );
    res.json(rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar produtos" });
  }
};
