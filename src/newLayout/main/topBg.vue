<template>
	<div class="top-bg-container">
		<div class="top-info">
			<div class="info">
				<p class="name">{{ admin.name }}</p>
				<div class="description">{{ admin.description }}</div>
			</div>
			<zb-image
				:src="admin.user_image"
				:style="{
					borderRadius: 8 + 'px',
					width: 50 + 'px',
					height: 50 + 'px'
				}" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import useAdminInfo from '@/hooks/useAdminInfo';

	const { admin } = useAdminInfo();
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.top-bg-container {
			height: 220px !important;

			.top-info {
				right: 16px !important;
			}
		}
	}

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
		}
	}
</style>
