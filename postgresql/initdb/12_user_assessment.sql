CREATE TABLE IF NOT EXISTS user_assessment (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL unique,
    assessment_criteria_id INT NOT NULL,
    user_wellness_score NUMERIC NOT NULL DEFAULT 0, -- calculated and entered.
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (assessment_criteria_id) REFERENCES assessment_criteria(id) ON DELETE CASCADE
);