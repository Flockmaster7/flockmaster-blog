<template>
	<div class="circleFriendItem-container-for">
		<div class="circleFriendItem-container" v-for="item in 9" :key="item">
			<div class="left">
				<el-skeleton-item
					variant="text"
					:style="{ width: 48 + 'px', height: 48 + 'px' }" />
			</div>
			<div class="right">
				<div class="top">
					<el-skeleton-item
						variant="text"
						:style="{ width: 100 + 'px', height: 15 + 'px' }" />
					<el-skeleton-item
						variant="text"
						:style="{ width: 150 + 'px', height: 15 + 'px' }" />
				</div>

				<div class="center">
					<el-skeleton-item
						variant="text"
						:style="{ width: 100 + '%', height: 150 + 'px' }" />
				</div>
				<el-skeleton-item
					variant="text"
					:style="{ width: 100 + '%', height: 30 + 'px' }" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.circleFriendItem-container {
			gap: 8px !important;
			.left {
				width: 48px !important;
				height: 48px !important;
			}
			.top {
				.name {
					height: 27px !important;
					line-height: 27px !important;
					font-size: 18px !important;
				}
			}
			.center {
				margin: 14px 0 !important;
				font-size: 16px !important;
			}
		}
	}

	.circleFriendItem-container-for {
		width: 100%;
		display: flex;
		flex-direction: column;

		.circleFriendItem-container {
			width: 100%;
			display: flex;
			padding: 30px 0;
			gap: 15px;
			border-bottom: 1px solid var(--theme-divider);

			.left {
				width: 56px;
				height: 56px;
				box-sizing: border-box;
				flex-shrink: 0;

				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
					border-radius: 6px;
				}
			}

			.right {
				display: flex;
				flex-direction: column;
				gap: 10px;
				width: 100%;

				.top {
					display: flex;
					justify-content: space-between;
					gap: 4px;
					flex-direction: column;
					color: $gray;
					font-size: 15px;

					.name {
						height: 30px;
						line-height: 30px;
						font-size: 20px;
					}

					img {
						width: 50px;
					}
				}

				.center {
					display: flex;
					flex-direction: column;
					gap: 15px;
					font-size: 18px;
					margin: 20px 0;

					.text {
						line-height: 1.4;
					}

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
			}
		}
	}
</style>
