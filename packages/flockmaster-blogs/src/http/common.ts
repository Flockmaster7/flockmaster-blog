import { HttpResponse, WebSiteInfoType } from '@/types/http';
import request from './index.ts';
import { Blog, Comment } from '@/types/index.js';

/**
 * 添加网站访问量
 * @returns GetBlogDetailResType
 */
export const addVisit = () => {
	return request<HttpResponse<string>>({
		url: `/common/addVisit`,
		method: 'POST'
	});
};

/**
 * 获取网站资讯
 * @returns
 */
export const getWebsiteInfo = () => {
	return request<HttpResponse<WebSiteInfoType>>({
		url: `/common/getWebsiteInfo`,
		method: 'GET'
	});
};

/**
 * 获取首页最新评论
 * @returns
 */
export const getLatestComments = () => {
	return request<HttpResponse<Comment[]>>({
		url: `/common/getLatestComment`,
		method: 'GET'
	});
};

/**
 * 获取首页热门文章
 * @returns
 */
export const getHotBlogs = () => {
	return request<HttpResponse<Partial<Blog>[]>>({
		url: `/common/getHotBlogs`,
		method: 'GET'
	});
};
