<template>
	<div class="pigeonhole-container">
		<div class="tool-card">
			<zbClassifyTool @getBlogList="changeClassify"></zbClassifyTool>
		</div>
		<div class="card">
			<div class="main">
				<div class="title">归档</div>
				<div class="des">{{ des }}</div>
				<el-timeline v-show="!isLoading && blogList.length > 0">
					<el-timeline-item
						v-for="(item, index) in blogList"
						:key="index"
						size="large"
						:icon="MoreFilled"
						:timestamp="item.createdAt">
						<p class="nodeTitle" @click="gotoBlogDetail(item.id)">
							{{ item.title }}
						</p>
					</el-timeline-item>
				</el-timeline>
			</div>
			<zb-loading v-show="isLoading"></zb-loading>
			<zb-empty v-if="blogList.length === 0" :height="500"></zb-empty>
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
	</div>
</template>

<script setup lang="ts">
	import { MoreFilled } from '@element-plus/icons-vue';
	import { storeToRefs } from 'pinia';
	import { useRouter } from 'vue-router';
	import zbLoading from '@/components/common/zb-loading.vue';
	import usePagination from '@/hooks/usePagination';
	import useStore from '@/store';
	import zbClassifyTool from '@/components/common/zb-classify-tool.vue';
	import zbEmpty from '@/components/common/zb-empty.vue';
	import { computed, ref } from 'vue';

	const router = useRouter();
	const { blog } = useStore();
	const { blogList, blogTotal } = storeToRefs(blog);

	const {
		pageNum,
		pageSize,
		handleSizeChange,
		handleCurrentChange,
		isLoading,
		getBlogListParams
	} = usePagination(blog.getBlogList);

	// 跳转到文章详情
	const gotoBlogDetail = (id: number) => {
		router.push('/blog/detail/?id=' + id);
	};

	const des = computed(() => {
		return desName.value + '下文章有' + blogTotal.value + '篇';
	});

	const desName = ref('综合');

	// 切换分类
	const changeClassify = (id: string, text?: string) => {
		if (text) desName.value = text;
		if (id !== '0') {
			getBlogListParams.value = {
				classify: id
			};
		} else {
			getBlogListParams.value = {};
		}
		handleCurrentChange(1);
	};
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.main {
			padding: 0 10px !important;
		}
	}
	.pigeonhole-container {
		position: relative;
		min-height: 580px;
		background: var(--card-reset-bg);
		padding: 20px 20px 0;

		.tool-card {
			position: absolute;
			left: -110px;
		}

		.card {
			min-height: 580px;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.main {
				padding: 0 60px;
				.title {
					text-align: center;
					font-size: 30px;
					font-weight: 700;
					margin: 20px;
				}
				.des {
					color: $gray;
					font-size: 18px;
					text-align: center;
					margin: 20px 0 40px;
				}
				.nodeTitle {
					font-weight: 500;
					font-size: 18px;
					padding: 0 0 5px;
					transition: 0.5s;
				}
				.nodeTitle:hover {
					cursor: pointer;
					transform: translate(-3px, -3px);
					color: var(--theme-color);
				}
				.el-timeline-item {
					padding-bottom: 40px;
				}

				.el-timeline-item:last-child {
					padding-bottom: 0;
				}
			}
			.pagination {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 30px 0;
			}
		}
	}
</style>
