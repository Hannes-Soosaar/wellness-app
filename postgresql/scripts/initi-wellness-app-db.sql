-- Not needed anymore

-- Insert User 1
INSERT INTO users (email, password, is_verified, last_login, verification_token, password_reset_token, password_reset_expires, role, status)
VALUES
('user1@example.com', 'password123', TRUE, NOW(), 'verification-token-1', 'reset-token-1', NOW() + INTERVAL '1 hour', 'user', 'active');

-- Insert User 2
INSERT INTO users (email, password, is_verified, last_login, verification_token, password_reset_token, password_reset_expires, role, status)
VALUES
('user2@example.com', 'password456', FALSE, NOW(), 'verification-token-2', 'reset-token-2', NOW() + INTERVAL '1 hour', 'user', 'inactive');

-- Insert User 3
INSERT INTO users (email, password, is_verified, last_login, verification_token, password_reset_token, password_reset_expires, role, status)
VALUES
('admin@example.com', 'password789', TRUE, NOW(), 'verification-token-3', 'reset-token-3', NOW() + INTERVAL '1 hour', 'admin', 'active');

-- Insert User 4
INSERT INTO users (email, password, is_verified, last_login, verification_token, password_reset_token, password_reset_expires, role, status)
VALUES
('user4@example.com', 'password101', TRUE, NOW(), 'verification-token-4', 'reset-token-4', NOW() + INTERVAL '1 hour', 'user', 'banned');

-- Insert User 5
INSERT INTO users (email, password, is_verified, last_login, verification_token, password_reset_token, password_reset_expires, role, status)
VALUES
('user5@example.com', 'password202', FALSE, NOW(), 'verification-token-5', 'reset-token-5', NOW() + INTERVAL '1 hour', 'user', 'active');

