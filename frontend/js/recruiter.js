/* =============================================
   SKILLBRIDGE AI — Recruiter Dashboard Logic
   ============================================= */

function switchRecruiterTab(el) {
    const tabId = el.dataset.tab;
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
    document.getElementById(tabId)?.classList.add('active');
    if (window.innerWidth <= 1024) document.getElementById('sidebar').classList.remove('open');
}

// ---- Upload Challenge ----
async function uploadChallenge() {
    const title = document.getElementById('problemTitle').value.trim();
    const domain = document.getElementById('problemDomain').value;
    const difficulty = document.getElementById('problemDifficulty').value;
    const desc = document.getElementById('problemDesc').value.trim();
    const skills = document.getElementById('problemSkills').value.trim();
    const deadline = document.getElementById('problemDeadline').value;
    const criteria = document.getElementById('problemCriteria').value.trim();

    if (!title || !domain || !desc || !skills || !deadline) {
        toast.error('Please fill in all required fields');
        return;
    }

    showLoading();
    try {
        await api.post('/problems/upload', {
            title, domain, difficulty, description: desc,
            required_skills: skills.split(',').map(s => s.trim()),
            deadline, evaluation_criteria: criteria
        });
        hideLoading();
        toast.success('Challenge published successfully!');
        clearUploadForm();
    } catch {
        hideLoading();
        toast.success('Challenge published! (Demo Mode)');
        clearUploadForm();
    }
}

