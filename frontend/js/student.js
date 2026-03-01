/* =============================================
   SKILLBRIDGE AI — Student Dashboard Logic
   ============================================= */

// ---- Tab Switching ----
function switchTab(el) {
    const tabId = el.dataset.tab;
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
    const panel = document.getElementById(tabId);
    if (panel) panel.classList.add('active');
    // Close sidebar on mobile
    if (window.innerWidth <= 1024) {
        document.getElementById('sidebar').classList.remove('open');
    }
}

// ---- Problem Marketplace ----
const mockProblems = [
    { id: 1, title: 'Build a Real-Time Chat Application', domain: 'web', difficulty: 'medium', company: 'TechCorp', skills: ['React', 'Node.js', 'WebSocket'], deadline: '2026-03-15', desc: 'Design and implement a scalable real-time chat application with features like group chats, file sharing, and message encryption.' },
    { id: 2, title: 'ML-Based Fraud Detection System', domain: 'ml', difficulty: 'hard', company: 'FinSecure', skills: ['Python', 'TensorFlow', 'SQL'], deadline: '2026-03-20', desc: 'Build a machine learning pipeline to detect fraudulent transactions in real-time with high precision and recall.' },
    { id: 3, title: 'E-Commerce Recommendation Engine', domain: 'data', difficulty: 'medium', company: 'ShopAI', skills: ['Python', 'Pandas', 'Scikit-learn'], deadline: '2026-03-18', desc: 'Create a collaborative filtering based recommendation system for an e-commerce platform with millions of products.' },
    { id: 4, title: 'Cloud-Native CI/CD Pipeline', domain: 'devops', difficulty: 'hard', company: 'CloudOps', skills: ['Docker', 'Kubernetes', 'Terraform'], deadline: '2026-03-22', desc: 'Design a fully automated CI/CD pipeline using cloud-native tools with auto-scaling, monitoring, and rollback capabilities.' },
    { id: 5, title: 'Cross-Platform Fitness Tracker', domain: 'mobile', difficulty: 'medium', company: 'HealthTech', skills: ['Flutter', 'Firebase', 'REST APIs'], deadline: '2026-03-25', desc: 'Build a cross-platform mobile app that tracks fitness activities, integrates with wearable devices, and provides AI-driven insights.' },
    { id: 6, title: 'API Security Audit Tool', domain: 'security', difficulty: 'expert', company: 'CyberShield', skills: ['Python', 'OWASP', 'Penetration Testing'], deadline: '2026-03-28', desc: 'Develop an automated API security testing tool that identifies vulnerabilities following OWASP guidelines.' }
];

function renderProblems(problems = mockProblems) {
    const grid = document.getElementById('problemsGrid');
    if (!grid) return;
    grid.innerHTML = problems.map(p => `
        <div class="problem-card">
            <div class="problem-card-header">
                <h3 class="problem-card-title">${p.title}</h3>
                ${getDifficultyBadge(p.difficulty)}
            </div>
            <div class="problem-card-meta">
                <span class="badge badge-accent">${p.domain}</span>
                <span class="badge badge-primary">${p.company}</span>
            </div>
            <p class="problem-card-desc">${p.desc}</p>
            <div style="display:flex;flex-wrap:wrap;gap:0.35rem;margin-bottom:1rem;">
                ${p.skills.map(s => `<span style="padding:0.2rem 0.6rem;border-radius:var(--border-radius-full);font-size:0.7rem;font-weight:600;background:rgba(99,102,241,0.1);color:var(--primary-300);">${s}</span>`).join('')}
            </div>
            <div class="problem-card-footer">
                <span style="font-size:0.8rem;color:var(--text-tertiary);">Deadline: ${formatDate(p.deadline)}</span>
                <button class="btn btn-primary btn-sm" onclick="openSubmitModal(${p.id})">
                    <i data-lucide="rocket" style="width:14px;height:14px;"></i> Solve
                </button>
            </div>
        </div>
    `).join('');
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Filter problems
document.addEventListener('DOMContentLoaded', () => {
    renderProblems();
    renderSubmissions();
    renderBadges();
    renderGrowthTimeline();
    initSkillDnaChart();
    initDailyGrowthChart();
    initGrowthChart();
    loadUserInfo();

    const filterDomain = document.getElementById('filterDomain');
    const filterDifficulty = document.getElementById('filterDifficulty');
    if (filterDomain) filterDomain.addEventListener('change', applyFilters);
    if (filterDifficulty) filterDifficulty.addEventListener('change', applyFilters);
});

function applyFilters() {
    const domain = document.getElementById('filterDomain').value;
    const difficulty = document.getElementById('filterDifficulty').value;
    let filtered = mockProblems;
    if (domain) filtered = filtered.filter(p => p.domain === domain);
    if (difficulty) filtered = filtered.filter(p => p.difficulty === difficulty);
    renderProblems(filtered);
}

// ---- Submissions ----
const mockSubmissions = [
    { id: 1, problem: 'Real-Time Chat App', domain: 'web', date: '2026-02-28', status: 'reviewed', score: 92 },
    { id: 2, problem: 'Fraud Detection System', domain: 'ml', date: '2026-02-25', status: 'pending', score: null },
    { id: 3, problem: 'Recommendation Engine', domain: 'data', date: '2026-02-20', status: 'reviewed', score: 85 },
    { id: 4, problem: 'CI/CD Pipeline', domain: 'devops', date: '2026-02-15', status: 'reviewed', score: 78 },
];

function renderSubmissions() {
    const tbody = document.getElementById('submissionsTable');
    if (!tbody) return;
    tbody.innerHTML = mockSubmissions.map(s => `
        <tr>
            <td style="font-weight:600;">${s.problem}</td>
            <td><span class="badge badge-accent">${s.domain}</span></td>
            <td style="color:var(--text-secondary);">${formatDate(s.date)}</td>
            <td><span class="badge ${s.status === 'reviewed' ? 'badge-success' : 'badge-warning'}">${s.status}</span></td>
            <td>${s.score ? `<span style="font-weight:700;color:var(--primary-400);">${s.score}/100</span>` : '<span style="color:var(--text-tertiary);">—</span>'}</td>
            <td><button class="btn btn-ghost btn-sm">View</button></td>
        </tr>
    `).join('');
}

// Submission modal
let currentProblemId = null;
function openSubmitModal(problemId) {
    currentProblemId = problemId;
    document.getElementById('submitModal').classList.add('active');
}
function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}
async function submitSolution() {
    const github = document.getElementById('submitGithub').value;
    const demo = document.getElementById('submitDemo').value;
    const docs = document.getElementById('submitDocs').value;

    if (!github) { toast.error('GitHub repository URL is required'); return; }

    showLoading();
    try {
        await api.post('/submissions/create', {
            problem_id: currentProblemId,
            github_url: github,
            demo_url: demo,
            documentation: docs
        });
        hideLoading();
        toast.success('Solution submitted successfully!');
        closeModal('submitModal');
    } catch {
        hideLoading();
        toast.success('Solution submitted! (Demo Mode)');
        closeModal('submitModal');
    }
}

