<template>
	<!-- <div
			class="blog-header"
			:style="{
				transform: !isShowHeader
					? 'translate3d(0, -150%, 0)'
					: 'translate3d(0, 0, 0)'
			}">
			<div class="blog-header-box">
				<div class="header-title">
					{{ blogDeatil.title }}
				</div>
				<div class="header-author">
					<div class="author-name">
						{{ blogDeatil.author }}
					</div>
					<div class="author-follow">
						<el-button
							class="follow"
							type="primary"
							@click="userFollow('follow')"
							v-if="!isFollow && !isOwn"
							>关注</el-button
						>
						<el-button
							type="default"
							class="cancel-follow"
							@click="userFollow('cancel')"
							v-if="isFollow && !isOwn"
							>已关注</el-button
						>
					</div>
				</div>
			</div>
		</div> -->

	<div class="blog-container">
		<!-- 左侧 -->
		<div class="blog-card">
			<div class="blog-detail-card">
				<blogInfo :blogDeatil="blogDeatil" />
				<div class="mainImg">
					<zb-image
						:src="blogDeatil.blog_image"
						:style="{ height: (isMobile ? 240 : 400) + 'px' }" />
				</div>
				<!-- 文章预览 -->
				<MdPreview
					:editorId="previewId"
					v-model="content"
					:theme="isDark ? 'dark' : 'light'"
					:showCodeRowNumber="true" />
				<el-divider></el-divider>
				<blogFooter :blogDeatil="blogDeatil"></blogFooter>
			</div>
			<div class="blog-detail-card">
				<commentPost
					:blogId="blogDeatil.id"
					:userImage="userInfo.user_image"
					@refreshComment="getCommentList"></commentPost>
				<CommentList></CommentList>
			</div>
		</div>
	</div>

	<!-- 右侧抽屉 -->
	<el-drawer
		v-model="rightOpen"
		:size="drawerOption.size"
		:direction="drawerOption.direction"
		:lock-scroll="false">
		<ZbCard title="操作">
			<BlogOperator :id="id"></BlogOperator>
		</ZbCard>
		<ZbCard title="目录">
			<MdCatalog :editorId="previewId" :scrollElement="scrollElement" />
		</ZbCard>
	</el-drawer>

	<el-drawer
		v-model="commentOpen"
		title="评论"
		:size="drawerOption.size"
		:lock-scroll="false"
		:direction="drawerOption.direction">
		<commentPost
			:blogId="blogDeatil.id"
			:userImage="userInfo.user_image"
			@refreshComment="getCommentList"></commentPost>
		<CommentList></CommentList>
	</el-drawer>
</template>

