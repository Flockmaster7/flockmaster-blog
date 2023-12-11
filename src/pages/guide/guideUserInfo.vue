<template>
	<div class="guide-userInfo-container">
		<div class="avatar-info">
			<img :src="imgUrl(admin.user_image)" alt="" />
			<span class="user-name">Flockmaster</span>
		</div>
		<div class="description">
			酸甜苦辣是食物的味道，喜怒哀乐是生活的味道。
		</div>
		<div class="info-data">
			<div class="data-item">
				<div class="number">
					{{ admin.blogNum }}
				</div>
				<div class="text">文章</div>
			</div>
			<div class="data-item">
				<div class="number">
					{{ admin.tagNum }}
				</div>
				<div class="text">标签</div>
			</div>
			<div class="data-item">
				<div class="number">
					{{ admin.workNum }}
				</div>
				<div class="text">作品</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import useAdminInfo from '@/hooks/useAdminInfo';
	import { imgUrl } from '@/utils/common';

	const { admin } = useAdminInfo();
</script>

<style lang="scss" scoped>
	.guide-userInfo-container {
		display: flex;
		flex-direction: column;
		gap: 30px;
		background: hsla(0, 0%, 100%, 0.5);
		padding: 50px 30px;
		border-radius: 20px;
		width: 70%;

		.avatar-info {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 8px;

			img {
				width: 120px;
				height: 120px;
				border-radius: 50%;
			}

			.user-name {
				font-size: 27px;
				font-weight: 700;
				color: #292828;
			}
		}

		.description {
			font-size: 14px;
		}

		.info-data {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 40px;
			padding: 0 0 20px;
			.data-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				gap: 6px;
				.number {
					color: #3b3b3b;
					font-weight: 700;
				}
				.text {
					font-weight: 600;
				}
			}
		}
	}
</style>
