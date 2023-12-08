export const routers = [
	{
		path: '/',
		name: 'Guide',
		component: () => import('@/pages/guide/index.vue')
	},
	{
		path: '/home',
		name: 'Main',
		component: () => import('@/newLayout/main/index.vue'),
		children: [
			// {
			// 	path: '/main',
			// 	name: 'Main',
			// 	component: () => import('@/newLayout/main/index.vue'),
			// 	children: [
			{
				path: '/home',
				name: 'Home',
				component: () => import('@/pages/home/index.vue')
			},
			{
				path: '/circleFriend',
				name: 'CircleFriend',
				component: () => import('@/pages/circleFriend/index.vue')
			},
			{
				path: '/settings',
				name: 'Settings',
				component: () => import('@/pages/settings/index.vue')
			},
			{
				path: '/work',
				name: 'Work',
				component: () => import('@/pages/work/index.vue')
			},
			{
				path: '/album',
				name: 'Album',
				component: () => import('@/pages/album/index.vue')
			},
			{
				path: '/photo',
				name: 'Photo',
				component: () => import('@/pages/photo/index.vue')
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
				path: '/tagDetail',
				name: 'TagDetail',
				component: () => import('@/pages/tag/tagDetail.vue')
			},
			{
				path: '/leaveWord',
				name: 'LeaveWord',
				component: () => import('@/pages/leaveWord/index.vue')
			},
			// {
			// 	path: '/blog/detail',
			// 	name: 'Detail',
			// 	component: () => import('@/pages/blog/index.vue')
			// },
			{
				path: '/searchResult',
				name: 'SearchResult',
				component: () => import('@/pages/searchResult/searchResult.vue')
			},
			{
				path: '/search',
				name: 'Search',
				component: () => import('@/pages/search/index.vue')
			}
		]
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/pages/login/login.vue')
	},
	{
		path: '/my',
		name: 'My',
		component: () => import('@/pages/my/index.vue'),
		meta: {
			loginRequest: true
		}
	},
	{
		path: '/blog/detail',
		name: 'Detail',
		component: () => import('@/pages/blog/index.vue'),
		meta: {
			isShowRight: true
		}
	},

	{
		path: '/visualize',
		name: 'Visualize',
		component: () => import('@/pages/dataVisualize/index.vue')
	}
];
