
-- DROP TABLE profile_history

-- SELECT id from users WHERE is_verified = TRUE;

 
-- INSERT INTO user_settings (user_id) 
-- VALUES ('51a5b7cf-ab07-4333-b83b-5e2c7516d017');


-- DELETE FROM user_settings WHERE id = 2;



-- INSERT INTO user_activities (
--   activity_type, 
--   user_id, 
--   duration, 
--   intensity, 
--   calories_burned, 
--   date, 
--   note
-- )
-- SELECT
--   (ARRAY['cardio','strength','flexibility','sports'])[floor(random()*4 + 1)],
--   '8aedb8b9-d0c0-4de0-88aa-ff4dd171c2f2',
--   floor(random()*90 + 10), -- duration between 10–100 minutes
--   (ARRAY['Low','Moderate','High'])[floor(random()*3 + 1)],
--   floor(random()*800 + 100), -- calories between 100–900
--   CURRENT_DATE - (i || ' days')::interval,
--   'Auto-generated test activity'
-- FROM generate_series(1, 30) AS s(i);


-- Set the user ID
-- set userId '8aedb8b9-d0c0-4de0-88aa-ff4dd171c2f2'

-- Generate random data for each day over the past year
DO $$
DECLARE
    start_date DATE := CURRENT_DATE - INTERVAL '1 year';
    end_date DATE := CURRENT_DATE;
    d DATE;
BEGIN
    d := start_date;
    WHILE d <= end_date LOOP
        INSERT INTO profile_history (
            user_id,
            body_fat_percentage,
            wellness_score,
            neck_circumference,
            waist_circumference,
            hip_circumference,
            max_pushups,
            max_walking_time,
            weight,
            calories_required,
            BMI,
            date,
            note
        ) VALUES (
    '8aedb8b9-d0c0-4de0-88aa-ff4dd171c2f2',
    round((random()*30 + 10)::numeric, 1), -- body fat %: 10-40%
    round((random()*100)::numeric, 0),     -- wellness score: 0-100
    round((random()*10 + 30)::numeric, 1), -- neck circumference cm: 30-40
    round((random()*30 + 60)::numeric, 1), -- waist circumference cm: 60-90
    round((random()*30 + 80)::numeric, 1), -- hip circumference cm: 80-110
    floor(random()*50),                    -- max pushups: 0-50
    floor(random()*120),                   -- max walking time minutes: 0-120
    round((random()*40 + 50)::numeric, 1), -- weight kg: 50-90
    round((random()*1000 + 1500)::numeric, 0), -- calories required: 1500-2500
    round((random()*15 + 15)::numeric, 1), -- BMI: 15-30
    d,
    NULL
);
        d := d + INTERVAL '1 day';
    END LOOP;
END $$

