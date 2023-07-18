export const routers = [
	{
		path: '/',
		redirect: '/home'
	},
	{
		path: '/home',
		name: 'Layout',
		component: () => import('@/components/layout/layout.vue'),
		children: [
			{
				path: '/main',
				name: 'Main',
				component: () => import('@/components/layout/main.vue'),
				children: [
					{
						path: '/home',
						name: 'Home',
						component: () => import('@/pages/home/index.vue')
					},
					{
						path: '/show',
						name: 'Show',
						component: () => import('@/pages/show/index.vue')
					},
					{
						path: '/work',
						name: 'Work',
						component: () => import('@/pages/work/index.vue')
					},
					{
						path: '/service',
						name: 'Service',
						component: () => import('@/pages/service/index.vue')
					},
					{
						path: '/about',
						name: 'About',
						component: () => import('@/pages/about/index.vue')
					},
					{
						path: '/pigeonhole',
						name: 'Pigeonhole',
						component: () => import('@/pages/pigeonhole/index.vue')
					},
					{
						path: '/tag',
						name: 'Tag',
						component: () => import('@/pages/tag/index.vue')
					},
					{
						path: '/leaveWord',
						name: 'LeaveWord',
						component: () => import('@/pages/leaveWord/index.vue')
					},
					{
						path: '/blog/detail',
						name: 'Detail',
						component: () => import('@/pages/blog/index.vue')
					},
					{
						path: '/searchResult',
						name: 'SearchResult',
						component: () =>
							import('@/pages/searchResult/index.vue')
					}
				]
			},
			{
				path: '/login',
				name: 'Login',
				component: () => import('@/pages/login/index.vue')
			},
			{
				path: '/my',
				name: 'My',
				component: () => import('@/pages/my/index.vue')
			},
			{
				path: '/search',
				name: 'Search',
				component: () => import('@/pages/search/index.vue')
			}
			// {
			// 	path: '/blog/detail',
			// 	name: 'Detail',
			// 	component: () => import('@/pages/blog/index.vue')
			// }
		]
	}
];
