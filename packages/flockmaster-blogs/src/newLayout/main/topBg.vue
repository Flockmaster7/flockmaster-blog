<template>
	<div class="top-container">
		<div class="top-tool">
			<zb-svg-icon name="search" color="#494848"></zb-svg-icon>
		</div>
		<div class="top-info">
			<div class="info">
				<p class="name">{{ 'flockmaster' }}</p>
				<div class="description">{{ '这个人很懒没有留下什么' }}</div>
			</div>
			<img class="avatar" src="../../static/images/admin_bg_dark.png" />
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
	.top-container {
		height: 290px;
		position: relative;
		background: url('../../static/images/admin_bg.png');
		background-size: cover;

		.top-tool {
			background-color: #fff;
			height: 70px;
			display: flex;
			padding: 0 20px;
			align-items: center;
		}

		.top-info {
			display: flex;
			gap: 10px;
			position: absolute;
			right: 60px;
			bottom: 30px;

			.info {
				display: flex;
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
