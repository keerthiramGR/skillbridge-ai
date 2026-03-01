/* =============================================
   SKILLBRIDGE AI — API Client
   Centralized HTTP client with auth headers
   ============================================= */

class APIClient {
    constructor(baseURL = null) {
        this.baseURL = baseURL || CONFIG.API_BASE_URL;
    }

    getHeaders() {
        const headers = { 'Content-Type': 'application/json' };
        const token = SessionManager.getToken();
        if (token) headers['Authorization'] = `Bearer ${token}`;
        return headers;
    }

    async request(method, endpoint, data = null, customHeaders = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const options = {
            method,
            headers: { ...this.getHeaders(), ...customHeaders }
        };

        if (data && method !== 'GET') {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, options);

            // Handle token expiration
            if (response.status === 401) {
                SessionManager.logout();
                throw new Error('Session expired. Please login again.');
            }

            if (response.status === 403) {
                throw new Error('Access denied. Insufficient permissions.');
            }

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.detail || result.message || `Request failed with status ${response.status}`);
            }

            return result;
        } catch (error) {
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Network error. Please check your connection and try again.');
            }
            throw error;
        }
    }

    async get(endpoint) {
        return this.request('GET', endpoint);
    }

    async post(endpoint, data) {
        return this.request('POST', endpoint, data);
    }

    async put(endpoint, data) {
        return this.request('PUT', endpoint, data);
    }

    async patch(endpoint, data) {
        return this.request('PATCH', endpoint, data);
    }

    async delete(endpoint) {
        return this.request('DELETE', endpoint);
    }

    async uploadFile(endpoint, formData) {
        const url = `${this.baseURL}${endpoint}`;
        const headers = {};
        const token = SessionManager.getToken();
        if (token) headers['Authorization'] = `Bearer ${token}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: formData
            });

            if (response.status === 401) {
                SessionManager.logout();
                throw new Error('Session expired.');
            }

            const result = await response.json();
            if (!response.ok) throw new Error(result.detail || 'Upload failed');
            return result;
        } catch (error) {
            if (error.name === 'TypeError') throw new Error('Network error during upload.');
            throw error;
        }
    }
}

// Global API client instance
const api = new APIClient();
