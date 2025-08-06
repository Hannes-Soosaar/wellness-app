CREATE TABLE IF NOT EXISTS profile_history (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    body_fat_percentage NUMERIC,
    neck_circumference NUMERIC,
    waist_circumference NUMERIC,
    hip_circumference NUMERIC,
    weight NUMERIC,
    calories_required NUMERIC,
    BMI NUMERIC,
    date DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);