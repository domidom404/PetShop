import { Request, Response } from "express";
import { db } from "../database/connection";

export async function exemploController(req: Request, res: Response) {
  try {
    const [rows] = await db.query("SELECT 1+1 AS resultado");
    res.json({ ok: true, resultado: rows });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
