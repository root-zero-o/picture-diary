import { NextRequest, NextResponse } from "next/server";

import sql from "better-sqlite3";

export const GET = async (req: NextRequest) => {
  const db = sql("diary.db");

  const searchParams = req.nextUrl.searchParams;
  const date = searchParams.get("date");
  const all = db.prepare(`SELECT * FROM diary WHERE date = '${date}'`).get();

  if (!all) {
    return NextResponse.json(false);
  }
  return NextResponse.json(all);
};

export const POST = async (req: NextRequest) => {
  const db = sql("diary.db");
  const body = await req.json();

  const cur = db
    .prepare(`SELECT * FROM diary WHERE date = '${body.date}'`)
    .get();

  if (!!cur) {
    return NextResponse.json(
      { error: "이미 해당 날짜에 일기가 있습니다." },
      { status: 400 }
    );
  } else {
    const insert = db.prepare(
      `
      INSERT INTO diary(title, picture, content, date)
      VALUES(@title, @picture, @content, @date)
    `
    );

    const result = insert.run(body);
    return NextResponse.json({ id: result.lastInsertRowid });
  }
};

export const DELETE = async (req: NextRequest) => {
  const db = sql("diary.db");

  const searchParams = req.nextUrl.searchParams;
  const date = searchParams.get("date");

  const del = db.prepare(`
      DELETE FROM diary
      WHERE date = '${date}'
    `);

  const result = del.run();
  if (result.changes) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json(
      { error: "삭제에 실패하였습니다." },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  const db = sql("diary.db");

  const body = await req.json();
  const { title, content, picture } = body;

  const update = db.prepare(`
      UPDATE diary
      SET title = '${title}', content = '${content}', picture = '${picture}'
      WHERE date = '${body.date}'
    `);

  const result = update.run(body);

  if (result.changes) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json(
      { error: "수정에 실패하였습니다." },
      { status: 500 }
    );
  }
};
