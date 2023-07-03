import {
	blogRead,
	collect,
	getArticleDetail,
	getArticleList,
	getBlogListByTagId,
	isCollect,
	isLike,
	like,
	uncollect,
	unlike
} from '@/http/blog';
import {
	GetBlogDetailResType,
	GetBlogListForm,
	getBlogListResType
} from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBlogStore = defineStore('blog', () => {
	const blogStatus = ref({
		like: false,
		collect: false,
		read: false
	});
	const getBlogListParams = ref<GetBlogListForm>({});
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
		blog_like: 0,
		blog_collect: 0,
		blog_read: 0,
		tags: [],
		createdAt: '',
		updatedAt: ''
	});

	const getBlogList = async (
		pageNum: number,
		pageSize: number,
		data?: GetBlogListForm
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

	const getBlogListByTag = async (
		tags: number[],
		pageNum: number,
		pageSize: number
	) => {
		const { data: res } = await getBlogListByTagId(tags, pageNum, pageSize);
		if (res.code === 200) {
			blogList.value = res.data.rows;
			blogTotal.value = res.data.total;
		}
	};

	const addBlogRead = async (id: number) => {
		await blogRead(id);
	};

	const isBlogLike = async (id: number) => {
		const { data: res } = await isLike(id);
		if (res.code === 200) {
			blogStatus.value.like = res.data.status;
		}
	};

	const isBlogCOllect = async (id: number) => {
		const { data: res } = await isCollect(id);
		if (res.code === 200) {
			blogStatus.value.collect = res.data.status;
		}
	};

	const blogLike = async () => {
		await like(blogDeatil.value.id);
		blogStatus.value.like = !blogStatus.value.like;
	};

	const blogUnlike = async () => {
		await unlike(blogDeatil.value.id);
		blogStatus.value.like = !blogStatus.value.like;
	};

	const blogCollect = async () => {
		await collect(blogDeatil.value.id);
		blogStatus.value.collect = !blogStatus.value.collect;
	};

	const blogUncollect = async () => {
		await uncollect(blogDeatil.value.id);
		blogStatus.value.collect = !blogStatus.value.collect;
	};

	return {
		blogList,
		blogDeatil,
		getBlogDetail,
		getBlogList,
		blogTotal,
		getBlogListByTag,
		getBlogListParams,
		addBlogRead,
		isBlogLike,
		isBlogCOllect,
		blogStatus,
		blogLike,
		blogUnlike,
		blogCollect,
		blogUncollect
	};
});
