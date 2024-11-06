import axios from 'axios';

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validatePassword = (password) => {
    // const minLength = 8;
    // const hasUpperCase = /[A-Z]/.test(password);
    // const hasLowerCase = /[a-z]/.test(password);
    // const hasNumbers = /\d/.test(password);

    // return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers;
    return true;
};

export const handleLoginRequest = async (credentials) => {
    try {
        const response = await axios.post('/api/login', credentials);

        // Store the token in localStorage
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            // Set axios default header for future requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }

        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        console.error('Login error:', error.response?.data?.message || error.message);
        throw error;
    }
};

export const handleRegisterRequest = async (userData) => {
    try {
        const response = await axios.post('/api/register', userData);
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        console.error('Registration error:', error.response?.data?.message || error.message);
        throw error;
    }
};

export const handleLogoutRequest = async () => {
    try {
        await axios.post('/api/logout');
        // Clear token from localStorage
        localStorage.removeItem('token');
        // Remove axios default header
        delete axios.defaults.headers.common['Authorization'];

        return {
            success: true
        };
    } catch (error) {
        console.error('Logout error:', error.response?.data?.message || error.message);
        throw error;
    }
};
