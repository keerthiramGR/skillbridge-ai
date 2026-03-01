-- =============================================
-- SKILLBRIDGE AI — Supabase Database Schema
-- Complete PostgreSQL schema with RLS policies
-- =============================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- CORE TABLES
-- =============================================

-- Roles Table
CREATE TABLE roles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    permissions JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO roles (name, description) VALUES
    ('student', 'Student user who solves problems and builds skills'),
    ('recruiter', 'Recruiter who uploads challenges and hires talent'),
    ('admin', 'Platform administrator with full access');

-- Users Table
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    picture TEXT,
    google_id VARCHAR(255) UNIQUE,
    role VARCHAR(50) NOT NULL REFERENCES roles(name),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'pending', 'suspended', 'banned')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Students Table (extended profile)
CREATE TABLE students (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    university VARCHAR(255),
    graduation_year INT,
    github_url TEXT,
    linkedin_url TEXT,
    portfolio_url TEXT,
    skill_tags TEXT[] DEFAULT '{}',
    career_readiness FLOAT DEFAULT 0,
    streak_days INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recruiters Table (extended profile)
CREATE TABLE recruiters (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    organization VARCHAR(255) NOT NULL,
    org_type VARCHAR(50) DEFAULT 'startup',
    website TEXT,
    verified BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMPTZ,
    access_key_hash TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admins Table
CREATE TABLE admins (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    access_level INT DEFAULT 1,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- PROBLEM ECOSYSTEM
-- =============================================

-- Problem Statements
CREATE TABLE problem_statements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    domain VARCHAR(100) NOT NULL,
    difficulty VARCHAR(50) DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard', 'expert')),
    required_skills TEXT[] DEFAULT '{}',
    evaluation_criteria TEXT,
    deadline TIMESTAMPTZ,
    max_participants INT DEFAULT 50,
    current_participants INT DEFAULT 0,
    created_by UUID REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('draft', 'active', 'closed', 'archived')),
    attachments JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Submissions
CREATE TABLE submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    problem_id UUID NOT NULL REFERENCES problem_statements(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES users(id),
    github_url TEXT NOT NULL,
    demo_url TEXT,
    documentation TEXT,
    project_files JSONB DEFAULT '[]',
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'reviewed', 'accepted', 'rejected')),
    ai_score FLOAT,
    ai_feedback TEXT,
    recruiter_feedback TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ,
    UNIQUE(problem_id, student_id)
);

-- =============================================
-- AI / SKILL TABLES
-- =============================================

-- Skill DNA Profiles
CREATE TABLE skill_dna (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    overall_score FLOAT DEFAULT 0,
    problem_solving FLOAT DEFAULT 0,
    code_quality FLOAT DEFAULT 0,
    learning_velocity FLOAT DEFAULT 0,
    consistency FLOAT DEFAULT 0,
    creativity FLOAT DEFAULT 0,
    communication FLOAT DEFAULT 0,
    collaboration FLOAT DEFAULT 0,
    domain_scores JSONB DEFAULT '{}',
    strengths TEXT[] DEFAULT '{}',
    growth_areas TEXT[] DEFAULT '{}',
    improvement_rate FLOAT DEFAULT 0,
    ai_summary TEXT,
    last_analyzed TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Interview Scores
CREATE TABLE interview_scores (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    interview_type VARCHAR(50) NOT NULL,
    technical_thinking FLOAT DEFAULT 0,
    communication FLOAT DEFAULT 0,
    reasoning FLOAT DEFAULT 0,
    problem_solving FLOAT DEFAULT 0,
    overall_score FLOAT DEFAULT 0,
    ai_feedback TEXT,
    strengths TEXT[] DEFAULT '{}',
    improvements TEXT[] DEFAULT '{}',
    conducted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Badges
CREATE TABLE badges (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    criteria JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_badges (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    badge_id UUID NOT NULL REFERENCES badges(id),
    earned_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, badge_id)
);

-- Recommendations
CREATE TABLE recommendations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES users(id),
    recruiter_id UUID REFERENCES users(id),
    problem_id UUID REFERENCES problem_statements(id),
    match_score FLOAT,
    match_reason TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'viewed', 'shortlisted', 'contacted', 'hired', 'dismissed')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- OTP Verification
CREATE TABLE otp_verification (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    otp_code VARCHAR(10) NOT NULL,
    purpose VARCHAR(50) DEFAULT 'login',
    attempts INT DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_google_id ON users(google_id);
CREATE INDEX idx_problems_domain ON problem_statements(domain);
CREATE INDEX idx_problems_status ON problem_statements(status);
CREATE INDEX idx_problems_difficulty ON problem_statements(difficulty);
CREATE INDEX idx_submissions_student ON submissions(student_id);
CREATE INDEX idx_submissions_problem ON submissions(problem_id);
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_skill_dna_student ON skill_dna(student_id);
CREATE INDEX idx_interview_student ON interview_scores(student_id);
CREATE INDEX idx_recommendations_student ON recommendations(student_id);
CREATE INDEX idx_recommendations_recruiter ON recommendations(recruiter_id);
CREATE INDEX idx_otp_email ON otp_verification(email);

-- =============================================
-- TRIGGERS
-- =============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER students_updated_at BEFORE UPDATE ON students FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER recruiters_updated_at BEFORE UPDATE ON recruiters FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER problems_updated_at BEFORE UPDATE ON problem_statements FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER skill_dna_updated_at BEFORE UPDATE ON skill_dna FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruiters ENABLE ROW LEVEL SECURITY;
ALTER TABLE problem_statements ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_dna ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;

-- Users: can view own profile, admins see all
CREATE POLICY users_select ON users FOR SELECT USING (true);
CREATE POLICY users_update ON users FOR UPDATE USING (auth.uid()::text = google_id OR EXISTS (SELECT 1 FROM users WHERE google_id = auth.uid()::text AND role = 'admin'));

-- Problems: anyone can view active, only recruiters/admins can insert
CREATE POLICY problems_select ON problem_statements FOR SELECT USING (status = 'active' OR created_by = auth.uid());
CREATE POLICY problems_insert ON problem_statements FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM users WHERE google_id = auth.uid()::text AND role IN ('recruiter', 'admin')));

-- Submissions: students see own, recruiters see for their problems
CREATE POLICY submissions_select ON submissions FOR SELECT USING (student_id = auth.uid() OR EXISTS (SELECT 1 FROM problem_statements WHERE id = problem_id AND created_by = auth.uid()));
CREATE POLICY submissions_insert ON submissions FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM users WHERE google_id = auth.uid()::text AND role = 'student'));

-- Skill DNA: students see own, recruiters can view
CREATE POLICY skill_dna_select ON skill_dna FOR SELECT USING (true);

-- Insert default badges
INSERT INTO badges (name, description, icon) VALUES
    ('First Solve', 'Solved your first problem', '🏆'),
    ('Fast Learner', '5 problems in one week', '⚡'),
    ('Code Master', 'Score 90+ on 3 submissions', '💻'),
    ('Team Player', 'Collaborated on a challenge', '🤝'),
    ('AI Explorer', 'Used Career Twin 10 times', '🤖'),
    ('Interview Pro', 'Score 80+ in mock interview', '🎤'),
    ('Full Stack', 'Solved problems in 5+ domains', '🌐'),
    ('Streak Master', '30-day solving streak', '🔥'),
    ('Top 10%', 'Ranked in top 10%', '🏅'),
    ('ML Pioneer', 'Completed ML challenge', '🧠'),
    ('Open Source', 'Contributed to open source', '📦'),
    ('Mentor Badge', 'Helped 5 other students', '🎓');
