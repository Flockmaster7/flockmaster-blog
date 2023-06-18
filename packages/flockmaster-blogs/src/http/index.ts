import axios, {
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig
} from 'axios';
import cache from '@/utils/cache';
import { useRouter } from 'vue-router';
import type { HttpResponse } from '@/types/http.d.ts';
import { isLogin, redirectToLogin } from '@/utils/login';
import { ElLoading, ElMessage } from 'element-plus';

let loadingInstance: any = null;

const baseUrl = '/api';

const instance = axios.create({
	baseURL: baseUrl,
	timeout: 5000
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
	// loadingInstance = ElLoading.service({
	// 	lock: true,
	// 	text: '努力加载中',
	// 	background: 'rgba(0, 0, 0, 0.3)'
	// });
	if (isLogin()) {
		config.headers.Authorization = cache.getCache('TOKEN');
	}
	//  else {
	// 	redirectToLogin('/login');
	// }
	return config;
});

instance.interceptors.response.use(
	(res: AxiosResponse<HttpResponse, any>): any => {
		// loadingInstance.close();
		return res;
	},
	(err) => {
		if (!err.response) {
			return Promise.reject('网络错误');
		}
		if (err.response.data.code === '401') {
			ElMessage.error('登录状态已过期，请重新登录');
			redirectToLogin('/login');
			return Promise.reject('token已过期');
		}
		redirectToLogin('/login');
		console.log(err);
		return Promise.reject(err);
	}
);

export default instance;
