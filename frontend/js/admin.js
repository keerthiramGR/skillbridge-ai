/* =============================================
   SKILLBRIDGE AI — Admin Dashboard Logic
   Full interactive demo with working buttons
   ============================================= */

function switchAdminTab(el) {
    const tabId = el.dataset.tab;
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
    document.getElementById(tabId)?.classList.add('active');
    if (window.innerWidth <= 1024) document.getElementById('sidebar').classList.remove('open');
}

// ---- Modal System ----
function showModal(title, content) {
    let modal = document.getElementById('adminModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'adminModal';
        document.body.appendChild(modal);
    }
    modal.innerHTML = `
        <div style="position:fixed;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem;" onclick="if(event.target===this)closeModal()">
            <div style="background:var(--bg-secondary);border:1px solid var(--border-glass);border-radius:var(--border-radius-xl);padding:2rem;max-width:600px;width:100%;max-height:80vh;overflow-y:auto;box-shadow:0 25px 60px rgba(0,0,0,0.5);">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
                    <h2 style="font-weight:800;font-size:1.25rem;">${title}</h2>
                    <button class="btn btn-ghost btn-sm" onclick="closeModal()" style="font-size:1.25rem;">✕</button>
                </div>
                <div>${content}</div>
            </div>
        </div>
    `;
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('adminModal');
    if (modal) modal.style.display = 'none';
}

// ---- Recruiter Approvals ----
let approvals = [
    { id: 1, name: 'TechCorp Inc.', contact: 'hiring@techcorp.com', applied: '2026-02-28', type: 'Enterprise', docs: true, website: 'https://techcorp.example.com', employees: '500+', reason: 'Looking for full-stack developers with cloud expertise for enterprise projects.' },
    { id: 2, name: 'DataFlow Labs', contact: 'hr@dataflow.io', applied: '2026-02-27', type: 'Startup', docs: true, website: 'https://dataflow.io', employees: '25', reason: 'Building ML team for data pipeline products. Need fresh talent.' },
    { id: 3, name: 'CyberShield Security', contact: 'recruit@cybershield.com', applied: '2026-02-26', type: 'Enterprise', docs: false, website: 'https://cybershield.com', employees: '200+', reason: 'Cybersecurity firm looking for ethical hackers and security-minded developers.' },
    { id: 4, name: 'AI Solutions Co.', contact: 'team@aisolutions.dev', applied: '2026-02-25', type: 'Startup', docs: true, website: 'https://aisolutions.dev', employees: '15', reason: 'AI/ML startup seeking Python developers with deep learning experience.' },
    { id: 5, name: 'CloudOps Global', contact: 'hiring@cloudops.global', applied: '2026-02-24', type: 'Enterprise', docs: true, website: 'https://cloudops.global', employees: '1000+', reason: 'Global DevOps company looking for cloud engineers (AWS/GCP/Azure).' },
    { id: 6, name: 'FinSecure Technologies', contact: 'recruit@finsecure.io', applied: '2026-02-23', type: 'MNC', docs: true, website: 'https://finsecure.io', employees: '3000+', reason: 'Fintech MNC seeking developers for secure payment infrastructure.' },
];

function renderApprovals() {
    const list = document.getElementById('approvalsList');
    if (!list) return;
    if (approvals.length === 0) {
        list.innerHTML = '<div class="glass-card" style="text-align:center;padding:3rem;"><h3 style="color:var(--success-400);font-weight:700;">✅ All caught up!</h3><p style="color:var(--text-secondary);margin-top:0.5rem;">No pending recruiter approvals</p></div>';
        return;
    }
    list.innerHTML = approvals.map(a => `
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
                        <span class="badge badge-primary">${a.employees} employees</span>
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
                <button class="btn btn-ghost btn-sm" onclick="viewApprovalDetails(${a.id})">View Details</button>
            </div>
        </div>
    `).join('');
    if (typeof lucide !== 'undefined') lucide.createIcons();
    updatePendingCount();
}

function viewApprovalDetails(id) {
    const a = approvals.find(x => x.id === id);
    if (!a) return;
    showModal(`📋 ${a.name} — Application Details`, `
        <div style="display:grid;gap:1rem;">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
                <div class="glass-card" style="padding:1rem;">
                    <div style="font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:0.25rem;">Organization</div>
                    <div style="font-weight:700;">${a.name}</div>
                </div>
                <div class="glass-card" style="padding:1rem;">
                    <div style="font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:0.25rem;">Type</div>
                    <div style="font-weight:700;">${a.type}</div>
                </div>
                <div class="glass-card" style="padding:1rem;">
                    <div style="font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:0.25rem;">Contact</div>
                    <div style="font-weight:700;">${a.contact}</div>
                </div>
                <div class="glass-card" style="padding:1rem;">
                    <div style="font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:0.25rem;">Employees</div>
                    <div style="font-weight:700;">${a.employees}</div>
                </div>
            </div>
            <div class="glass-card" style="padding:1rem;">
                <div style="font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:0.25rem;">Website</div>
                <div style="font-weight:700;color:var(--accent-400);">${a.website}</div>
            </div>
            <div class="glass-card" style="padding:1rem;">
                <div style="font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:0.25rem;">Reason for Joining</div>
                <div style="color:var(--text-secondary);line-height:1.6;">${a.reason}</div>
            </div>
            <div class="glass-card" style="padding:1rem;">
                <div style="font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:0.25rem;">Document Verification</div>
                <div style="font-weight:700;color:${a.docs ? 'var(--success-400)' : 'var(--warning-400)'};">${a.docs ? '✅ All documents verified' : '⚠️ Documents pending verification'}</div>
            </div>
            <div style="display:flex;gap:0.75rem;margin-top:0.5rem;">
                <button class="btn btn-primary" onclick="approveRecruiter(${a.id});closeModal()" style="flex:1;">✅ Approve</button>
                <button class="btn btn-danger" onclick="rejectRecruiter(${a.id});closeModal()" style="flex:1;">❌ Reject</button>
            </div>
        </div>
    `);
}

