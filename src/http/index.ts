import axios, {
	AxiosError,
	AxiosResponse,
	InternalAxiosRequestConfig
} from 'axios';
import cache from '@/utils/cache';
import type { HttpError, HttpResponse } from '@/types/http.d.ts';
import { clearInfo, isLogin } from '@/utils/login';
import { ElMessage, ElMessageBox } from 'element-plus';
import router from '@/router';
import { AxiosCanceler } from './helper/axiosCancel';
import { checkStatus } from './helper/checkStatus';

const axiosCanceler = new AxiosCanceler();

const baseUrl = '/api';
// const baseUrl = '/';

const config = {
	baseURL: baseUrl,
	timeout: 10000
};

const instance = axios.create(config);

instance.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
	// * 将当前请求添加到 pending 中
	axiosCanceler.addPending(config);
	if (isLogin()) {
		config.headers.authorization = cache.getCache('TOKEN');
	}
	return config;
});

instance.interceptors.response.use(
	(res: AxiosResponse<HttpResponse, any>): any => {
		axiosCanceler.removePending(config);
		return res;
	},
	(err: AxiosError<HttpError>) => {
		if (!err.response && err.code !== 'ERR_CANCELED') {
			ElMessage.error('服务异常！');
			return Promise.reject(err);
		}
		const code = err.response?.data.code;
		if (err.message.indexOf('timeout') !== -1)
			ElMessage.error('请求超时，请稍后再试');
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
		else if (code === '10101') {
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
		// 根据响应的错误状态码，做不同的处理
		else if (err.response) checkStatus(err.response.status);
		return Promise.reject(err.response?.data);
	}
);

export default instance;
