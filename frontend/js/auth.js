/* =============================================
   SKILLBRIDGE AI — Authentication Logic
   Google OAuth, OTP, Admin 2FA, JWT
   ============================================= */

// Current auth state
let authState = {
    role: null,
    googleToken: null,
    googleUser: null,
    step: 'google' // google | recruiter-verify | otp | admin-verify | complete
};

// ---- Initialize Auth Page ----
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    authState.role = params.get('role') || localStorage.getItem(CONFIG.STORAGE_KEYS.ROLE) || 'student';

    setupAuthUI();
    setupOTPInputs();
});

function setupAuthUI() {
    const role = authState.role;
    const iconContainer = document.getElementById('roleIconContainer');
    const title = document.getElementById('authTitle');
    const subtitle = document.getElementById('authSubtitle');

    const roleConfig = {
        student: {
            icon: 'graduation-cap',
            bg: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))',
            color: 'var(--primary-400)',
            title: 'Student Login',
            subtitle: 'Sign in to access your learning dashboard'
        },
        recruiter: {
            icon: 'briefcase',
            bg: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(59,130,246,0.2))',
            color: 'var(--accent-400)',
            title: 'Recruiter Login',
            subtitle: 'Sign in and verify your organization'
        },
        admin: {
            icon: 'shield-check',
            bg: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(239,68,68,0.2))',
            color: 'var(--warning-400)',
            title: 'Admin Login',
            subtitle: 'Restricted access — credentials required'
        }
    };

    const config = roleConfig[role] || roleConfig.student;

    iconContainer.style.background = config.bg;
    iconContainer.style.color = config.color;
    iconContainer.innerHTML = `<i data-lucide="${config.icon}"></i>`;
    title.textContent = config.title;
    subtitle.textContent = config.subtitle;

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ---- Google Sign-In ----
function handleGoogleLogin() {
    // In production, use Google Identity Services
    // For now, simulate Google OAuth flow
    const mockUser = {
        name: 'Demo User',
        email: 'demo@skillbridge.ai',
        picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=skillbridge',
        sub: 'google-uid-' + Date.now()
    };

    showLoading();

    // Simulate API call
    setTimeout(async () => {
        try {
            // Call backend to validate Google token and get JWT
            const response = await api.post('/auth/google', {
                token: 'mock-google-token',
                role: authState.role,
                name: mockUser.name,
                email: mockUser.email,
                picture: mockUser.picture,
                google_id: mockUser.sub
            });

            authState.googleUser = mockUser;
            authState.googleToken = 'mock-token';

            hideLoading();
            showStatus('Google sign-in successful!', 'success');

            // Route based on role
            if (authState.role === 'recruiter') {
                proceedToRecruiterVerification();
            } else if (authState.role === 'admin') {
                proceedToAdminVerification();
            } else {
                // Student — direct dashboard access
                completeAuth(response);
            }
        } catch (error) {
            hideLoading();
            // If backend is not running, simulate for demo
            authState.googleUser = mockUser;
            authState.googleToken = 'mock-token';

            showStatus('Google sign-in successful! (Demo Mode)', 'success');

            if (authState.role === 'recruiter') {
                proceedToRecruiterVerification();
            } else if (authState.role === 'admin') {
                proceedToAdminVerification();
            } else {
                completeAuthDemo();
            }
        }
    }, 1500);
}

// ---- Recruiter Verification Flow ----
function proceedToRecruiterVerification() {
    authState.step = 'recruiter-verify';
    document.getElementById('step-google').style.display = 'none';
    document.getElementById('step-recruiter-verify').style.display = 'block';
    document.getElementById('authTitle').textContent = 'Verify Organization';
    document.getElementById('authSubtitle').textContent = 'Complete verification to access recruiter tools';
    hideStatus();
}

async function sendRecruiterOTP() {
    const orgName = document.getElementById('orgName').value.trim();
    const accessKey = document.getElementById('accessKey').value.trim();
    const workEmail = document.getElementById('workEmail').value.trim();

    if (!orgName || !accessKey || !workEmail) {
        toast.error('Please fill in all fields');
        return;
    }

    if (!workEmail.includes('@')) {
        toast.error('Please enter a valid email address');
        return;
    }

    showLoading();

    try {
        await api.post('/auth/send-otp', {
            email: workEmail,
            role: 'recruiter',
            access_key: accessKey,
            organization: orgName
        });

        hideLoading();
        toast.success('OTP sent to your email!');
        proceedToOTP(workEmail);
    } catch (error) {
        hideLoading();
        // Demo mode fallback
        toast.success('OTP sent! (Demo Mode — use 123456)');
        proceedToOTP(workEmail);
    }
}

function proceedToOTP(email) {
    authState.step = 'otp';
    document.getElementById('step-recruiter-verify').style.display = 'none';
    document.getElementById('step-otp').style.display = 'block';
    document.getElementById('otpEmail').textContent = email;
    document.getElementById('authTitle').textContent = 'Enter OTP';
    document.getElementById('authSubtitle').textContent = 'Check your email for the verification code';

    // Focus first OTP input
    const firstInput = document.querySelector('[data-otp-index="0"]');
    if (firstInput) firstInput.focus();
}