function approveRecruiter(id) {
    approvals = approvals.filter(a => a.id !== id);
    renderApprovals();
    toast.success('Recruiter approved and notified via email!');
}

function rejectRecruiter(id) {
    approvals = approvals.filter(a => a.id !== id);
    renderApprovals();
    toast.warning('Recruiter application rejected.');
}

function updatePendingCount() {
    const countEl = document.querySelector('.stat-card:nth-child(4) .stat-card-value');
    if (countEl) countEl.textContent = approvals.length;
}

// ---- User Management ----
let users = [
    { id: 1, name: 'Keerthiram G R', email: 'keerthiram@student.edu', role: 'student', joined: '2026-01-10', status: 'active', avatar: 'keerthiram', university: 'VIT University', skillScore: 87 },
    { id: 2, name: 'Arun Kumar', email: 'arun@student.edu', role: 'student', joined: '2026-01-15', status: 'active', avatar: 'arun', university: 'IIT Madras', skillScore: 78 },
    { id: 3, name: 'Sneha Patel', email: 'sneha@student.edu', role: 'student', joined: '2026-01-20', status: 'active', avatar: 'sneha', university: 'NIT Trichy', skillScore: 82 },
    { id: 4, name: 'Priya Sharma', email: 'recruiter@techcorp.com', role: 'recruiter', joined: '2026-02-01', status: 'active', avatar: 'priya', university: '-', skillScore: 0 },
    { id: 5, name: 'Vikram Singh', email: 'vikram@student.edu', role: 'student', joined: '2026-02-05', status: 'suspended', avatar: 'vikram', university: 'BITS Pilani', skillScore: 71 },
    { id: 6, name: 'Rahul Mehta', email: 'recruiter@innovate.io', role: 'recruiter', joined: '2026-02-10', status: 'active', avatar: 'rahul', university: '-', skillScore: 0 },
    { id: 7, name: 'Divya Nair', email: 'divya@student.edu', role: 'student', joined: '2026-02-12', status: 'active', avatar: 'divya', university: 'Anna University', skillScore: 90 },
    { id: 8, name: 'Admin SkillBridge', email: 'admin@skillbridge.ai', role: 'admin', joined: '2026-01-01', status: 'active', avatar: 'admin', university: '-', skillScore: 0 },
];

function renderUsers() {
    const tbody = document.getElementById('usersTable');
    if (!tbody) return;
    tbody.innerHTML = users.map(u => `
        <tr id="user-row-${u.id}">
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
                    <button class="btn btn-ghost btn-sm" onclick="viewUserProfile(${u.id})">View</button>
                    <button class="btn btn-ghost btn-sm" onclick="editUserRole(${u.id})">Edit</button>
                    ${u.role !== 'admin' ? (u.status === 'active' ?
            `<button class="btn btn-ghost btn-sm" style="color:var(--warning-400);" onclick="toggleUserStatus(${u.id})">Suspend</button>` :
            `<button class="btn btn-ghost btn-sm" style="color:var(--success-400);" onclick="toggleUserStatus(${u.id})">Activate</button>`) : ''}
                </div>
            </td>
        </tr>
    `).join('');
}

function viewUserProfile(id) {
    const u = users.find(x => x.id === id);
    if (!u) return;
    showModal(`👤 ${u.name}`, `
        <div style="text-align:center;margin-bottom:1.5rem;">
            <img class="avatar avatar-lg" src="https://api.dicebear.com/7.x/avataaars/svg?seed=${u.avatar}" alt="" style="width:80px;height:80px;margin:0 auto 1rem;">
            <h3 style="font-weight:700;font-size:1.15rem;">${u.name}</h3>
            <p style="color:var(--text-secondary);">${u.email}</p>
            <div style="display:flex;gap:0.5rem;justify-content:center;margin-top:0.5rem;">
                <span class="badge badge-${u.role === 'admin' ? 'warning' : u.role === 'recruiter' ? 'accent' : 'primary'}">${u.role}</span>
                <span class="badge ${u.status === 'active' ? 'badge-success' : 'badge-danger'}">${u.status}</span>
            </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
            <div class="glass-card" style="padding:1rem;text-align:center;">
                <div style="font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;">Joined</div>
                <div style="font-weight:700;margin-top:0.25rem;">${formatDate(u.joined)}</div>
            </div>
            <div class="glass-card" style="padding:1rem;text-align:center;">
                <div style="font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;">University</div>
                <div style="font-weight:700;margin-top:0.25rem;">${u.university}</div>
            </div>
            ${u.role === 'student' ? `
            <div class="glass-card" style="padding:1rem;text-align:center;">
                <div style="font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;">Skill DNA Score</div>
                <div style="font-weight:800;font-size:1.5rem;margin-top:0.25rem;color:var(--primary-400);">${u.skillScore}%</div>
            </div>
            <div class="glass-card" style="padding:1rem;text-align:center;">
                <div style="font-size:0.75rem;color:var(--text-tertiary);text-transform:uppercase;">Activity</div>
                <div style="font-weight:700;margin-top:0.25rem;color:var(--success-400);">Active contributor</div>
            </div>` : ''}
        </div>
        <div style="display:flex;gap:0.75rem;margin-top:1.5rem;">
            ${u.role !== 'admin' ? `<button class="btn ${u.status === 'active' ? 'btn-danger' : 'btn-primary'}" onclick="toggleUserStatus(${u.id});closeModal()" style="flex:1;">${u.status === 'active' ? '🚫 Suspend User' : '✅ Activate User'}</button>` : ''}
            <button class="btn btn-ghost" onclick="closeModal()" style="flex:1;">Close</button>
        </div>
    `);
}

