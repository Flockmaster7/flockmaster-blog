<template>
	<div class="circleFriendItem-container">
		<div class="left">
			<img src="../../static/images/album_bg.png" alt="" />
		</div>
		<div class="right">
			<div class="top">
				<div class="name">{{ 'Flockmaster' }}</div>
				<div class="date">{{ '2021-09-09' }}</div>
			</div>
			<div class="center">
				<div class="text">
					今天要去看邓紫棋演唱会了，非常期待呢，哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
				</div>
				<div class="img">
					<img src="../../static/images/test_blog_img.png" alt="" />
				</div>
				<div class="video"></div>
			</div>
			<div class="bottom">
				<div class="dianzan">
					<zb-svg-icon name="like" :size="18" />
					{{ 11 }}
				</div>
				<!-- <div class="comment">
					<zb-svg-icon name="like" :size="18" />
				</div> -->
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
	.circleFriendItem-container {
		width: 100%;
		display: flex;
		padding: 40px 0;
		gap: 12px;
		.left {
			img {
				width: 48px;
				height: 48px;
				object-fit: cover;
				border-radius: 8px;
			}
		}

		.right {
			display: flex;
			flex-direction: column;
			gap: 10px;
			width: 100%;

			.top {
				color: $gray;
				font-size: 13px;
				.name {
					font-size: 16px;
				}
			}

			.center {
				display: flex;
				flex-direction: column;
				gap: 8px;
				font-size: 18px;
				margin-top: 10px;

				.img {
					max-width: 100%;
					display: flex;
					flex-wrap: wrap;

					img {
						max-width: 100%;
						max-height: 100%;
						object-fit: cover;
					}
				}
			}

			.bottom {
				display: flex;
				justify-content: space-between;
				border-radius: 6px;
				padding: 10px 20px;
				background: #faecfa;

				.dianzan {
					display: flex;
					justify-content: center;
					align-items: center;
					gap: 2px;
					font-size: 14px;
					color: $gray;
				}

				.dianzan:hover {
					cursor: pointer;
				}
			}
		}
	}
</style>
