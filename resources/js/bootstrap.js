import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Configure axios to include CSRF token and credentials
window.axios.defaults.withCredentials = true;
window.axios.defaults.headers.common['X-XSRF-TOKEN'] = decodeURIComponent(
    document.cookie.match(/XSRF-TOKEN=([\w-]+)/)?.[1] || ''
);

// Add token to requests if it exists
const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Add response interceptor to handle 401 responses
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
