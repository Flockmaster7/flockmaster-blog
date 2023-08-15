import axios, {
	AxiosError,
	AxiosResponse,
	InternalAxiosRequestConfig
} from 'axios';
import cache from '@/utils/cache';
import type { HttpError, HttpResponse } from '@/types/http.d.ts';
import { clearInfo, isLogin } from '@/utils/login';
import { ElMessageBox } from 'element-plus';
import router from '@/router';

const baseUrl = '/api';
// const baseUrl = '/';

const instance = axios.create({
	baseURL: baseUrl,
	timeout: 5000
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
	if (isLogin()) {
		config.headers = cache.getCache('TOKEN');
	}
	return config;
});

instance.interceptors.response.use(
	(res: AxiosResponse<HttpResponse, any>): any => {
		return res;
	},
	(err: AxiosError<HttpError>) => {
		const code = err.response?.data.code;
		if (!err.response) {
			return Promise.reject('网络错误');
		}
		// 登录权限控制
		if (code === '10102') {
			ElMessageBox.confirm(
				'此内容需要登录才可操作，是否登录',
				'Warning',
				{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}
			).then(() => {
				// 跳转到登录页
				router.push({
					path: '/login',
					query: { from: router.currentRoute.value.fullPath }
				});
			});
		}
		// token过期判断
		if (code === '401') {
			ElMessageBox.confirm('登录状态已过期，是否重新登录', 'Warning', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					// 跳转到登录页
					router.push({
						path: '/login',
						query: { from: router.currentRoute.value.fullPath }
					});
					return Promise.reject('token已过期');
				})
				.finally(() => {
					clearInfo();
				});
		}
		return Promise.reject(err.response.data);
	}
);

export default instance;
