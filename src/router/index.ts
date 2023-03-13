import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/welcome',
			name: 'welcome',
			component: async () => await import('@/views/welcome/WelcomeView.vue')
		},
		{
			path: '/sign-in',
			name: 'signIn',
			component: async () => await import('@/views/SignUp&In/SignPage.vue')
		}
	]
})

export default router