// ---- Skill DNA Chart ----
function initSkillDnaChart() {
    const ctx = document.getElementById('skillDnaChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Problem Solving', 'Web Dev', 'Data Science', 'Algorithms', 'System Design', 'Communication', 'ML/AI', 'DevOps'],
            datasets: [{
                label: 'Your Skill DNA',
                data: [88, 92, 72, 85, 60, 71, 68, 55],
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                borderColor: 'rgba(99, 102, 241, 0.8)',
                borderWidth: 2,
                pointBackgroundColor: '#6366f1',
                pointBorderColor: '#fff',
                pointBorderWidth: 1,
                pointRadius: 4
            }, {
                label: 'Industry Average',
                data: [70, 75, 65, 72, 68, 75, 60, 50],
                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                borderColor: 'rgba(14, 165, 233, 0.5)',
                borderWidth: 1,
                borderDash: [5, 5],
                pointRadius: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: '#94a3b8', font: { family: 'Inter' } } }
            },
            scales: {
                r: {
                    min: 0, max: 100,
                    ticks: { display: false },
                    grid: { color: 'rgba(148,163,184,0.1)' },
                    angleLines: { color: 'rgba(148,163,184,0.1)' },
                    pointLabels: { color: '#94a3b8', font: { family: 'Inter', size: 11 } }
                }
            }
        }
    });

    // Skill breakdown bars
    const skills = [
        { name: 'Problem Solving', value: 88, color: '#6366f1' },
        { name: 'Web Development', value: 92, color: '#8b5cf6' },
        { name: 'Data Science', value: 72, color: '#0ea5e9' },
        { name: 'Algorithms', value: 85, color: '#22c55e' },
        { name: 'System Design', value: 60, color: '#f59e0b' },
        { name: 'Communication', value: 71, color: '#ec4899' },
        { name: 'ML/AI', value: 68, color: '#14b8a6' },
        { name: 'DevOps', value: 55, color: '#ef4444' }
    ];

    const breakdown = document.getElementById('skillBreakdown');
    if (breakdown) {
        breakdown.innerHTML = skills.map(s => `
            <div style="margin-bottom:1rem;">
                <div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:0.35rem;">
                    <span>${s.name}</span><span style="font-weight:700;color:${s.color};">${s.value}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-bar-fill" style="width:${s.value}%;background:${s.color};"></div>
                </div>
            </div>
        `).join('');
    }
}

// ---- Daily Growth Mini Chart ----
function initDailyGrowthChart() {
    const ctx = document.getElementById('dailyGrowthChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                data: [65, 68, 72, 70, 76, 78, 82],
                borderColor: '#0ea5e9',
                backgroundColor: 'rgba(14,165,233,0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: '#0ea5e9'
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 10 } } },
                y: { display: false }
            }
        }
    });
}

// ---- Growth Timeline Chart ----
function initGrowthChart() {
    const ctx = document.getElementById('growthChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Skill Score',
                data: [45, 52, 58, 63, 68, 72, 74, 78, 80, 83, 85, 87],
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99,102,241,0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2
            }, {
                label: 'Problems Solved',
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                borderColor: '#0ea5e9',
                backgroundColor: 'rgba(14,165,233,0.05)',
                fill: true,
                tension: 0.4,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: '#94a3b8' } } },
            scales: {
                x: { grid: { color: 'rgba(148,163,184,0.08)' }, ticks: { color: '#64748b' } },
                y: { grid: { color: 'rgba(148,163,184,0.08)' }, ticks: { color: '#64748b' } }
            }
        }
    });
}

// ---- Badges ----
const mockBadges = [
    { name: 'First Solve', icon: '🏆', desc: 'Solved your first problem', earned: true },
    { name: 'Fast Learner', icon: '⚡', desc: '5 problems in one week', earned: true },
    { name: 'Code Master', icon: '💻', desc: 'Score 90+ on 3 submissions', earned: true },
    { name: 'Team Player', icon: '🤝', desc: 'Collaborated on a challenge', earned: true },
    { name: 'AI Explorer', icon: '🤖', desc: 'Used Career Twin 10 times', earned: true },
    { name: 'Interview Pro', icon: '🎤', desc: 'Score 80+ in mock interview', earned: false },
    { name: 'Full Stack', icon: '🌐', desc: 'Solved problems in 5+ domains', earned: true },
    { name: 'Streak Master', icon: '🔥', desc: '30-day solving streak', earned: false },
    { name: 'Top 10%', icon: '🏅', desc: 'Ranked in top 10%', earned: true },
    { name: 'ML Pioneer', icon: '🧠', desc: 'Completed ML challenge', earned: true },
    { name: 'Open Source', icon: '📦', desc: 'Contributed to open source', earned: false },
    { name: 'Mentor Badge', icon: '🎓', desc: 'Helped 5 other students', earned: false },
];

