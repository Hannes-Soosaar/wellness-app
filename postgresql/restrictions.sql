CREATE TABLE IF NOT EXISTS user_restrictions (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL
    user_food_ingredients_id TEXT NOT NUll,
    excerises_if
)

CREATE TABLE foods_ingredients (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE calories_macros (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE exercise_times (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE exercise_durations (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);