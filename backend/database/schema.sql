-- StayNest Hotel Management System
-- PostgreSQL Database Schema
-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user'
        CHECK (role IN ('admin', 'user')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- HOTELS TABLE
CREATE TABLE IF NOT EXISTS hotels (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    latitude NUMERIC(10, 7) NOT NULL
        CHECK (latitude BETWEEN -90 AND 90),
    longitude NUMERIC(10, 7) NOT NULL
        CHECK (longitude BETWEEN -180 AND 180),
    price NUMERIC(12, 2) NOT NULL
        CHECK (price > 0),
    image_path VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES FOR SEARCH AND FILTERING
CREATE INDEX IF NOT EXISTS idx_hotels_title
ON hotels USING GIN (to_tsvector('simple', title));

CREATE INDEX IF NOT EXISTS idx_hotels_price
ON hotels (price);

CREATE INDEX IF NOT EXISTS idx_hotels_created
ON hotels (id DESC);

-- ==========================================
-- END OF STAYNEST DATABASE SCHEMA
-- ==========================================
