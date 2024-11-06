export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
};

export const showError = (element, message) => {
    const parent = element.parentElement;
    const errorDiv = parent.querySelector('.error-message') || document.createElement('div');
    errorDiv.className = 'error-message text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    if (!parent.querySelector('.error-message')) {
        parent.appendChild(errorDiv);
    }
    element.classList.add('border-red-500');
};

export const clearError = (element) => {
    const parent = element.parentElement;
    const errorDiv = parent.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    element.classList.remove('border-red-500');
};
