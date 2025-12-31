import { Request, Response } from "express";
import  db  from "../database/connection";
import { ResultSetHeader } from "mysql2";

export const cadastroCompleto = async (req: Request, res: Response) => {
  try {
    const { nome, telefone, email } = req.body;

    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO dono (nome, telefone, email) VALUES (?, ?, ?)",
      [nome, telefone, email]
    );

    res.json({
      id_dono: result.insertId,
      message: "Cadastro realizado com sucesso!"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao cadastrar." });
  }
};
