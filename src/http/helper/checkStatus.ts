import { HttpError } from '@/types/http';
import { AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = (response: AxiosResponse<HttpError>): void => {
	switch (response.status) {
		case 400:
			ElMessage.error('请求失败！请您稍后重试');
			break;
		case 401:
			ElMessage.error('登录失效！请您重新登录');
			break;
		case 403:
			ElMessage.error('当前账号无权限访问！');
			break;
		case 404:
			ElMessage.error('你所访问的资源不存在！');
			break;
		case 405:
			ElMessage.error('请求方式错误！请您稍后重试');
			break;
		case 408:
			ElMessage.error('请求超时！请您稍后重试');
			break;
		case 500:
			if (response && response.data && response.data.message) {
				ElMessage.error(response.data.message + '！');
			} else {
				ElMessage.error('服务器异常，请您稍后重试！');
			}
			break;
		case 502:
			ElMessage.error('网关错误！');
			break;
		case 503:
			ElMessage.error('服务不可用！');
			break;
		case 504:
			ElMessage.error('网关超时！');
			break;
		default:
			ElMessage.error('请求失败！');
	}
};