function renderBadges() {
    const grid = document.getElementById('badgesGrid');
    if (!grid) return;
    grid.innerHTML = mockBadges.map(b => `
        <div class="glass-card" style="text-align:center;padding:1.5rem;${!b.earned ? 'opacity:0.4;filter:grayscale(100%);' : ''}">
            <div style="font-size:2.5rem;margin-bottom:0.75rem;">${b.icon}</div>
            <h4 style="font-weight:700;font-size:0.95rem;margin-bottom:0.25rem;">${b.name}</h4>
            <p style="font-size:0.8rem;color:var(--text-tertiary);">${b.desc}</p>
            ${b.earned ? '<span class="badge badge-success" style="margin-top:0.5rem;">Earned</span>' : '<span class="badge badge-warning" style="margin-top:0.5rem;">Locked</span>'}
        </div>
    `).join('');
}

// ---- Growth Timeline Events ----
function renderGrowthTimeline() {
    const container = document.getElementById('timelineEvents');
    if (!container) return;
    const events = [
        { date: '2026-02-28', event: 'Scored 92/100 on Real-Time Chat App', type: 'success' },
        { date: '2026-02-25', event: 'Submitted Fraud Detection System solution', type: 'info' },
        { date: '2026-02-22', event: 'Earned "Code Master" badge', type: 'success' },
        { date: '2026-02-20', event: 'Scored 85/100 on Recommendation Engine', type: 'info' },
        { date: '2026-02-18', event: 'Started AI Career Twin consultation', type: 'info' },
        { date: '2026-02-15', event: 'Completed first mock interview — Score: 68', type: 'warning' },
    ];

    container.innerHTML = events.map(e => `
        <div class="glass-card" style="padding:1rem 1.5rem;margin-bottom:0.75rem;display:flex;align-items:center;gap:1rem;border-left:3px solid ${e.type === 'success' ? 'var(--success-400)' : e.type === 'warning' ? 'var(--warning-400)' : 'var(--primary-400)'};">
            <span style="font-size:0.8rem;color:var(--text-tertiary);white-space:nowrap;">${formatDate(e.date)}</span>
            <p style="font-size:0.9rem;">${e.event}</p>
        </div>
    `).join('');
}

// ============================================
// AI WORKSPACE — Real Developer Tools
// ============================================

// Workspace sub-tab switching
function switchWorkspaceTool(tool) {
    ['editor', 'templates', 'json', 'regex'].forEach(t => {
        const el = document.getElementById('wsTool-' + t);
        const btn = document.getElementById('wsTab' + t.charAt(0).toUpperCase() + t.slice(1));
        if (el) el.style.display = t === tool ? '' : 'none';
        if (btn) btn.style.opacity = t === tool ? '1' : '0.6';
    });
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ---- Live Code Editor + Runner ----
function runCode() {
    const code = document.getElementById('codeEditor').value;
    const output = document.getElementById('codeOutput');
    output.innerHTML = '';
    const lang = document.getElementById('codeLang').value;
    if (lang === 'html') {
        output.innerHTML = '<iframe srcdoc="' + code.replace(/"/g, '&quot;') + '" style="width:100%;height:100%;border:none;background:#fff;border-radius:8px;"></iframe>';
        return;
    }
    const logs = [];
    const start = performance.now();
    try {
        const fakeConsole = { log: (...a) => logs.push({ type: 'log', msg: a.map(v => typeof v === 'object' ? JSON.stringify(v, null, 2) : String(v)).join(' ') }), error: (...a) => logs.push({ type: 'error', msg: a.join(' ') }), warn: (...a) => logs.push({ type: 'warn', msg: a.join(' ') }), table: (d) => logs.push({ type: 'log', msg: JSON.stringify(d, null, 2) }) };
        const fn = new Function('console', code);
        fn(fakeConsole);
        const elapsed = (performance.now() - start).toFixed(2);
        output.innerHTML = logs.map(l => `<div style="color:${l.type === 'error' ? 'var(--danger-400)' : l.type === 'warn' ? 'var(--warning-400)' : 'var(--text-primary)'};padding:2px 0;border-bottom:1px solid rgba(148,163,184,0.06);">${l.msg.replace(/</g, '&lt;')}</div>`).join('') + `<div style="margin-top:0.75rem;padding-top:0.75rem;border-top:1px solid var(--border-glass);color:var(--success-400);font-size:0.8rem;">✅ Executed in ${elapsed}ms</div>`;
    } catch (e) {
        output.innerHTML = logs.map(l => `<div style="padding:2px 0;">${l.msg}</div>`).join('') + `<div style="color:var(--danger-400);padding:0.75rem;background:rgba(239,68,68,0.08);border-radius:8px;margin-top:0.5rem;">❌ <strong>${e.name}:</strong> ${e.message}</div>`;
    }
}

function clearEditor() { document.getElementById('codeEditor').value = ''; }
function clearOutput() { document.getElementById('codeOutput').innerHTML = '<span style="color:var(--text-tertiary);">// Output cleared</span>'; }

// Tab key support in editor
document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('codeEditor');
    if (editor) editor.addEventListener('keydown', e => {
        if (e.key === 'Tab') { e.preventDefault(); const s = editor.selectionStart, end = editor.selectionEnd; editor.value = editor.value.substring(0, s) + '  ' + editor.value.substring(end); editor.selectionStart = editor.selectionEnd = s + 2; }
    });
});

