import { Request, Response } from "express";
import db from "../database/connection";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const registrarVacina = async (req: Request, res: Response) => {
  const { id_pet, nome_vacina, data_aplicacao, veterinario } = req.body;

  try {
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO vacinas (id_pet, nome_vacina, data_aplicacao, veterinario) VALUES (?, ?, ?, ?)",[id_pet, nome_vacina, data_aplicacao, veterinario]
    );

    res.json({ id_vacina: result.insertId });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao registrar vacina" });
  }
};

export const listarVacinas = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM view_vacinas"
    );
    res.json(rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar vacinas" });
  }
};
