CREATE TABLE IF NOT EXISTS user_activities (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    activity_type INT NOT NULL, -- e.g., 1 for walking, 2 for running, etc.
    activity_intensity INT NOT NULL, -- e.g., 1 for low, 2 for moderate, 3 for high
    activity_duration INT NOT NULL, -- in minutes
    activity_calories INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);