/* =============================================
   SKILLBRIDGE AI — Recruiter Dashboard Logic
   Full interactive demo with working buttons
   ============================================= */

function switchRecruiterTab(el) {
    const tabId = el.dataset.tab;
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
    document.getElementById(tabId)?.classList.add('active');
    if (window.innerWidth <= 1024) document.getElementById('sidebar').classList.remove('open');
}

// ---- Modal System ----
function showRecModal(title, content) {
    let modal = document.getElementById('recModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'recModal';
        document.body.appendChild(modal);
    }
    modal.innerHTML = `
        <div style="position:fixed;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem;" onclick="if(event.target===this)closeRecModal()">
            <div style="background:var(--bg-secondary);border:1px solid var(--border-glass);border-radius:var(--border-radius-xl);padding:2rem;max-width:650px;width:100%;max-height:85vh;overflow-y:auto;box-shadow:0 25px 60px rgba(0,0,0,0.5);">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
                    <h2 style="font-weight:800;font-size:1.25rem;">${title}</h2>
                    <button class="btn btn-ghost btn-sm" onclick="closeRecModal()" style="font-size:1.25rem;">✕</button>
                </div>
                <div>${content}</div>
            </div>
        </div>
    `;
    modal.style.display = 'block';
}

function closeRecModal() {
    const modal = document.getElementById('recModal');
    if (modal) modal.style.display = 'none';
}

// ---- Upload Challenge ----
let uploadedChallenges = [];

async function uploadChallenge() {
    const title = document.getElementById('problemTitle').value.trim();
    const domain = document.getElementById('problemDomain').value;
    const difficulty = document.getElementById('problemDifficulty').value;
    const desc = document.getElementById('problemDesc').value.trim();
    const skills = document.getElementById('problemSkills').value.trim();
    const deadline = document.getElementById('problemDeadline').value;
    const criteria = document.getElementById('problemCriteria').value.trim();
    const maxP = document.getElementById('problemMaxParticipants').value;

    if (!title || !domain || !desc || !skills || !deadline) {
        toast.error('Please fill in all required fields');
        return;
    }

    const newChallenge = {
        id: Date.now(),
        title, domain, difficulty,
        submissions: 0,
        status: 'active',
        created: new Date().toISOString().split('T')[0],
        desc, skills: skills.split(',').map(s => s.trim()),
        deadline, criteria, maxParticipants: maxP || 50
    };

    challenges.unshift(newChallenge);
    uploadedChallenges.push(newChallenge);

    // Update stat
    const statEl = document.querySelector('.stat-card:nth-child(1) .stat-card-value');
    if (statEl) statEl.textContent = challenges.length;

    toast.success('🎉 Challenge published successfully!');
    clearUploadForm();
    renderChallenges();
}

