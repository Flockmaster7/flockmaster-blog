<template>
	<div class="leaveWord-skeleton">
		<div class="leaveWord-item-container" v-for="item in 10" :key="item">
			<div class="avatar">
				<el-skeleton-item
					variant="image"
					:style="{
						width: 45 + 'px',
						height: 45 + 'px',
						borderRadius: 50 + '%'
					}" />
			</div>
			<div class="box">
				<div class="info">
					<div class="topInfo">
						<div class="infoBox">
							<div class="user-name">
								<el-skeleton-item
									variant="text"
									:style="{
										width: 200 + 'px',
										height: 15 + 'px'
									}" />
							</div>
							<div class="time">
								<el-skeleton-item
									variant="text"
									:style="{
										width: 100 + 'px',
										height: 15 + 'px'
									}" />
							</div>
						</div>
						<div :class="{ operator: true }">
							<el-skeleton-item
								variant="text"
								:style="{
									width: 20 + 'px',
									height: 15 + 'px'
								}" />
						</div>
					</div>
					<div class="content">
						<el-skeleton-item
							variant="text"
							:style="{ width: 100 + '%', height: 80 + 'px' }" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
	@media screen and (max-width: 540px) {
		.top {
			.title {
				font-size: 18px !important;
			}
			.text-input {
				gap: 12px !important;
				.avatar {
					width: 50px !important;
					height: 50px !important;
				}
			}
			.comfirm {
				:deep(.el-button) {
					width: 80px !important;
				}
			}
		}

		.list {
			.title {
				font-size: 20px !important;
			}

			.comment {
				gap: 10px !important;
				.avatar {
					width: 35px !important;
					height: 35px !important;
				}

				.info {
					.name {
						font-size: 16px !important;
					}

					.time {
						font-size: 14px !important;
					}

					.reply,
					.content {
						font-size: 15px !important;
					}
				}
			}
		}
	}

	.leaveWord-skeleton {
		width: 100%;
		display: flex;
		flex-direction: column;

		.leaveWord-item-container {
			margin: 15px 0;
			display: flex;
			gap: 20px;
			margin-bottom: 25px;
			justify-content: space-between;
			width: 100%;

			.avatar {
				width: 45px;
				height: 45px;
				// border-radius: 50%;

				img {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.box {
				flex-basis: 95%;
				.info {
					display: flex;
					flex-direction: column;
					gap: 20px;
					.topInfo {
						display: flex;
						justify-content: space-between;
						align-items: flex-start;
						.infoBox {
							display: flex;
							flex-direction: column;
							gap: 10px;
							.user-name {
								font-size: 18px;
								color: #414141;
							}
							.time {
								color: $grayWhite;
								font-size: 15px;
							}
						}

						.operator {
							display: flex;
							justify-content: center;
							align-items: center;
							gap: 4px;
						}

						.operator:hover {
							cursor: pointer;
						}

						.active {
							color: var(--theme-active-color);
						}
					}

					.content {
						word-break: break-all;
						font-size: 16px;
						line-height: 40px;
					}
				}
			}
		}
	}
</style>
