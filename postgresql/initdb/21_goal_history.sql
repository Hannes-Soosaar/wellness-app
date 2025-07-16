CREATE TABLE IF NOT EXISTS goal_history (
    id SERIAL PRIMARY KEY,
    user_goal_id INT NOT NULL,
    goal_value INT NOT NULL,
    note TEXT,
    create_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_goal_id) REFERENCES user_goals(id) ON DELETE CASCADE
);