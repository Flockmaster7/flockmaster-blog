import { HeaderNavType } from '@/types';

export const navLinkList: HeaderNavType[] = [
	{
		title: '首页',
		src: '/home',
		name: '',
		icon: 'fengche'
	},
	{
		title: '归档',
		src: '/pigeonhole',
		name: '',
		icon: 'fengche'
	},
	{
		title: '标签',
		src: '/tag',
		name: '',
		icon: 'fengche'
	},
	{
		title: '作品',
		src: '/work',
		name: '',
		icon: 'fengche'
	},
	{
		title: '留言',
		src: '/leaveWord',
		name: '',
		icon: 'fengche'
	}
	// {
	// 	title: '关于',
	// 	src: '/about',
	// 	name: ''
	// }
];

export const mobileNav: HeaderNavType[] = [
	{
		title: '首页',
		src: '/home',
		name: '',
		icon: 'home'
	},
	{
		title: '个人',
		src: '/my',
		name: '',
		icon: 'my'
	},
	{
		title: '归档',
		src: '/pigeonhole',
		name: '',
		icon: 'guidang'
	},
	{
		title: '标签',
		src: '/tag',
		name: '',
		icon: 'tag'
	},
	{
		title: '作品',
		src: '/work',
		name: '',
		icon: 'work'
	},
	{
		title: '留言',
		src: '/leaveWord',
		name: '',
		icon: 'liuyan'
	},
	{
		title: '设置',
		src: '/settings',
		name: '',
		icon: 'shezhi'
	},
	{
		title: '退出',
		type: 'logout',
		src: '/leaveWord',
		name: '',
		icon: 'logout'
	}
];
