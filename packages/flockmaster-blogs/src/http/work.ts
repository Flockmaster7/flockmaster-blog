import { GetWorkListResType } from '@/types';
import request from './index';
import type { HttpResponse, PageRequest } from '@/types/http.d.ts';

/**
 * 获取作品列表接口
 * @param pageNum 页码
 * @param pageSize 每一页数量
 * @returns PageRequest<GetWorkListResType>
 */
export const getWorkList = async (pageNum: number, pageSize: number) => {
	return request<HttpResponse<PageRequest<GetWorkListResType>>>({
		url: `work/getList/${pageNum}/${pageSize}`,
		method: 'GET'
	});
};