function editUserRole(id) {
    const u = users.find(x => x.id === id);
    if (!u) return;
    showModal(`✏️ Edit ${u.name}`, `
        <div style="display:grid;gap:1rem;">
            <div class="form-group">
                <label class="form-label">Name</label>
                <input type="text" class="form-input" id="editUserName" value="${u.name}">
            </div>
            <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-input" id="editUserEmail" value="${u.email}" readonly style="opacity:0.6;">
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
                <div class="form-group">
                    <label class="form-label">Role</label>
                    <select class="form-select" id="editUserRole">
                        <option value="student" ${u.role === 'student' ? 'selected' : ''}>Student</option>
                        <option value="recruiter" ${u.role === 'recruiter' ? 'selected' : ''}>Recruiter</option>
                        <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Admin</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Status</label>
                    <select class="form-select" id="editUserStatus">
                        <option value="active" ${u.status === 'active' ? 'selected' : ''}>Active</option>
                        <option value="suspended" ${u.status === 'suspended' ? 'selected' : ''}>Suspended</option>
                        <option value="pending" ${u.status === 'pending' ? 'selected' : ''}>Pending</option>
                    </select>
                </div>
            </div>
            <button class="btn btn-primary" onclick="saveUserEdit(${u.id})" style="width:100%;margin-top:0.5rem;">💾 Save Changes</button>
        </div>
    `);
}

function saveUserEdit(id) {
    const u = users.find(x => x.id === id);
    if (!u) return;
    u.name = document.getElementById('editUserName').value.trim() || u.name;
    u.role = document.getElementById('editUserRole').value;
    u.status = document.getElementById('editUserStatus').value;
    renderUsers();
    closeModal();
    toast.success(`${u.name}'s profile updated!`);
}

function toggleUserStatus(id) {
    const u = users.find(x => x.id === id);
    if (!u) return;
    u.status = u.status === 'active' ? 'suspended' : 'active';
    renderUsers();
    toast.success(`${u.name} is now ${u.status}`);
}

// ---- Problem Moderation ----
let moderationItems = [
    { id: 1, title: 'Build a Blockchain Voting System', company: 'ChainVote', status: 'pending', domain: 'Blockchain', reported: false, desc: 'Create a transparent and tamper-proof voting system using Ethereum smart contracts. Must support voter registration, ballot casting, and result verification.' },
    { id: 2, title: 'Spam Detection ML Model', company: 'MailGuard', status: 'approved', domain: 'ML/AI', reported: false, desc: 'Build a machine learning model that detects email spam with 95%+ accuracy. Use NLP techniques for text classification with real-time prediction API.' },
    { id: 3, title: 'IoT Smart Home Dashboard', company: 'SmartHome Inc.', status: 'pending', domain: 'IoT', reported: true, desc: 'Design a real-time dashboard for IoT smart home devices. Includes temperature monitoring, lighting control, security alerts, and energy analytics.' },
    { id: 4, title: 'Social Media Analytics Tool', company: 'SocialPulse', status: 'approved', domain: 'Data Science', reported: false, desc: 'Build an analytics platform that processes social media data to extract sentiment, trending topics, engagement metrics, and audience demographics.' },
    { id: 5, title: 'API Rate Limiter', company: 'ScaleUp', status: 'pending', domain: 'Backend', reported: false, desc: 'Implement a distributed rate limiter using Redis and sliding window algorithm. Must support 100K+ requests/second with <1ms latency overhead.' },
];

function renderModeration() {
    const list = document.getElementById('moderationList');
    if (!list) return;
    if (moderationItems.length === 0) {
        list.innerHTML = '<div class="glass-card" style="text-align:center;padding:3rem;"><h3 style="color:var(--success-400);font-weight:700;">✅ All clear!</h3><p style="color:var(--text-secondary);margin-top:0.5rem;">No problems to moderate</p></div>';
        return;
    }
    list.innerHTML = moderationItems.map(p => `
        <div class="glass-card" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;" id="mod-${p.id}">
            <div style="flex:1;min-width:250px;">
                <h4 style="font-weight:700;">${p.title}</h4>
                <p style="font-size:0.85rem;color:var(--text-secondary);margin:0.35rem 0;line-height:1.5;">${p.desc.substring(0, 100)}...</p>
                <div style="display:flex;gap:0.5rem;margin-top:0.35rem;">
                    <span class="badge badge-accent">${p.domain}</span>
                    <span class="badge badge-primary">${p.company}</span>
                    <span class="badge ${p.status === 'approved' ? 'badge-success' : 'badge-warning'}">${p.status}</span>
                    ${p.reported ? '<span class="badge badge-danger">⚠ Reported</span>' : ''}
                </div>
            </div>
            <div style="display:flex;gap:0.5rem;">
                ${p.status === 'pending' ? `<button class="btn btn-primary btn-sm" onclick="approveProblem(${p.id})">✅ Approve</button>` : ''}
                <button class="btn btn-ghost btn-sm" onclick="reviewProblem(${p.id})">📝 Review</button>
                <button class="btn btn-danger btn-sm" onclick="removeProblem(${p.id})">🗑️ Remove</button>
            </div>
        </div>
    `).join('');
}