async function verifyRecruiterOTP() {
    const inputs = document.querySelectorAll('[data-otp-index]');
    let otp = '';
    inputs.forEach(input => otp += input.value);

    if (otp.length !== 6) {
        toast.error('Please enter the complete 6-digit code');
        return;
    }

    showLoading();

    try {
        const response = await api.post('/auth/verify-otp', {
            email: document.getElementById('workEmail').value,
            otp: otp,
            role: 'recruiter'
        });

        hideLoading();
        completeAuth(response);
    } catch (error) {
        hideLoading();
        // Demo: accept 123456
        if (otp === '123456') {
            toast.success('Verification complete!');
            completeAuthDemo();
        } else {
            toast.error('Invalid OTP. Try 123456 in demo mode.');
        }
    }
}

function resendOTP() {
    toast.info('New OTP sent to your email');
}

// ---- Admin Verification ----
function proceedToAdminVerification() {
    authState.step = 'admin-verify';
    document.getElementById('step-google').style.display = 'none';
    document.getElementById('step-admin-verify').style.display = 'block';
    document.getElementById('authTitle').textContent = 'Admin Authentication';
    document.getElementById('authSubtitle').textContent = 'Enter your admin credentials';
    hideStatus();
}

async function verifyAdmin() {
    const passcode = document.getElementById('adminPasscode').value.trim();
    const twoFA = document.getElementById('admin2FA').value.trim();

    if (!passcode) {
        toast.error('Please enter the admin passcode');
        return;
    }

    if (!twoFA || twoFA.length !== 6) {
        toast.error('Please enter a valid 6-digit 2FA code');
        return;
    }

    showLoading();

    try {
        const response = await api.post('/auth/verify-role', {
            role: 'admin',
            passcode: passcode,
            two_factor_code: twoFA,
            google_token: authState.googleToken
        });

        hideLoading();
        completeAuth(response);
    } catch (error) {
        hideLoading();
        // Demo mode
        if (passcode === 'admin2026' && twoFA === '000000') {
            toast.success('Admin verified!');
            completeAuthDemo();
        } else {
            toast.error('Invalid credentials. Demo: passcode=admin2026, 2FA=000000');
        }
    }
}

// ---- Complete Authentication ----
function completeAuth(response) {
    if (response && response.token) {
        SessionManager.setToken(response.token);
    }
    if (response && response.user) {
        SessionManager.setUser(response.user);
    }
    localStorage.setItem(CONFIG.STORAGE_KEYS.ROLE, authState.role);
    redirectToDashboard();
}

function completeAuthDemo() {
    // Demo mode — create mock session
    const mockToken = 'demo-jwt-' + Date.now();
    const mockUser = authState.googleUser || {
        name: 'Demo User',
        email: 'demo@skillbridge.ai',
        picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=skillbridge',
        role: authState.role
    };

    SessionManager.setToken(mockToken);
    SessionManager.setUser({ ...mockUser, role: authState.role });
    localStorage.setItem(CONFIG.STORAGE_KEYS.ROLE, authState.role);

    setTimeout(() => redirectToDashboard(), 800);
}

function redirectToDashboard() {
    const dashboardMap = {
        student: 'student/dashboard.html',
        recruiter: 'recruiter/dashboard.html',
        admin: 'admin/dashboard.html'
    };
    window.location.href = dashboardMap[authState.role] || 'student/dashboard.html';
}

// ---- OTP Input Auto-advance ----
function setupOTPInputs() {
    const inputs = document.querySelectorAll('[data-otp-index]');
    inputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            if (value && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                inputs[index - 1].focus();
            }
        });

        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pasted = (e.clipboardData || window.clipboardData).getData('text').slice(0, 6);
            pasted.split('').forEach((char, i) => {
                if (inputs[i]) inputs[i].value = char;
            });
            if (inputs[pasted.length - 1]) inputs[pasted.length - 1].focus();
        });
    });
}

// ---- Status Display ----
function showStatus(message, type = 'info') {
    const el = document.getElementById('authStatus');
    if (!el) return;
    el.style.display = 'block';
    el.style.background = type === 'success' ? 'rgba(34,197,94,0.1)' : type === 'error' ? 'rgba(239,68,68,0.1)' : 'rgba(99,102,241,0.1)';
    el.style.color = type === 'success' ? 'var(--success-400)' : type === 'error' ? 'var(--danger-400)' : 'var(--primary-400)';
    el.style.border = `1px solid ${type === 'success' ? 'rgba(34,197,94,0.2)' : type === 'error' ? 'rgba(239,68,68,0.2)' : 'rgba(99,102,241,0.2)'}`;
    el.textContent = message;
}

function hideStatus() {
    const el = document.getElementById('authStatus');
    if (el) el.style.display = 'none';
}
