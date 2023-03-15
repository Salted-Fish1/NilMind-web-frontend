import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/welcome',
			name: 'welcome',
			component: async () => await import('@/views/Welcome/WelcomeView.vue'),
			children: [
				{
					path: '/sign-in',
					name: 'signIn',
					component: async () => await import('@/views/Welcome/WelcomeView.vue')
				},
				{
					path: '/sign-up',
					name: 'signUp',
					component: async () => await import('@/views/Welcome/WelcomeView.vue')
				}
			]
		}
	]
})

export default router
