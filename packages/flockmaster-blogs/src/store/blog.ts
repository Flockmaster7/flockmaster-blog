import { getArticleDetail, getArticleList } from '@/http/blog';
import {
	GetBlogDetailResType,
	GetBlogListForm,
	getBlogListResType
} from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBlogStore = defineStore('blog', () => {
	const blogTotal = ref(0);
	const blogList = ref<getBlogListResType[]>([]);
	const blogDeatil = ref<GetBlogDetailResType>({
		id: 0,
		author: '',
		title: '',
		classify: '1',
		content_text: '',
		content_html: '',
		blog_image: '',
		createdAt: '',
		updatedAt: ''
	});

	const getBlogList = async (
		pageNum: number,
		pageSize: number,
		data: GetBlogListForm
	) => {
		const { data: res } = await getArticleList(pageNum, pageSize, data);
		if (res.code === 200) {
			blogList.value = res.data.rows;
			blogTotal.value = res.data.total;
		}
	};

	const getBlogDetail = async (id: number) => {
		const { data: res } = await getArticleDetail(id);
		if (res.code === 200) blogDeatil.value = res.data;
	};

	return {
		blogList,
		blogDeatil,
		getBlogDetail,
		getBlogList,
		blogTotal
	};
});
