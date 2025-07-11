CREATE TABLE IF NOT EXISTS user_profiles{
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    first_name TEXT,
    last_name TEXT ,
    age INT,
    height INT ,
    neck_circumference INT ,
    waist_circumference INT ,
    hip_circumference INT ,
    body_fat_percentage INT ,
    goal_type TEXT ,
    goal_weight INT ,
    current_weight INT ,
    goal_calories INT ,
    current_calories INT,
    location TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
};