<template>
	<div class="tag-container">
		<div class="tag">
			<el-collapse v-model="activeTag" @change="handleTagCollapseChange">
				<el-collapse-item name="1">
					<template #title>
						<el-icon class="head-icon"><Guide /></el-icon>
						<text class="head-text"> 标签 </text>
					</template>
					<div class="tag-List">
						<el-check-tag
							v-for="(item, index) in tagList"
							:key="item.id"
							:checked="tagChecked.includes(item.id)"
							color="skyblue"
							@change="(status: boolean) => onChangeTag(status, item.id)"
							>{{ item.tag_name }}</el-check-tag
						>
					</div>
				</el-collapse-item>
			</el-collapse>
		</div>
		<div class="blog">
			<div v-for="(item, index) in blogList" :key="item.id">
				<div @click="gotoBlogDetail(item.id)" class="item">
					<zbBlogItemRectangleMobile
						:blog="item"
						v-if="isMobile"></zbBlogItemRectangleMobile>
					<zbBlogItemRectangle
						:blog="item"
						v-if="!isMobile"></zbBlogItemRectangle>
				</div>
			</div>
		</div>
		<div class="pagination">
			<el-pagination
				v-model:current-page="pageNum"
				v-model:page-size="pageSize"
				:page-sizes="[9, 12, 15, 18, 36]"
				:background="true"
				layout="sizes, prev, pager, next"
				:total="blogTotal"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useTagStore } from '@/store/tag';
	import { useBlogStore } from '@/store/blog';
	import { storeToRefs } from 'pinia';
	import { onMounted, ref } from 'vue';
	import { useRouter } from 'vue-router';
	// import zbBlogItemRectangle from '@/components/item/zb-blogItem-rectangle.vue';
	import zbBlogItemRectangle from '@/pages/home/components/blogItem-rectangle.vue';
	import zbBlogItemRectangleMobile from '@/pages/home/components/blogItem-rectangle-mobile.vue';
	import useIsMobile from '@/hooks/useIsMobile';
	import { useCommonStore } from '@/store/common';

	const router = useRouter();

	const blogStore = useBlogStore();
	const { blogList, blogTotal } = storeToRefs(blogStore);

	// 获取设备
	useIsMobile();
	const commonStore = useCommonStore();
	const { isMobile } = storeToRefs(commonStore);

	// 标签
	const tgStore = useTagStore();
	const { tagList } = storeToRefs(tgStore);
	const activeTag = ref(['1']);
	const handleTagCollapseChange = (val: string[]) => {
		console.log(val);
	};

	tgStore.getTgLIst(1, 999);
	// 标签选中
	const { getBlogListParams } = storeToRefs(blogStore);
	const tagChecked = ref<number[]>([]);
	const onChangeTag = async (status: boolean, id: number) => {
		if (status) tagChecked.value.push(id);
		else {
			let index = tagChecked.value.indexOf(id);
			if (index !== -1) tagChecked.value.splice(index, 1);
		}
		//获取标签对应的文章列表
		getBlogListParams.value = {
			tags: tagChecked.value
		};
		blogStore.getBlogList(1, 9, getBlogListParams.value);
	};

	// 文章
	onMounted(async () => {
		await getBlog(pageNum.value, pageSize.value);
	});
	const gotoBlogDetail = (id: number) => {
		router.push('/blog/detail?id=' + id);
	};
	const getBlog = async (pageNum: number, pageSize: number) => {
		await blogStore.getBlogList(pageNum, pageSize);
	};

	// 分页器
	const pageNum = ref(1);
	const pageSize = ref(9);

	const handleSizeChange = (val: number) => {
		pageSize.value = val;
		getBlog(pageNum.value, pageSize.value);
	};
	const handleCurrentChange = (val: number) => {
		pageNum.value = val;
		getBlog(pageNum.value, pageSize.value);
	};
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.tag-container {
			padding: 20px 0 !important;
		}
		.tag {
			padding: 0 10px 0 !important;
		}
	}
	.tag-container {
		background-color: $white;
		padding: 20px;
		display: flex;
		// justify-content: space-between;
		flex-direction: column;
		align-items: center;
		// width: 100%;
		min-height: 500px;

		.tag {
			padding: 0 10px 10px;
			// border: 1px solid rgba(0, 0, 0, 0.1);
			border-radius: 20px;
			width: 90%;
			max-height: 200px;
			overflow: hidden;
			margin-bottom: 20px;
			.head-icon {
				font-size: 25px;
				margin-right: 5px;
			}
			// 右侧卡片标题文字
			.head-text {
				font-size: 20px;
				font-weight: 700;
			}
			.tag-List {
				overflow-y: scroll;
				width: 100%;
				max-height: 200px;
				display: flex;
				flex-wrap: wrap;
				padding: 0 20px;
				gap: 20px;
				.el-check-tag.is-checked {
					background-color: $themeColor;
					color: $white;
				}
			}
		}
		.blog {
			// margin-top: 70px;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			width: 100%;
			gap: 10px;
			.item {
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.pagination {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 30px;
		}
	}
</style>
