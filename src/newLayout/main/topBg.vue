<template>
	<div class="top-bg-container">
		<div class="top-info">
			<div class="info">
				<p class="name">{{ admin.name }}</p>
				<div class="description">{{ admin.description }}</div>
			</div>
			<img class="avatar" v-lazy="imgUrl(admin.user_image)" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import useAdminInfo from '@/hooks/useAdminInfo';
	import { imgUrl } from '@/utils/common';

	const { admin } = useAdminInfo();
</script>

<style lang="scss" scoped>
	.top-bg-container {
		height: 290px;
		position: relative;
		background: url('../../static/images/admin_bg.png');
		background-size: cover;

		.top-info {
			display: flex;
			gap: 10px;
			position: absolute;
			right: 60px;
			bottom: 30px;

			.info {
				display: flex;
				gap: 5px;
				justify-content: center;
				flex-direction: column;
				align-items: flex-end;
				.name {
					font-weight: 800;
					font-size: 18px;
					color: #fff;
				}

				.description {
					color: #d4cfcf;
					font-size: 12px;
				}
			}

			.avatar {
				border-radius: 8px;
				width: 50px;
				height: 50px;
			}
		}
	}
</style>
