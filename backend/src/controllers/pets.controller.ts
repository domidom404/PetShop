import { Request, Response } from "express";
import { db } from "../database/connection";

export const getPets = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM Pet");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pets." });
  }
};
