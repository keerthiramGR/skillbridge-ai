-- =============================================
-- SKILLBRIDGE AI — Sample Demo Data
-- Run this in Supabase SQL Editor
-- =============================================

-- ---- Demo Users ----
INSERT INTO users (id, email, name, role, status) VALUES
    ('a1000000-0000-0000-0000-000000000001', 'admin@skillbridge.ai', 'Admin SkillBridge', 'admin', 'active'),
    ('b2000000-0000-0000-0000-000000000002', 'recruiter@techcorp.com', 'Priya Sharma (TechCorp)', 'recruiter', 'active'),
    ('b3000000-0000-0000-0000-000000000003', 'recruiter@innovate.io', 'Rahul Mehta (Innovate.io)', 'recruiter', 'active'),
    ('c1000000-0000-0000-0000-000000000004', 'keerthiram@student.edu', 'Keerthiram G R', 'student', 'active'),
    ('c2000000-0000-0000-0000-000000000005', 'arun@student.edu', 'Arun Kumar', 'student', 'active'),
    ('c3000000-0000-0000-0000-000000000006', 'sneha@student.edu', 'Sneha Patel', 'student', 'active'),
    ('c4000000-0000-0000-0000-000000000007', 'vikram@student.edu', 'Vikram Singh', 'student', 'active'),
    ('c5000000-0000-0000-0000-000000000008', 'divya@student.edu', 'Divya Nair', 'student', 'active')
ON CONFLICT (email) DO NOTHING;

-- ---- Admin Profile ----
INSERT INTO admins (user_id, access_level) VALUES
    ('a1000000-0000-0000-0000-000000000001', 3)
ON CONFLICT (user_id) DO NOTHING;

-- ---- Recruiter Profiles ----
INSERT INTO recruiters (user_id, organization, org_type, website, verified) VALUES
    ('b2000000-0000-0000-0000-000000000002', 'TechCorp Solutions', 'enterprise', 'https://techcorp.example.com', true),
    ('b3000000-0000-0000-0000-000000000003', 'Innovate.io', 'startup', 'https://innovate.example.io', true)
ON CONFLICT (user_id) DO NOTHING;

-- ---- Student Profiles ----
INSERT INTO students (user_id, university, graduation_year, skill_tags, career_readiness, streak_days) VALUES
    ('c1000000-0000-0000-0000-000000000004', 'VIT University', 2026, ARRAY['JavaScript','React','Python','Node.js','SQL'], 87.5, 12),
    ('c2000000-0000-0000-0000-000000000005', 'IIT Madras', 2025, ARRAY['Python','ML','TensorFlow','Data Science'], 78.2, 8),
    ('c3000000-0000-0000-0000-000000000006', 'NIT Trichy', 2026, ARRAY['Java','Spring Boot','AWS','Docker'], 82.0, 15),
    ('c4000000-0000-0000-0000-000000000007', 'BITS Pilani', 2025, ARRAY['C++','Algorithms','System Design','Go'], 71.5, 5),
    ('c5000000-0000-0000-0000-000000000008', 'Anna University', 2026, ARRAY['React','TypeScript','Next.js','GraphQL'], 90.1, 22)
ON CONFLICT (user_id) DO NOTHING;

