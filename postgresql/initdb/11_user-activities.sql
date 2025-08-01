CREATE TABLE IF NOT EXISTS user_activities (
id SERIAL PRIMARY KEY,
activity_type TEXT NOT NULL,
user_id UUID NOT NULL,
duration NUMERIC NOT NULL,
intensity TEXT NOT NULL,
calories_burned NUMERIC, -- calculate and store
date DATE,
note TEXT,
created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);