// ---- Code Templates ----
const codeTemplates = [
    { name: 'React Component', icon: '⚛️', lang: 'jsx', code: `import React, { useState, useEffect } from 'react';\n\nfunction UserCard({ userId }) {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    fetch(\`/api/users/\${userId}\`)\n      .then(res => res.json())\n      .then(data => { setUser(data); setLoading(false); })\n      .catch(err => console.error(err));\n  }, [userId]);\n\n  if (loading) return <div>Loading...</div>;\n  return (\n    <div className="user-card">\n      <h2>{user.name}</h2>\n      <p>{user.email}</p>\n    </div>\n  );\n}\n\nexport default UserCard;` },
    { name: 'Express Server', icon: '🚀', lang: 'javascript', code: `const express = require('express');\nconst app = express();\nconst PORT = 3000;\n\napp.use(express.json());\n\n// Routes\napp.get('/api/health', (req, res) => {\n  res.json({ status: 'ok', timestamp: new Date() });\n});\n\napp.get('/api/users', (req, res) => {\n  res.json([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);\n});\n\napp.post('/api/users', (req, res) => {\n  const { name, email } = req.body;\n  res.status(201).json({ id: Date.now(), name, email });\n});\n\napp.listen(PORT, () => console.log(\`Server on port \${PORT}\`));` },
    { name: 'Binary Search', icon: '🔍', lang: 'javascript', code: `function binarySearch(arr, target) {\n  let left = 0, right = arr.length - 1;\n  \n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1; // not found\n}\n\n// Test\nconst arr = [1,3,5,7,9,11,13,15,17,19];\nconsole.log('Find 7:', binarySearch(arr, 7));  // 3\nconsole.log('Find 6:', binarySearch(arr, 6));  // -1` },
    { name: 'Linked List', icon: '🔗', lang: 'javascript', code: `class Node {\n  constructor(val) { this.val = val; this.next = null; }\n}\n\nclass LinkedList {\n  constructor() { this.head = null; this.size = 0; }\n  \n  append(val) {\n    const node = new Node(val);\n    if (!this.head) { this.head = node; }\n    else { let curr = this.head; while(curr.next) curr = curr.next; curr.next = node; }\n    this.size++;\n  }\n  \n  toArray() {\n    const arr = []; let curr = this.head;\n    while (curr) { arr.push(curr.val); curr = curr.next; }\n    return arr;\n  }\n}\n\nconst list = new LinkedList();\n[10,20,30,40].forEach(v => list.append(v));\nconsole.log('List:', list.toArray());\nconsole.log('Size:', list.size);` },
    { name: 'Fetch API', icon: '🌐', lang: 'javascript', code: `// GET request\nasync function getUsers() {\n  const res = await fetch('https://jsonplaceholder.typicode.com/users');\n  const users = await res.json();\n  console.log('Users:', users.slice(0,3).map(u => u.name));\n}\n\n// POST request\nasync function createPost() {\n  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({ title: 'Hello', body: 'World', userId: 1 })\n  });\n  return res.json();\n}\n\nconsole.log('Fetch API template loaded!');\nconsole.log('Note: network calls won\\'t work in sandbox');` },
    { name: 'Array Methods', icon: '📦', lang: 'javascript', code: `const students = [\n  { name: 'Alice', score: 92, domain: 'web' },\n  { name: 'Bob', score: 78, domain: 'ml' },\n  { name: 'Carol', score: 95, domain: 'web' },\n  { name: 'Dave', score: 88, domain: 'data' },\n  { name: 'Eve', score: 72, domain: 'ml' },\n];\n\n// Filter: web devs with 85+\nconst topWeb = students.filter(s => s.domain === 'web' && s.score >= 85);\nconsole.log('Top web devs:', topWeb.map(s => s.name));\n\n// Map: extract names\nconsole.log('All names:', students.map(s => s.name));\n\n// Reduce: average score\nconst avg = students.reduce((sum,s) => sum + s.score, 0) / students.length;\nconsole.log('Average score:', avg.toFixed(1));\n\n// Sort: by score desc\nconst sorted = [...students].sort((a,b) => b.score - a.score);\nconsole.log('Ranked:', sorted.map(s => \`\${s.name}(\${s.score})\`));` },
];

function renderTemplates() {
    const grid = document.getElementById('templateGrid');
    if (!grid) return;
    grid.innerHTML = codeTemplates.map((t, i) => `
        <div class="glass-card" style="cursor:pointer;transition:transform 0.2s;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform=''" onclick="loadTemplate(${i})">
            <div style="font-size:2rem;margin-bottom:0.75rem;">${t.icon}</div>
            <h4 style="font-weight:700;margin-bottom:0.35rem;">${t.name}</h4>
            <span class="badge badge-accent" style="font-size:0.7rem;">${t.lang}</span>
            <p style="font-size:0.8rem;color:var(--text-tertiary);margin-top:0.5rem;">Click to load into editor</p>
        </div>
    `).join('');
}

function loadTemplate(index) {
    document.getElementById('codeEditor').value = codeTemplates[index].code;
    switchWorkspaceTool('editor');
    toast.success(`Loaded "${codeTemplates[index].name}" template`);
}

// ---- JSON Formatter ----
function formatJSON() {
    const input = document.getElementById('jsonInput').value.trim();
    const output = document.getElementById('jsonOutput');
    const stats = document.getElementById('jsonStats');
    try {
        const parsed = JSON.parse(input);
        const formatted = JSON.stringify(parsed, null, 2);
        output.textContent = formatted;
        output.style.color = 'var(--success-400)';
        const countNodes = (obj) => { if (typeof obj !== 'object' || obj === null) return 1; return Object.values(obj).reduce((s, v) => s + countNodes(v), 1); };
        stats.innerHTML = `<span>✅ <strong>Valid JSON</strong></span><span>📊 Keys: <strong>${typeof parsed === 'object' ? Object.keys(parsed).length : 0}</strong></span><span>📏 Size: <strong>${new Blob([input]).size} bytes</strong></span><span>🌳 Nodes: <strong>${countNodes(parsed)}</strong></span><span>📝 Lines: <strong>${formatted.split('\n').length}</strong></span>`;
    } catch (e) {
        output.textContent = '❌ ' + e.message;
        output.style.color = 'var(--danger-400)';
        stats.innerHTML = '<span style="color:var(--danger-400);">Invalid JSON — fix the syntax and try again</span>';
    }
}
function copyJSON() {
    const text = document.getElementById('jsonOutput').textContent;
    navigator.clipboard.writeText(text).then(() => toast.success('Copied to clipboard!'));
}

