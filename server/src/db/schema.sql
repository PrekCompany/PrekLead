-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  lastname TEXT,
  business_name TEXT,
  business_type TEXT DEFAULT 'individual',
  plan TEXT DEFAULT 'starter',
  email_verified INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  plan TEXT DEFAULT 'starter',
  status TEXT DEFAULT 'active',
  messages_used INTEGER DEFAULT 0,
  leads_used INTEGER DEFAULT 0,
  period_start TEXT,
  period_end TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- OTP codes table
CREATE TABLE IF NOT EXISTS otp_codes (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  type TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT,
  email TEXT,
  phone TEXT,
  source TEXT,
  status TEXT DEFAULT 'new',
  score INTEGER DEFAULT 0,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  lead_id TEXT,
  direction TEXT,
  channel TEXT DEFAULT 'telegram',
  content TEXT,
  ai_classification TEXT,
  ai_intent TEXT,
  ai_score INTEGER,
  ai_reply TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL
);

-- Telegram sessions table
CREATE TABLE IF NOT EXISTS telegram_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  phone TEXT,
  session_data TEXT,
  connected INTEGER DEFAULT 0,
  last_sync TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics_events (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  event_type TEXT,
  metadata TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_leads_user ON leads(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_user ON messages(user_id);
CREATE INDEX IF NOT EXISTS idx_telegram_user ON telegram_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_user ON analytics_events(user_id);

</parameter>
</write_to_file>