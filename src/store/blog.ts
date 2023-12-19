import { minDelay } from './../utils/common';
import {
	blogRead,
	collect,
	comment,
	getArticleDetail,
	getArticleList,
	getBlogListByTagId,
	getChildCommentList,
	getCommentList,
	getRecommendBlog,
	isCollect,
	isLike,
	like,
	uncollect,
	unlike
} from '@/http/blog';
import {
	Blog,
	BlogListForm,
	CommentParamsType,
	Comment,
	UserInfo
} from '@/types';
import { fa } from 'element-plus/es/locale';
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
	const getBlogListParams = ref<Partial<BlogListForm>>({});
	const blogTotal = ref(0);
	const blogList = ref<Partial<Blog>[]>([]);
	const blogDeatil = ref<Blog>({
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
		updatedAt: '',
		user: {} as UserInfo
	});
	// 评论列表
	const commentList = ref<Comment[]>([]);
	const commentTotal = ref<number>(0);
	const commentCount = ref<number>(0);

	// 文章推荐列表
	const recommendList = ref<Partial<Blog>[]>([]);

	// 获取文章推荐列表
	const getRecommendBlogList = async (id: number) => {
		const { data: res } = await getRecommendBlog(id);
		if (res.code === 200) {
			recommendList.value = res.data.rows;
		}
	};

	// 评论
	const addComment = async (data: CommentParamsType) => {
		await comment(data);
	};

	// 获取评论列表
	const getComment = async (
		id: number,
		pageNum: number,
		pageSize: number
	): Promise<boolean> => {
		const { data: res } = await minDelay(
			getCommentList(id, pageNum, pageSize),
			500
		);
		if (res.code === 200) {
			commentList.value =
				pageNum === 1
					? res.data.rows
					: [...commentList.value, ...res.data.rows];
			commentCount.value = res.data.count!;
			commentTotal.value = res.data.total;
			return true;
		}
		return false;
	};

	// 获取子评论列表
	const getChildrenComment = async (
		parent_id: number,
		pageNum: number,
		pageSize: number
	) => {
		const { data: res } = await minDelay(
			getChildCommentList(parent_id, pageNum, pageSize),
			500
		);
		if (res.code === 200) {
			commentList.value.forEach((item) => {
				if (item.id === parent_id) {
					item.children = res.data.rows;
				}
			});
			return true;
		} else {
			return false;
		}
	};

	// 获取文章列表
	const getBlogList = async (
		pageNum: number,
		pageSize: number,
		data?: Partial<BlogListForm>
	): Promise<boolean> => {
		const { data: res } = await getArticleList(pageNum, pageSize, data);
		if (res.code === 200) {
			if (pageNum === 1) {
				blogList.value = res.data.rows;
			} else {
				blogList.value.push(...res.data.rows);
			}
			blogTotal.value = res.data.total;
			return true;
		} else return false;
	};

	// 获取文章详情
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
		const { data: res } = await like(blogDeatil.value.id);
		if (res.code === 200) {
			blogStatus.value.like = !blogStatus.value.like;
			return true;
		} else {
			return false;
		}
	};

	const blogUnlike = async () => {
		const { data: res } = await unlike(blogDeatil.value.id);
		if (res.code === 200) {
			blogStatus.value.like = !blogStatus.value.like;
			return true;
		} else {
			return false;
		}
	};

	const blogCollect = async () => {
		const { data: res } = await collect(blogDeatil.value.id);
		if (res.code === 200) {
			blogStatus.value.collect = !blogStatus.value.collect;
			return true;
		} else {
			return false;
		}
	};

	const blogUncollect = async () => {
		const { data: res } = await uncollect(blogDeatil.value.id);
		if (res.code === 200) {
			blogStatus.value.collect = !blogStatus.value.collect;
			return true;
		} else {
			return false;
		}
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
		commentTotal,
		getRecommendBlogList,
		recommendList,
		getChildrenComment,
		commentCount
	};
});
