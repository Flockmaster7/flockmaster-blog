import request from '../index';
import type {
	UserLoginForm,
	LoginResType,
	UserRegisterForm,
	RegisterResType,
	UserUpdatePasswordForm
} from '@/types/index.d.ts';
import type { HttpResponse } from '@/types/http.d.ts';

export const login = (data: UserLoginForm) => {
	return request<HttpResponse<LoginResType>>({
		url: '/users/login',
		method: 'POST',
		data
	});
};

export const register = (data: UserRegisterForm) => {
	return request<HttpResponse<RegisterResType>>({
		url: '/users/register',
		method: 'POST',
		data
	});
};

export const updatePassword = (data: UserUpdatePasswordForm) => {
	return request<HttpResponse<string>>({
		url: '/users/updatepwd',
		method: 'POST',
		data
	});
};