<script setup lang="ts">
	import {
		computed,
		nextTick,
		onBeforeUnmount,
		onMounted,
		onUnmounted,
		ref,
		watch
	} from 'vue';
	import { storeToRefs } from 'pinia';
	import { LocationQueryValue, useRoute } from 'vue-router';
	import { isLogin } from '@/utils/login';
	import { MdPreview, MdCatalog } from 'md-editor-v3';
	import 'md-editor-v3/lib/style.css';
	import useStore from '@/store';
	import router from '@/router';
	import blogInfo from './blogInfo.vue';
	import blogFooter from './blogFooter.vue';
	import commentPost from './commentPost.vue';
	import CommentList from './commentList.vue';
	import BlogOperator from './blogOperator.vue';
	import ZbCard from '@/components/common/zb-card.vue';

	const { common, blog, user } = useStore();
	const { isDark, rightOpen, commentOpen, isMobile, zhankai } =
		storeToRefs(common);

	const { blogDeatil, blogStatus } = storeToRefs(blog);
	const { userInfo } = storeToRefs(user);
	const route = useRoute();

	const content = ref('');
	const id = route.query.id as string;

	const drawerOption = computed(() => {
		if (isMobile.value) {
			return {
				size: '100%',
				direction: 'btt'
			};
		} else {
			return {
				size: '25%',
				direction: 'rtl'
			};
		}
	});

	const blogId = computed(() => {
		return route.query.id;
	});

	const scrollElement = document.documentElement;

	const previewId = ref('myPreview');

	watch(blogId, (newVal) => {
		gotoBlogDetail(newVal);
	});

	onMounted(async () => {
		// 获取状态
		if (isLogin()) {
			blog.isBlogLike(Number(id));
			blog.isBlogCOllect(Number(id));
		}
		//增加阅读
		if (!blogStatus.value.read) {
			blog.addBlogRead(Number(id));
			blogStatus.value.read = true;
		}
		// 获取信息
		await blog.getBlogDetail(Number(id));
		nextTick(() => {
			content.value = blogDeatil.value.content_text;
		});
		// 获取评论
		getCommentList();
		// 获取推荐文章
		blog.getRecommendBlogList(Number(id));
		// 是否关注
		if (isLogin()) {
			const res = await user.isFollowUser(blogDeatil.value.user.id);
			isFollow.value = res;
		}
		// 是否是本人
		isOwn.value = userInfo.value.id === blogDeatil.value.user.id;
		window.scrollTo({
			top: 0
		});
	});

	onBeforeUnmount(() => {
		zhankai.value = false;
		blogStatus.value.read = false;
	});

	// 获取评论
	const getCommentList = async () => {
		await blog.getComment(blogDeatil.value.id, 1, 9);
	};

	// 跳转到文章详情
	const gotoBlogDetail = async (
		id?: LocationQueryValue | LocationQueryValue[]
	) => {
		if (!id) return;
		// 获取状态
		if (isLogin()) {
			blog.isBlogLike(Number(id));
			blog.isBlogCOllect(Number(id));
		}
		//增加阅读
		if (!blogStatus.value.read) {
			blog.addBlogRead(Number(id));
			blogStatus.value.read = true;
		}
		// 获取信息
		await blog.getBlogDetail(Number(id));
		nextTick(() => {
			content.value = blogDeatil.value.content_text;
		});
		// 获取评论
		getCommentList();
		// 获取推荐文章
		blog.getRecommendBlogList(Number(id));
		// 是否关注
		if (isLogin()) {
			const res = await user.isFollowUser(blogDeatil.value.user.id);
			isFollow.value = res;
		}
		// 是否是本人
		isOwn.value = userInfo.value.id === blogDeatil.value.user.id;
		router.push('/blog/detail?id=' + id);
	};

	// 关注与取消
	const isFollow = ref(false);
	const isOwn = ref(false);
	const userFollow = async (type: string) => {
		const user_id = blogDeatil.value.user.id;
		if (type === 'follow') {
			await user.follow(user_id);
		} else if (type === 'cancel') {
			await user.cancelFollow(user_id);
		}
		const res = await user.isFollowUser(user_id);
		isFollow.value = res;
	};
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.blog-container {
			padding: 40px 0 !important;
			.blog-card {
				box-sizing: border-box;
				padding: 0 12px;
				width: 100vw;
			}
		}
	}

	.blog-container {
		display: flex;
		justify-content: center;
		gap: 10px;
		padding: 40px 20px;

		.blog-card {
			display: flex;
			flex-direction: column;
			gap: 10px;
			position: relative;
			max-width: 100%;

			.mainImg {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				img {
					width: 100%;
					border-radius: 5px;
				}
			}
		}
	}

	.active {
		background-color: var(--theme-color) !important;
	}

	:deep(.md-editor-catalog-active > span) {
		color: var(--theme-active-show) !important;
	}

	:deep(.md-editor-preview-wrapper) {
		padding: 0;
	}

	:deep(.md-editor-catalog-link span:hover) {
		color: var(--theme-active-show) !important;
	}

	// 分割线
	.el-divider--horizontal {
		margin: 9px 0 !important;
	}
	// 抽屉
	:deep(.el-drawer__header) {
		margin-bottom: 0px !important;
	}
</style>
