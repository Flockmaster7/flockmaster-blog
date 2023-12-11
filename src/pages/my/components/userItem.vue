<template>
	<div class="card">
		<div class="info">
			<div class="avatar">
				<img v-lazy="imgUrl(user.user_image)" alt="" />
			</div>
			<div class="user">
				<div class="name">{{ user.name }}</div>
				<div class="description">{{ user.description }}</div>
			</div>
		</div>
		<div class="status">已关注</div>
	</div>
</template>

<script setup lang="ts">
	import { UserInfo } from '@/types';
	import { imgUrl } from '@/utils/common';

	interface propsType {
		user: UserInfo;
	}
	defineProps<propsType>();
</script>

<style lang="scss" scoped>
	.card {
		padding: 0 15px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--theme-card-item-color);
		border-radius: 10px;
		height: 100px;
		transition: 0.6s;
		.info {
			display: flex;
			align-items: center;
			.avatar {
				width: 60px;
				height: 60px;
				border-radius: 50%;
				overflow: hidden;
				margin-right: 20px;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.user {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				gap: 10px;
				// align-items: center;
				.name {
					font-size: 18px;
					font-weight: 500;
				}
				.description {
					font-size: 14x;
					color: $gray;
				}
			}
		}
		.status {
			font-size: 14px;
			color: $gray;
		}
	}

	.card:hover {
		cursor: pointer;
		height: 100px;
		transform: translateY(-3px);
	}
</style>
