// 登录提交表单
export interface UserLoginForm {
	user_name: string;
	password: string;
}

// 登录接口
export interface LoginResType {
	token: string;
}

export interface UserRegisterForm {
	user_name: string;
	password: string;
}

export interface RegisterResType {
	createdAt: string;
	id: number;
	is_admin: boolean;
	updatedAt: string;
	user_name: string;
}

export interface UserUpdatePasswordForm {
	user_name: string;
	password: string;
}
