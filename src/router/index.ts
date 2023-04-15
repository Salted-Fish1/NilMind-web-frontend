import { createRouter, createWebHistory } from 'vue-router'
import { useMainProjectStore } from '@/stores/mainProject'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			redirect: '/welcome'
		},
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
		},
		{
			path: '/mind-map/:id',
			name: 'mindMap',
			component: async () => await import('@/views/MindMap/MindMapView.vue'),
			beforeEnter: async (to, from) => {
				const mainProjectStore = useMainProjectStore()
				console.log(to.params)

				if (typeof to.params.id === 'string') {
					if (to.params.id === 'new') {
						console.log('yes')
						await mainProjectStore.create()
					} else {
						await mainProjectStore.init(to.params.id)
					}
				}
				return true
			}
		},
		{
			path: '/shortcut',
			name: 'shortcut',
			component: async () => await import('@/views/ShortCut.vue')
		}
	]
})

export default router
