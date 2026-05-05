import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database.sqlite');
const db = new Database(dbPath);

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT,
    category TEXT,
    views INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const hasPosts = db.prepare('SELECT count(*) as count FROM posts').get() as { count: number };
if (hasPosts.count === 0) {
    db.prepare("INSERT INTO posts (title, content, category) VALUES (?, ?, ?)").run('First Entry', 'This is my first note. Everything feels so strange lately. Maybe I am just overthinking it.', 'Personal');
    db.prepare("INSERT INTO posts (title, content, category) VALUES (?, ?, ?)").run('Art Inspirations', '1. Basquiat\\n2. The colors of the sunset yesterday\\n3. That weird graffiti near the bridge', 'Art');
    db.prepare("INSERT INTO posts (title, content, category) VALUES (?, ?, ?)").run('Music to listen to', 'Listen to more Radiohead. Also need to find that one shoegaze band I heard at the cafe.', 'Music');
}


export default db;
