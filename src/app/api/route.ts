import { NextRequest, NextResponse } from "next/server";

import sql from "better-sqlite3";

export const GET = async (req: NextRequest) => {
  const db = sql("diary.db");

  const searchParams = req.nextUrl.searchParams;
  const date = searchParams.get("date");
  const all = db.prepare(`SELECT * FROM diary WHERE date = '${date}'`).get();

  return NextResponse.json(all);
};