// ---- Regex Tester ----
function testRegex() {
    const pattern = document.getElementById('regexPattern').value;
    const flags = document.getElementById('regexFlags').value;
    const testStr = document.getElementById('regexTestString').value;
    const results = document.getElementById('regexResults');
    if (!pattern) { results.innerHTML = '<span style="color:var(--warning-400);">Enter a regex pattern first</span>'; return; }
    try {
        const regex = new RegExp(pattern, flags);
        const matches = [...testStr.matchAll(new RegExp(pattern, flags.includes('g') ? flags : flags + 'g'))];
        if (matches.length === 0) {
            results.innerHTML = '<span style="color:var(--warning-400);">No matches found</span>';
            return;
        }
        let highlighted = testStr;
        const unique = [...new Set(matches.map(m => m[0]))];
        unique.forEach(m => { highlighted = highlighted.replaceAll(m, `<mark style="background:rgba(99,102,241,0.3);color:var(--primary-300);padding:1px 3px;border-radius:3px;">${m}</mark>`); });
        results.innerHTML = `<div style="margin-bottom:0.75rem;color:var(--success-400);font-weight:600;">✅ ${matches.length} match${matches.length > 1 ? 'es' : ''} found</div><div style="line-height:2;margin-bottom:1rem;">${highlighted}</div><div style="border-top:1px solid var(--border-glass);padding-top:0.75rem;"><strong>Matches:</strong> ${matches.map((m, i) => `<span class="badge badge-primary" style="margin:2px;">${m[0]}</span>`).join(' ')}</div>`;
    } catch (e) {
        results.innerHTML = `<span style="color:var(--danger-400);">❌ Invalid regex: ${e.message}</span>`;
    }
}

const regexPatterns = [
    { name: 'Email', pattern: '[\\w.-]+@[\\w.-]+\\.\\w+', desc: 'Match email addresses' },
    { name: 'Phone (US)', pattern: '\\d{3}[-.]\\d{3}[-.]\\d{4}', desc: 'Match US phone numbers' },
    { name: 'URL', pattern: 'https?://[\\w./%-]+', desc: 'Match HTTP/HTTPS URLs' },
    { name: 'IP Address', pattern: '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}', desc: 'Match IPv4 addresses' },
    { name: 'Hex Color', pattern: '#[0-9a-fA-F]{3,6}', desc: 'Match hex color codes' },
    { name: 'Numbers', pattern: '-?\\d+\\.?\\d*', desc: 'Match integers and decimals' },
];

function renderRegexCheatsheet() {
    const el = document.getElementById('regexCheatsheet');
    if (!el) return;
    el.innerHTML = regexPatterns.map(p => `
        <div style="padding:0.75rem;background:var(--bg-secondary);border-radius:var(--border-radius-sm);cursor:pointer;border:1px solid var(--border-glass);" onclick="document.getElementById('regexPattern').value='${p.pattern}';testRegex();" onmouseover="this.style.borderColor='var(--primary-400)'" onmouseout="this.style.borderColor='var(--border-glass)'">
            <div style="font-weight:600;font-size:0.85rem;">${p.name}</div>
            <code style="font-size:0.75rem;color:var(--primary-300);word-break:break-all;">${p.pattern}</code>
            <div style="font-size:0.75rem;color:var(--text-tertiary);margin-top:0.25rem;">${p.desc}</div>
        </div>
    `).join('');
}

// ============================================
// CAREER TWIN — Interactive Career Tools
// ============================================

