-- Sportsperson Stats and Records Database Schema
-- Supabase PostgreSQL Schema

-- Sport categories table
CREATE TABLE sport_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sportspersons table
CREATE TABLE sportspersons (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    nationality VARCHAR(100),
    sport_category_id INTEGER REFERENCES sport_categories(id),
    photo_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Statistics table
CREATE TABLE statistics (
    id SERIAL PRIMARY KEY,
    sportsperson_id INTEGER REFERENCES sportspersons(id) ON DELETE CASCADE,
    season VARCHAR(20),
    matches_played INTEGER DEFAULT 0,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    draws INTEGER DEFAULT 0,
    points_scored INTEGER DEFAULT 0,
    goals_scored INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    custom_stats JSONB, -- For sport-specific statistics
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements table
CREATE TABLE achievements (
    id SERIAL PRIMARY KEY,
    sportsperson_id INTEGER REFERENCES sportspersons(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    achievement_date DATE,
    category VARCHAR(50), -- e.g., 'Championship', 'Record', 'Award'
    importance_level INTEGER DEFAULT 1, -- 1-5 scale
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Records table
CREATE TABLE records (
    id SERIAL PRIMARY KEY,
    sportsperson_id INTEGER REFERENCES sportspersons(id) ON DELETE CASCADE,
    record_type VARCHAR(100) NOT NULL,
    record_value VARCHAR(200) NOT NULL,
    description TEXT,
    record_date DATE,
    is_current BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Awards table
CREATE TABLE awards (
    id SERIAL PRIMARY KEY,
    sportsperson_id INTEGER REFERENCES sportspersons(id) ON DELETE CASCADE,
    award_name VARCHAR(200) NOT NULL,
    awarding_organization VARCHAR(200),
    award_date DATE,
    category VARCHAR(100), -- e.g., 'MVP', 'Best Player', 'Sportsmanship'
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample sport categories
INSERT INTO sport_categories (name, description) VALUES
('Football', 'Association football (soccer)'),
('Basketball', 'Professional basketball'),
('Tennis', 'Professional tennis'),
('Cricket', 'Professional cricket'),
('Baseball', 'Professional baseball'),
('Swimming', 'Competitive swimming'),
('Athletics', 'Track and field athletics');

-- Insert sample sportspersons
INSERT INTO sportspersons (first_name, last_name, date_of_birth, nationality, sport_category_id, bio) VALUES
('Lionel', 'Messi', '1987-06-24', 'Argentina', 1, 'Considered one of the greatest football players of all time'),
('LeBron', 'James', '1984-12-30', 'United States', 2, 'One of the greatest basketball players in NBA history'),
('Roger', 'Federer', '1981-08-08', 'Switzerland', 3, 'Former world No. 1 tennis player with 20 Grand Slam titles'),
('Virat', 'Kohli', '1988-11-05', 'India', 4, 'Former captain of the Indian national cricket team');

-- Insert sample statistics
INSERT INTO statistics (sportsperson_id, season, matches_played, wins, losses, draws, goals_scored, assists) VALUES
(1, '2022-23', 50, 35, 10, 5, 25, 15),
(2, '2022-23', 75, 55, 20, 0, 1800, 720),
(3, '2022', 60, 45, 15, 0, 0, 0),
(4, '2022-23', 45, 30, 10, 5, 1500, 0);

-- Insert sample achievements
INSERT INTO achievements (sportsperson_id, title, description, achievement_date, category, importance_level) VALUES
(1, 'FIFA World Cup Winner', 'Won the FIFA World Cup with Argentina', '2022-12-18', 'Championship', 5),
(2, 'NBA Championship', 'Won NBA Championship with Los Angeles Lakers', '2020-10-11', 'Championship', 5),
(3, 'Wimbledon Champion', 'Won Wimbledon singles title', '2019-07-14', 'Championship', 5),
(4, 'ICC Cricket World Cup', 'Won ICC Cricket World Cup with India', '2011-04-02', 'Championship', 5);

-- Insert sample records
INSERT INTO records (sportsperson_id, record_type, record_value, description, record_date, is_current) VALUES
(1, 'Most Goals in a Calendar Year', '91 goals', 'Most goals scored in a calendar year (2012)', '2012-12-31', true),
(2, 'All-time NBA Scoring Leader', '38,652 points', 'Became NBA all-time leading scorer', '2023-02-07', true),
(3, 'Most Grand Slam Titles', '20 titles', 'Joint record for most Grand Slam singles titles', '2018-01-28', false),
(4, 'Most ODI Centuries', '46 centuries', 'Record for most centuries in ODI cricket', '2019-11-27', false);

-- Insert sample awards
INSERT INTO awards (sportsperson_id, award_name, awarding_organization, award_date, category, description) VALUES
(1, 'Ballon d''Or', 'France Football', '2021-11-29', 'Best Player', 'Awarded to world''s best footballer'),
(2, 'NBA MVP', 'National Basketball Association', '2020-09-17', 'MVP', 'Most Valuable Player in NBA'),
(3, 'ATP Player of the Year', 'ATP Tour', '2009-12-31', 'Best Player', 'Recognized as best tennis player of the year'),
(4, 'ICC ODI Player of the Year', 'International Cricket Council', '2017-12-31', 'Best Player', 'Best ODI player of the year');

-- Create indexes for better performance
CREATE INDEX idx_sportspersons_sport_category ON sportspersons(sport_category_id);
CREATE INDEX idx_statistics_sportsperson ON statistics(sportsperson_id);
CREATE INDEX idx_achievements_sportsperson ON achievements(sportsperson_id);
CREATE INDEX idx_records_sportsperson ON records(sportsperson_id);
CREATE INDEX idx_awards_sportsperson ON awards(sportsperson_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_sport_categories_updated_at BEFORE UPDATE ON sport_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sportspersons_updated_at BEFORE UPDATE ON sportspersons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_statistics_updated_at BEFORE UPDATE ON statistics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_achievements_updated_at BEFORE UPDATE ON achievements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_records_updated_at BEFORE UPDATE ON records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_awards_updated_at BEFORE UPDATE ON awards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
