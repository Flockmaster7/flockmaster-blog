import { getAlbum, getPhoto } from '@/http/album';
import { Album, Photo } from '@/types';
import { minDelay } from '@/utils/common';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAlbumStore = defineStore('album', () => {
	const albumList = ref<Album[]>([]);
	const albumTotal = ref<number>(0);
	const photoTotal = ref<number>(0);
	const photoList = ref<Photo[]>([]);

	const getAlbumList = async (pageNum: number, pageSize: number) => {
		const timeout = pageNum === 1 ? 0 : 500;
		const { data: res } = await minDelay(
			getAlbum(pageNum, pageSize),
			timeout
		);
		albumTotal.value = res.data.total;
		if (pageNum === 1) {
			albumList.value = res.data.rows;
		} else {
			albumList.value = [...albumList.value, ...res.data.rows];
		}
		return Promise.resolve(true);
	};

	const getPhotoList = async (
		id: number,
		pageNum: number,
		pageSize: number
	) => {
		const timeout = pageNum === 1 ? 0 : 500;
		const { data: res } = await minDelay(
			getPhoto(id, pageNum, pageSize),
			timeout
		);
		photoTotal.value = res.data.total;
		if (pageNum === 1) {
			photoList.value = res.data.rows;
		} else {
			photoList.value = [...photoList.value, ...res.data.rows];
		}
		return Promise.resolve(true);
	};

	return {
		albumList,
		photoList,
		getAlbumList,
		getPhotoList,
		albumTotal,
		photoTotal
	};
});
