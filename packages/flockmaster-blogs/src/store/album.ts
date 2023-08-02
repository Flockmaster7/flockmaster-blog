import { getAlbum, getPhoto } from '@/http/album';
import { AlbumType, PhotoType } from '@/types';
import { minDelay } from '@/utils/common';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAlbumStore = defineStore('album', () => {
	const albumList = ref<AlbumType[]>([]);
	const albumTotal = ref<number>(0);
	const photoList = ref<PhotoType[]>([]);

	const getAlbumList = async (pageNum: number, pageSize: number) => {
		const { data: res } = await minDelay(getAlbum(pageNum, pageSize), 500);
		albumTotal.value = res.data.total;
		if (pageNum === 1) {
			albumList.value = res.data.rows;
		} else {
			albumList.value = [...albumList.value, ...res.data.rows];
		}
		return Promise.resolve(true);
	};

	const getPhotoList = async (pageNum: number, pageSize: number) => {
		const { data: res } = await getPhoto(pageNum, pageSize);
		photoList.value = res.data.rows;
	};

	return {
		albumList,
		getAlbumList,
		getPhotoList,
		albumTotal
	};
});
