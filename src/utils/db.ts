import path from "path";
import Database from "better-sqlite3";

const __dirname = import.meta.dirname;
const dbPath = path.resolve(__dirname, "database.db");
// eslint-disable-next-line no-console -- for debug
const db = new Database(dbPath, { verbose: console.log });

// テーブルの作成
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  )
`);

// サンプルデータの挿入関数
export function insertUser(name: string, email: string): void {
  const select = db.prepare("SELECT * FROM users WHERE email = ?");
  const user = select.get(email);

  if (!user) {
    const insert = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
    insert.run(name, email);
  } else {
    console.warn(`User with email ${email} already exists.`);
  }
}

// データの取得関数
export function getUsers(): { id: number; name: string; email: string }[] {
  const select = db.prepare("SELECT * FROM users");
  return select.all() as { id: number; name: string; email: string }[];
}

// サンプルデータの挿入
insertUser("John Doe", "john@example.com");
insertUser("Jane Doe", "jane@example.com");
