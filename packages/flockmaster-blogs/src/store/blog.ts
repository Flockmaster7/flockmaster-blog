import {
	blogRead,
	collect,
	comment,
	getArticleDetail,
	getArticleList,
	getBlogListByTagId,
	getCommentList,
	isCollect,
	isLike,
	like,
	uncollect,
	unlike
} from '@/http/blog';
import {
	CommentParamsType,
	CommentType,
	GetBlogDetailResType,
	GetBlogListForm,
	getBlogListResType
} from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface BlogStatusType {
	like: boolean;
	collect: boolean;
	read: boolean;
	[key: string]: any;
}

export const useBlogStore = defineStore('blog', () => {
	const blogStatus = ref<BlogStatusType>({
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
	// 评论列表
	const commentList = ref<CommentType[]>([]);
	const commentTotal = ref<number>(0);

	// 评论
	const addComment = async (data: CommentParamsType) => {
		const res = await comment(data);
	};

	// 获取评论列表
	const getComment = async (
		id: number,
		pageNum: number,
		pageSize: number
	) => {
		const { data: res } = await getCommentList(id, pageNum, pageSize);
		if (res.code === 200) {
			commentList.value = res.data.rows;
			commentTotal.value = res.data.total;
			console.log(commentTotal.value);
		}
	};

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
		blogUncollect,
		commentList,
		getComment,
		addComment,
		commentTotal
	};
});
