// 提交表单
export interface UserForm {
	user_name: string;
	password: string;
}

// 登录
export interface LoginRes {
	token: string;
}

// 修改信息表单
export interface UpdateUserFrom {
	name: string;
	description: string;
	isAdmin: boolean;
}

// 用户信息
export interface UserInfo {
	id: number;
	user_name: string;
	is_admin: boolean;
	name: string;
	user_image: string;
	description: string;
	user_focus: number;
	user_fans: number;
}

// 获取博客列表表单
export interface BlogListForm {
	user_id: number;
	author: string;
	title: string;
	content_text: string;
	order: string;
	classify: string;
	tags: number[];
	querySearch: string;
}

// 博客
export interface Blog {
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
	tags: TagList[];
	createdAt: string;
	updatedAt: string;
	user: UserInfo;
	year?: string;
	date?: string;
}

// 获取作品列表接口

export interface Work {
	id?: number;
	work_image: string;
	work_title: string;
	work_des: string;
	work_url: string;
	createdAt: string;
	updatedAt: string;
}

// 获取标签列表接口
export interface Tag {
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

export interface Comment {
	id: number;
	content: string;
	parent_id: number | null;
	reply_to: number | null;
	user_id: number;
	blog_id: number;
	isDeleted: string;
	createdAt: string;
	updatedAt: string;
	user: UserInfo;
	children: CommentType[];
	targetComment?: CommentType;
	targetLeaveWords?: CommentType;
}

export interface LeaveWord {
	id: number;
	content: string;
	parent_id: number | null;
	reply_to: number | null;
	user_id: number;
	blog_id: number;
	isDeleted: string;
	createdAt: string;
	updatedAt: string;
	user: UserInfo;
	children: LeaveWord[];
	targetComment?: LeaveWord;
}

// 分类类型
export interface ClassifyType {
	id: string;
	text: string;
}

// 管理员信息
export interface AdminInfo extends UserInfo {
	tagNum: number;
	blogNum: number;
	workNum: number;
}

export interface Album {
	id: number;
	album_name: string;
	album_cover: string;
	createdAt: string;
}

export interface Photo {
	id: number;
	album_id: number;
	photo_url: string;
	createdAt: string;
}

export interface DataScreen {
	website_visit_today: number;
	blogData: Data[];
	hotBlog: HotBlog[];
	moduleNum: Data[];
}

export interface BlogClassifiy {
	classify: string;
	articleCount: number;
}

export type Data = {
	value: number;
	name: string;
	percentage: string;
};

export type HotBlog = DataBlogClassifiy & { maxValue: number };

export interface ModuleNum {
	albumCount: number;
	blogCount: number;
	leaveWordCount: number;
	tagCount: number;
	workCount: number;
	[key: string]: any;
}
