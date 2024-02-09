<template>
	<div class="latestComments-container">
		<zbCard title="最新评论">
			<div class="comment-list">
				<el-skeleton animated :loading="isLoading">
					<template #template>
						<Skeleton></Skeleton>
					</template>
					<template #default>
						<div
							class="comment-item"
							v-for="item in latestComments"
							:key="item.id">
							<div class="comment-item-avatar">
								<img v-lazy="item.user.user_image" alt="" />
							</div>
							<div class="comment-item-info">
								<div class="top">
									<div class="name">{{ item.user.name }}</div>
									<div class="date">
										{{ getTimeFormNow(item.createdAt) }}
									</div>
								</div>
								<div class="bottom">
									<p>{{ item.content }}</p>
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
	import { getTimeFormNow } from '@/utils/dayFormat';
	import Skeleton from './rightSkeleton.vue';
	import useSkeleton from '@/hooks/useSkeleton';

	const { common } = useStore();
	const { latestComments } = storeToRefs(common);

	const { isLoading } = useSkeleton(common.getHomeComments);
</script>

<style lang="scss" scoped>
	.latestComments-container {
		border-top: 1px solid #dbd8d8;

		.comment-list {
			display: flex;
			flex-direction: column;
			gap: 15px;

			.comment-item {
				max-width: 210px;
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

						.name {
							font-size: 13px;
							color: $gray;
						}

						.date {
							font-size: 10px;
							color: $gray;
						}
					}

					.bottom {
						border-radius: 4px;
						padding: 4px;
						background: var(--theme-data-show);
						width: 150px;
						font-size: 12px;
						margin-top: 4px;

						p {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
				}
			}
		}
	}
</style>
