CREATE TABLE IF NOT EXISTS user_profiles{
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    user_goal_id INT,
    first_name TEXT,
    last_name TEXT ,
    age INT,
    height INT ,
    neck_circumference INT ,
    waist_circumference INT ,
    body_fat_percentage INT ,
    goal TEXT ,
    current_weight INT ,
    current_calories INT,
    location TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    FOREIGN KEY (user_goal_id) REFERENCES user_goal(id) ON DELETE CASCADE
};