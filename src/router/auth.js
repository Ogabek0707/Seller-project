export default {
      path: '/',
      name: 'login',
      component: () => {
            return import("@/views/auth/Login.vue")
      },
}