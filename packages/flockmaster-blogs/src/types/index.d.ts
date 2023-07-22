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
	user_image: string;
	description: string;
	user_focus: number;
	user_fans: number;
}

// 获取博客列表接口
export interface getBlogListResType {
	id: number;
	title: string;
	author: string;
	blog_image: string;
	classify: string;
	content_html: string;
	content_text: string;
	blog_like: number;
	blog_collect: number;
	blog_read: number;
	tags: GetTagListResType[];
	createdAt: string;
	updatedAt: string;
}

// 获取博客列表表单
export interface GetBlogListForm {
	user_id?: number;
	author?: string;
	title?: string;
	content_text?: string;
	order?: string;
	classify?: string;
	tags?: number[];
	querySearch?: string;
}

// 获取博客详情接口
export interface GetBlogDetailResType {
	id: number;
	author: string;
	title: string;
	blog_image: string;
	classify: string;
	content_text: string;
	content_html: string;
	blog_like: number;
	blog_collect: number;
	blog_read: number;
	tags: GetTagListResType[];
	createdAt: string;
	updatedAt: string;
}

// 获取作品列表接口

export interface GetWorkListResType {
	id?: number;
	work_image: string;
	work_title: string;
	work_des: string;
	work_url: string;
	createdAt: string;
	updatedAt: string;
}

// 获取标签列表接口
export interface GetTagListResType {
	id: number;
	tag_name: string;
	tag_classify: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface HeaderNavType {
	title: string;
	src: string;
	name: string;
	icon: string;
	type?: string;
}

// 文章评论接口
export interface CommentParamsType {
	blog_id?: number;
	content: string;
	parent_id?: number;
	reply_to?: number;
}

export interface CommentType {
	id: number;
	content: string;
	parent_id: number | null;
	reply_to: number | null;
	user_id: number;
	blog_id: number;
	isDeleted: string;
	createdAt: string;
	updatedAt: string;
	user: GetUserInfoResType;
	children: CommentType[];
	targetComment?: CommentType;
	targetLeaveWords?: CommentType;
}

export interface LeaveWordType {
	id: number;
	content: string;
	parent_id: number | null;
	reply_to: number | null;
	user_id: number;
	blog_id: number;
	isDeleted: string;
	createdAt: string;
	updatedAt: string;
	user: GetUserInfoResType;
	children: LeaveWord[];
	targetComment?: LeaveWordType;
}

// 分类类型
export interface ClassifyType {
	id: string;
	text: string;
}
