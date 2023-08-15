import { getTagList } from '@/http/tag';
import { Tag } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTagStore = defineStore('tag', () => {
	const tagList = ref<Tag[]>([]);
	const tagAsideList = ref<Tag[]>([]);

	const getTgLIst = async (pageNum: number, pageSize: number) => {
		const { data: res } = await getTagList(pageNum, pageSize);
		if (res.code === 200) tagList.value = res.data.rows;
	};

	const getAsideTgLIst = async (pageNum: number, pageSize: number) => {
		const { data: res } = await getTagList(pageNum, pageSize);
		if (res.code === 200) tagAsideList.value = res.data.rows;
	};

	return {
		tagList,
		tagAsideList,
		getAsideTgLIst,
		getTgLIst
	};
});
