CREATE TABLE IF NOT EXISTS restriction_types(
    id SERIAL PRIMARY KEY,
    category TEXT, 
    restriction TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL DEFAULT 'active'
);

