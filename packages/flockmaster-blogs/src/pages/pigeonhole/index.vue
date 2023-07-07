<template>
	<div class="pigeonhole-container">
		<div class="card">
			<div class="title">归档</div>
			<div class="main">
				<el-timeline>
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
	</div>
</template>

<script setup lang="ts">
	import { MoreFilled } from '@element-plus/icons-vue';
	import { useBlogStore } from '@/store/blog';
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';
	import { onMounted, ref } from 'vue';
	import { useRouter } from 'vue-router';

	const router = useRouter();
	const blogStore = useBlogStore();
	const userStore = useUserStore();
	const { blogList, blogTotal } = storeToRefs(blogStore);
	const { userInfo } = storeToRefs(userStore);

	onMounted(async () => {
		await getBlog(pageNum.value, pageSize.value);
	});

	const getBlog = async (pageNum: number, pageSize: number) => {
		blogStore.getBlogList(pageNum, pageSize);
	};

	// 跳转到文章详情
	const gotoBlogDetail = (id: number) => {
		router.push('/blog/detail/?id=' + id);
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
		.main {
			padding: 0 10px !important;
		}
	}
	.pigeonhole-container {
		background-color: $white;
		padding: 20px;
		.card {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			.title {
				text-align: center;
				font-size: 30px;
				font-weight: 700;
				margin: 30px;
			}
			.main {
				padding: 30px 60px 0;
				.nodeTitle {
					font-weight: 500;
					font-size: 18px;
					padding: 0 0 5px;
				}
				.nodeTitle:hover {
					cursor: pointer;
					color: $themeColor;
				}
				.el-timeline-item {
					padding-bottom: 40px;
				}

				.el-timeline-item:last-child {
					padding-bottom: 0;
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
	}
</style>
