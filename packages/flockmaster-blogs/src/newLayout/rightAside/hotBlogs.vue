<template>
	<div class="latestComments-container">
		<zbCard title="热门文章">
			<div class="comment-list">
				<div class="comment-item">
					<div class="comment-item-avatar">
						<img
							src="../../static/images/admin_bg_dark.png"
							alt="" />
					</div>
					<div class="comment-item-info">
						<div class="top">
							<div class="title">vue3在组件外获取路由信息</div>
						</div>
						<div class="bottom">
							<span class="info"
								>阅读 {{ 10 }}，点赞 {{ 10 }}</span
							>
						</div>
					</div>
				</div>
				<div class="comment-item">
					<div class="comment-item-avatar">
						<img
							src="../../static/images/admin_bg_dark.png"
							alt="" />
					</div>
					<div class="comment-item-info">
						<div class="top">
							<div class="title">vue3在组件外获取路由信息</div>
						</div>
						<div class="bottom">
							<span class="info"
								>阅读 {{ 10 }}，点赞 {{ 10 }}</span
							>
						</div>
					</div>
				</div>
				<div class="comment-item">
					<div class="comment-item-avatar">
						<img
							src="../../static/images/admin_bg_dark.png"
							alt="" />
					</div>
					<div class="comment-item-info">
						<div class="top">
							<div class="title">vue3在组件外获取路由信息</div>
						</div>
						<div class="bottom">
							<span class="info"
								>阅读 {{ 10 }}，点赞 {{ 10 }}</span
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
					}

					.bottom {
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
