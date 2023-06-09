// 登录提交表单
export interface UserLoginForm {
	user_name: string;
	password: string;
}

// 登录接口
export interface LoginResType {
	token: string;
}

// 注册提交表单
export interface UserRegisterForm {
	user_name: string;
	password: string;
}

// 注册接口
export interface RegisterResType {
	createdAt: string;
	id: number;
	is_admin: boolean;
	updatedAt: string;
	user_name: string;
}

// 修改密码表单
export interface UserUpdatePasswordForm {
	user_name: string;
	password: string;
}

// 修改信息表单
export interface UpdateUserInfoFrom {
	name?: string;
	description?: string;
	isAdmin?: boolean;
}

// 修改信息接口
export interface GetUserInfoResType {
	id: number;
	user_name: string;
	is_admin: boolean;
	name: string;
	description: string;
}
