INSERT INTO assessment_criteria (category, value, title, description, score, status)
VALUES
-- USER_ACTIVITY_LIFESTYLE (base points 0-5)
('USER_ACTIVITY_LIFESTYLE', 'sedentary: little or no exercise', 'sedentary: little or no exercise', 'USER_ACTIVITY_LIFESTYLE', 0, 'active'),
('USER_ACTIVITY_LIFESTYLE', 'Light:  exercise 1-3 times a week', 'Light:  exercise 1-3 times a week', 'USER_ACTIVITY_LIFESTYLE', 1, 'active'),
('USER_ACTIVITY_LIFESTYLE', 'Moderate: exercise 4-5 times a  week', 'Moderate: exercise 4-5 times a  week', 'USER_ACTIVITY_LIFESTYLE', 3, 'active'),
('USER_ACTIVITY_LIFESTYLE', 'Active: intense exercise 3-4 times a week', 'Active: intense exercise 3-4 times a week', 'USER_ACTIVITY_LIFESTYLE', 4, 'active'),
('USER_ACTIVITY_LIFESTYLE', 'Extra Active: very intense exercise daily, or physical job', 'Extra Active: very intense exercise daily, or physical job', 'USER_ACTIVITY_LIFESTYLE', 5, 'active'),

-- USER_WEEKLY_ACTIVITY_LIST (points 2, 4, 6, 8, 10)
('USER_WEEKLY_ACTIVITY_LIST', 'don''t exercise', 'don''t exercise', 'USER_WEEKLY_ACTIVITY_LIST', 2, 'active'),
('USER_WEEKLY_ACTIVITY_LIST', 'at least once a week', 'at least once a week', 'USER_WEEKLY_ACTIVITY_LIST', 4, 'active'),
('USER_WEEKLY_ACTIVITY_LIST', 'at least three times a week', 'at least three times a week', 'USER_WEEKLY_ACTIVITY_LIST', 6, 'active'),
('USER_WEEKLY_ACTIVITY_LIST', 'at least five times a week', 'at least five times a week', 'USER_WEEKLY_ACTIVITY_LIST', 8, 'active'),
('USER_WEEKLY_ACTIVITY_LIST', 'every day', 'every day', 'USER_WEEKLY_ACTIVITY_LIST', 10, 'active'),

-- USER_EXERCISE_TYPE_LIST (no points, score 0)
('USER_EXERCISE_TYPE_LIST', 'cardio', 'cardio', 'USER_EXERCISE_TYPE_LIST', 0, 'active'),
('USER_EXERCISE_TYPE_LIST', 'strength', 'strength', 'USER_EXERCISE_TYPE_LIST', 0, 'active'),
('USER_EXERCISE_TYPE_LIST', 'endurance', 'endurance', 'USER_EXERCISE_TYPE_LIST', 0, 'active'),
('USER_EXERCISE_TYPE_LIST', 'strength endurance', 'strength endurance', 'USER_EXERCISE_TYPE_LIST', 0, 'active'),
('USER_EXERCISE_TYPE_LIST', 'muscle mass', 'muscle mass', 'USER_EXERCISE_TYPE_LIST', 0, 'active'),

-- USER_SESSION_DURATION (point multiplier: 1, 1.2, 1.5, 2, 2.5, 3)
('USER_SESSION_DURATION', '15', '15', 'USER_SESSION_DURATION', 1, 'active'),
('USER_SESSION_DURATION', '30', '30', 'USER_SESSION_DURATION', 1.2, 'active'),
('USER_SESSION_DURATION', '45', '45', 'USER_SESSION_DURATION', 1.5, 'active'),
('USER_SESSION_DURATION', '60', '60', 'USER_SESSION_DURATION', 2, 'active'),
('USER_SESSION_DURATION', '90', '90', 'USER_SESSION_DURATION', 2.5, 'active'),
('USER_SESSION_DURATION', '120+', '120+', 'USER_SESSION_DURATION', 3, 'active'),

-- USER_TARGET_HEART_RATE (point multiplier: 1, 1.5, 2, 3)
('USER_TARGET_HEART_RATE', 'Very light: 50-60% of max', 'Very light: 50-60% of max', 'USER_TARGET_HEART_RATE', 1, 'active'),
('USER_TARGET_HEART_RATE', 'Light:      60-70% of max', 'Light:      60-70% of max', 'USER_TARGET_HEART_RATE', 1.5, 'active'),
('USER_TARGET_HEART_RATE', 'Moderate:   70-80% of max', 'Moderate:   70-80% of max', 'USER_TARGET_HEART_RATE', 2, 'active'),
('USER_TARGET_HEART_RATE', 'Hard:       80-90% of max', 'Hard:       80-90% of max', 'USER_TARGET_HEART_RATE', 3, 'active'),

-- USER_FITNESS_LEVEL (no points, score 0)
('USER_FITNESS_LEVEL', 'beginner', 'beginner', 'USER_FITNESS_LEVEL', 0, 'active'),
('USER_FITNESS_LEVEL', 'intermediate', 'intermediate', 'USER_FITNESS_LEVEL', 0, 'active'),
('USER_FITNESS_LEVEL', 'advanced', 'advanced', 'USER_FITNESS_LEVEL', 0, 'active'),
('USER_FITNESS_LEVEL', 'athlete', 'athlete', 'USER_FITNESS_LEVEL', 0, 'active'),

-- USER_ENDURANCE_LEVEL (points: 2, 4, 6, 8, 10)
('USER_ENDURANCE_LEVEL', 'up to 2.5km', 'up to 2.5km', 'USER_ENDURANCE_LEVEL', 2, 'active'),
('USER_ENDURANCE_LEVEL', 'up to 5km', 'up to 5km', 'USER_ENDURANCE_LEVEL', 4, 'active'),
('USER_ENDURANCE_LEVEL', 'up to 10km', 'up to 10km', 'USER_ENDURANCE_LEVEL', 6, 'active'),
('USER_ENDURANCE_LEVEL', 'up to 20km', 'up to 20km', 'USER_ENDURANCE_LEVEL', 8, 'active'),
('USER_ENDURANCE_LEVEL', 'over 20km', 'over 20km', 'USER_ENDURANCE_LEVEL', 10, 'active'),

-- USER_STRENGTH_LEVEL (points: 2, 4, 6, 8, 10)
('USER_STRENGTH_LEVEL', '0 to 5 pushups', '0 to 5 pushups', 'USER_STRENGTH_LEVEL', 2, 'active'),
('USER_STRENGTH_LEVEL', '6 to 15 pushups', '6 to 15 pushups', 'USER_STRENGTH_LEVEL', 4, 'active'),
('USER_STRENGTH_LEVEL', '16 to 30 pushups', '16 to 30 pushups', 'USER_STRENGTH_LEVEL', 6, 'active'),
('USER_STRENGTH_LEVEL', '31 to 50 pushups', '31 to 50 pushups', 'USER_STRENGTH_LEVEL', 8, 'active'),
('USER_STRENGTH_LEVEL', '51+ pushups', '51+ pushups', 'USER_STRENGTH_LEVEL', 10, 'active');