import sql from "better-sqlite3";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db = sql("diary.db");

  const all = db.prepare("SELECT * FROM diary").all();

  return NextResponse.json(all);
};
