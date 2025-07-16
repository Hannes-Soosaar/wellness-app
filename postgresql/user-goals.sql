CREATE TABLE IF NOT EXISTS user_goal (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL UNIQUE,
    goal_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_at DATE NOT NULL,
    goal_target_value NUMERIC NOT NULL,
    goal_start_value NUMERIC NOT NULL,
    goal_history_id NUMERIC NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    FOREIGN KEY (goal_id) REFERENCES goals(id) ON DELETE CASCADE
    FOREIGN KEY (goal_history_id) REFERENCES goal_history(id)
); 