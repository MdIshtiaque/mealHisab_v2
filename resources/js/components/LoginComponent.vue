<template>
    <div class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
            <!-- Back Button -->
            <!-- <div class="absolute top-4 left-4">
                <a href="#" class="text-secondary hover:text-secondary-dark transition-colors">
                    <i class="fas fa-arrow-left"></i> Back
                </a>
            </div> -->

            <!-- Header -->
            <div>
                <h2 class="mt-6 text-center text-3xl font-extrabold text-primary-dark">
                    Welcome Back!
                </h2>
                <p class="mt-2 text-center text-sm text-gray-600">
                    Or
                    <router-link
                        to="/register"
                        class="font-medium text-secondary hover:text-secondary-dark transition-colors"
                    >
                        create a new account
                    </router-link>
                </p>
            </div>

            <!-- Login Form -->
            <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
                <div class="rounded-md shadow-sm space-y-4">
                    <div>
                        <label for="email" class="sr-only">Email address</label>
                        <input
                            id="email"
                            ref="emailInput"
                            v-model="email"
                            name="email"
                            type="email"
                            required
                            class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                            :class="{ 'border-red-500': errors.email }"
                            placeholder="Email address"
                        >
                        <div v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</div>
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input
                            id="password"
                            ref="passwordInput"
                            v-model="password"
                            name="password"
                            type="password"
                            required
                            class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                            :class="{ 'border-red-500': errors.password }"
                            placeholder="Password"
                        >
                        <div v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</div>
                    </div>
                </div>

                <!-- General error message -->
                <div v-if="errors.general" class="text-red-500 text-sm text-center">
                    {{ errors.general }}
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input id="remember-me" v-model="rememberMe" name="remember-me" type="checkbox"
                            class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded">
                        <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                    </div>

                    <div class="text-sm">
                        <a href="#" class="font-medium text-secondary hover:text-secondary-dark transition-colors">
                            Forgot your password?
                        </a>
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <i class="fas fa-lock text-primary-light group-hover:text-primary-light/90"></i>
                        </span>
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { validateEmail, validatePassword } from '../utils/validation';
import { handleLoginRequest } from '../services/auth.service';

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const errors = ref({});
const emailInput = ref(null);
const passwordInput = ref(null);
const router = useRouter();

const clearErrors = () => {
    errors.value = {};
    if (emailInput.value) emailInput.value.classList.remove('border-red-500');
    if (passwordInput.value) passwordInput.value.classList.remove('border-red-500');
};

const validateForm = () => {
    clearErrors();
    let isValid = true;

    if (!validateEmail(email.value)) {
        errors.value.email = 'Please enter a valid email address';
        if (emailInput.value) emailInput.value.classList.add('border-red-500');
        isValid = false;
    }

    if (!validatePassword(password.value)) {
        errors.value.password = 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number';
        if (passwordInput.value) passwordInput.value.classList.add('border-red-500');
        isValid = false;
    }

    return isValid;
};

const handleSubmit = async () => {
    if (!validateForm()) {
        return;
    }

    try {
        const response = await handleLoginRequest({
            email: email.value,
            password: password.value,
            remember: rememberMe.value
        });

        if (response.success) {
            // Redirect to dashboard (you can change this route as needed)
            router.push('/dashboard');
        }
    } catch (error) {
        console.error('Login failed:', error);
        errors.value.general = 'Login failed. Please try again.';
    }
};
</script>

<style scoped>
.error-message {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}
</style>
