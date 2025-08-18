
-- DROP TABLE user_restrictions

-- SELECT id from users WHERE is_verified = TRUE;

 
-- INSERT INTO user_settings (user_id) 
-- VALUES ('51a5b7cf-ab07-4333-b83b-5e2c7516d017');


-- DELETE FROM user_settings WHERE id = 2;

INSERT INTO user_activities (
  activity_type, 
  user_id, 
  duration, 
  intensity, 
  calories_burned, 
  date, 
  note
)
SELECT
  (ARRAY['cardio','strength','flexibility','sports'])[floor(random()*4 + 1)],
  '8aedb8b9-d0c0-4de0-88aa-ff4dd171c2f2',
  floor(random()*90 + 10), -- duration between 10–100 minutes
  (ARRAY['Low','Moderate','High'])[floor(random()*3 + 1)],
  floor(random()*800 + 100), -- calories between 100–900
  CURRENT_DATE - (i || ' days')::interval,
  'Auto-generated test activity'
FROM generate_series(1, 30) AS s(i);