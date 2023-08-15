<template>
	<div class="card">
		<div class="imgBox">
			<img src="@/static/images/test_blog_img.png" alt="" />
		</div>
		<div class="content">
			<div class="details">
				<div class="name">{{ info?.name }}</div>
				<div class="description">{{ info?.description }}</div>
				<div class="data">
					<div class="data_item">
						<p class="num">312</p>
						<p class="text">阅读</p>
					</div>
					<div class="data_item">
						<p class="num">123</p>
						<p class="text">点赞</p>
					</div>
				</div>
				<div class="actionBtn">
					<!-- <button class="good">点赞</button> -->
					<button class="follow">关注</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { UserInfo } from '@/types';

	interface propType {
		info: UserInfo;
	}
	const props = defineProps<propType>();
</script>

<style lang="scss" scoped>
	.card {
		position: relative;
		width: 350px;
		height: 190px;
		// height: 450px;
		background-color: #fff;
		border-radius: 20px;
		box-shadow: 0 35px 80px rgba(0, 0, 0, 0.15);
		transition: 0.5s;

		.imgBox {
			position: absolute;
			width: 150px;
			height: 150px;
			top: -50px;
			left: 50%;
			background-color: #000;
			transform: translateX(-50%);
			border-radius: 20px;
			box-shadow: 0 15px 50px rgba(0, 0, 0, 0.35);
			overflow: hidden;
			transition: 0.5s;

			img {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
		}

		.content {
			position: absolute;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: flex-end;
			overflow: hidden;

			.details {
				padding: 40px;
				text-align: center;
				width: 100%;
				transition: 0.5s;
				transform: translateY(170px);
				.name {
					font-weight: 900;
					line-height: 40px;
					height: 40px;
					font-size: 30px;
				}

				.description {
					opacity: 0.5;
					font-size: 15px;
					line-height: 25px;
					height: 25px;
				}

				.data {
					display: flex;
					justify-content: space-around;
					align-items: center;
					margin-top: 10px;
					margin-bottom: 30px;

					.data_item {
						.num {
							font-size: 16px;
							color: #555;
							font-weight: 600;
							line-height: 50px;
						}
						.text {
							font-size: 15px;
							font-weight: 400;
							opacity: 0.5;
						}
					}
				}

				.actionBtn {
					display: flex;
					justify-content: center;
					gap: 20px;

					button {
						padding: 10px 45px;
						border-radius: 10px;
						border: none;
						transition: 0.8s;
					}

					button:hover {
						cursor: pointer;
						padding: 10px 65px;
						color: #fff;
						background: $buttonLinearColor;
					}

					.good {
						color: $themeColor;
						transition: 0.5s;
						font-weight: 600;
					}
					.follow {
						font-weight: 600;
						color: $themeColor;
						transition: 0.5s;
					}
				}
			}
		}
	}

	.card:hover {
		height: 450px;

		.imgBox {
			width: 250px;
			height: 250px;
		}

		.content {
			.details {
				transform: translateY(0);
			}
		}
	}
</style>
