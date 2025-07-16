CREATE TABLE IF NOT EXISTS restriction_types(
    id TEXT primary key,
    category TEXT,
    restriction TEXT,
    create_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL DEFAULT 'active
)

