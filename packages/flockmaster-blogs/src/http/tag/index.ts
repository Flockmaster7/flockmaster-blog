import { HttpResponse, PageRequest } from '@/types/http';
import request from '../index.ts';
import type { GetTagListResType } from '@/types/index.d.ts';

/**
 * 获取标签列表接口
 * @param pageNum 页码
 * @param pageSize 每一页数量
 * @returns PageRequest<GetTagListResType>
 */
export const getTagList = (pageNum: number, pageSize: number) => {
	return request<HttpResponse<PageRequest<GetTagListResType>>>({
		url: `/blog/tag/getTagList/${pageNum}/${pageSize}`,
		method: 'GET'
	});
};
