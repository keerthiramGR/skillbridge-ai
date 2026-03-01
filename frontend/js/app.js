/* =============================================
   SKILLBRIDGE AI — Core Application Logic
   Theme toggle, role selection, utilities
   ============================================= */

// ---- Configuration ----
const CONFIG = {
    API_BASE_URL: 'http://localhost:8000',
    STORAGE_KEYS: {
        THEME: 'skillbridge_theme',
        TOKEN: 'skillbridge_token',
        USER: 'skillbridge_user',
        ROLE: 'skillbridge_role'
    }
};

// ---- Theme Management ----
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME) || 'dark';
        this.apply();
        this.bindToggle();
    }

    apply() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateIcon();
    }

    toggle() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, this.currentTheme);
        this.apply();
    }

    updateIcon() {
        const icon = document.getElementById('themeIcon');
        if (icon) {
            icon.setAttribute('data-lucide', this.currentTheme === 'dark' ? 'moon' : 'sun');
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
    }

    bindToggle() {
        const btn = document.getElementById('themeToggle');
        if (btn) btn.addEventListener('click', () => this.toggle());
    }
}

// ---- Toast Notifications ----
class ToastManager {
    constructor(containerId = 'toastContainer') {
        this.container = document.getElementById(containerId);
    }

    show(message, type = 'info', duration = 4000) {
        if (!this.container) return;
        const icons = { success: 'check-circle', error: 'x-circle', warning: 'alert-triangle', info: 'info' };
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i data-lucide="${icons[type] || 'info'}" style="width:20px;height:20px;flex-shrink:0;"></i>
            <span>${message}</span>
        `;
        this.container.appendChild(toast);
        if (typeof lucide !== 'undefined') lucide.createIcons();

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(30px)';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    success(msg) { this.show(msg, 'success'); }
    error(msg) { this.show(msg, 'error'); }
    warning(msg) { this.show(msg, 'warning'); }
    info(msg) { this.show(msg, 'info'); }
}

// ---- Role Selection ----
function selectRole(role) {
    localStorage.setItem(CONFIG.STORAGE_KEYS.ROLE, role);

    // Add selection animation
    const cards = document.querySelectorAll('.role-card');
    cards.forEach(card => {
        card.style.transition = 'all 0.4s ease';
        if (!card.classList.contains(role)) {
            card.style.opacity = '0.3';
            card.style.transform = 'scale(0.95)';
        } else {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 0 60px rgba(99,102,241,0.3)';
        }
    });

    // Navigate to login after animation
    setTimeout(() => {
        window.location.href = `login.html?role=${role}`;
    }, 500);
}

// ---- Session Management ----
class SessionManager {
    static getToken() {
        return localStorage.getItem(CONFIG.STORAGE_KEYS.TOKEN);
    }

    static setToken(token) {
        localStorage.setItem(CONFIG.STORAGE_KEYS.TOKEN, token);
    }

    static getUser() {
        const data = localStorage.getItem(CONFIG.STORAGE_KEYS.USER);
        return data ? JSON.parse(data) : null;
    }

    static setUser(user) {
        localStorage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(user));
    }

    static getRole() {
        return localStorage.getItem(CONFIG.STORAGE_KEYS.ROLE);
    }

    static isAuthenticated() {
        return !!this.getToken();
    }

    static logout() {
        localStorage.removeItem(CONFIG.STORAGE_KEYS.TOKEN);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.USER);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.ROLE);
        window.location.href = '/index.html';
    }

    static requireAuth(allowedRoles = []) {
        if (!this.isAuthenticated()) {
            window.location.href = '/index.html';
            return false;
        }
        if (allowedRoles.length > 0 && !allowedRoles.includes(this.getRole())) {
            window.location.href = '/index.html';
            return false;
        }
        return true;
    }
}

// ---- Tab System ----
function initTabs(containerSelector = '.tabs') {
    const tabContainers = document.querySelectorAll(containerSelector);
    tabContainers.forEach(container => {
        const buttons = container.querySelectorAll('.tab-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.tab;
                // Deactivate all
                buttons.forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
                // Activate target
                btn.classList.add('active');
                const panel = document.getElementById(target);
                if (panel) panel.classList.add('active');
            });
        });
    });
}

// ---- Mobile Sidebar Toggle ----
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) sidebar.classList.toggle('open');
}

// ---- Loading State ----
function showLoading() {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.id = 'loadingOverlay';
    overlay.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(overlay);
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.remove();
}

// ---- Utility Functions ----
function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });
}

function timeAgo(dateStr) {
    const seconds = Math.floor((new Date() - new Date(dateStr)) / 1000);
    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 }
    ];
    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count > 0) return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
    return 'just now';
}

function truncateText(text, maxLen = 100) {
    return text.length > maxLen ? text.substring(0, maxLen) + '...' : text;
}

function getDifficultyBadge(level) {
    const map = {
        'easy': 'badge-success',
        'medium': 'badge-warning',
        'hard': 'badge-danger',
        'expert': 'badge-primary'
    };
    return `<span class="badge ${map[level] || 'badge-primary'}">${level}</span>`;
}

// ---- Initialize ----
const themeManager = new ThemeManager();
const toast = new ToastManager();

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
});
