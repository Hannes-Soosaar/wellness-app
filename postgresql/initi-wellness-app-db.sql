
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS workouts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    workout_date DATE NOT NULL,
    duration INT NOT NULL, -- in minutes
    calories_burned INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS meals (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    meal_date DATE NOT NULL,
    meal_type VARCHAR(50) NOT NULL, -- e.g., breakfast, lunch, dinner, snack
    calories INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sleep_logs (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    sleep_date DATE NOT NULL,
    hours_slept DECIMAL(4, 2) NOT NULL, -- e.g., 7.50 for 7 hours and 30 minutes
    quality_rating INT CHECK (quality_rating >= 1 AND quality_rating <= 5), -- 1 to 5 scale
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);