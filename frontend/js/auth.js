/* =============================================
   SKILLBRIDGE AI — Authentication Logic
   Google OAuth, OTP, Admin 2FA, JWT
   ============================================= */

// Google OAuth Client ID — set in CONFIG
const GOOGLE_CLIENT_ID = '832944078664-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com';

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
    initGoogleSignIn();
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

// ---- Google Sign-In (Google Identity Services) ----
function initGoogleSignIn() {
    // Check if Google Identity Services SDK loaded
    if (typeof google !== 'undefined' && google.accounts) {
        google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
        });
    }
}

// Called when Google returns a credential
function handleGoogleCredentialResponse(response) {
    if (!response.credential) {
        toast.error('Google sign-in failed. Please try again.');
        return;
    }

    showLoading();

    // Decode the JWT to get user info
    const payload = decodeJwtPayload(response.credential);

    const googleUser = {
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        sub: payload.sub // Google unique ID
    };

    authState.googleUser = googleUser;
    authState.googleToken = response.credential;

    // Try to authenticate with backend
    authenticateWithBackend(googleUser, response.credential);
}

// Decode Google JWT payload (base64)
function decodeJwtPayload(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64).split('').map(c =>
                '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            ).join('')
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        return {};
    }
}

async function authenticateWithBackend(googleUser, credential) {
    try {
        const response = await api.post('/auth/google', {
            token: credential,
            role: authState.role,
            name: googleUser.name,
            email: googleUser.email,
            picture: googleUser.picture,
            google_id: googleUser.sub
        });

        hideLoading();
        showStatus(`Welcome, ${googleUser.name}!`, 'success');

        // Route based on role
        if (authState.role === 'recruiter') {
            proceedToRecruiterVerification();
        } else if (authState.role === 'admin') {
            proceedToAdminVerification();
        } else {
            completeAuth(response);
        }
    } catch (error) {
        hideLoading();
        // Backend not available — proceed in demo mode with real Google user data
        showStatus(`Welcome, ${googleUser.name}! (Demo Mode)`, 'success');

        if (authState.role === 'recruiter') {
            proceedToRecruiterVerification();
        } else if (authState.role === 'admin') {
            proceedToAdminVerification();
        } else {
            completeAuthDemo();
        }
    }
}

// Triggered by the Google button click (either real Google or fallback)
function handleGoogleLogin() {
    // Try using Google Identity Services popup
    if (typeof google !== 'undefined' && google.accounts) {
        google.accounts.id.prompt((notification) => {
            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                // Google One Tap not available — fallback to redirect flow
                googlePopupFallback();
            }
        });
    } else {
        // Google SDK not loaded — fallback to demo mode
        googlePopupFallback();
    }
}

function googlePopupFallback() {
    // Use Google OAuth 2.0 implicit flow as fallback
    if (GOOGLE_CLIENT_ID && !GOOGLE_CLIENT_ID.includes('xxxx')) {
        // Real client ID — use OAuth popup
        const redirectUri = window.location.origin + '/login.html';
        const scope = 'email profile openid';
        const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${encodeURIComponent(scope)}&prompt=select_account`;

        // Open popup
        const popup = window.open(oauthUrl, 'googleAuth', 'width=500,height=600,menubar=no,toolbar=no');

        // Listen for redirect
        const checkClosed = setInterval(() => {
            if (popup && popup.closed) {
                clearInterval(checkClosed);
            }
        }, 500);
    } else {
        // No real client ID — use demo mode
        demoGoogleLogin();
    }
}

// Demo mode fallback when no Google Client ID is configured
function demoGoogleLogin() {
    const demoUsers = {
        student: { name: 'Keerthiram G R', email: 'keerthiram@student.edu', picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=keerthiram' },
        recruiter: { name: 'Priya Sharma', email: 'recruiter@techcorp.com', picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya' },
        admin: { name: 'Admin SkillBridge', email: 'admin@skillbridge.ai', picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin' }
    };

    const mockUser = demoUsers[authState.role] || demoUsers.student;
    mockUser.sub = 'google-uid-' + Date.now();

    showLoading();

    setTimeout(() => {
        authState.googleUser = mockUser;
        authState.googleToken = 'demo-google-token';
        hideLoading();
        showStatus(`Welcome, ${mockUser.name}! (Demo Mode)`, 'success');

        if (authState.role === 'recruiter') {
            proceedToRecruiterVerification();
        } else if (authState.role === 'admin') {
            proceedToAdminVerification();
        } else {
            completeAuthDemo();
        }
    }, 1200);
}

// Handle OAuth redirect (check URL hash for access_token)
function checkOAuthRedirect() {
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        if (accessToken) {
            // Clear hash
            history.replaceState(null, '', window.location.pathname + window.location.search);
            // Fetch user info from Google
            fetchGoogleUserInfo(accessToken);
        }
    }
}

async function fetchGoogleUserInfo(accessToken) {
    showLoading();
    try {
        const res = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        const userInfo = await res.json();

        const googleUser = {
            name: userInfo.name,
            email: userInfo.email,
            picture: userInfo.picture,
            sub: userInfo.id
        };

        authState.googleUser = googleUser;
        authState.googleToken = accessToken;

        authenticateWithBackend(googleUser, accessToken);
    } catch (error) {
        hideLoading();
        toast.error('Failed to get Google user info. Please try again.');
    }
}

// Check for OAuth redirect on page load
window.addEventListener('load', () => {
    checkOAuthRedirect();
});

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
    // Demo mode — create session with Google user data
    const mockToken = 'demo-jwt-' + Date.now();
    const user = authState.googleUser || {
        name: 'Demo User',
        email: 'demo@skillbridge.ai',
        picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=skillbridge',
        role: authState.role
    };

    SessionManager.setToken(mockToken);
    SessionManager.setUser({ ...user, role: authState.role });
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
