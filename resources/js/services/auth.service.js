export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers;
};

export const handleLoginRequest = async (credentials) => {
    try {
        // Here you would make your API call to your backend
        // For now, we'll just simulate an API call
        console.log('Login credentials:', credentials);

        // Simulate API response
        return {
            success: true,
            message: 'Login successful'
        };
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const handleRegisterRequest = async (userData) => {
    try {
        // Here you would make your API call to your backend
        console.log('Registration data:', userData);

        // Simulate API response
        return {
            success: true,
            message: 'Registration successful'
        };
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};
