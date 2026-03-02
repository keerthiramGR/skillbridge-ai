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
