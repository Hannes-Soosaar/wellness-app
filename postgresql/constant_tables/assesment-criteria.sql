CREATE TABLE IF NOT EXISTS assessment_criteria(
    id SERIAL PRIMARY KEY,
    category TEXT NOT NULL,
    value TEXT NOT NULL,
    title TEXT NOT NULL
    description TEXT  NOT NULL,
    score INT NOT NULL,
    create_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL DEFAULT 'active
)