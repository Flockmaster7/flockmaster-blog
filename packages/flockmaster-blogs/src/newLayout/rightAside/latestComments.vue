<template>
	<div class="latestComments-container">
		<zbCard title="最新评论">
			<div class="comment-list">
				<div class="comment-item">
					<div class="comment-item-avatar">
						<img
							src="../../static/images/admin_bg_dark.png"
							alt="" />
					</div>
					<div class="comment-item-info">
						<div class="top">
							<div class="name">flockmaster</div>
							<div class="date">2023年11月30日</div>
						</div>
						<div class="bottom">
							<p>哈UI沙嗲壶大赛或大四或111111111111</p>
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
							<div class="name">flockmaster</div>
							<div class="date">2023年11月30日</div>
						</div>
						<div class="bottom">
							<p>哈UI沙嗲壶大赛或大四或111111111111</p>
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
							<div class="name">Flockmaster</div>
							<div class="date">2023年11月30日</div>
						</div>
						<div class="bottom">
							<p>哈UI沙嗲壶大赛或大四或111111111111</p>
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
						padding: 2px 5px;
						background-color: rgb(188, 217, 233);
						width: 160px;
						font-size: 12px;

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
