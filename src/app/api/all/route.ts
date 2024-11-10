import { NextRequest, NextResponse } from "next/server";

import sql from "better-sqlite3";

export const GET = async (req: NextRequest) => {
  const db = sql("diary.db");

  const searchParams = req.nextUrl.searchParams;
  const month = searchParams.get("month");
  const data = db
    .prepare(`SELECT date FROM diary WHERE date like '${month}%'`)
    .all();

  if (!data) {
    return NextResponse.json(false);
  }

  return NextResponse.json(data);
};