function reviewProblem(id) {
    const p = moderationItems.find(x => x.id === id);
    if (!p) return;
    showModal(`📝 Review: ${p.title}`, `
        <div style="display:grid;gap:1rem;">
            <div class="glass-card" style="padding:1rem;">
                <div style="display:flex;gap:0.5rem;margin-bottom:0.75rem;">
                    <span class="badge badge-accent">${p.domain}</span>
                    <span class="badge badge-primary">${p.company}</span>
                    <span class="badge ${p.status === 'approved' ? 'badge-success' : 'badge-warning'}">${p.status}</span>
                    ${p.reported ? '<span class="badge badge-danger">⚠ Reported</span>' : ''}
                </div>
                <p style="color:var(--text-secondary);line-height:1.7;">${p.desc}</p>
            </div>
            <div class="form-group">
                <label class="form-label">Admin Notes</label>
                <textarea class="form-textarea" placeholder="Add review notes..." style="min-height:80px;"></textarea>
            </div>
            <div style="display:flex;gap:0.75rem;">
                ${p.status === 'pending' ? `<button class="btn btn-primary" onclick="approveProblem(${p.id});closeModal()" style="flex:1;">✅ Approve</button>` : ''}
                <button class="btn btn-danger" onclick="removeProblem(${p.id});closeModal()" style="flex:1;">🗑️ Remove</button>
                <button class="btn btn-ghost" onclick="closeModal()" style="flex:1;">Cancel</button>
            </div>
        </div>
    `);
}

function approveProblem(id) {
    const p = moderationItems.find(x => x.id === id);
    if (p) { p.status = 'approved'; p.reported = false; }
    renderModeration();
    toast.success('Problem approved and published!');
}

function removeProblem(id) {
    moderationItems = moderationItems.filter(x => x.id !== id);
    renderModeration();
    toast.warning('Problem removed from platform.');
}

// ---- Analytics Charts ----
function initAnalyticsCharts() {
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

    const domCtx = document.getElementById('domainChart');
    if (domCtx) {
        new Chart(domCtx, {
            type: 'doughnut',
            data: {
                labels: ['Web Dev', 'ML/AI', 'Data Science', 'DevOps', 'Mobile', 'Security'],
                datasets: [{ data: [35, 25, 18, 10, 8, 4], backgroundColor: ['#6366f1', '#0ea5e9', '#22c55e', '#f59e0b', '#ec4899', '#ef4444'], borderWidth: 0, hoverOffset: 8 }]
            },
            options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', padding: 15, font: { size: 11 } } } } }
        });
    }

    const engCtx = document.getElementById('engagementChart');
    if (engCtx) {
        new Chart(engCtx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Active Users', data: [180, 220, 260, 240, 280, 150, 120],
                    backgroundColor: 'rgba(99,102,241,0.5)', borderColor: '#6366f1', borderWidth: 1, borderRadius: 6
                }, {
                    label: 'Submissions', data: [15, 22, 28, 18, 32, 12, 8],
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

    const funCtx = document.getElementById('funnelChart');
    if (funCtx) {
        new Chart(funCtx, {
            type: 'bar',
            data: {
                labels: ['Applied', 'Shortlisted', 'Interviewed', 'Offered', 'Hired'],
                datasets: [{ data: [1240, 320, 85, 28, 12], backgroundColor: ['rgba(99,102,241,0.6)', 'rgba(14,165,233,0.6)', 'rgba(139,92,246,0.6)', 'rgba(34,197,94,0.6)', 'rgba(245,158,11,0.6)'], borderWidth: 0, borderRadius: 6 }]
            },
            options: {
                indexAxis: 'y', responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { color: 'rgba(148,163,184,0.08)' }, ticks: { color: '#64748b' } },
                    y: { grid: { display: false }, ticks: { color: '#94a3b8', font: { weight: 600 } } }
                }
            }
        });
    }
}

