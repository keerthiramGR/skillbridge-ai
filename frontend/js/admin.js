/* =============================================
   SKILLBRIDGE AI — Admin Dashboard Logic
   ============================================= */

function switchAdminTab(el) {
    const tabId = el.dataset.tab;
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
    document.getElementById(tabId)?.classList.add('active');
    if (window.innerWidth <= 1024) document.getElementById('sidebar').classList.remove('open');
}

// ---- Recruiter Approvals ----
const mockApprovals = [
    { id: 1, name: 'TechCorp Inc.', contact: 'hiring@techcorp.com', applied: '2026-02-28', type: 'Enterprise', docs: true },
    { id: 2, name: 'DataFlow Labs', contact: 'hr@dataflow.io', applied: '2026-02-27', type: 'Startup', docs: true },
    { id: 3, name: 'CyberShield Security', contact: 'recruit@cybershield.com', applied: '2026-02-26', type: 'Enterprise', docs: false },
    { id: 4, name: 'AI Solutions Co.', contact: 'team@aisolutions.dev', applied: '2026-02-25', type: 'Startup', docs: true },
    { id: 5, name: 'CloudOps Global', contact: 'hiring@cloudops.global', applied: '2026-02-24', type: 'Enterprise', docs: true },
    { id: 6, name: 'FinSecure Technologies', contact: 'recruit@finsecure.io', applied: '2026-02-23', type: 'MNC', docs: true },
];

