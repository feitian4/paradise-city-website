import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// 数据库文件路径
const DB_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'paradise.db');

// 确保目录存在
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// 创建数据库连接（单例）
let db: Database.Database;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initDb(db);
  }
  return db;
}

function initDb(db: Database.Database) {
  // 预约表
  db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      service TEXT NOT NULL,
      date TEXT NOT NULL,
      people INTEGER NOT NULL DEFAULT 1,
      message TEXT,
      wallet_address TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
    CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
    CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
  `);
}

// 预约相关操作
export const bookingDb = {
  create(booking: {
    id: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    date: string;
    people: number;
    message?: string;
    walletAddress?: string;
  }) {
    const stmt = getDb().prepare(`
      INSERT INTO bookings (id, name, email, phone, service, date, people, message, wallet_address)
      VALUES (@id, @name, @email, @phone, @service, @date, @people, @message, @walletAddress)
    `);
    return stmt.run(booking);
  },

  findById(id: string) {
    return getDb().prepare('SELECT * FROM bookings WHERE id = ?').get(id);
  },

  findByEmail(email: string) {
    return getDb().prepare('SELECT * FROM bookings WHERE email = ? ORDER BY created_at DESC').all(email);
  },

  stats() {
    const total = (getDb().prepare('SELECT COUNT(*) as count FROM bookings').get() as any).count;
    const pending = (getDb().prepare("SELECT COUNT(*) as count FROM bookings WHERE status = 'pending'").get() as any).count;
    const confirmed = (getDb().prepare("SELECT COUNT(*) as count FROM bookings WHERE status = 'confirmed'").get() as any).count;
    return { total, pending, confirmed };
  },

  updateStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled') {
    return getDb().prepare('UPDATE bookings SET status = ? WHERE id = ?').run(status, id);
  },
};
