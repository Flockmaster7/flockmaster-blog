import { getArticleDetail, getArticleList } from '@/http/blog';
import { GetBlogListForm, getBlogListResType } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBlogStore = defineStore('blog', () => {
	const blogList = ref<getBlogListResType[]>([]);

	const getBlogList = async (
		pageNum: number,
		pageSize: number,
		data: GetBlogListForm
	) => {
		const { data: res } = await getArticleList(pageNum, pageSize, data);
		if (res.code === 200) blogList.value = res.data.rows;
		console.log(res);
	};

	const getBlogDetail = async (id: number) => {
		const { data: res } = await getArticleDetail(id);
		console.log(res);
	};

	return {
		blogList,
		getBlogDetail,
		getBlogList
	};
});
