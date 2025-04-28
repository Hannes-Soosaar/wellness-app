
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    google_id TEXT UNIQUE,
    github_id TEXT UNIQUE,
    is_2fa_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret TEXT,
    failed_attempts INT DEFAULT 0,
    locked_until TIMESTAMP,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verification_token TEXT,
    password_reset_token TEXT,
    password_reset_expires TIMESTAMP,
    role TEXT DEFAULT 'user', 
    status TEXT DEFAULT 'active' 
);


-- Insert User 1
INSERT INTO users (email, password, is_verified, last_login, verification_token, password_reset_token, password_reset_expires, role, status)
VALUES
('user1@example.com', 'password123', TRUE, NOW(), 'verification-token-1', 'reset-token-1', NOW() + INTERVAL '1 hour', 'user', 'active');

-- Insert User 2
INSERT INTO users (email, password, is_verified, last_login, verification_token, password_reset_token, password_reset_expires, role, status)
VALUES
('user2@example.com', 'password456', FALSE, NOW(), 'verification-token-2', 'reset-token-2', NOW() + INTERVAL '1 hour', 'user', 'inactive');

-- Insert User 3
INSERT INTO users (email, password, is_verified, last_login, verification_token, password_reset_token, password_reset_expires, role, status)
VALUES
('admin@example.com', 'password789', TRUE, NOW(), 'verification-token-3', 'reset-token-3', NOW() + INTERVAL '1 hour', 'admin', 'active');

-- Insert User 4
INSERT INTO users (email, password, is_verified, last_login, verification_token, password_reset_token, password_reset_expires, role, status)
VALUES
('user4@example.com', 'password101', TRUE, NOW(), 'verification-token-4', 'reset-token-4', NOW() + INTERVAL '1 hour', 'user', 'banned');

-- Insert User 5
INSERT INTO users (email, password, is_verified, last_login, verification_token, password_reset_token, password_reset_expires, role, status)
VALUES
('user5@example.com', 'password202', FALSE, NOW(), 'verification-token-5', 'reset-token-5', NOW() + INTERVAL '1 hour', 'user', 'active');

-- CREATE TABLE IF NOT EXISTS workouts (
--     id SERIAL PRIMARY KEY,
--     user_id INT NOT NULL,
--     workout_date DATE NOT NULL,
--     duration INT NOT NULL, -- in minutes
--     calories_burned INT NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- );

-- CREATE TABLE IF NOT EXISTS meals (
--     id SERIAL PRIMARY KEY,
--     user_id INT NOT NULL,
--     meal_date DATE NOT NULL,
--     meal_type VARCHAR(50) NOT NULL, -- e.g., breakfast, lunch, dinner, snack
--     calories INT NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- );

-- CREATE TABLE IF NOT EXISTS sleep_logs (
--     id SERIAL PRIMARY KEY,
--     user_id INT NOT NULL,
--     sleep_date DATE NOT NULL,
--     hours_slept DECIMAL(4, 2) NOT NULL, -- e.g., 7.50 for 7 hours and 30 minutes
--     quality_rating INT CHECK (quality_rating >= 1 AND quality_rating <= 5), -- 1 to 5 scale
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- );


CREATE TABLE IF NOT EXISTS fitness_goals (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    goal_type VARCHAR(50) NOT NULL, -- e.g., weight loss, muscle gain, endurance
    target_value DECIMAL(10, 2) NOT NULL,
    current_value DECIMAL(10, 2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS dietary_preferences (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    preference_type VARCHAR(50) NOT NULL, -- e.g., vegetarian, vegan, keto
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_profile(



);

