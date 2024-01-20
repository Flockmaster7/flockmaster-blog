// ? 全局默认配置项

// 首页地址（默认）
export const HOME_URL: string = '/home';

// 登录页地址（默认）
export const LOGIN_URL: string = '/login';

// 默认主题颜色
export const DEFAULT_PRIMARY: string = '#009688';

// 路由白名单地址（必须是本地存在的路由 staticRouter.ts 中）
export const ROUTER_WHITE_LIST: string[] = ['/500'];

// 高德地图 key
export const AMAP_MAP_KEY: string = '';

// 百度地图 key
export const BAIDU_MAP_KEY: string = '';

export const particleOption = {
	fpsLimit: 60,
	background: {
		color: '#fff'
	},
	fullScreen: {
		enable: true
	},
	particles: {
		number: {
			value: 50
		},
		color: {
			value: [
				'#3998D0',
				'#2EB6AF',
				'#A9BD33',
				'#FEC73B',
				'#F89930',
				'#F45623',
				'#D62E32',
				'#EB586E',
				'#9952CF'
			]
		},
		shape: {
			type: 'circle'
		},
		opacity: {
			value: 0.5
		},
		size: {
			value: 400,
			random: {
				enable: true,
				minimumValue: 200
			}
		},
		move: {
			enable: true,
			speed: 2,
			direction: 'top',
			outMode: 'destroy'
		}
	},
	interactivity: {
		detectsOn: 'canvas',
		events: {
			resize: true
		}
	},
	detectRetina: true,
	emitters: {
		direction: 'top',
		position: {
			x: 50,
			y: 120
		},
		rate: {
			delay: 0.2,
			quantity: 2
		},
		size: {
			width: 100,
			height: 0
		}
	}
};
