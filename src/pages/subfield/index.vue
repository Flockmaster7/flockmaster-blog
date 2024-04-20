<template>
	<div class="pigeonhole-container">
		<el-skeleton animated :loading="isLoading">
			<template #template>
				<SubfieldSkeleton></SubfieldSkeleton>
			</template>
			<template #default>
				<div class="card">
					<div class="main">
						<div class="title">{{ title }}</div>
						<div class="intro">{{ intro }}</div>
						<div class="des">{{ des }}</div>
						<el-timeline
							v-show="!isLoading && subfieldBlogList?.length! > 0">
							<el-timeline-item
								v-for="(item, index) in subfieldBlogList"
								:key="index"
								size="large"
								:icon="MoreFilled"
								:timestamp="item.createdAt">
								<p
									class="nodeTitle"
									@click="gotoBlogDetail(item.id)">
									{{ item.title }}
								</p>
							</el-timeline-item>
						</el-timeline>
					</div>
					<zb-loading v-show="isLoading"></zb-loading>
					<zb-empty
						v-if="subfieldBlogList?.length === 0"
						:height="500"></zb-empty>
					<div class="pagination">
						<el-pagination
							v-model:current-page="pageNum"
							v-model:page-size="pageSize"
							layout="prev, pager, next"
							:total="subfieldBlogTotal"
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange" />
					</div>
				</div>
			</template>
		</el-skeleton>
	</div>
</template>

<script setup lang="ts">
	import { MoreFilled } from '@element-plus/icons-vue';
	import { storeToRefs } from 'pinia';
	import { useRoute, useRouter } from 'vue-router';
	import SubfieldSkeleton from './subfieldSkeleton.vue';
	import zbLoading from '@/components/common/zb-loading.vue';
	import usePagination from '@/hooks/usePagination';
	import useStore from '@/store';
	import zbEmpty from '@/components/common/zb-empty.vue';
	import { computed, watch } from 'vue';

	const router = useRouter();
	const route = useRoute();
	const { blog } = useStore();
	const { subfieldDetail, subfieldBlogList, subfieldBlogTotal } =
		storeToRefs(blog);

	// 获取分栏信息
	const getSubfield = async (pageNum: number = 1, pageSize: number = 9) => {
		await blog.getSubfieldDetailInfo(Number(subfieldId.value));
		await blog.getSubfieldBlog(Number(subfieldId.value), pageNum, pageSize);
	};

	const {
		pageNum,
		pageSize,
		handleSizeChange,
		handleCurrentChange,
		isLoading
	} = usePagination(getSubfield);

	const subfieldId = computed(() => {
		return route.params?.id ? route.params?.id : 1;
	});
	const intro = computed(() => {
		return subfieldDetail.value?.description;
	});
	const des = computed(() => {
		return '分栏文章有 ' + subfieldBlogTotal.value + ' 篇';
	});
	const title = computed(() => {
		return subfieldDetail.value?.name + '分栏 ';
	});

	watch(subfieldId, () => {
		getSubfield();
	});

	// 跳转到文章详情
	const gotoBlogDetail = (id?: number) => {
		if (!id) return;
		router.push('/blog/detail/?id=' + id);
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
					font-size: 14px;
					text-align: center;
					margin: 20px 0 60px;
				}
				.intro {
					color: $gray;
					font-size: 18px;
					text-align: center;
				}
				.nodeTitle {
					font-weight: 500;
					font-size: 18px;
					padding: 0 0 5px;
					transition: 0.5s;
					line-height: 1.5;
				}
				.nodeTitle:hover {
					cursor: pointer;
					transform: translate(-3px, -3px);
					color: var(--theme-active-show);
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
