export function requireAuth(to, from, next) {
    if (!localStorage.getItem('token')) {
        next('/login');
    } else {
        next();
    }
}