function clearUploadForm() {
    ['problemTitle', 'problemDesc', 'problemSkills', 'problemCriteria'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    const deadlineEl = document.getElementById('problemDeadline');
    if (deadlineEl) deadlineEl.value = '';
}

// ---- My Challenges ----
let challenges = [
    { id: 1, title: 'Real-Time Chat Application', domain: 'web', difficulty: 'hard', submissions: 15, status: 'active', created: '2026-02-20', desc: 'Build a scalable WebSocket-based chat application with authentication, message history, and real-time typing indicators.', skills: ['React', 'Node.js', 'WebSocket', 'MongoDB'], deadline: '2026-03-20', criteria: 'Code quality (30%), Performance (25%), Documentation (20%), Innovation (25%)', maxParticipants: 50 },
    { id: 2, title: 'ML Fraud Detection System', domain: 'ml', difficulty: 'expert', submissions: 8, status: 'active', created: '2026-02-18', desc: 'Create a machine learning pipeline to detect fraudulent transactions in real-time. Must achieve 95%+ precision while maintaining low false positive rates.', skills: ['Python', 'TensorFlow', 'Scikit-Learn', 'FastAPI'], deadline: '2026-03-25', criteria: 'Model accuracy (40%), Code quality (25%), Scalability (20%), Documentation (15%)', maxParticipants: 30 },
    { id: 3, title: 'Cloud CI/CD Pipeline', domain: 'devops', difficulty: 'hard', submissions: 12, status: 'active', created: '2026-02-15', desc: 'Set up a CI/CD pipeline with Docker multi-stage builds, automated testing, and Kubernetes deployment for a microservices app.', skills: ['Docker', 'Kubernetes', 'GitHub Actions', 'AWS'], deadline: '2026-03-15', criteria: 'Pipeline design (30%), Automation (30%), Reliability (20%), Documentation (20%)', maxParticipants: 25 },
    { id: 4, title: 'E-Commerce Recommendation Engine', domain: 'data', difficulty: 'medium', submissions: 22, status: 'closed', created: '2026-01-28', desc: 'Build a recommendation engine that suggests products based on user behavior, purchase history, and collaborative filtering.', skills: ['Python', 'Pandas', 'PostgreSQL', 'Redis'], deadline: '2026-02-28', criteria: 'Algorithm quality (35%), Performance (25%), API design (20%), Testing (20%)', maxParticipants: 40 },
];

function renderChallenges() {
    const list = document.getElementById('challengesList');
    if (!list) return;
    list.innerHTML = challenges.map(c => `
        <div class="glass-card" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;" id="challenge-${c.id}">
            <div style="flex:1;min-width:250px;">
                <h3 style="font-weight:700;font-size:1.1rem;margin-bottom:0.35rem;">${c.title}</h3>
                <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                    <span class="badge badge-accent">${c.domain}</span>
                    ${getDifficultyBadge(c.difficulty)}
                    <span class="badge ${c.status === 'active' ? 'badge-success' : 'badge-warning'}">${c.status}</span>
                    <span class="badge badge-primary">⏰ ${c.deadline}</span>
                </div>
            </div>
            <div style="display:flex;align-items:center;gap:1.5rem;">
                <div style="text-align:center;">
                    <div style="font-size:1.5rem;font-weight:800;font-family:'Space Grotesk',sans-serif;">${c.submissions}</div>
                    <div style="font-size:0.75rem;color:var(--text-tertiary);">Submissions</div>
                </div>
                <div style="display:flex;gap:0.5rem;">
                    <button class="btn btn-secondary btn-sm" onclick="viewChallenge(${c.id})">📋 View</button>
                    ${c.status === 'active' ? `<button class="btn btn-ghost btn-sm" style="color:var(--danger-400);" onclick="closeChallenge(${c.id})">🔒 Close</button>` : `<button class="btn btn-ghost btn-sm" style="color:var(--success-400);" onclick="reopenChallenge(${c.id})">🔓 Reopen</button>`}
                </div>
            </div>
        </div>
    `).join('');
}

function viewChallenge(id) {
    const c = challenges.find(x => x.id === id);
    if (!c) return;
    showRecModal(`📋 ${c.title}`, `
        <div style="display:grid;gap:1rem;">
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                <span class="badge badge-accent">${c.domain}</span>
                ${getDifficultyBadge(c.difficulty)}
                <span class="badge ${c.status === 'active' ? 'badge-success' : 'badge-warning'}">${c.status}</span>
            </div>
            <div class="glass-card" style="padding:1rem;">
                <div style="font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:0.25rem;">Description</div>
                <p style="color:var(--text-secondary);line-height:1.7;">${c.desc}</p>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
                <div class="glass-card" style="padding:1rem;">
                    <div style="font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:0.25rem;">Required Skills</div>
                    <div style="display:flex;flex-wrap:wrap;gap:0.35rem;">${c.skills.map(s => `<span class="badge badge-primary">${s}</span>`).join('')}</div>
                </div>
                <div class="glass-card" style="padding:1rem;">
                    <div style="font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:0.25rem;">Stats</div>
                    <div style="font-weight:700;">${c.submissions} submissions · Max ${c.maxParticipants}</div>
                </div>
            </div>
            <div class="glass-card" style="padding:1rem;">
                <div style="font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:0.25rem;">Evaluation Criteria</div>
                <p style="color:var(--text-secondary);line-height:1.6;">${c.criteria}</p>
            </div>
            <div class="glass-card" style="padding:1rem;">
                <div style="font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:0.25rem;">Deadline</div>
                <div style="font-weight:700;color:var(--accent-400);">${c.deadline}</div>
            </div>
        </div>
    `);
}

function closeChallenge(id) {
    const c = challenges.find(x => x.id === id);
    if (c) { c.status = 'closed'; }
    renderChallenges();
    toast.success('Challenge closed. No new submissions accepted.');
}

function reopenChallenge(id) {
    const c = challenges.find(x => x.id === id);
    if (c) { c.status = 'active'; }
    renderChallenges();
    toast.success('Challenge reopened! Students can submit again.');
}

// ---- Submissions ----
let recSubmissions = [
    { id: 1, student: 'Keerthiram G R', challenge: 'Real-Time Chat App', date: '2026-02-28', score: 92, status: 'reviewed', avatar: 'keerthiram', github: 'https://github.com/keerthiram/chat-app', feedback: 'Excellent implementation! WebSocket handling is clean and efficient. The authentication flow is well-designed. Consider adding message encryption.' },
    { id: 2, student: 'Arun Kumar', challenge: 'ML Fraud Detection', date: '2026-02-27', score: 88, status: 'reviewed', avatar: 'arun', github: 'https://github.com/arunkumar/fraud-detect', feedback: 'Strong ML pipeline. Model accuracy meets requirements. Good feature engineering. Consider adding real-time prediction API.' },
    { id: 3, student: 'Sneha Patel', challenge: 'Cloud CI/CD Pipeline', date: '2026-02-26', score: null, status: 'pending', avatar: 'sneha', github: 'https://github.com/snehapatel/cicd', feedback: '' },
    { id: 4, student: 'Vikram Singh', challenge: 'Cloud CI/CD Pipeline', date: '2026-02-25', score: 79, status: 'reviewed', avatar: 'vikram', github: 'https://github.com/vikramsingh/pipeline', feedback: 'Good pipeline structure. Docker configs are solid but Kubernetes manifests need health checks and resource limits.' },
    { id: 5, student: 'Divya Nair', challenge: 'Real-Time Chat App', date: '2026-02-24', score: 95, status: 'reviewed', avatar: 'divya', github: 'https://github.com/divyanair/chat', feedback: 'Outstanding work! Clean code architecture, excellent WebSocket implementation, beautiful UI. Top performer.' },
    { id: 6, student: 'Pradeep Raj', challenge: 'ML Fraud Detection', date: '2026-02-23', score: null, status: 'pending', avatar: 'pradeep', github: 'https://github.com/pradeepraj/fraud-ml', feedback: '' },
];

function renderRecSubmissions() {
    const tbody = document.getElementById('recSubmissionsTable');
    if (!tbody) return;
    tbody.innerHTML = recSubmissions.map(s => `
        <tr id="sub-row-${s.id}">
            <td style="display:flex;align-items:center;gap:0.75rem;">
                <img class="avatar avatar-sm" src="https://api.dicebear.com/7.x/avataaars/svg?seed=${s.avatar}" alt="">
                <span style="font-weight:600;">${s.student}</span>
            </td>
            <td>${s.challenge}</td>
            <td style="color:var(--text-secondary);">${formatDate(s.date)}</td>
            <td>${s.score ? `<span style="font-weight:700;color:${s.score >= 90 ? 'var(--success-400)' : s.score >= 80 ? 'var(--primary-400)' : 'var(--warning-400)'};">${s.score}/100</span>` : '<span style="color:var(--text-tertiary);">Analyzing...</span>'}</td>
            <td><span class="badge ${s.status === 'reviewed' ? 'badge-success' : s.status === 'shortlisted' ? 'badge-accent' : 'badge-warning'}">${s.status}</span></td>
            <td>
                <div style="display:flex;gap:0.5rem;">
                    <button class="btn btn-secondary btn-sm" onclick="reviewSubmission(${s.id})">📝 Review</button>
                    ${s.status !== 'shortlisted' ? `<button class="btn btn-primary btn-sm" onclick="shortlistCandidate(${s.id})">⭐ Shortlist</button>` : `<button class="btn btn-ghost btn-sm" style="color:var(--success-400);">✅ Shortlisted</button>`}
                </div>
            </td>
        </tr>
    `).join('');
}

function reviewSubmission(id) {
    const s = recSubmissions.find(x => x.id === id);
    if (!s) return;
    showRecModal(`📝 Review: ${s.student}'s Submission`, `
        <div style="display:grid;gap:1rem;">
            <div style="display:flex;align-items:center;gap:1rem;">
                <img class="avatar avatar-lg" src="https://api.dicebear.com/7.x/avataaars/svg?seed=${s.avatar}" alt="" style="width:64px;height:64px;">
                <div>
                    <h3 style="font-weight:700;">${s.student}</h3>
                    <p style="color:var(--text-secondary);">${s.challenge}</p>
                    <div style="display:flex;gap:0.5rem;margin-top:0.25rem;">
                        <span class="badge ${s.status === 'reviewed' ? 'badge-success' : 'badge-warning'}">${s.status}</span>
                        ${s.score ? `<span class="badge badge-primary">AI Score: ${s.score}/100</span>` : ''}
                    </div>
                </div>
            </div>
            <div class="glass-card" style="padding:1rem;">
                <div style="font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:0.25rem;">GitHub Repository</div>
                <a href="${s.github}" target="_blank" style="color:var(--accent-400);font-weight:600;word-break:break-all;">${s.github}</a>
            </div>
            ${s.score ? `
            <div class="glass-card" style="padding:1rem;">
                <div style="font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:0.5rem;">AI Score Breakdown</div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">
                    <div>
                        <div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:0.25rem;"><span>Code Quality</span><span style="font-weight:700;">${Math.min(s.score + 2, 100)}%</span></div>
                        <div style="height:6px;background:var(--bg-tertiary);border-radius:3px;"><div style="height:100%;width:${Math.min(s.score + 2, 100)}%;background:var(--primary-400);border-radius:3px;"></div></div>
                    </div>
                    <div>
                        <div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:0.25rem;"><span>Innovation</span><span style="font-weight:700;">${Math.max(s.score - 5, 60)}%</span></div>
                        <div style="height:6px;background:var(--bg-tertiary);border-radius:3px;"><div style="height:100%;width:${Math.max(s.score - 5, 60)}%;background:var(--accent-400);border-radius:3px;"></div></div>
                    </div>
                    <div>
                        <div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:0.25rem;"><span>Documentation</span><span style="font-weight:700;">${Math.max(s.score - 8, 55)}%</span></div>
                        <div style="height:6px;background:var(--bg-tertiary);border-radius:3px;"><div style="height:100%;width:${Math.max(s.score - 8, 55)}%;background:var(--success-400);border-radius:3px;"></div></div>
                    </div>
                    <div>
                        <div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:0.25rem;"><span>Performance</span><span style="font-weight:700;">${Math.min(s.score + 3, 100)}%</span></div>
                        <div style="height:6px;background:var(--bg-tertiary);border-radius:3px;"><div style="height:100%;width:${Math.min(s.score + 3, 100)}%;background:var(--warning-400);border-radius:3px;"></div></div>
                    </div>
                </div>
            </div>` : ''}
            <div class="glass-card" style="padding:1rem;">
                <div style="font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:0.25rem;">AI Feedback</div>
                <p style="color:var(--text-secondary);line-height:1.7;">${s.feedback || 'AI analysis in progress... Score and feedback will be available shortly.'}</p>
            </div>
            <div class="form-group">
                <label class="form-label">Your Feedback</label>
                <textarea class="form-textarea" id="recruiterFeedback" placeholder="Add your review comments..." style="min-height:80px;">${s.recruiterNote || ''}</textarea>
            </div>
            <div style="display:flex;gap:0.75rem;">
                <button class="btn btn-primary" onclick="saveReview(${s.id})" style="flex:1;">💾 Save Review</button>
                <button class="btn btn-accent" onclick="shortlistCandidate(${s.id});closeRecModal()" style="flex:1;">⭐ Shortlist</button>
                <button class="btn btn-ghost" onclick="contactStudent(${s.id});closeRecModal()" style="flex:1;">📧 Contact</button>
            </div>
        </div>
    `);
}

function saveReview(id) {
    const s = recSubmissions.find(x => x.id === id);
    if (!s) return;
    const feedback = document.getElementById('recruiterFeedback')?.value || '';
    s.recruiterNote = feedback;
    s.status = 'reviewed';
    if (!s.score) s.score = Math.floor(70 + Math.random() * 25);
    renderRecSubmissions();
    closeRecModal();
    toast.success(`Review saved for ${s.student}!`);
}

function shortlistCandidate(id) {
    const s = recSubmissions.find(x => x.id === id);
    if (s) {
        s.status = 'shortlisted';
        if (!s.score) s.score = Math.floor(75 + Math.random() * 20);
    }
    renderRecSubmissions();
    toast.success(`⭐ ${s.student} shortlisted for interview!`);
}

function contactStudent(id) {
    const s = recSubmissions.find(x => x.id === id);
    if (!s) return;
    toast.success(`📧 Interview invitation sent to ${s.student}!`);
}

// ---- AI Ranking ----
const mockRanking = [
    { rank: 1, name: 'Divya Nair', score: 95, skills: ['React', 'TypeScript', 'Next.js'], improvement: '+18%', avatar: 'divya', bio: 'Full-stack developer with exceptional frontend skills. 22-day streak. Top contributor.' },
    { rank: 2, name: 'Keerthiram G R', score: 92, skills: ['React', 'Node.js', 'Python'], improvement: '+12%', avatar: 'keerthiram', bio: 'Strong web dev skills with growing backend expertise. Consistent performer.' },
    { rank: 3, name: 'Arun Kumar', score: 88, skills: ['Python', 'TensorFlow', 'SQL'], improvement: '+8%', avatar: 'arun', bio: 'ML specialist with strong data science background. Fast learner.' },
    { rank: 4, name: 'Sneha Patel', score: 85, skills: ['Java', 'Spring Boot', 'Docker'], improvement: '+15%', avatar: 'sneha', bio: 'Backend-focused developer with DevOps skills. 15-day streak.' },
    { rank: 5, name: 'Vikram Singh', score: 79, skills: ['C++', 'Go', 'System Design'], improvement: '+6%', avatar: 'vikram', bio: 'Strong algorithmic thinker with system design aspirations.' },
];

function renderRanking() {
    const list = document.getElementById('rankingList');
    if (!list) return;
    list.innerHTML = mockRanking.map(r => `
        <div class="glass-card" style="display:flex;align-items:center;gap:1.5rem;padding:1.25rem 1.5rem;">
            <div style="width:48px;height:48px;border-radius:50%;background:${r.rank <= 3 ? 'var(--gradient-primary)' : 'var(--bg-tertiary)'};display:flex;align-items:center;justify-content:center;font-weight:900;font-family:'Space Grotesk',sans-serif;color:${r.rank <= 3 ? 'white' : 'var(--text-secondary)'};font-size:1.1rem;">#${r.rank}</div>
            <img class="avatar" src="https://api.dicebear.com/7.x/avataaars/svg?seed=${r.avatar}" alt="">
            <div style="flex:1;">
                <h4 style="font-weight:700;">${r.name}</h4>
                <div style="display:flex;gap:0.35rem;margin-top:0.25rem;">
                    ${r.skills.map(s => `<span style="padding:0.15rem 0.5rem;border-radius:var(--border-radius-full);font-size:0.7rem;background:rgba(99,102,241,0.1);color:var(--primary-300);">${s}</span>`).join('')}
                </div>
            </div>
            <div style="text-align:center;">
                <div style="font-size:1.75rem;font-weight:800;font-family:'Space Grotesk',sans-serif;color:var(--primary-400);">${r.score}</div>
                <div style="font-size:0.75rem;color:var(--success-400);font-weight:600;">${r.improvement}</div>
            </div>
            <div style="display:flex;gap:0.5rem;">
                <button class="btn btn-secondary btn-sm" onclick="viewRankedProfile('${r.name}', ${r.score}, '${r.avatar}', '${r.bio}', '${r.skills.join(',')}', '${r.improvement}')">👤 Profile</button>
                <button class="btn btn-primary btn-sm" onclick="contactRanked('${r.name}')">📧 Contact</button>
            </div>
        </div>
    `).join('');
}

function viewRankedProfile(name, score, avatar, bio, skillsStr, improvement) {
    const skills = skillsStr.split(',');
    showRecModal(`👤 ${name} — Skill DNA Profile`, `
        <div style="text-align:center;margin-bottom:1.5rem;">
            <img class="avatar avatar-lg" src="https://api.dicebear.com/7.x/avataaars/svg?seed=${avatar}" alt="" style="width:80px;height:80px;margin:0 auto 1rem;">
            <h3 style="font-weight:700;font-size:1.15rem;">${name}</h3>
            <p style="color:var(--text-secondary);margin-top:0.25rem;">${bio}</p>
            <div style="display:flex;gap:0.5rem;justify-content:center;margin-top:0.75rem;">
                <span class="badge badge-primary" style="font-size:0.85rem;">Skill DNA: ${score}%</span>
                <span class="badge badge-success">${improvement} growth</span>
            </div>
        </div>
        <div class="glass-card" style="padding:1rem;margin-bottom:1rem;">
            <div style="font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:0.75rem;">Skill Breakdown</div>
            ${['Problem Solving', 'Code Quality', 'Learning Speed', 'Consistency', 'Communication'].map((s, i) => {
        const val = Math.max(score - 15 + Math.floor(Math.random() * 20), 55);
        return `<div style="margin-bottom:0.75rem;">
                    <div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:0.25rem;"><span>${s}</span><span style="font-weight:700;">${val}%</span></div>
                    <div style="height:8px;background:var(--bg-tertiary);border-radius:4px;"><div style="height:100%;width:${val}%;background:var(--gradient-primary);border-radius:4px;transition:width 0.5s;"></div></div>
                </div>`;
    }).join('')}
        </div>
        <div class="glass-card" style="padding:1rem;margin-bottom:1rem;">
            <div style="font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:0.5rem;">Top Skills</div>
            <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">${skills.map(s => `<span class="badge badge-accent">${s}</span>`).join('')}</div>
        </div>
        <div style="display:flex;gap:0.75rem;">
            <button class="btn btn-primary" onclick="contactRanked('${name}');closeRecModal()" style="flex:1;">📧 Contact</button>
            <button class="btn btn-accent" onclick="toast.success('${name} added to shortlist!');closeRecModal()" style="flex:1;">⭐ Shortlist</button>
        </div>
    `);
}

function contactRanked(name) {
    toast.success(`📧 Interview invitation sent to ${name}!`);
}

// ---- Skill Filter ----
const allCandidates = [
    { name: 'Keerthiram G R', score: 92, skills: ['JavaScript', 'React', 'Python', 'Node.js', 'SQL'], avatar: 'keerthiram', university: 'VIT University' },
    { name: 'Divya Nair', score: 95, skills: ['React', 'TypeScript', 'Next.js', 'GraphQL'], avatar: 'divya', university: 'Anna University' },
    { name: 'Arun Kumar', score: 88, skills: ['Python', 'TensorFlow', 'ML', 'Data Science', 'SQL'], avatar: 'arun', university: 'IIT Madras' },
    { name: 'Sneha Patel', score: 85, skills: ['Java', 'Spring Boot', 'AWS', 'Docker', 'Kubernetes'], avatar: 'sneha', university: 'NIT Trichy' },
    { name: 'Vikram Singh', score: 79, skills: ['C++', 'Algorithms', 'System Design', 'Go', 'Rust'], avatar: 'vikram', university: 'BITS Pilani' },
    { name: 'Pradeep Raj', score: 82, skills: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Docker'], avatar: 'pradeep', university: 'SRM University' },
    { name: 'Meera Iyer', score: 90, skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS'], avatar: 'meera', university: 'IIIT Hyderabad' },
    { name: 'Arjun Reddy', score: 76, skills: ['Python', 'Flask', 'SQL', 'HTML', 'CSS'], avatar: 'arjun', university: 'Osmania University' },
];

function filterCandidates() {
    const skillsInput = document.getElementById('skillFilterInput').value.trim().toLowerCase();
    const minScore = parseInt(document.getElementById('minScoreFilter').value) || 0;

    if (!skillsInput) { toast.error('Enter skills to filter'); return; }

    const searchSkills = skillsInput.split(',').map(s => s.trim().toLowerCase());
    const results = allCandidates.filter(c => {
        const hasSkill = searchSkills.some(sk => c.skills.some(cs => cs.toLowerCase().includes(sk)));
        return hasSkill && c.score >= minScore;
    });

    const container = document.getElementById('filteredCandidates');
    if (!container) return;

    if (results.length === 0) {
        container.innerHTML = '<div class="glass-card" style="text-align:center;padding:2rem;grid-column:1/-1;"><p style="color:var(--text-secondary);">No candidates match your criteria. Try different skills or lower the minimum score.</p></div>';
        toast.warning('No matching candidates found');
        return;
    }

    container.innerHTML = results.map(r => `
        <div class="glass-card" style="text-align:center;padding:1.5rem;">
            <img class="avatar avatar-lg" src="https://api.dicebear.com/7.x/avataaars/svg?seed=${r.avatar}" alt="" style="margin:0 auto 1rem;">
            <h4 style="font-weight:700;margin-bottom:0.15rem;">${r.name}</h4>
            <p style="font-size:0.8rem;color:var(--text-tertiary);margin-bottom:0.5rem;">${r.university}</p>
            <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:0.75rem;">Skill DNA: <strong style="color:var(--primary-400);font-size:1.1rem;">${r.score}%</strong></p>
            <div style="display:flex;justify-content:center;flex-wrap:wrap;gap:0.35rem;margin-bottom:1rem;">
                ${r.skills.map(s => {
        const matched = searchSkills.some(sk => s.toLowerCase().includes(sk));
        return `<span class="badge ${matched ? 'badge-success' : 'badge-primary'}" style="${matched ? 'font-weight:700;' : ''}">${s}${matched ? ' ✓' : ''}</span>`;
    }).join('')}
            </div>
            <div style="display:flex;gap:0.5rem;justify-content:center;">
                <button class="btn btn-secondary btn-sm" onclick="viewRankedProfile('${r.name}', ${r.score}, '${r.avatar}', 'Student at ${r.university}', '${r.skills.join(',')}', '+10%')">View DNA</button>
                <button class="btn btn-primary btn-sm" onclick="toast.success('${r.name} shortlisted!')">⭐ Shortlist</button>
            </div>
        </div>
    `).join('');

    toast.success(`Found ${results.length} matching candidates!`);
}

// ---- AI Recommendations ----
function renderRecommendations() {
    const list = document.getElementById('recommendationsList');
    if (!list) return;

    const recs = [
        { id: 1, name: 'Divya Nair', match: 96, challenge: 'Real-Time Chat App', reason: 'Top performer with 95% Skill DNA. Exceptional React + TypeScript skills. 22-day streak shows remarkable consistency. Her chat app submission scored 95/100 — highest in this challenge. Ideal full-stack hire.', avatar: 'divya', skills: ['React', 'TypeScript', 'Next.js'] },
        { id: 2, name: 'Arun Kumar', match: 93, challenge: 'ML Fraud Detection', reason: 'Outstanding ML engineer. TensorFlow expertise with 88% score. His fraud detection model achieved 97% accuracy. Strong mathematical foundation. Published research paper on anomaly detection.', avatar: 'arun', skills: ['Python', 'TensorFlow', 'ML'] },
        { id: 3, name: 'Keerthiram G R', match: 91, challenge: 'Real-Time Chat App', reason: 'Strong full-stack developer. 92% AI score with clean WebSocket implementation. React + Node.js expertise. 12% month-over-month improvement — one of the fastest growing students. Ready for interviews.', avatar: 'keerthiram', skills: ['React', 'Node.js', 'Python'] },
        { id: 4, name: 'Sneha Patel', match: 87, challenge: 'Cloud CI/CD Pipeline', reason: 'Excellent DevOps skills with Docker + Kubernetes expertise. Java Spring Boot background gives her strong backend fundamentals. 15-day streak shows commitment.', avatar: 'sneha', skills: ['Java', 'Docker', 'AWS'] },
    ];

    list.innerHTML = recs.map(r => `
        <div class="glass-card" style="padding:1.5rem;border-left:3px solid var(--primary-400);" id="rec-${r.id}">
            <div style="display:flex;align-items:flex-start;gap:1.25rem;">
                <img class="avatar avatar-lg" src="https://api.dicebear.com/7.x/avataaars/svg?seed=${r.avatar}" alt="">
                <div style="flex:1;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                        <h3 style="font-weight:700;font-size:1.15rem;">${r.name}</h3>
                        <span style="font-size:1.25rem;font-weight:800;font-family:'Space Grotesk',sans-serif;color:var(--success-400);">${r.match}% match</span>
                    </div>
                    <div style="display:flex;gap:0.5rem;margin-bottom:0.75rem;flex-wrap:wrap;">
                        <span class="badge badge-accent">For: ${r.challenge}</span>
                        ${r.skills.map(s => `<span class="badge badge-primary">${s}</span>`).join('')}
                    </div>
                    <p style="font-size:0.9rem;color:var(--text-secondary);line-height:1.7;margin-top:0.5rem;">
                        ✨ <strong>AI Insight:</strong> ${r.reason}
                    </p>
                    <div style="display:flex;gap:0.75rem;margin-top:1rem;">
                        <button class="btn btn-primary btn-sm" onclick="scheduleInterview('${r.name}')">📅 Schedule Interview</button>
                        <button class="btn btn-secondary btn-sm" onclick="viewRankedProfile('${r.name}', ${r.match}, '${r.avatar}', 'AI-recommended candidate', '${r.skills.join(',')}', '+12%')">👤 Full Profile</button>
                        <button class="btn btn-ghost btn-sm" onclick="saveToShortlist(${r.id}, '${r.name}')">💾 Save to Shortlist</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function scheduleInterview(name) {
    showRecModal(`📅 Schedule Interview — ${name}`, `
        <div style="display:grid;gap:1rem;">
            <div class="form-group">
                <label class="form-label">Interview Type</label>
                <select class="form-select">
                    <option value="technical">Technical Interview</option>
                    <option value="behavioral">Behavioral Interview</option>
                    <option value="system_design">System Design Interview</option>
                    <option value="coding">Live Coding Challenge</option>
                </select>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
                <div class="form-group">
                    <label class="form-label">Date</label>
                    <input type="date" class="form-input">
                </div>
                <div class="form-group">
                    <label class="form-label">Time</label>
                    <input type="time" class="form-input" value="10:00">
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">Meeting Link (optional)</label>
                <input type="text" class="form-input" placeholder="https://meet.google.com/...">
            </div>
            <div class="form-group">
                <label class="form-label">Notes for ${name}</label>
                <textarea class="form-textarea" placeholder="Any preparation instructions..." style="min-height:60px;"></textarea>
            </div>
            <button class="btn btn-primary" onclick="toast.success('📅 Interview scheduled with ${name}! Invitation sent.');closeRecModal()" style="width:100%;">📧 Send Interview Invite</button>
        </div>
    `);
}

function saveToShortlist(id, name) {
    const el = document.getElementById(`rec-${id}`);
    if (el) {
        el.style.borderLeftColor = 'var(--success-400)';
    }
    toast.success(`💾 ${name} saved to your shortlist!`);
}

// ---- Initialize ----
document.addEventListener('DOMContentLoaded', () => {
    renderChallenges();
    renderRecSubmissions();
    renderRanking();
    renderRecommendations();

    const user = SessionManager.getUser();
    if (user) {
        const nameEl = document.getElementById('userName');
        if (nameEl) nameEl.textContent = user.name || 'Recruiter';
    }
});
