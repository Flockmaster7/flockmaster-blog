import { HttpResponse, PageRequest } from '@/types/http';
import request from './index.ts';
import type { AlbumType, PhotoType } from '@/types/index.d.ts';

/**
 * 获取相册
 * @param pageNum 页码
 * @param pageSize 每一页数量
 * @returns PageRequest<GetTagListResType>
 */
export const getAlbum = (pageNum: number, pageSize: number) => {
	return request<HttpResponse<PageRequest<AlbumType>>>({
		url: `/album/getList/${pageNum}/${pageSize}`,
		method: 'GET'
	});
};

/**
 * 获取相册图片
 * @param pageNum 页码
 * @param pageSize 每一页数量
 * @returns PageRequest<GetTagListResType>
 */
export const getPhoto = (id: number, pageNum: number, pageSize: number) => {
	return request<HttpResponse<PageRequest<PhotoType>>>({
		url: `/photo/getList/${id}/${pageNum}/${pageSize}`,
		method: 'GET'
	});
};
