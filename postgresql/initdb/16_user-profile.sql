CREATE TABLE IF NOT EXISTS user_profiles(
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    first_name BYTEA, -- encrypt
    last_name BYTEA, -- encrypt
    sex TEXT,
    age INT,
    height NUMERIC,
    neck_circumference NUMERIC,
    waist_circumference NUMERIC,
    body_fat_percentage NUMERIC,
    current_weight NUMERIC,
    current_calories_target NUMERIC,
    current_BMI NUMERIC,
    location TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);