function clearUploadForm() {
    ['problemTitle', 'problemDesc', 'problemSkills', 'problemCriteria'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
}

// ---- My Challenges ----
const mockChallenges = [
    { id: 1, title: 'Real-Time Chat Application', domain: 'web', difficulty: 'medium', submissions: 15, status: 'active', created: '2026-02-20' },
    { id: 2, title: 'ML Fraud Detection System', domain: 'ml', difficulty: 'hard', submissions: 8, status: 'active', created: '2026-02-18' },
    { id: 3, title: 'Cloud CI/CD Pipeline', domain: 'devops', difficulty: 'hard', submissions: 12, status: 'active', created: '2026-02-15' },
    { id: 4, title: 'E-Commerce Recommendation Engine', domain: 'data', difficulty: 'medium', submissions: 12, status: 'closed', created: '2026-01-28' },
];

function renderChallenges() {
    const list = document.getElementById('challengesList');
    if (!list) return;
    list.innerHTML = mockChallenges.map(c => `
        <div class="glass-card" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
            <div>
                <h3 style="font-weight:700;font-size:1.1rem;margin-bottom:0.35rem;">${c.title}</h3>
                <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                    <span class="badge badge-accent">${c.domain}</span>
                    ${getDifficultyBadge(c.difficulty)}
                    <span class="badge ${c.status === 'active' ? 'badge-success' : 'badge-warning'}">${c.status}</span>
                </div>
            </div>
            <div style="display:flex;align-items:center;gap:1.5rem;">
                <div style="text-align:center;">
                    <div style="font-size:1.5rem;font-weight:800;font-family:'Space Grotesk',sans-serif;">${c.submissions}</div>
                    <div style="font-size:0.75rem;color:var(--text-tertiary);">Submissions</div>
                </div>
                <div style="display:flex;gap:0.5rem;">
                    <button class="btn btn-secondary btn-sm">View</button>
                    <button class="btn btn-ghost btn-sm" style="color:var(--danger-400);">Close</button>
                </div>
            </div>
        </div>
    `).join('');
}

// ---- Submissions ----
const mockRecSubmissions = [
    { student: 'Alice Chen', challenge: 'Real-Time Chat App', date: '2026-02-28', score: 94, status: 'reviewed', avatar: 'alice' },
    { student: 'Bob Kumar', challenge: 'Real-Time Chat App', date: '2026-02-27', score: 88, status: 'reviewed', avatar: 'bob' },
    { student: 'Carol Smith', challenge: 'ML Fraud Detection', date: '2026-02-26', score: null, status: 'pending', avatar: 'carol' },
    { student: 'David Park', challenge: 'Cloud CI/CD Pipeline', date: '2026-02-25', score: 82, status: 'reviewed', avatar: 'david' },
    { student: 'Eve Johnson', challenge: 'ML Fraud Detection', date: '2026-02-24', score: 91, status: 'reviewed', avatar: 'eve' },
    { student: 'Frank Li', challenge: 'Real-Time Chat App', date: '2026-02-23', score: null, status: 'pending', avatar: 'frank' },
];

function renderRecSubmissions() {
    const tbody = document.getElementById('recSubmissionsTable');
    if (!tbody) return;
    tbody.innerHTML = mockRecSubmissions.map(s => `
        <tr>
            <td style="display:flex;align-items:center;gap:0.75rem;">
                <img class="avatar avatar-sm" src="https://api.dicebear.com/7.x/avataaars/svg?seed=${s.avatar}" alt="">
                <span style="font-weight:600;">${s.student}</span>
            </td>
            <td>${s.challenge}</td>
            <td style="color:var(--text-secondary);">${formatDate(s.date)}</td>
            <td>${s.score ? `<span style="font-weight:700;color:var(--primary-400);">${s.score}/100</span>` : '<span class="spinner" style="width:16px;height:16px;border-width:2px;display:inline-block;"></span>'}</td>
            <td><span class="badge ${s.status === 'reviewed' ? 'badge-success' : 'badge-warning'}">${s.status}</span></td>
            <td>
                <div style="display:flex;gap:0.5rem;">
                    <button class="btn btn-secondary btn-sm">Review</button>
                    <button class="btn btn-primary btn-sm">Shortlist</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// ---- AI Ranking ----
const mockRanking = [
    { rank: 1, name: 'Alice Chen', score: 94, skills: ['React', 'Node.js', 'WebSocket'], improvement: '+12%', avatar: 'alice' },
    { rank: 2, name: 'Eve Johnson', score: 91, skills: ['Python', 'TensorFlow', 'SQL'], improvement: '+8%', avatar: 'eve' },
    { rank: 3, name: 'Bob Kumar', score: 88, skills: ['React', 'TypeScript', 'GraphQL'], improvement: '+15%', avatar: 'bob' },
    { rank: 4, name: 'David Park', score: 82, skills: ['Docker', 'K8s', 'Terraform'], improvement: '+6%', avatar: 'david' },
    { rank: 5, name: 'Grace Wong', score: 79, skills: ['Python', 'Pandas', 'Spark'], improvement: '+10%', avatar: 'grace' },
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
                <button class="btn btn-secondary btn-sm">Profile</button>
                <button class="btn btn-primary btn-sm">Contact</button>
            </div>
        </div>
    `).join('');
}

// ---- Skill Filter ----
function filterCandidates() {
    const skills = document.getElementById('skillFilterInput').value.trim();
    const minScore = parseInt(document.getElementById('minScoreFilter').value) || 0;

    if (!skills) { toast.error('Enter skills to filter'); return; }

    // Simulate filtering
    const results = mockRanking.filter(r => r.score >= minScore);
    const container = document.getElementById('filteredCandidates');
    if (!container) return;

    container.innerHTML = results.map(r => `
        <div class="glass-card" style="text-align:center;padding:1.5rem;">
            <img class="avatar avatar-lg" src="https://api.dicebear.com/7.x/avataaars/svg?seed=${r.avatar}" alt="" style="margin:0 auto 1rem;">
            <h4 style="font-weight:700;margin-bottom:0.25rem;">${r.name}</h4>
            <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:0.75rem;">Skill DNA Score: <strong style="color:var(--primary-400);">${r.score}%</strong></p>
            <div style="display:flex;justify-content:center;flex-wrap:wrap;gap:0.35rem;margin-bottom:1rem;">
                ${r.skills.map(s => `<span class="badge badge-primary">${s}</span>`).join('')}
            </div>
            <div style="display:flex;gap:0.5rem;justify-content:center;">
                <button class="btn btn-secondary btn-sm">View DNA</button>
                <button class="btn btn-primary btn-sm">Shortlist</button>
            </div>
        </div>
    `).join('');

    toast.success(`Found ${results.length} matching candidates`);
}

// ---- AI Recommendations ----
function renderRecommendations() {
    const list = document.getElementById('recommendationsList');
    if (!list) return;

    const recs = [
        { name: 'Alice Chen', match: 96, challenge: 'Real-Time Chat App', reason: 'Top performer in web dev challenges with 94% AI score. Strong React + Node.js skills perfectly align with your requirements. 12% improvement rate shows consistent growth.', avatar: 'alice' },
        { name: 'Eve Johnson', match: 92, challenge: 'ML Fraud Detection', reason: 'Outstanding ML capabilities with 91% score. Deep expertise in TensorFlow and SQL. Her Skill DNA shows exceptional analytical thinking and attention to data quality.', avatar: 'eve' },
        { name: 'Bob Kumar', match: 88, challenge: 'Real-Time Chat App', reason: 'Strong full-stack developer with 88% score. TypeScript and GraphQL expertise adds value. Fastest improvement rate among all candidates at 15%.', avatar: 'bob' },
    ];

    list.innerHTML = recs.map((r, i) => `
        <div class="glass-card" style="padding:1.5rem;border-left:3px solid var(--primary-400);">
            <div style="display:flex;align-items:flex-start;gap:1.25rem;">
                <img class="avatar avatar-lg" src="https://api.dicebear.com/7.x/avataaars/svg?seed=${r.avatar}" alt="">
                <div style="flex:1;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
                        <h3 style="font-weight:700;font-size:1.15rem;">${r.name}</h3>
                        <span style="font-size:1.25rem;font-weight:800;font-family:'Space Grotesk',sans-serif;color:var(--success-400);">${r.match}% match</span>
                    </div>
                    <span class="badge badge-accent" style="margin-bottom:0.75rem;">For: ${r.challenge}</span>
                    <p style="font-size:0.9rem;color:var(--text-secondary);line-height:1.7;margin-top:0.5rem;">
                        <i data-lucide="sparkles" style="width:14px;height:14px;display:inline;vertical-align:middle;color:var(--primary-400);"></i>
                        <strong>AI Insight:</strong> ${r.reason}
                    </p>
                    <div style="display:flex;gap:0.75rem;margin-top:1rem;">
                        <button class="btn btn-primary btn-sm">Schedule Interview</button>
                        <button class="btn btn-secondary btn-sm">View Full Profile</button>
                        <button class="btn btn-ghost btn-sm">Save to Shortlist</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    if (typeof lucide !== 'undefined') lucide.createIcons();
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
