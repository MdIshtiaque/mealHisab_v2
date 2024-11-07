<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Mobile Navigation Bar (Bottom) -->
        <nav class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-soft-xl">
            <div class="flex justify-around items-center h-16">
                <router-link to="/dashboard" class="text-primary flex flex-col items-center">
                    <i class="fas fa-home text-xl"></i>
                    <span class="text-xs mt-1">Home</span>
                </router-link>
                <router-link to="/groups" class="text-gray-500 hover:text-primary flex flex-col items-center transition-colors duration-200">
                    <i class="fas fa-users-rectangle text-xl"></i>
                    <span class="text-xs mt-1">Groups</span>
                </router-link>
                <router-link to="/meals" class="text-gray-500 hover:text-primary flex flex-col items-center transition-colors duration-200">
                    <i class="fas fa-utensils text-xl"></i>
                    <span class="text-xs mt-1">Meals</span>
                </router-link>
                <router-link to="/finance" class="text-gray-500 hover:text-primary flex flex-col items-center transition-colors duration-200">
                    <i class="fas fa-wallet text-xl"></i>
                    <span class="text-xs mt-1">Finance</span>
                </router-link>
            </div>
        </nav>

        <!-- Desktop Sidebar -->
        <aside class="hidden lg:flex lg:flex-col fixed left-0 top-0 bottom-0 w-64 bg-white shadow-soft-xl">
            <div class="p-6 border-b border-gray-200">
                <h1 class="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    MealProject
                </h1>
            </div>
            <nav class="flex-1 overflow-y-auto p-4">
                <div class="space-y-1">
                    <!-- Navigation sections here -->
                    <SidebarSection title="Main Menu" :items="mainMenuItems" />
                    <SidebarSection title="Group Management" :items="groupItems" />
                    <SidebarSection title="Meal Management" :items="mealItems" />
                    <SidebarSection title="Financial" :items="financialItems" />
                    <SidebarSection title="Other" :items="otherItems" />
                </div>
            </nav>

            <!-- Profile Section -->
            <div class="p-4 m-4 gradient-border">
                <div class="flex items-center space-x-3">
                    <img :src="userAvatarUrl"
                         :alt="authStore.user?.name"
                         class="w-10 h-10 rounded-full ring-2 ring-primary/30">
                    <div class="flex-1">
                        <p class="font-medium text-gray-900">{{ authStore.user?.name || 'Loading...' }}</p>
                        <p class="text-sm text-gray-500">{{ authStore.user?.email || 'Loading...' }}</p>
                    </div>
                    <button @click="handleLogout" class="text-gray-500 hover:text-primary transition-colors duration-200">
                        <i class="fas fa-sign-out-alt text-xl"></i>
                    </button>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="lg:ml-64 pb-16 lg:pb-0">
            <!-- Top Navigation -->
            <header class="bg-white shadow-soft-xl">
                <div class="flex justify-between items-center p-4 max-w-7xl mx-auto">
                    <div class="lg:hidden">
                        <h1 class="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            MealProject
                        </h1>
                    </div>
                    <div class="hidden lg:block">
                        <h2 class="text-2xl font-semibold text-gray-800">{{ pageTitle }}</h2>
                    </div>
                    <div class="flex items-center space-x-4">
                        <button class="relative text-gray-500 hover:text-primary transition-colors duration-200">
                            <i class="fas fa-bell text-xl"></i>
                            <span class="absolute -top-1 -right-1 h-4 w-4 bg-danger rounded-full flex items-center justify-center text-white text-xs">
                                {{ notificationCount }}
                            </span>
                        </button>
                        <button @click="handleLogout" class="lg:hidden text-gray-500 hover:text-primary transition-colors duration-200">
                            <i class="fas fa-sign-out-alt text-xl"></i>
                        </button>
                    </div>
                </div>
            </header>

            <!-- Page Content -->
            <div class="p-6">
                <router-view></router-view>
            </div>
        </main>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SidebarSection from '../components/dashboard/SidebarSection.vue';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const route = useRoute();

// Props
const props = defineProps({
    notificationCount: {
        type: Number,
        default: 0
    }
});

// Computed
const userAvatarUrl = computed(() => {
    const name = encodeURIComponent(authStore.user?.name || 'User');
    return `https://ui-avatars.com/api/?name=${name}&background=22C55E&color=fff`;
});

// Fetch user data when component mounts
onMounted(async () => {
    if (!authStore.user?.id) {
        await authStore.fetchUser();
    }
});

// Methods
const handleLogout = async () => {
    try {
        await authStore.logout();
        router.push('/login');
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

// Navigation items
const mainMenuItems = [
    { icon: 'fa-home', text: 'Dashboard', route: '/dashboard' }
];

const groupItems = [
    { icon: 'fa-users-rectangle', text: 'All Groups', route: '/groups' },
    { icon: 'fa-user-group', text: 'Manage Members', route: '/groups/members' }
];

const mealItems = [
    { icon: 'fa-utensils', text: 'Daily Meals', route: '/meals' },
    { icon: 'fa-calculator', text: 'Meal Calculator', route: '/meals/calculator' },
    { icon: 'fa-clock-rotate-left', text: 'Meal History', route: '/meals/history' }
];

const financialItems = [
    { icon: 'fa-wallet', text: 'Expenses', route: '/finance/expenses' },
    { icon: 'fa-money-bill-transfer', text: 'Payments', route: '/finance/payments' },
    { icon: 'fa-file-invoice-dollar', text: 'Monthly Reports', route: '/finance/reports' }
];

const otherItems = [
    { icon: 'fa-gear', text: 'Settings', route: '/settings' },
    { icon: 'fa-circle-question', text: 'Help & Support', route: '/support' }
];

const pageTitle = computed(() => route.meta.title || 'Dashboard');
</script>
<style scoped>
.gradient-border {
    position: relative;
    background: linear-gradient(white, white) padding-box,
                linear-gradient(to right, #4ADE80, #3B82F6) border-box;
    border: 2px solid transparent;
    border-radius: 0.75rem;
}
</style>
