import request from '../index';
import type {
	UserLoginForm,
	LoginResType,
	UserRegisterForm,
	RegisterResType,
	UserUpdatePasswordForm,
	UpdateUserInfoFrom,
	GetUserInfoResType
} from '@/types/index.d.ts';
import type { HttpResponse, PageRequest } from '@/types/http.d.ts';

/**
 * 登录
 * @param data 表单
 * @returns LoginResType
 */
export const login = (data: UserLoginForm) => {
	return request<HttpResponse<LoginResType>>({
		url: '/users/login',
		method: 'POST',
		data
	});
};

/**
 * 注册
 * @param data 表单
 * @returns RegisterResType
 */
export const register = (data: UserRegisterForm) => {
	return request<HttpResponse<RegisterResType>>({
		url: '/users/register',
		method: 'POST',
		data
	});
};

/**
 * 修改密码
 * @param data 表单
 * @returns string
 */
export const updatePassword = (data: UserUpdatePasswordForm) => {
	return request<HttpResponse<string>>({
		url: '/users/updatepwd',
		method: 'POST',
		data
	});
};

/**
 * 获取用户信息
 * @returns string
 */
export const getUserInfo = () => {
	return request<HttpResponse<GetUserInfoResType>>({
		url: '/users/getUserInfo',
		method: 'GET'
	});
};

/**
 * 修改用户信息
 * @param data 信息表单
 * @returns GetUserInfoResType
 */
export const updateUserInfo = (data: UpdateUserInfoFrom) => {
	return request<HttpResponse<string>>({
		url: '/users/updateUserInfo',
		method: 'POST',
		data
	});
};

/**
 * 获取用户关注列表
 * @param pageNum
 * @param pageSize
 * @returns
 */
export const getFollowList = (pageNum: number, pageSize: number) => {
	return request<HttpResponse<PageRequest<GetUserInfoResType>>>({
		url: `/users/getUserFollow/${pageNum}/${pageSize}`,
		method: 'GET'
	});
};

/**
 * 获取用户粉丝列表
 * @param pageNum
 * @param pageSize
 * @returns
 */
export const getFansList = (pageNum: number, pageSize: number) => {
	return request<HttpResponse<PageRequest<GetUserInfoResType>>>({
		url: `/users/getUserFollow/${pageNum}/${pageSize}`,
		method: 'GET'
	});
};
