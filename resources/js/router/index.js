import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

// Layouts & Components
import DashboardLayout from '../layouts/DashboardLayout.vue';
import LoginComponent from '../components/LoginComponent.vue';
import DashboardComponent from '../components/DashboardComponent.vue';
// Lazy-loaded components
const GroupsIndex = () => import('../components/groups/IndexComponent.vue');
const GroupCreate = () => import('../components/groups/CreateComponent.vue');
const GroupMembers = () => import('../components/groups/MembersComponent.vue');
const MealsIndex = () => import('../components/meals/IndexComponent.vue');
const MealCalculator = () => import('../components/meals/CalculatorComponent.vue');
const MealHistory = () => import('../components/meals/HistoryComponent.vue');
const FinanceExpenses = () => import('../components/finance/ExpensesComponent.vue');
const FinancePayments = () => import('../components/finance/PaymentsComponent.vue');
const FinanceReports = () => import('../components/finance/ReportsComponent.vue');
const Settings = () => import('../components/settings/IndexComponent.vue');
const Support = () => import('../components/support/IndexComponent.vue');

const routes = [
    {
        path: '/login',
        name: 'login',
        component: LoginComponent,
        meta: { requiresGuest: true }
    },
    // Protected Routes Wrapper
    {
        path: '/',
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: DashboardComponent,
                meta: { title: 'Dashboard' }
            },
            {
                path: 'groups',
                name: 'groups',
                component: GroupsIndex,
                meta: { title: 'Groups' }
            },
            // Add meta titles for all routes
            {
                path: 'finance/expenses',
                name: 'finance.expenses',
                component: FinanceExpenses,
                meta: { title: 'Expenses' }
            },
            {
                path: 'finance/payments',
                name: 'finance.payments',
                component: FinancePayments,
                meta: { title: 'Payments' }
            },
            {
                path: 'finance/reports',
                name: 'finance.reports',
                component: FinanceReports,
                meta: { title: 'Monthly Reports' }
            }
        ]
    },
    // Catch-all route for 404
    {
        path: '/:pathMatch(.*)*',
        redirect: '/dashboard'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Global Navigation Guard
router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const requiresGuest = to.matched.some(record => record.meta.requiresGuest);

    // If route requires authentication
    if (requiresAuth) {
        if (!authStore.isAuthenticated) {
            try {
                await authStore.fetchUser();
                next();
            } catch (error) {
                next('/login');
            }
        } else {
            next();
        }
    }
    // If route requires guest access (like login page)
    else if (requiresGuest) {
        if (authStore.isAuthenticated) {
            next('/dashboard');
        } else {
            next();
        }
    }
    // Public routes
    else {
        next();
    }
});

export default router;
