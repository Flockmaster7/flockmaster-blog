export const imgEnvironment = import.meta.env.VITE_MODE_NAME;

export const ADMIN = 'ADMIN';

export const DIANZAN_LEAVEWORD = 'FLOCKMASTER-DIANZAN_LEAVEWORD';

export const ACTIVENAV = 'FLOCKMASTER-ACTIVENAV';

export const DARK = 'FLOCKMASTER-DARK';

export const HASVISIT = 'HASVISIT';

export const DIANZANPYQ = 1;

export const PINGLUNPYQ = 2;

export const defaultUserInfo = {
	id: -1,
	user_name: '游客',
	is_admin: false,
	name: '游客',
	description: '这个人很懒，什么都没有留下',
	user_image:
		'https://ggkt-atguigu-1313888024.cos.ap-guangzhou.myqcloud.com/flockmaster-blogs/images/ed37644d426c7bcd4f9ca5c00.png',
	user_focus: 0,
	user_fans: 0
};
