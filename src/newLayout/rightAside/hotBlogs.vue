<template>
	<div class="latestComments-container">
		<zbCard title="热门文章">
			<div class="comment-list">
				<div
					class="comment-item"
					v-for="item in hotBlogs"
					@click="gotoBlogDetail(item.id)"
					:key="item.id">
					<div class="comment-item-avatar">
						<img v-lazy="imgUrl(item.blog_image!)" alt="" />
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
			</div>
		</zbCard>
	</div>
</template>

<script setup lang="ts">
	import zbCard from '@/components/common/zb-card.vue';
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';
	import { imgUrl } from '@/utils/common';
	import { useRouter } from 'vue-router';

	const { common } = useStore();
	const { hotBlogs } = storeToRefs(common);

	const router = useRouter();

	common.getHomeBlogs();

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
			gap: 15px;

			.comment-item {
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
		}
	}
</style>
