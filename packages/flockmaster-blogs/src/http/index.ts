import axios, {
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig
} from 'axios';
import cache from '@/utils/cache';
import { useRouter } from 'vue-router';
import type { HttpResponse } from '@/types/http.d.ts';

const router = useRouter();
const redirectToLogin = (path: string) => {
	cache.removeCache('TOKEN');
	router.replace({
		path: path
	});
};

const baseUrl = '/api';

const instance = axios.create({
	baseURL: baseUrl,
	timeout: 5000
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
	if (cache.getCache('TOKEN')) {
		config.headers.Authorization = cache.getCache('TOKEN');
	}
	//  else {
	// 	redirectToLogin('/login');
	// }
	return config;
});

instance.interceptors.response.use(
	(res: AxiosResponse<HttpResponse, any>): any => {
		return res;
	},
	(err) => {
		// if (!err.response) {
		// 	return Promise.reject('网络错误');
		// }
		// return Promise.reject('密码错误');
		console.log(err);
		return Promise.reject(err);
	}
);

export default instance;