function renderApprovals() {
    const list = document.getElementById('approvalsList');
    if (!list) return;
    list.innerHTML = mockApprovals.map(a => `
        <div class="glass-card" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;" id="approval-${a.id}">
            <div style="display:flex;align-items:center;gap:1rem;">
                <div style="width:48px;height:48px;border-radius:var(--border-radius-md);background:linear-gradient(135deg,rgba(14,165,233,0.2),rgba(59,130,246,0.2));display:flex;align-items:center;justify-content:center;color:var(--accent-400);font-size:1.25rem;">
                    <i data-lucide="building-2"></i>
                </div>
                <div>
                    <h4 style="font-weight:700;">${a.name}</h4>
                    <p style="font-size:0.85rem;color:var(--text-secondary);">${a.contact}</p>
                    <div style="display:flex;gap:0.5rem;margin-top:0.35rem;">
                        <span class="badge badge-accent">${a.type}</span>
                        <span class="badge ${a.docs ? 'badge-success' : 'badge-warning'}">${a.docs ? 'Docs Verified' : 'Docs Pending'}</span>
                    </div>
                </div>
            </div>
            <div style="display:flex;gap:0.5rem;">
                <button class="btn btn-primary btn-sm" onclick="approveRecruiter(${a.id})">
                    <i data-lucide="check" style="width:14px;height:14px;"></i> Approve
                </button>
                <button class="btn btn-danger btn-sm" onclick="rejectRecruiter(${a.id})">
                    <i data-lucide="x" style="width:14px;height:14px;"></i> Reject
                </button>
                <button class="btn btn-ghost btn-sm">View Details</button>
            </div>
        </div>
    `).join('');
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function approveRecruiter(id) {
    const el = document.getElementById(`approval-${id}`);
    if (el) {
        el.style.opacity = '0.5';
        el.style.borderLeft = '3px solid var(--success-400)';
        setTimeout(() => el.remove(), 500);
    }
    toast.success('Recruiter approved and notified!');
}

function rejectRecruiter(id) {
    const el = document.getElementById(`approval-${id}`);
    if (el) {
        el.style.opacity = '0.5';
        el.style.borderLeft = '3px solid var(--danger-400)';
        setTimeout(() => el.remove(), 500);
    }
    toast.warning('Recruiter application rejected.');
}

// ---- User Management ----
const mockUsers = [
    { name: 'Alice Chen', email: 'alice@example.com', role: 'student', joined: '2026-01-15', status: 'active', avatar: 'alice' },
    { name: 'Bob Kumar', email: 'bob@example.com', role: 'student', joined: '2026-01-20', status: 'active', avatar: 'bob' },
    { name: 'TechCorp HR', email: 'hiring@techcorp.com', role: 'recruiter', joined: '2026-02-01', status: 'active', avatar: 'techcorp' },
    { name: 'Carol Smith', email: 'carol@example.com', role: 'student', joined: '2026-02-05', status: 'suspended', avatar: 'carol' },
    { name: 'DataFlow Labs', email: 'hr@dataflow.io', role: 'recruiter', joined: '2026-02-10', status: 'pending', avatar: 'dataflow' },
    { name: 'Eve Johnson', email: 'eve@example.com', role: 'student', joined: '2026-02-12', status: 'active', avatar: 'eve' },
    { name: 'System Admin', email: 'admin@skillbridge.ai', role: 'admin', joined: '2026-01-01', status: 'active', avatar: 'admin' },
];

function renderUsers() {
    const tbody = document.getElementById('usersTable');
    if (!tbody) return;
    tbody.innerHTML = mockUsers.map(u => `
        <tr>
            <td style="display:flex;align-items:center;gap:0.75rem;">
                <img class="avatar avatar-sm" src="https://api.dicebear.com/7.x/avataaars/svg?seed=${u.avatar}" alt="">
                <span style="font-weight:600;">${u.name}</span>
            </td>
            <td style="color:var(--text-secondary);">${u.email}</td>
            <td><span class="badge badge-${u.role === 'admin' ? 'warning' : u.role === 'recruiter' ? 'accent' : 'primary'}">${u.role}</span></td>
            <td style="color:var(--text-secondary);">${formatDate(u.joined)}</td>
            <td><span class="badge ${u.status === 'active' ? 'badge-success' : u.status === 'suspended' ? 'badge-danger' : 'badge-warning'}">${u.status}</span></td>
            <td>
                <div style="display:flex;gap:0.35rem;">
                    <button class="btn btn-ghost btn-sm">Edit</button>
                    ${u.status === 'active' ? '<button class="btn btn-ghost btn-sm" style="color:var(--warning-400);">Suspend</button>' : '<button class="btn btn-ghost btn-sm" style="color:var(--success-400);">Activate</button>'}
                </div>
            </td>
        </tr>
    `).join('');
}

// ---- Problem Moderation ----
const mockModeration = [
    { id: 1, title: 'Build a Blockchain Voting System', company: 'ChainVote', status: 'pending', domain: 'blockchain', reported: false },
    { id: 2, title: 'Spam Detection ML Model', company: 'MailGuard', status: 'approved', domain: 'ml', reported: false },
    { id: 3, title: 'IoT Smart Home Dashboard', company: 'SmartHome Inc.', status: 'pending', domain: 'iot', reported: true },
    { id: 4, title: 'Social Media Analytics Tool', company: 'SocialPulse', status: 'approved', domain: 'data', reported: false },
];

function renderModeration() {
    const list = document.getElementById('moderationList');
    if (!list) return;
    list.innerHTML = mockModeration.map(p => `
        <div class="glass-card" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
            <div>
                <h4 style="font-weight:700;">${p.title}</h4>
                <div style="display:flex;gap:0.5rem;margin-top:0.35rem;">
                    <span class="badge badge-accent">${p.domain}</span>
                    <span class="badge badge-primary">${p.company}</span>
                    <span class="badge ${p.status === 'approved' ? 'badge-success' : 'badge-warning'}">${p.status}</span>
                    ${p.reported ? '<span class="badge badge-danger">⚠ Reported</span>' : ''}
                </div>
            </div>
            <div style="display:flex;gap:0.5rem;">
                ${p.status === 'pending' ? '<button class="btn btn-primary btn-sm">Approve</button>' : ''}
                <button class="btn btn-ghost btn-sm">Review</button>
                <button class="btn btn-danger btn-sm">Remove</button>
            </div>
        </div>
    `).join('');
}

// ---- Analytics Charts ----
function initAnalyticsCharts() {
    // User Growth
    const ugCtx = document.getElementById('userGrowthChart');
    if (ugCtx) {
        new Chart(ugCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Students',
                    data: [120, 210, 340, 480, 580, 690, 780, 860, 940, 1050, 1150, 1240],
                    borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,0.1)', fill: true, tension: 0.4, borderWidth: 2
                }, {
                    label: 'Recruiters',
                    data: [5, 8, 12, 16, 20, 24, 28, 31, 35, 38, 40, 42],
                    borderColor: '#0ea5e9', backgroundColor: 'rgba(14,165,233,0.05)', fill: true, tension: 0.4, borderWidth: 2
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

    // Domain Distribution
    const domCtx = document.getElementById('domainChart');
    if (domCtx) {
        new Chart(domCtx, {
            type: 'doughnut',
            data: {
                labels: ['Web Dev', 'ML/AI', 'Data Science', 'DevOps', 'Mobile', 'Security'],
                datasets: [{
                    data: [35, 25, 18, 10, 8, 4],
                    backgroundColor: ['#6366f1', '#0ea5e9', '#22c55e', '#f59e0b', '#ec4899', '#ef4444'],
                    borderWidth: 0,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom', labels: { color: '#94a3b8', padding: 15, font: { size: 11 } } }
                }
            }
        });
    }

    // Engagement
    const engCtx = document.getElementById('engagementChart');
    if (engCtx) {
        new Chart(engCtx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Active Users',
                    data: [180, 220, 260, 240, 280, 150, 120],
                    backgroundColor: 'rgba(99,102,241,0.5)', borderColor: '#6366f1', borderWidth: 1, borderRadius: 6
                }, {
                    label: 'Submissions',
                    data: [15, 22, 28, 18, 32, 12, 8],
                    backgroundColor: 'rgba(14,165,233,0.5)', borderColor: '#0ea5e9', borderWidth: 1, borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { labels: { color: '#94a3b8' } } },
                scales: {
                    x: { grid: { display: false }, ticks: { color: '#64748b' } },
                    y: { grid: { color: 'rgba(148,163,184,0.08)' }, ticks: { color: '#64748b' } }
                }
            }
        });
    }

    // Hiring Funnel
    const funCtx = document.getElementById('funnelChart');
    if (funCtx) {
        new Chart(funCtx, {
            type: 'bar',
            data: {
                labels: ['Applied', 'Shortlisted', 'Interviewed', 'Offered', 'Hired'],
                datasets: [{
                    data: [1240, 320, 85, 28, 12],
                    backgroundColor: ['rgba(99,102,241,0.6)', 'rgba(14,165,233,0.6)', 'rgba(139,92,246,0.6)', 'rgba(34,197,94,0.6)', 'rgba(245,158,11,0.6)'],
                    borderWidth: 0, borderRadius: 6
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { color: 'rgba(148,163,184,0.08)' }, ticks: { color: '#64748b' } },
                    y: { grid: { display: false }, ticks: { color: '#94a3b8', font: { weight: 600 } } }
                }
            }
        });
    }
}

// ---- Initialize ----
document.addEventListener('DOMContentLoaded', () => {
    renderApprovals();
    renderUsers();
    renderModeration();
    initAnalyticsCharts();

    const user = SessionManager.getUser();
    if (user) {
        const nameEl = document.getElementById('userName');
        if (nameEl) nameEl.textContent = user.name || 'Admin';
    }
});
