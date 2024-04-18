import { HttpResponse, PageRequest } from '@/types/http';
import request from './index.ts';
import type { Album, Photo } from '@/types/index.d.ts';

/**
 * 获取相册
 * @param pageNum 页码
 * @param pageSize 每一页数量
 * @returns PageRequest<GetTagListResType>
 */
export const getAlbum = (pageNum: number, pageSize: number) => {
	return request<HttpResponse<PageRequest<Album>>>({
		url: `/album/getList/${pageNum}/${pageSize}`,
		method: 'POST'
	});
};

/**
 * 获取相册图片
 * @param pageNum 页码
 * @param pageSize 每一页数量
 * @returns PageRequest<GetTagListResType>
 */
export const getPhoto = (id: number, pageNum: number, pageSize: number) => {
	return request<HttpResponse<PageRequest<Photo>>>({
		url: `/photo/getList/${id}/${pageNum}/${pageSize}`,
		method: 'GET'
	});
};