-- ---- Problem Statements (by recruiters) ----
INSERT INTO problem_statements (id, title, description, domain, difficulty, required_skills, created_by, status, max_participants) VALUES
    ('d1000000-0000-0000-0000-000000000001',
     'Build a Real-Time Chat Application',
     'Design and implement a scalable real-time chat application with WebSocket support, user authentication, message history, and typing indicators. Must handle 1000+ concurrent users.',
     'Full Stack', 'hard',
     ARRAY['React','Node.js','WebSocket','MongoDB'],
     'b2000000-0000-0000-0000-000000000002', 'active', 50),

    ('d2000000-0000-0000-0000-000000000002',
     'ML-Powered Resume Parser',
     'Build an AI system that extracts structured data from resumes in PDF/DOCX format. Should identify skills, education, experience, and generate a skill score.',
     'Machine Learning', 'expert',
     ARRAY['Python','NLP','TensorFlow','FastAPI'],
     'b3000000-0000-0000-0000-000000000003', 'active', 30),

    ('d3000000-0000-0000-0000-000000000003',
     'E-Commerce REST API',
     'Create a production-ready REST API for an e-commerce platform with product catalog, cart management, order processing, and payment integration.',
     'Backend', 'medium',
     ARRAY['Python','FastAPI','PostgreSQL','Redis'],
     'b2000000-0000-0000-0000-000000000002', 'active', 40),

    ('d4000000-0000-0000-0000-000000000004',
     'Dashboard Analytics Widget',
     'Build a responsive analytics dashboard with interactive charts, real-time data updates, dark/light mode, and exportable reports.',
     'Frontend', 'medium',
     ARRAY['React','Chart.js','Tailwind CSS','TypeScript'],
     'b3000000-0000-0000-0000-000000000003', 'active', 60),

    ('d5000000-0000-0000-0000-000000000005',
     'CI/CD Pipeline for Microservices',
     'Design a complete CI/CD pipeline using GitHub Actions for a microservices architecture with Docker, Kubernetes deployment, and automated testing.',
     'DevOps', 'hard',
     ARRAY['Docker','Kubernetes','GitHub Actions','AWS'],
     'b2000000-0000-0000-0000-000000000002', 'active', 25)
ON CONFLICT DO NOTHING;

-- ---- Submissions ----
INSERT INTO submissions (problem_id, student_id, github_url, status, ai_score, ai_feedback) VALUES
    ('d1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000004',
     'https://github.com/keerthiram/chat-app', 'reviewed', 88.5,
     'Excellent implementation! WebSocket handling is clean. Consider adding message encryption for production. Code quality: 90/100.'),

    ('d3000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000004',
     'https://github.com/keerthiram/ecommerce-api', 'pending', NULL, NULL),

    ('d2000000-0000-0000-0000-000000000002', 'c2000000-0000-0000-0000-000000000005',
     'https://github.com/arunkumar/resume-parser', 'reviewed', 92.0,
     'Outstanding ML pipeline! NER model accuracy is impressive. Add support for multilingual resumes to score higher.'),

    ('d4000000-0000-0000-0000-000000000004', 'c3000000-0000-0000-0000-000000000006',
     'https://github.com/snehapatel/analytics-dash', 'reviewed', 85.0,
     'Great UI design and responsive layout. Chart interactions are smooth. Consider lazy loading for better performance.'),

    ('d1000000-0000-0000-0000-000000000001', 'c5000000-0000-0000-0000-000000000008',
     'https://github.com/divyanair/realtime-chat', 'under_review', NULL, NULL),

    ('d5000000-0000-0000-0000-000000000005', 'c4000000-0000-0000-0000-000000000007',
     'https://github.com/vikramsingh/cicd-pipeline', 'reviewed', 79.0,
     'Good pipeline structure. Docker configs are solid. Kubernetes manifests need health checks and resource limits.')
ON CONFLICT DO NOTHING;

-- ---- Skill DNA Profiles ----
INSERT INTO skill_dna (student_id, overall_score, problem_solving, code_quality, learning_velocity, consistency, creativity, communication, domain_scores, strengths, growth_areas) VALUES
    ('c1000000-0000-0000-0000-000000000004', 87.5, 88, 90, 85, 82, 78, 80,
     '{"web_dev": 92, "backend": 85, "dsa": 78, "system_design": 72, "devops": 65}',
     ARRAY['React','JavaScript','API Design'], ARRAY['System Design','DevOps']),

    ('c2000000-0000-0000-0000-000000000005', 78.2, 80, 75, 82, 70, 85, 72,
     '{"ml": 90, "python": 88, "data_science": 85, "web_dev": 60, "devops": 55}',
     ARRAY['Machine Learning','Python','Data Analysis'], ARRAY['Web Development','DevOps']),

    ('c3000000-0000-0000-0000-000000000006', 82.0, 85, 80, 78, 88, 75, 82,
     '{"backend": 88, "devops": 82, "system_design": 78, "web_dev": 75, "dsa": 72}',
     ARRAY['Java','Spring Boot','Docker'], ARRAY['Frontend','ML']),

    ('c5000000-0000-0000-0000-000000000008', 90.1, 88, 92, 90, 95, 82, 85,
     '{"web_dev": 95, "frontend": 93, "backend": 80, "dsa": 82, "system_design": 75}',
     ARRAY['React','TypeScript','UI/UX'], ARRAY['System Design','ML'])
