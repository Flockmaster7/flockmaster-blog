import {
	GetBlogDetailResType,
	GetBlogListForm,
	getBlogListResType
} from '@/types';
import { HttpResponse, PageRequest } from '@/types/http';
import request from '../index.ts';

/**
 * 获取博客列表接口
 * @param pageNum 页码
 * @param pageSize 每一页数量
 * @returns PageRequest<getBlogListResType>
 */
export const getArticleList = (
	pageNum: number,
	pageSize: number,
	data: GetBlogListForm
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
