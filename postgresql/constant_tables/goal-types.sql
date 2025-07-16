CREATE TABLE IF NOT EXISTS goals{
    id SERIAL PRIMARY KEY,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
}