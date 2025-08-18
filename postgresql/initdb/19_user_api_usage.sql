-- this will not be used as we ended up using a built in version of the limiter

CREATE TABLE api_usage (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE,
    request_count INT DEFAULT 0,
    period_start TIMESTAMP NOT NULL,
    period_end TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);