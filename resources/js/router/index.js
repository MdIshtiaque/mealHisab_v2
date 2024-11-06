import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

// Layouts
import DashboardLayout from '../layouts/DashboardLayout.vue';

// Components
import DashboardComponent from '../components/DashboardComponent.vue';
import LoginComponent from '../components/LoginComponent.vue';

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

// Auth middleware
const requireAuth = async (to, from, next) => {
    const authStore = useAuthStore();
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
};

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/login',
        name: 'login',
        component: LoginComponent,
        meta: { title: 'Login' }
    },
    {
        path: '/dashboard',
        component: DashboardLayout,
        children: [
            {
                path: '',
                name: 'dashboard',
                component: DashboardComponent,
                meta: { title: 'Dashboard Overview' }
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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
