CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active'
);