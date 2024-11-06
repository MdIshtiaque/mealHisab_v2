import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
        isAuthenticated: false
    }),

    getters: {
        getUser: (state) => state.user,
        getToken: (state) => state.token,
        isLoggedIn: (state) => state.isAuthenticated
    },

    actions: {
        async login(credentials) {
            try {
                const response = await axios.post('/api/login', credentials);
                const { token, user } = response.data;

                this.token = token;
                this.user = user;
                this.isAuthenticated = true;

                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                return response;
            } catch (error) {
                throw error;
            }
        },

        async logout() {
            try {
                await axios.post('/api/logout');
            } catch (error) {
                console.error('Logout API error:', error);
            } finally {
                this.token = null;
                this.user = null;
                this.isAuthenticated = false;

                localStorage.removeItem('token');
                delete axios.defaults.headers.common['Authorization'];
            }
        },

        async fetchUser() {
            try {
                const response = await axios.get('/api/user');
                this.user = response.data;
                this.isAuthenticated = true;
                return response;
            } catch (error) {
                this.user = null;
                this.isAuthenticated = false;
                throw error;
            }
        },

        initializeAuth() {
            const token = localStorage.getItem('token');
            if (token) {
                this.token = token;
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                this.fetchUser();
            }
        }
    }
});
