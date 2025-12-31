import { Request, Response } from "express";
import db from "../database/connection";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const criarPet = async (req: Request, res: Response) => {
  const { nome, especie, raca, id_dono } = req.body;

  try {
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO pet (nome, especie, raca, id_dono) VALUES (?, ?, ?, ?)",
      [nome, especie, raca, id_dono]
    );

    res.json({ id_pet: result.insertId });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar pet" });
  }
};

export const listarPets = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM view_pets"
    );

    res.json(rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar pets" });
  }
};
