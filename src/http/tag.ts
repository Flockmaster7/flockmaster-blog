import { HttpResponse, PageRequest } from '@/types/http';
import request from './index.ts';
import type { Tag } from '@/types/index.d.ts';

/**
 * 获取标签列表接口
 * @param pageNum 页码
 * @param pageSize 每一页数量
 * @returns PageRequest<GetTagListResType>
 */
export const getTagList = (pageNum: number, pageSize: number) => {
	return request<HttpResponse<PageRequest<Tag>>>({
		url: `/blog/tag/getTagList/${pageNum}/${pageSize}`,
		method: 'POST'
	});
};