ON CONFLICT DO NOTHING;

-- ---- Interview Scores ----
INSERT INTO interview_scores (student_id, interview_type, technical_thinking, communication, reasoning, problem_solving, overall_score) VALUES
    ('c1000000-0000-0000-0000-000000000004', 'technical', 85, 80, 82, 88, 84),
    ('c1000000-0000-0000-0000-000000000004', 'behavioral', 78, 85, 80, 75, 80),
    ('c2000000-0000-0000-0000-000000000005', 'technical', 82, 72, 85, 80, 80),
    ('c3000000-0000-0000-0000-000000000006', 'system_design', 80, 82, 78, 85, 81)
ON CONFLICT DO NOTHING;

-- ---- User Badges ----
INSERT INTO user_badges (user_id, badge_id) 
SELECT 'c1000000-0000-0000-0000-000000000004', id FROM badges WHERE name = 'First Solve'
ON CONFLICT DO NOTHING;
INSERT INTO user_badges (user_id, badge_id) 
SELECT 'c1000000-0000-0000-0000-000000000004', id FROM badges WHERE name = 'Code Master'
ON CONFLICT DO NOTHING;
INSERT INTO user_badges (user_id, badge_id) 
SELECT 'c1000000-0000-0000-0000-000000000004', id FROM badges WHERE name = 'Fast Learner'
ON CONFLICT DO NOTHING;
INSERT INTO user_badges (user_id, badge_id) 
SELECT 'c2000000-0000-0000-0000-000000000005', id FROM badges WHERE name = 'First Solve'
ON CONFLICT DO NOTHING;
INSERT INTO user_badges (user_id, badge_id) 
SELECT 'c2000000-0000-0000-0000-000000000005', id FROM badges WHERE name = 'ML Pioneer'
ON CONFLICT DO NOTHING;
INSERT INTO user_badges (user_id, badge_id) 
SELECT 'c3000000-0000-0000-0000-000000000006', id FROM badges WHERE name = 'First Solve'
ON CONFLICT DO NOTHING;
INSERT INTO user_badges (user_id, badge_id) 
SELECT 'c5000000-0000-0000-0000-000000000008', id FROM badges WHERE name = 'Streak Master'
ON CONFLICT DO NOTHING;

-- ---- AI Recommendations ----
INSERT INTO recommendations (student_id, recruiter_id, problem_id, match_score, match_reason, status) VALUES
    ('c1000000-0000-0000-0000-000000000004', 'b2000000-0000-0000-0000-000000000002', 'd1000000-0000-0000-0000-000000000001',
     91.5, 'Strong React + Node.js skills. Previous chat app experience. Skill DNA: 87.5%. Top 15% of students.', 'shortlisted'),
    ('c2000000-0000-0000-0000-000000000005', 'b3000000-0000-0000-0000-000000000003', 'd2000000-0000-0000-0000-000000000002',
     95.0, 'ML expertise with TensorFlow. Resume parser submission scored 92/100. Ideal candidate for AI roles.', 'contacted'),
    ('c5000000-0000-0000-0000-000000000008', 'b2000000-0000-0000-0000-000000000002', 'd4000000-0000-0000-0000-000000000004',
     88.0, 'Exceptional frontend skills. React + TypeScript. 22-day streak shows high consistency.', 'viewed')
ON CONFLICT DO NOTHING;

-- Done! Sample data inserted successfully.
SELECT 'Sample data loaded!' AS status,
    (SELECT COUNT(*) FROM users) AS total_users,
    (SELECT COUNT(*) FROM problem_statements) AS total_problems,
    (SELECT COUNT(*) FROM submissions) AS total_submissions;
