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

// 获取博客列表接口
export interface getBlogListResType {
	id: number;
	title: string;
	author: string;
	classify: string;
	content_html: string;
	content_text: string;
	createdAt: string;
	updatedAt: string;
}

// 获取博客列表表单
export interface GetBlogListForm {
	author?: string;
	title?: string;
	content_text?: string;
	order?: string;
	classify?: string;
}

// 获取博客详情接口
export interface GetBlogDetailResType {
	id: number;
	author: string;
	title: string;
	classify: string;
	content_text: string;
	content_html: string;
	createdAt: string;
	updatedAt: string;
}
