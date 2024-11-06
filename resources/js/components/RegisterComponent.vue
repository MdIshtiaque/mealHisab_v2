<template>
    <div class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
            <!-- Back Button -->
            <div class="absolute top-4 left-4">
                <router-link to="/login" class="text-secondary hover:text-secondary-dark transition-colors">
                    <i class="fas fa-arrow-left"></i> Back
                </router-link>
            </div>

            <!-- Header -->
            <div>
                <h2 class="mt-6 text-center text-3xl font-extrabold text-primary-dark">
                    Join MealProject
                </h2>
                <p class="mt-2 text-center text-sm text-gray-600">
                    Or
                    <router-link
                        to="/login"
                        class="font-medium text-secondary hover:text-secondary-dark transition-colors"
                    >
                        sign in to existing account
                    </router-link>
                </p>
            </div>

            <!-- Registration Form -->
            <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
                <div class="rounded-md shadow-sm space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="firstName" class="sr-only">First Name</label>
                            <input
                                id="firstName"
                                ref="firstNameInput"
                                v-model="firstName"
                                name="firstName"
                                type="text"
                                required
                                class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                :class="{ 'border-red-500': errors.firstName }"
                                placeholder="First Name"
                            >
                            <div v-if="errors.firstName" class="text-red-500 text-sm mt-1">{{ errors.firstName }}</div>
                        </div>
                        <div>
                            <label for="lastName" class="sr-only">Last Name</label>
                            <input
                                id="lastName"
                                ref="lastNameInput"
                                v-model="lastName"
                                name="lastName"
                                type="text"
                                required
                                class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                :class="{ 'border-red-500': errors.lastName }"
                                placeholder="Last Name"
                            >
                            <div v-if="errors.lastName" class="text-red-500 text-sm mt-1">{{ errors.lastName }}</div>
                        </div>
                    </div>
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
                    <div>
                        <label for="confirmPassword" class="sr-only">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            ref="confirmPasswordInput"
                            v-model="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                            :class="{ 'border-red-500': errors.confirmPassword }"
                            placeholder="Confirm Password"
                        >
                        <div v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</div>
                    </div>
                </div>

                <div class="flex items-center">
                    <input id="terms" name="terms" type="checkbox" required
                        class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded">
                    <label for="terms" class="ml-2 block text-sm text-gray-900">
                        I agree to the
                        <a href="#" class="text-secondary hover:text-secondary-dark transition-colors">Terms and Conditions</a>
                    </label>
                </div>

                <div>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <i class="fas fa-user-plus text-primary-light group-hover:text-primary-light/90"></i>
                        </span>
                        Create Account
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
    import { handleRegisterRequest } from '../services/auth.service';

    const router = useRouter();
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const emailInput = ref(null);
    const passwordInput = ref(null);
    const confirmPasswordInput = ref(null);
    const errors = ref({});

    const clearErrors = () => {
        errors.value = {};
        if (emailInput.value) emailInput.value.classList.remove('border-red-500');
        if (passwordInput.value) passwordInput.value.classList.remove('border-red-500');
        if (confirmPasswordInput.value) confirmPasswordInput.value.classList.remove('border-red-500');
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

        if (password.value !== confirmPassword.value) {
            errors.value.confirmPassword = 'Passwords do not match';
            if (confirmPasswordInput.value) confirmPasswordInput.value.classList.add('border-red-500');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const response = await handleRegisterRequest({
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                password: password.value,
            });

            if (response.success) {
                // Redirect to login after successful registration
                router.push('/login');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            errors.value.general = 'Registration failed. Please try again.';
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
