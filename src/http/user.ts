import request from './index';
import type {
	LoginRes,
	UpdateUserFrom,
	AdminInfo,
	Blog,
	UserForm,
	UserInfo
} from '@/types/index.d.ts';
import type { HttpResponse, PageRequest } from '@/types/http.d.ts';

/**
 * 登录
 * @param data 表单
 * @returns LoginResType
 */
export const login = (data: Required<UserForm>) => {
	return request<HttpResponse<LoginRes>>({
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
export const register = (data: Required<UserForm>) => {
	return request<HttpResponse<Readonly<UserInfo>>>({
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
export const updatePassword = (data: Required<UserForm>) => {
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
	return request<HttpResponse<Required<UserInfo>>>({
		url: '/users/getUserInfo',
		method: 'GET'
	});
};

/**
 * 修改用户信息
 * @param data 信息表单
 * @returns GetUserInfoResType
 */
export const updateUserInfo = (data: Partial<UpdateUserFrom>) => {
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
	return request<HttpResponse<PageRequest<Required<UserInfo>>>>({
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
	return request<HttpResponse<PageRequest<Required<UserInfo>>>>({
		url: `/users/getUserFans/${pageNum}/${pageSize}`,
		method: 'GET'
	});
};

/**
 * 关注用户
 * @param user_id
 * @returns
 */
export const followUser = (user_id: number) => {
	return request<HttpResponse<string>>({
		url: `/users/follow/${user_id}`,
		method: 'POST'
	});
};

/**
 * 取消关注用户
 * @param user_id
 * @returns
 */
export const cancelFollowUser = (user_id: number) => {
	return request<HttpResponse<string>>({
		url: `/users/unfollow/${user_id}`,
		method: 'POST'
	});
};

/**
 * 是否关注用户
 * @param follow_id 用户id
 * @returns
 */
export const isFollow = (follow_id: number) => {
	return request<HttpResponse<boolean>>({
		url: `/users/isFollow/${follow_id}`,
		method: 'GET'
	});
};

/**
 * 获取管理员信息
 * @returns AdminInfoType
 */
export const adminInfo = () => {
	return request<HttpResponse<AdminInfo>>({
		url: `/users/admin`,
		method: 'GET'
	});
};

/**
 * 获取用户收藏文章列表
 * @param pageNum
 * @param pageSize
 * @returns
 */
export const getCollectList = (pageNum: number, pageSize: number) => {
	return request<HttpResponse<PageRequest<Partial<Blog>>>>({
		url: `/blog/getUserCollectList/${pageNum}/${pageSize}`,
		method: 'GET'
	});
};

/**
 * 获取用户收藏文章列表
 * @param pageNum
 * @param pageSize
 * @returns
 */
export const getLikeList = (pageNum: number, pageSize: number) => {
	return request<HttpResponse<PageRequest<Partial<Blog>>>>({
		url: `/blog/getUserLikeList/${pageNum}/${pageSize}`,
		method: 'GET'
	});
};