// ---- College Placement Report ----
const placementData = [
    { id: 1, name: 'Divya Nair', university: 'Anna University', skillDNA: 95, solved: 14, hiredBy: 'Google', role: 'Frontend Engineer', package: '₹28 LPA', status: 'placed', avatar: 'divya', domain: 'frontend', email: 'divya@student.edu', skills: ['React', 'TypeScript', 'Next.js', 'GraphQL'] },
    { id: 2, name: 'Keerthiram G R', university: 'VIT University', skillDNA: 92, solved: 12, hiredBy: 'Microsoft', role: 'Full Stack Dev', package: '₹24 LPA', status: 'placed', avatar: 'keerthiram', domain: 'web', email: 'keerthiram@student.edu', skills: ['React', 'Node.js', 'Python', 'SQL'] },
    { id: 3, name: 'Arun Kumar', university: 'IIT Madras', skillDNA: 88, solved: 10, hiredBy: 'Amazon', role: 'ML Engineer', package: '₹22 LPA', status: 'placed', avatar: 'arun', domain: 'ml', email: 'arun@student.edu', skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL'] },
    { id: 4, name: 'Sneha Patel', university: 'NIT Trichy', skillDNA: 85, solved: 9, hiredBy: 'Flipkart', role: 'Backend Dev', package: '₹18 LPA', status: 'placed', avatar: 'sneha', domain: 'backend', email: 'sneha@student.edu', skills: ['Java', 'Spring Boot', 'Docker', 'AWS'] },
    { id: 5, name: 'Meera Iyer', university: 'IIIT Hyderabad', skillDNA: 90, solved: 11, hiredBy: 'Adobe', role: 'Full Stack Dev', package: '₹20 LPA', status: 'placed', avatar: 'meera', domain: 'web', email: 'meera@student.edu', skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'] },
    { id: 6, name: 'Vikram Singh', university: 'BITS Pilani', skillDNA: 79, solved: 7, hiredBy: '-', role: '-', package: '-', status: 'interviewing', avatar: 'vikram', domain: 'backend', email: 'vikram@student.edu', skills: ['C++', 'Go', 'System Design', 'Rust'] },
    { id: 7, name: 'Pradeep Raj', university: 'SRM University', skillDNA: 82, solved: 8, hiredBy: 'Infosys', role: 'Python Dev', package: '₹12 LPA', status: 'placed', avatar: 'pradeep', domain: 'backend', email: 'pradeep@student.edu', skills: ['Python', 'Django', 'PostgreSQL', 'Redis'] },
    { id: 8, name: 'Arjun Reddy', university: 'Osmania University', skillDNA: 76, solved: 5, hiredBy: '-', role: '-', package: '-', status: 'searching', avatar: 'arjun', domain: 'web', email: 'arjun@student.edu', skills: ['Python', 'Flask', 'SQL', 'HTML'] },
    { id: 9, name: 'Kavya Menon', university: 'NIT Calicut', skillDNA: 87, solved: 10, hiredBy: 'Razorpay', role: 'DevOps Engineer', package: '₹19 LPA', status: 'placed', avatar: 'kavya', domain: 'devops', email: 'kavya@student.edu', skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform'] },
    { id: 10, name: 'Rohit Verma', university: 'VIT University', skillDNA: 83, solved: 8, hiredBy: 'Zomato', role: 'Frontend Dev', package: '₹16 LPA', status: 'placed', avatar: 'rohit', domain: 'frontend', email: 'rohit@student.edu', skills: ['React', 'Vue.js', 'CSS', 'JavaScript'] },
];

function renderPlacementReport() {
    const placed = placementData.filter(s => s.status === 'placed');
    const interviewing = placementData.filter(s => s.status === 'interviewing');
    const avgPkg = placed.reduce((sum, s) => sum + parseInt(s.package.replace(/[^0-9]/g, '') || 0), 0) / (placed.length || 1);

    // Stats
    const statsEl = document.getElementById('placementStats');
    if (statsEl) {
        statsEl.innerHTML = `
            <div class="stat-card"><div class="stat-card-icon" style="background:linear-gradient(135deg,rgba(34,197,94,0.2),rgba(22,163,74,0.2));color:var(--success-400);"><i data-lucide="check-circle"></i></div><div class="stat-card-value">${placed.length}</div><div class="stat-card-label">Students Placed</div><div class="stat-card-change positive">${Math.round(placed.length / placementData.length * 100)}% rate</div></div>
            <div class="stat-card"><div class="stat-card-icon" style="background:linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.2));color:var(--primary-400);"><i data-lucide="indian-rupee"></i></div><div class="stat-card-value">₹${avgPkg} LPA</div><div class="stat-card-label">Avg Package</div><div class="stat-card-change positive">↑ 15% vs last year</div></div>
            <div class="stat-card"><div class="stat-card-icon" style="background:linear-gradient(135deg,rgba(14,165,233,0.2),rgba(59,130,246,0.2));color:var(--accent-400);"><i data-lucide="building-2"></i></div><div class="stat-card-value">${new Set(placed.map(s => s.hiredBy)).size}</div><div class="stat-card-label">Companies Hiring</div><div class="stat-card-change positive">↑ 3 new</div></div>
            <div class="stat-card"><div class="stat-card-icon" style="background:linear-gradient(135deg,rgba(245,158,11,0.2),rgba(239,68,68,0.2));color:var(--warning-400);"><i data-lucide="clock"></i></div><div class="stat-card-value">${interviewing.length}</div><div class="stat-card-label">In Interviews</div><div class="stat-card-change">Pipeline active</div></div>
        `;
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // Table
    const tbody = document.getElementById('placementTable');
    if (tbody) {
        tbody.innerHTML = placementData.map(s => `
            <tr style="cursor:pointer;" onclick="viewPlacementProfile(${s.id})">
                <td style="display:flex;align-items:center;gap:0.75rem;">
                    <img class="avatar avatar-sm" src="https://api.dicebear.com/7.x/avataaars/svg?seed=${s.avatar}" alt="">
                    <div><div style="font-weight:600;">${s.name}</div><div style="font-size:0.75rem;color:var(--text-tertiary);">${s.email}</div></div>
                </td>
                <td style="color:var(--text-secondary);">${s.university}</td>
                <td><span style="font-weight:700;color:${s.skillDNA >= 90 ? 'var(--success-400)' : s.skillDNA >= 80 ? 'var(--primary-400)' : 'var(--warning-400)'};">${s.skillDNA}%</span></td>
                <td style="font-weight:600;">${s.solved}</td>
                <td>${s.hiredBy !== '-' ? `<span style="font-weight:600;color:var(--accent-400);">${s.hiredBy}</span>` : '<span style="color:var(--text-tertiary);">—</span>'}</td>
                <td><span class="badge ${s.status === 'placed' ? 'badge-success' : s.status === 'interviewing' ? 'badge-warning' : 'badge-primary'}">${s.status}</span></td>
            </tr>
        `).join('');
    }
}

function viewPlacementProfile(id) {
    const s = placementData.find(x => x.id === id);
    if (!s) return;
    showModal(`🎓 ${s.name} — Placement Profile`, `
        <div style="text-align:center;margin-bottom:1.5rem;">
            <img class="avatar" src="https://api.dicebear.com/7.x/avataaars/svg?seed=${s.avatar}" alt="" style="width:72px;height:72px;margin:0 auto 0.75rem;">
            <h3 style="font-weight:700;">${s.name}</h3>
            <p style="color:var(--text-secondary);">${s.university}</p>
            <div style="display:flex;gap:0.5rem;justify-content:center;margin-top:0.5rem;">
                <span class="badge ${s.status === 'placed' ? 'badge-success' : s.status === 'interviewing' ? 'badge-warning' : 'badge-primary'}">${s.status}</span>
                <span class="badge badge-primary">Skill DNA: ${s.skillDNA}%</span>
            </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;">
            <div class="glass-card" style="padding:1rem;text-align:center;">
                <div style="font-size:0.7rem;color:var(--text-tertiary);text-transform:uppercase;">Problems Solved</div>
                <div style="font-size:1.5rem;font-weight:800;color:var(--primary-400);margin-top:0.25rem;">${s.solved}</div>
            </div>
            <div class="glass-card" style="padding:1rem;text-align:center;">
                <div style="font-size:0.7rem;color:var(--text-tertiary);text-transform:uppercase;">Domain</div>
                <div style="font-weight:700;margin-top:0.25rem;text-transform:capitalize;">${s.domain}</div>
            </div>
            ${s.status === 'placed' ? `
            <div class="glass-card" style="padding:1rem;text-align:center;">
                <div style="font-size:0.7rem;color:var(--text-tertiary);text-transform:uppercase;">Hired By</div>
                <div style="font-weight:700;color:var(--accent-400);margin-top:0.25rem;">${s.hiredBy}</div>
            </div>
            <div class="glass-card" style="padding:1rem;text-align:center;">
                <div style="font-size:0.7rem;color:var(--text-tertiary);text-transform:uppercase;">Package</div>
                <div style="font-weight:800;color:var(--success-400);margin-top:0.25rem;">${s.package}</div>
            </div>` : ''}
        </div>
        <div class="glass-card" style="padding:1rem;margin-bottom:1rem;">
            <div style="font-size:0.7rem;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:0.5rem;">Skills</div>
            <div style="display:flex;flex-wrap:wrap;gap:0.35rem;">${s.skills.map(sk => `<span class="badge badge-accent">${sk}</span>`).join('')}</div>
        </div>
        ${s.status === 'placed' ? `<div class="glass-card" style="padding:1rem;">
            <div style="font-size:0.7rem;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:0.5rem;">Role</div>
            <div style="font-weight:700;">${s.role} at ${s.hiredBy}</div>
        </div>` : ''}
    `);
}

function initPlacementCharts() {
    const domCtx = document.getElementById('placementDomainChart');
    if (domCtx) {
        new Chart(domCtx, {
            type: 'bar',
            data: {
                labels: ['Web Dev', 'ML/AI', 'Backend', 'Frontend', 'DevOps'],
                datasets: [{
                    label: 'Placed', data: [3, 1, 2, 2, 1],
                    backgroundColor: 'rgba(34,197,94,0.6)', borderRadius: 6, borderWidth: 0
                }, {
                    label: 'Interviewing', data: [0, 0, 1, 0, 0],
                    backgroundColor: 'rgba(245,158,11,0.6)', borderRadius: 6, borderWidth: 0
                }, {
                    label: 'Searching', data: [1, 0, 0, 0, 0],
                    backgroundColor: 'rgba(239,68,68,0.4)', borderRadius: 6, borderWidth: 0
                }]
            },
            options: {
                responsive: true, plugins: { legend: { labels: { color: '#94a3b8' } } },
                scales: {
                    x: { stacked: true, grid: { display: false }, ticks: { color: '#64748b' } },
                    y: { stacked: true, grid: { color: 'rgba(148,163,184,0.08)' }, ticks: { color: '#64748b', stepSize: 1 } }
                }
            }
        });
    }

    const monthCtx = document.getElementById('monthlyPlacementChart');
    if (monthCtx) {
        new Chart(monthCtx, {
            type: 'line',
            data: {
                labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
                datasets: [{
                    label: 'Placements', data: [0, 1, 2, 3, 5, 7, 8],
                    borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)', fill: true, tension: 0.4, borderWidth: 2, pointRadius: 4
                }, {
                    label: 'Interviews', data: [2, 4, 6, 8, 10, 12, 11],
                    borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.05)', fill: true, tension: 0.4, borderWidth: 2, pointRadius: 4
                }]
            },
            options: {
                responsive: true, plugins: { legend: { labels: { color: '#94a3b8' } } },
                scales: {
                    x: { grid: { color: 'rgba(148,163,184,0.08)' }, ticks: { color: '#64748b' } },
                    y: { grid: { color: 'rgba(148,163,184,0.08)' }, ticks: { color: '#64748b', stepSize: 2 } }
                }
            }
        });
    }
}

function exportPlacementReport() {
    toast.success('📥 Placement report exported as PDF!');
}

// ---- Student Leaderboard ----
const leaderboardData = [
    { rank: 1, name: 'Divya Nair', university: 'Anna University', skillDNA: 95, solved: 14, avgScore: 94, streak: 22, domain: 'frontend', avatar: 'divya', skills: ['React', 'TypeScript', 'Next.js', 'GraphQL'], badges: ['🥇 Top Scorer', '🔥 22-Day Streak', '⭐ All-Star'], improvement: '+18%', hiredBy: 'Google' },
    { rank: 2, name: 'Keerthiram G R', university: 'VIT University', skillDNA: 92, solved: 12, avgScore: 91, streak: 15, domain: 'web', avatar: 'keerthiram', skills: ['React', 'Node.js', 'Python', 'SQL'], badges: ['🥈 Runner Up', '🔥 15-Day Streak', '💡 Innovator'], improvement: '+12%', hiredBy: 'Microsoft' },
    { rank: 3, name: 'Meera Iyer', university: 'IIIT Hyderabad', skillDNA: 90, solved: 11, avgScore: 89, streak: 18, domain: 'web', avatar: 'meera', skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'], badges: ['🥉 3rd Place', '🔥 18-Day Streak'], improvement: '+14%', hiredBy: 'Adobe' },
    { rank: 4, name: 'Arun Kumar', university: 'IIT Madras', skillDNA: 88, solved: 10, avgScore: 87, streak: 12, domain: 'ml', avatar: 'arun', skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL'], badges: ['🧠 ML Wizard', '📊 Data Master'], improvement: '+8%', hiredBy: 'Amazon' },
    { rank: 5, name: 'Kavya Menon', university: 'NIT Calicut', skillDNA: 87, solved: 10, avgScore: 86, streak: 10, domain: 'devops', avatar: 'kavya', skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform'], badges: ['☁️ Cloud Pro', '🔧 DevOps Star'], improvement: '+11%', hiredBy: 'Razorpay' },
    { rank: 6, name: 'Sneha Patel', university: 'NIT Trichy', skillDNA: 85, solved: 9, avgScore: 84, streak: 8, domain: 'backend', avatar: 'sneha', skills: ['Java', 'Spring Boot', 'Docker', 'AWS'], badges: ['⚙️ Backend Beast'], improvement: '+15%', hiredBy: 'Flipkart' },
    { rank: 7, name: 'Rohit Verma', university: 'VIT University', skillDNA: 83, solved: 8, avgScore: 82, streak: 7, domain: 'frontend', avatar: 'rohit', skills: ['React', 'Vue.js', 'CSS', 'JavaScript'], badges: ['🎨 UI Artist'], improvement: '+10%', hiredBy: 'Zomato' },
    { rank: 8, name: 'Pradeep Raj', university: 'SRM University', skillDNA: 82, solved: 8, avgScore: 80, streak: 6, domain: 'backend', avatar: 'pradeep', skills: ['Python', 'Django', 'PostgreSQL', 'Redis'], badges: ['🐍 Pythonista'], improvement: '+9%', hiredBy: 'Infosys' },
    { rank: 9, name: 'Vikram Singh', university: 'BITS Pilani', skillDNA: 79, solved: 7, avgScore: 78, streak: 5, domain: 'backend', avatar: 'vikram', skills: ['C++', 'Go', 'System Design', 'Rust'], badges: ['🏗️ System Designer'], improvement: '+6%', hiredBy: '-' },
    { rank: 10, name: 'Arjun Reddy', university: 'Osmania University', skillDNA: 76, solved: 5, avgScore: 74, streak: 3, domain: 'web', avatar: 'arjun', skills: ['Python', 'Flask', 'SQL', 'HTML'], badges: ['🌱 Rising Star'], improvement: '+5%', hiredBy: '-' },
];

function renderLeaderboard() {
    const domainFilter = document.getElementById('leaderDomainFilter')?.value || 'all';
    const uniFilter = document.getElementById('leaderUniFilter')?.value || 'all';

    let filtered = leaderboardData;
    if (domainFilter !== 'all') filtered = filtered.filter(s => s.domain === domainFilter);
    if (uniFilter !== 'all') filtered = filtered.filter(s => s.university.includes(uniFilter));

    const list = document.getElementById('leaderboardList');
    if (!list) return;

    if (filtered.length === 0) {
        list.innerHTML = '<div class="glass-card" style="text-align:center;padding:3rem;"><p style="color:var(--text-secondary);">No students match the selected filters.</p></div>';
        return;
    }

    list.innerHTML = filtered.map((s, i) => {
        const rankColors = ['linear-gradient(135deg,#FFD700,#FFA500)', 'linear-gradient(135deg,#C0C0C0,#A0A0A0)', 'linear-gradient(135deg,#CD7F32,#B8860B)'];
        const rankBg = i < 3 ? rankColors[i] : 'var(--bg-tertiary)';
        const rankColor = i < 3 ? '#000' : 'var(--text-secondary)';

        return `
        <div class="glass-card" style="display:flex;align-items:center;gap:1.5rem;padding:1.25rem 1.5rem;${i < 3 ? 'border:1px solid rgba(255,215,0,0.15);' : ''}" onclick="viewLeaderProfile(${s.rank})" role="button" tabindex="0">
            <div style="width:52px;height:52px;border-radius:50%;background:${rankBg};display:flex;align-items:center;justify-content:center;font-weight:900;font-family:'Space Grotesk',sans-serif;color:${rankColor};font-size:1.1rem;flex-shrink:0;">#${s.rank}</div>
            <img class="avatar" src="https://api.dicebear.com/7.x/avataaars/svg?seed=${s.avatar}" alt="" style="flex-shrink:0;">
            <div style="flex:1;min-width:0;">
                <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;">
                    <h4 style="font-weight:700;">${s.name}</h4>
                    ${s.hiredBy !== '-' ? `<span class="badge badge-success" style="font-size:0.65rem;">✅ ${s.hiredBy}</span>` : ''}
                </div>
                <p style="font-size:0.8rem;color:var(--text-tertiary);margin:0.15rem 0 0.35rem;">${s.university}</p>
                <div style="display:flex;gap:0.35rem;flex-wrap:wrap;">
                    ${s.skills.slice(0, 4).map(sk => `<span style="padding:0.1rem 0.45rem;border-radius:var(--border-radius-full);font-size:0.65rem;background:rgba(99,102,241,0.1);color:var(--primary-300);">${sk}</span>`).join('')}
                </div>
            </div>
            <div style="display:flex;align-items:center;gap:2rem;flex-shrink:0;">
                <div style="text-align:center;">
                    <div style="font-size:0.65rem;color:var(--text-tertiary);text-transform:uppercase;">Solved</div>
                    <div style="font-weight:800;font-size:1.1rem;font-family:'Space Grotesk',sans-serif;">${s.solved}</div>
                </div>
                <div style="text-align:center;">
                    <div style="font-size:0.65rem;color:var(--text-tertiary);text-transform:uppercase;">Avg Score</div>
                    <div style="font-weight:800;font-size:1.1rem;font-family:'Space Grotesk',sans-serif;color:var(--accent-400);">${s.avgScore}%</div>
                </div>
                <div style="text-align:center;">
                    <div style="font-size:0.65rem;color:var(--text-tertiary);text-transform:uppercase;">Skill DNA</div>
                    <div style="font-weight:800;font-size:1.5rem;font-family:'Space Grotesk',sans-serif;color:var(--primary-400);">${s.skillDNA}%</div>
                </div>
                <div style="text-align:center;">
                    <div style="font-size:0.65rem;color:var(--text-tertiary);text-transform:uppercase;">Growth</div>
                    <div style="font-weight:700;color:var(--success-400);">${s.improvement}</div>
                </div>
            </div>
        </div>`;
    }).join('');
}

function viewLeaderProfile(rank) {
    const s = leaderboardData.find(x => x.rank === rank);
    if (!s) return;
    showModal(`🏆 #${s.rank} — ${s.name}`, `
        <div style="text-align:center;margin-bottom:1.5rem;">
            <img class="avatar" src="https://api.dicebear.com/7.x/avataaars/svg?seed=${s.avatar}" alt="" style="width:80px;height:80px;margin:0 auto 0.75rem;">
            <h3 style="font-weight:700;font-size:1.15rem;">${s.name}</h3>
            <p style="color:var(--text-secondary);">${s.university}</p>
            <div style="display:flex;gap:0.5rem;justify-content:center;margin-top:0.5rem;flex-wrap:wrap;">
                ${s.badges.map(b => `<span class="badge badge-primary" style="font-size:0.75rem;">${b}</span>`).join('')}
            </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.75rem;margin-bottom:1rem;">
            <div class="glass-card" style="padding:0.75rem;text-align:center;">
                <div style="font-size:0.65rem;color:var(--text-tertiary);text-transform:uppercase;">Skill DNA</div>
                <div style="font-size:1.25rem;font-weight:800;color:var(--primary-400);">${s.skillDNA}%</div>
            </div>
            <div class="glass-card" style="padding:0.75rem;text-align:center;">
                <div style="font-size:0.65rem;color:var(--text-tertiary);text-transform:uppercase;">Solved</div>
                <div style="font-size:1.25rem;font-weight:800;">${s.solved}</div>
            </div>
            <div class="glass-card" style="padding:0.75rem;text-align:center;">
                <div style="font-size:0.65rem;color:var(--text-tertiary);text-transform:uppercase;">Avg Score</div>
                <div style="font-size:1.25rem;font-weight:800;color:var(--accent-400);">${s.avgScore}%</div>
            </div>
            <div class="glass-card" style="padding:0.75rem;text-align:center;">
                <div style="font-size:0.65rem;color:var(--text-tertiary);text-transform:uppercase;">Streak</div>
                <div style="font-size:1.25rem;font-weight:800;color:var(--warning-400);">🔥 ${s.streak}d</div>
            </div>
        </div>
        <div class="glass-card" style="padding:1rem;margin-bottom:1rem;">
            <div style="font-size:0.7rem;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:0.75rem;">Skill Breakdown</div>
            ${['Problem Solving', 'Code Quality', 'Speed', 'Creativity', 'Documentation'].map((label, i) => {
        const val = Math.max(s.skillDNA - 10 + Math.floor(Math.random() * 15), 60);
        return `<div style="margin-bottom:0.6rem;">
                    <div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:0.2rem;"><span>${label}</span><span style="font-weight:700;">${val}%</span></div>
                    <div style="height:6px;background:var(--bg-tertiary);border-radius:3px;"><div style="height:100%;width:${val}%;background:var(--gradient-primary);border-radius:3px;"></div></div>
                </div>`;
    }).join('')}
        </div>
        <div class="glass-card" style="padding:1rem;margin-bottom:1rem;">
            <div style="font-size:0.7rem;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:0.5rem;">Top Skills</div>
            <div style="display:flex;flex-wrap:wrap;gap:0.35rem;">${s.skills.map(sk => `<span class="badge badge-accent">${sk}</span>`).join('')}</div>
        </div>
        ${s.hiredBy !== '-' ? `<div class="glass-card" style="padding:1rem;border-left:3px solid var(--success-400);">
            <div style="font-size:0.7rem;color:var(--text-tertiary);text-transform:uppercase;margin-bottom:0.25rem;">Placement</div>
            <div style="font-weight:700;color:var(--success-400);">✅ Hired by ${s.hiredBy}</div>
        </div>` : `<div class="glass-card" style="padding:1rem;border-left:3px solid var(--warning-400);">
            <div style="font-weight:700;color:var(--warning-400);">🔍 Actively looking for opportunities</div>
        </div>`}
    `);
}

function exportLeaderboard() {
    toast.success('📥 Leaderboard exported as CSV!');
}

// ---- Initialize ----
document.addEventListener('DOMContentLoaded', () => {
    renderApprovals();
    renderUsers();
    renderModeration();
    initAnalyticsCharts();
    renderPlacementReport();
    initPlacementCharts();
    renderLeaderboard();

    const user = SessionManager.getUser();
    if (user) {
        const nameEl = document.getElementById('userName');
        if (nameEl) nameEl.textContent = user.name || 'Admin';
    }
});

