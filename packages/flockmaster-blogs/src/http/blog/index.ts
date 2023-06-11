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