function switchCareerTool(tool) {
    ['assess', 'learn', 'goals', 'chat'].forEach(t => {
        const el = document.getElementById('ctTool-' + t);
        const btn = document.getElementById('ctTab' + t.charAt(0).toUpperCase() + t.slice(1));
        if (el) el.style.display = t === tool ? '' : 'none';
        if (btn) btn.style.opacity = t === tool ? '1' : '0.6';
    });
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ---- Skill Self-Assessment Quiz ----
const quizQuestions = [
    { q: 'What is the time complexity of binary search?', domain: 'dsa', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], answer: 1 },
    { q: 'Which React hook is used for side effects?', domain: 'web', options: ['useState', 'useEffect', 'useRef', 'useMemo'], answer: 1 },
    { q: 'What does REST stand for?', domain: 'web', options: ['Remote State Transfer', 'Representational State Transfer', 'Recursive State Transform', 'Remote Service Technology'], answer: 1 },
    { q: 'Which data structure uses FIFO?', domain: 'dsa', options: ['Stack', 'Queue', 'Tree', 'Graph'], answer: 1 },
    { q: 'What is a Docker container?', domain: 'devops', options: ['A virtual machine', 'A lightweight isolated process', 'A database', 'A web server'], answer: 1 },
    { q: 'Which SQL clause filters grouped results?', domain: 'data', options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'], answer: 1 },
    { q: 'What does CI/CD stand for?', domain: 'devops', options: ['Code Integration/Code Delivery', 'Continuous Integration/Continuous Deployment', 'Central Intelligence/Central Data', 'Cloud Infrastructure/Cloud Deployment'], answer: 1 },
    { q: 'What is the purpose of a foreign key?', domain: 'data', options: ['Encrypt data', 'Link two tables', 'Index a column', 'Create a view'], answer: 1 },
    { q: 'Which algorithm finds shortest path in weighted graphs?', domain: 'dsa', options: ['BFS', 'DFS', 'Dijkstra', 'Merge Sort'], answer: 2 },
    { q: 'What is the virtual DOM in React?', domain: 'web', options: ['A backup of HTML', 'A lightweight JS representation of the real DOM', 'A server-side component', 'A CSS framework'], answer: 1 },
];

let quizIndex = 0, quizScore = 0, quizDomainScores = {};

function initQuiz() {
    quizIndex = 0; quizScore = 0; quizDomainScores = {};
    document.getElementById('quizContainer').style.display = '';
    document.getElementById('quizComplete').style.display = 'none';
    renderQuizQuestion();
    loadQuizHistory();
}

function renderQuizQuestion() {
    if (quizIndex >= quizQuestions.length) { finishQuiz(); return; }
    const q = quizQuestions[quizIndex];
    document.getElementById('quizProgress').textContent = `Question ${quizIndex + 1} of ${quizQuestions.length}`;
    document.getElementById('quizQuestion').textContent = q.q;
    document.getElementById('quizOptions').innerHTML = q.options.map((opt, i) => `
        <button class="btn btn-secondary" style="text-align:left;padding:1rem;font-size:0.95rem;justify-content:flex-start;" onclick="answerQuiz(${i})" id="quizOpt${i}">
            <span style="width:28px;height:28px;border-radius:50%;background:var(--bg-tertiary);display:inline-flex;align-items:center;justify-content:center;margin-right:0.75rem;font-weight:700;font-size:0.8rem;">${String.fromCharCode(65 + i)}</span> ${opt}
        </button>
    `).join('');
}

function answerQuiz(selected) {
    const q = quizQuestions[quizIndex];
    const correct = selected === q.answer;
    const optBtn = document.getElementById('quizOpt' + selected);
    const correctBtn = document.getElementById('quizOpt' + q.answer);
    // Disable all buttons
    document.querySelectorAll('#quizOptions button').forEach(b => b.disabled = true);
    if (correct) {
        optBtn.style.border = '2px solid var(--success-400)';
        optBtn.style.background = 'rgba(34,197,94,0.15)';
        quizScore++;
    } else {
        optBtn.style.border = '2px solid var(--danger-400)';
        optBtn.style.background = 'rgba(239,68,68,0.15)';
        correctBtn.style.border = '2px solid var(--success-400)';
        correctBtn.style.background = 'rgba(34,197,94,0.15)';
    }
    if (!quizDomainScores[q.domain]) quizDomainScores[q.domain] = { correct: 0, total: 0 };
    quizDomainScores[q.domain].total++;
    if (correct) quizDomainScores[q.domain].correct++;

    setTimeout(() => { quizIndex++; renderQuizQuestion(); }, 1200);
}

function finishQuiz() {
    const pct = Math.round((quizScore / quizQuestions.length) * 100);
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('quizComplete').style.display = '';
    document.getElementById('quizScoreDisplay').textContent = pct + '%';
    document.getElementById('quizScoreBar').style.width = pct + '%';
    document.getElementById('quizSummaryText').textContent = `You scored ${quizScore}/${quizQuestions.length} (${pct}%). ${pct >= 80 ? 'Excellent work! 🔥' : pct >= 60 ? 'Good job! Keep improving.' : 'Keep practicing — you\'ll get there!'}`;
    // Domain breakdown
    const domainNames = { dsa: 'DSA', web: 'Web Dev', data: 'Database', devops: 'DevOps' };
    document.getElementById('quizDomainScores').innerHTML = Object.entries(quizDomainScores).map(([k, v]) => {
        const dp = Math.round((v.correct / v.total) * 100);
        return `<div style="margin-bottom:0.75rem;"><div style="display:flex;justify-content:space-between;margin-bottom:0.25rem;"><span>${domainNames[k] || k}</span><span style="font-weight:700;color:${dp >= 80 ? 'var(--success-400)' : dp >= 50 ? 'var(--warning-400)' : 'var(--danger-400)'};">${dp}%</span></div><div class="progress-bar"><div class="progress-bar-fill" style="width:${dp}%;"></div></div></div>`;
    }).join('');
    // Save to history
    const history = JSON.parse(localStorage.getItem('sb_quiz_history') || '[]');
    history.unshift({ date: new Date().toLocaleDateString(), score: pct, domains: { ...quizDomainScores } });
    if (history.length > 10) history.pop();
    localStorage.setItem('sb_quiz_history', JSON.stringify(history));
    loadQuizHistory();
}

function restartQuiz() { initQuiz(); if (typeof lucide !== 'undefined') lucide.createIcons(); }

function loadQuizHistory() {
    const history = JSON.parse(localStorage.getItem('sb_quiz_history') || '[]');
    const el = document.getElementById('quizHistory');
    if (!el) return;
    el.innerHTML = history.length === 0 ? 'No attempts yet' : history.slice(0, 5).map(h => `<div style="display:flex;justify-content:space-between;padding:0.4rem 0;border-bottom:1px solid rgba(148,163,184,0.08);"><span style="color:var(--text-tertiary);">${h.date}</span><span style="font-weight:700;color:${h.score >= 80 ? 'var(--success-400)' : 'var(--primary-400)'};">${h.score}%</span></div>`).join('');
}

// ---- Learning Resources ----
const learningResources = [
    { title: 'JavaScript.info', desc: 'Modern JS tutorial — from basics to advanced', url: 'https://javascript.info', category: 'web', icon: '📘', level: 'Beginner-Advanced', free: true },
    { title: 'React Official Docs', desc: 'Learn React from the official documentation', url: 'https://react.dev', category: 'web', icon: '⚛️', level: 'Intermediate', free: true },
    { title: 'freeCodeCamp', desc: '10,000+ hours of free coding curriculum', url: 'https://freecodecamp.org', category: 'web', icon: '🏕️', level: 'Beginner', free: true },
    { title: 'LeetCode', desc: 'Practice coding problems for interviews', url: 'https://leetcode.com', category: 'dsa', icon: '🧩', level: 'All Levels', free: true },
    { title: 'NeetCode.io', desc: 'Curated 150 problems with video explanations', url: 'https://neetcode.io', category: 'dsa', icon: '🎯', level: 'Intermediate', free: true },
    { title: 'Python for Everybody', desc: 'Complete Python course by Dr. Chuck', url: 'https://py4e.com', category: 'python', icon: '🐍', level: 'Beginner', free: true },
    { title: 'Real Python', desc: 'In-depth Python tutorials and guides', url: 'https://realpython.com', category: 'python', icon: '📗', level: 'Intermediate', free: true },
    { title: 'System Design Primer', desc: 'GitHub repo with system design fundamentals', url: 'https://github.com/donnemartin/system-design-primer', category: 'system', icon: '🏗️', level: 'Advanced', free: true },
    { title: 'ByteByteGo', desc: 'Visual system design explanations', url: 'https://bytebytego.com', category: 'system', icon: '📐', level: 'Intermediate', free: false },
    { title: 'Docker Getting Started', desc: 'Official Docker tutorial', url: 'https://docs.docker.com/get-started/', category: 'devops', icon: '🐳', level: 'Beginner', free: true },
    { title: 'KodeKloud', desc: 'DevOps learning with hands-on labs', url: 'https://kodekloud.com', category: 'devops', icon: '☁️', level: 'Beginner-Advanced', free: false },
    { title: 'Fast.ai', desc: 'Practical deep learning for coders', url: 'https://fast.ai', category: 'ml', icon: '🧠', level: 'Intermediate', free: true },
    { title: 'Andrew Ng ML Course', desc: 'Stanford ML course on Coursera', url: 'https://www.coursera.org/learn/machine-learning', category: 'ml', icon: '🎓', level: 'Beginner', free: true },
    { title: 'Kaggle Learn', desc: 'Free micro-courses on data science and ML', url: 'https://kaggle.com/learn', category: 'ml', icon: '📊', level: 'Beginner', free: true },
    { title: 'CS50 by Harvard', desc: 'Introduction to Computer Science', url: 'https://cs50.harvard.edu', category: 'dsa', icon: '🎓', level: 'Beginner', free: true },
];

function renderResources(filter = 'all') {
    const grid = document.getElementById('resourcesGrid');
    if (!grid) return;
    const filtered = filter === 'all' ? learningResources : learningResources.filter(r => r.category === filter);
    grid.innerHTML = filtered.map(r => `
        <a href="${r.url}" target="_blank" rel="noopener" class="glass-card" style="text-decoration:none;color:inherit;transition:transform 0.2s,border-color 0.2s;border:1px solid var(--border-glass);" onmouseover="this.style.transform='translateY(-4px)';this.style.borderColor='var(--primary-400)'" onmouseout="this.style.transform='';this.style.borderColor='var(--border-glass)'">
            <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem;">
                <span style="font-size:1.75rem;">${r.icon}</span>
                <div>
                    <h4 style="font-weight:700;font-size:0.95rem;">${r.title}</h4>
                    <div style="display:flex;gap:0.35rem;margin-top:0.25rem;">
                        <span class="badge badge-accent" style="font-size:0.65rem;">${r.level}</span>
                        ${r.free ? '<span class="badge badge-success" style="font-size:0.65rem;">FREE</span>' : '<span class="badge badge-warning" style="font-size:0.65rem;">PAID</span>'}
                    </div>
                </div>
            </div>
            <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.5;">${r.desc}</p>
        </a>
    `).join('');
}
function filterResources(cat) { renderResources(cat); }

// ---- Goal Tracker (localStorage) ----
function getGoals() { return JSON.parse(localStorage.getItem('sb_goals') || '[]'); }
function saveGoals(goals) { localStorage.setItem('sb_goals', JSON.stringify(goals)); }

function addGoal() {
    const input = document.getElementById('goalInput');
    const text = input.value.trim();
    if (!text) { toast.error('Enter a goal description'); return; }
    const goals = getGoals();
    goals.unshift({ id: Date.now(), text, category: document.getElementById('goalCategory').value, deadline: parseInt(document.getElementById('goalDeadline').value), done: false, createdAt: new Date().toISOString() });
    saveGoals(goals);
    input.value = '';
    renderGoals();
    toast.success('Goal added!');
}

function toggleGoal(id) {
    const goals = getGoals();
    const g = goals.find(g => g.id === id);
    if (g) g.done = !g.done;
    saveGoals(goals);
    renderGoals();
}

function deleteGoal(id) {
    saveGoals(getGoals().filter(g => g.id !== id));
    renderGoals();
    toast.info('Goal removed');
}

function renderGoals() {
    const goals = getGoals();
    const list = document.getElementById('goalsList');
    const empty = document.getElementById('goalsEmpty');
    if (!list) return;
    if (goals.length === 0) { list.innerHTML = ''; empty.style.display = ''; return; }
    empty.style.display = 'none';
    const catIcons = { skill: '🎯', project: '🚀', learning: '📚', career: '💼' };
    const catColors = { skill: 'var(--primary-400)', project: 'var(--accent-400)', learning: 'var(--success-400)', career: 'var(--warning-400)' };
    list.innerHTML = goals.map(g => {
        const created = new Date(g.createdAt);
        const deadline = new Date(created.getTime() + g.deadline * 86400000);
        const daysLeft = Math.max(0, Math.ceil((deadline - new Date()) / 86400000));
        return `<div class="glass-card" style="display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;${g.done ? 'opacity:0.6;' : ''}border-left:3px solid ${catColors[g.category]};">
            <button onclick="toggleGoal(${g.id})" style="width:28px;height:28px;border-radius:50%;border:2px solid ${g.done ? 'var(--success-400)' : 'var(--border-glass)'};background:${g.done ? 'var(--success-400)' : 'transparent'};cursor:pointer;display:flex;align-items:center;justify-content:center;color:white;font-size:0.8rem;flex-shrink:0;">${g.done ? '✓' : ''}</button>
            <div style="flex:1;">
                <div style="font-weight:600;${g.done ? 'text-decoration:line-through;' : ''}">${catIcons[g.category]} ${g.text}</div>
                <div style="font-size:0.75rem;color:var(--text-tertiary);margin-top:0.25rem;">${g.done ? 'Completed ✅' : '⏰ ' + daysLeft + ' days left'} • Created ${created.toLocaleDateString()}</div>
            </div>
            <button onclick="deleteGoal(${g.id})" class="btn btn-ghost btn-sm" style="color:var(--danger-400);flex-shrink:0;">✕</button>
        </div>`;
    }).join('');
}

// ---- Career Twin AI Chat ----
const careerTwinResponses = {
    skill: "Based on your **Skill DNA profile**:\n\n• 🟢 **Web Dev: 92%** — Strongest area!\n• 🟢 **Problem Solving: 88%** — Excellent\n• 🟡 **Data Science: 72%** — Growing\n• 🔴 **System Design: 60%** — Focus area\n• 🔴 **DevOps: 55%** — Needs attention\n\nSpend 30 min/day on **System Design** this week.",
    interview: "**Interview Readiness: 74/100** 📊\n\n• Technical: Strong\n• Behavioral (STAR): Practice more\n• System Design: Weak spot\n\nDo 2 mock interviews this week. Ready in ~**6 weeks**.",
    career: "Your **top career paths**:\n\n1. **Full-Stack Developer** — 91% match ✨\n2. **Backend Engineer** — 85% match\n3. **ML Engineer** — 62% match\n\nFull-Stack is fastest. Want a study plan?",
    learn: "**30-day learning roadmap**:\n\n**Week 1-2**: System Design (Load balancers, CDNs)\n**Week 3**: Docker & Kubernetes\n**Week 4**: Advanced SQL\n\nThis boosts weak areas by ~**15%**! 🚀",
    progress: "📈 **Growth Report**:\n\n• This Week: +3.2% improvement\n• This Month: +5.1% (above 3.8% avg)\n• Streak: 7 days 🔥\n• Rank: Top 15%\n\nOn track for **90% Skill DNA** by April!",
    job: "🎯 **Job Market**:\n\n• Full-stack demand: +34% YoY\n• Salary: ₹8-15 LPA for your level\n• Add **TypeScript** + **AWS** to unlock 40% more jobs",
};

function getCareerTwinResponse(msg) {
    const l = msg.toLowerCase();
    if (l.match(/skill|dna|score|strength|weak/)) return careerTwinResponses.skill;
    if (l.match(/interview|ready|prepare|mock/)) return careerTwinResponses.interview;
    if (l.match(/career|path|role|become|developer/)) return careerTwinResponses.career;
    if (l.match(/learn|study|roadmap|plan|next/)) return careerTwinResponses.learn;
    if (l.match(/progress|growth|improve|how am i/)) return careerTwinResponses.progress;
    if (l.match(/job|hire|salary|company|market/)) return careerTwinResponses.job;
    const defaults = ["Your **career readiness is 78%** and climbing. Focus on **System Design** and **DevOps** for max impact. You're ahead of 85% of students! 💪", "Your growth rate is **+0.5%/day** — that compounds fast! Try **refactoring** old solutions. That's what separates good devs from great ones.", "You started at 45% and now you're at **87%** — remarkable! 🚀 One more DevOps challenge earns the **Full Stack** badge!"];
    return defaults[Math.floor(Math.random() * defaults.length)];
}

function sendCareerTwinMessage() {
    const input = document.getElementById('careerTwinInput');
    const msg = input.value.trim();
    if (!msg) return;
    appendChatMessage('careerTwinMessages', msg, 'user');
    input.value = '';
    setTimeout(() => appendChatMessage('careerTwinMessages', getCareerTwinResponse(msg), 'ai'), 800 + Math.random() * 800);
}

// ---- Chat Helpers ----
function appendChatMessage(containerId, text, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const msg = document.createElement('div');
    msg.className = `chat-msg ${type}`;
    msg.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
}

// ---- Initialize all new features on DOMContentLoaded ----
document.addEventListener('DOMContentLoaded', () => {
    renderTemplates();
    renderResources();
    renderRegexCheatsheet();
    initQuiz();
    renderGoals();
});

// ---- Interview System ----
const interviewQuestions = [
    "Let's start with a warm-up. Can you tell me about a challenging project you've worked on recently?",
    "Great! Now let's dive into a technical question. How would you design a URL shortening service like bit.ly? Walk me through your approach.",
    "Interesting approach. What about handling high traffic? How would you ensure the system can handle millions of requests per second?",
    "Good thinking. Now a behavioral question: Tell me about a time you had to deal with a conflict in your team. How did you handle it?",
    "Final question: If you could improve one thing about your technical skills, what would it be and why?"
];
let interviewQuestionIndex = 0;

function startInterview() {
    document.getElementById('interviewPanel').style.display = 'block';
    const messages = document.getElementById('interviewMessages');
    messages.innerHTML = '';
    interviewQuestionIndex = 0;

    const type = document.getElementById('interviewType').value;
    appendChatMessage('interviewMessages',
        `Welcome to your ${type} mock interview! I'll be evaluating your responses across multiple dimensions. Let's begin.\n\n${interviewQuestions[0]}`,
        'ai');

    document.getElementById('interviewPanel').scrollIntoView({ behavior: 'smooth' });
}

function sendInterviewAnswer() {
    const input = document.getElementById('interviewInput');
    const msg = input.value.trim();
    if (!msg) return;
    appendChatMessage('interviewMessages', msg, 'user');
    input.value = '';

    interviewQuestionIndex++;
    if (interviewQuestionIndex < interviewQuestions.length) {
        setTimeout(() => {
            appendChatMessage('interviewMessages', interviewQuestions[interviewQuestionIndex], 'ai');
        }, 1500);
    } else {
        setTimeout(() => {
            appendChatMessage('interviewMessages',
                "Thank you for completing the interview! 🎉\n\n**Your Evaluation:**\n• Technical Thinking: 82/100\n• Communication: 75/100\n• Reasoning: 71/100\n• Problem Solving: 78/100\n\n**Overall Score: 77/100**\n\nGreat job! Focus on structuring your system design answers more clearly. Keep practicing!",
                'ai');
        }, 2000);
    }
}

function endInterview() {
    document.getElementById('interviewPanel').style.display = 'none';
    toast.info('Interview ended. Check your scores!');
}

// ---- Load User Info ----
function loadUserInfo() {
    const user = SessionManager.getUser();
    if (user) {
        const nameEl = document.getElementById('userName');
        const avatarEl = document.getElementById('userAvatar');
        if (nameEl) nameEl.textContent = user.name || 'Student';
        if (avatarEl && user.picture) avatarEl.src = user.picture;
    }
}
