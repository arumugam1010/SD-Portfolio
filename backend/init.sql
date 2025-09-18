-- Initialize PostgreSQL database for Portfolio Backend
-- This file runs when the PostgreSQL container starts

-- Create database if it doesn't exist
SELECT 'CREATE DATABASE portfolio_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'portfolio_db')\gexec

-- Connect to the portfolio_db
\c portfolio_db;

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO portfolio_user;

-- Set timezone
SET timezone = 'UTC';
