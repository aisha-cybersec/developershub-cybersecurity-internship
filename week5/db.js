const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'test.db'));

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL
  )`);

  db.run(`DELETE FROM products`);

  const stmt = db.prepare(`INSERT INTO products (name, price) VALUES (?, ?)`);
  stmt.run('Laptop', 85000);
  stmt.run('Mobile Phone', 45000);
  stmt.run('Headphones', 3500);
  stmt.run('Keyboard', 2200);
  stmt.run('Monitor', 18000);
  stmt.finalize();
});

module.exports = db;
