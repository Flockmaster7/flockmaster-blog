import { getWorkList } from '@/http/work';
import { GetWorkListResType } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useWorkStore = defineStore('work', () => {
	const workList = ref<GetWorkListResType[]>([]);

	const getWork = async (pageNum: number, pageSize: number) => {
		const { data: res } = await getWorkList(pageNum, pageSize);
		if (res.code === 200) {
			workList.value = res.data.rows;
			return res.data.rows;
		}
	};

	return {
		workList,
		getWork
	};
});
