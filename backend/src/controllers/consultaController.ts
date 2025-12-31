import { Request, Response } from "express";
import db from "../database/connection";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const marcarConsulta = async (req: Request, res: Response) => {
  const { id_pet, data_consulta, motivo } = req.body;

  try {
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO consulta (id_pet, data_consulta, motivo) VALUES (?, ?, ?)",
      [id_pet, data_consulta, motivo]
    );

    res.json({ id_consulta: result.insertId });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao marcar consulta" });
  }
};

export const listarConsultas = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM view_consultas"
    );

    res.json(rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar consultas" });
  }
};
