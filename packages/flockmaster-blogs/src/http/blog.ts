import {
	CommentParamsType,
	CommentType,
	GetBlogDetailResType,
	GetBlogListForm,
	getBlogListResType
} from '@/types';
import { HttpResponse, PageRequest } from '@/types/http';
import request from './index.ts';

/**
 * 获取博客列表接口
 * @param pageNum 页码
 * @param pageSize 每一页数量
 * @returns PageRequest<getBlogListResType>
 */
export const getArticleList = (
	pageNum: number,
	pageSize: number,
	data?: GetBlogListForm
) => {
	return request<HttpResponse<PageRequest<getBlogListResType>>>({
		url: `/blog/getList/${pageNum}/${pageSize}`,
		method: 'POST',
		data
	});
};

/**
 * 获取博客详情
 * @param id 文章id
 * @returns GetBlogDetailResType
 */
export const getArticleDetail = (id: number) => {
	return request<HttpResponse<GetBlogDetailResType>>({
		url: `/blog/getdetail/${id}`,
		method: 'GET'
	});
};

/**
 * 根据标签id获取标签文章列表
 * @param id 文章id
 * @param pageNum 页码
 * @param pageSize 每一页数量
 * @returns
 */
export const getBlogListByTagId = (
	tags: number[],
	pageNum: number,
	pageSize: number
) => {
	return request<HttpResponse<PageRequest<getBlogListResType>>>({
		url: `/blog/getBlogListByTag/${pageNum}/${pageSize}`,
		method: 'POST',
		data: {
			tags
		}
	});
};

/**
 * 增加文章阅读量
 * @param id 文章id
 * @returns
 */
export const blogRead = (id: number) => {
	return request<HttpResponse<string>>({
		url: `/blog/read/${id}`,
		method: 'POST'
	});
};

/**
 * 是否点赞
 * @param id 文章id
 * @returns
 */
export const isLike = (id: number) => {
	return request<HttpResponse<{ status: boolean }>>({
		url: `/blog/isLike/${id}`,
		method: 'GET'
	});
};

/**
 * 是否收藏
 * @param id 文章id
 * @returns
 */
export const isCollect = (id: number) => {
	return request<HttpResponse<{ status: boolean }>>({
		url: `/blog/isCollect/${id}`,
		method: 'GET'
	});
};

/**
 * 点赞
 * @param id 文章id
 * @returns
 */
export const like = (id: number) => {
	return request<HttpResponse<string>>({
		url: `/blog/like/${id}`,
		method: 'POST'
	});
};

/**
 * 取消点赞
 * @param id 文章id
 * @returns
 */
export const unlike = (id: number) => {
	return request<HttpResponse<string>>({
		url: `/blog/unlike/${id}`,
		method: 'POST'
	});
};

/**
 * 收藏
 * @param id 文章id
 * @returns
 */
export const collect = (id: number) => {
	return request<HttpResponse<string>>({
		url: `/blog/collect/${id}`,
		method: 'POST'
	});
};

/**
 * 取消收藏
 * @param id 文章id
 * @returns
 */
export const uncollect = (id: number) => {
	return request<HttpResponse<string>>({
		url: `/blog/uncollect/${id}`,
		method: 'POST'
	});
};

/**
 * 文章评论
 * @param data
 * @returns
 */
export const comment = (data: CommentParamsType) => {
	return request<HttpResponse<string>>({
		url: `/blog/comment`,
		method: 'POST',
		data
	});
};

/**
 * 获取评论列表
 * @param id 文章id
 * @param pageNum 页码
 * @param pageSize 每一页的数量
 * @returns
 */
export const getCommentList = (
	id: number,
	pageNum: number,
	pageSize: number
) => {
	return request<HttpResponse<PageRequest<CommentType>>>({
		url: `/blog/getCommentList/${id}/${pageNum}/${pageSize}`,
		method: 'GET'
	});
};