const sql = require("better-sqlite3");
const db = sql("diary.db");

db.prepare(
  `
        CREATE TABLE IF NOT EXISTS diary (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            weather INTEGER NOT NULL,
            picture BLOB,
            content TEXT NOT NULL
        )
    `
).run();

const dummyData = [
  {
    title: "클라이밍 하는 날",
    weather: 1,
    picture: null,
    content: "재미있었다 ~~",
  },
];

const initData = async () => {
  const init = db.prepare(`
      INSERT INTO diary VALUES (
         null,
         @title,
         @weather,
         @picture,
         @content
      )
   `);
  for (const d of dummyData) {
    init.run(d);
  }
};

initData();
