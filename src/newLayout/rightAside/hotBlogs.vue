<template>
	<div class="latestComments-container">
		<zbCard title="热门文章">
			<div class="comment-list">
				<el-skeleton animated :loading="isLoading">
					<template #template>
						<Skeleton></Skeleton>
					</template>
					<template #default>
						<div
							class="comment-item"
							v-for="item in hotBlogs"
							@click="gotoBlogDetail(item.id)"
							:key="item.id">
							<div class="comment-item-avatar">
								<img v-lazy="item.blog_image!" alt="" />
							</div>
							<div class="comment-item-info">
								<div class="top">
									<div class="title">{{ item.title }}</div>
								</div>
								<div class="bottom">
									<span class="info"
										>阅读 {{ item.blog_read }}，点赞
										{{ item.blog_like }}</span
									>
								</div>
							</div>
						</div>
					</template>
				</el-skeleton>
			</div>
		</zbCard>
	</div>
</template>

<script setup lang="ts">
	import zbCard from '@/components/common/zb-card.vue';
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';
	import { useRouter } from 'vue-router';
	import Skeleton from './rightSkeleton.vue';
	import useSkeleton from '@/hooks/useSkeleton';

	const { common } = useStore();
	const { hotBlogs } = storeToRefs(common);

	const router = useRouter();

	const { isLoading } = useSkeleton(common.getHomeBlogs);

	const gotoBlogDetail = (id?: number) => {
		if (!id) return;
		router.push('/blog/detail?id=' + id);
	};
</script>

<style lang="scss" scoped>
	.latestComments-container {
		border-top: 1px solid #dbd8d8;

		.comment-list {
			display: flex;
			flex-direction: column;
			gap: 20px;

			.comment-item {
				border-radius: 8px;
				display: flex;
				align-items: center;
				gap: 10px;

				&-avatar {
					width: 40px;
					height: 40px;

					img {
						width: 100%;
						height: 100%;
						border-radius: 5px;
					}
				}

				&-info {
					.top {
						display: flex;
						justify-content: space-between;
						align-items: center;
						gap: 10px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						width: 160px;

						.title {
							font-size: 15px;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.title:hover {
							cursor: pointer;
							color: var(--theme-data-show-1);
						}
					}

					.bottom {
						margin-top: 2px;
						.info {
							font-size: 13px;
							color: $gray;
						}
					}
				}
			}

			.comment-item:hover {
				cursor: pointer;
				background: var(--theme-data-show);
			}
		}
	}
</style>
