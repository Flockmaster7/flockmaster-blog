<template>
	<div class="container">
		<div class="left">
			<p class="title">个人信息</p>
			<!-- <zbInfoItem :info="userInfo" /> -->
			<div class="avatar">
				<img :src="userInfo.user_image" alt="" />
			</div>
			<div class="name">{{ userInfo.name }}</div>
			<div class="data">
				<div class="data-item">
					<div class="text">文章</div>
					<div class="number">2</div>
				</div>
				<div class="data-item">
					<div class="text">关注</div>
					<div class="number">{{ userInfo.user_focus }}</div>
				</div>
				<div class="data-item">
					<div class="text">粉丝</div>
					<div class="number">{{ userInfo.user_fans }}</div>
				</div>
			</div>
		</div>
		<div class="right">
			<div class="top">
				<div class="item">文章</div>
			</div>
			<div class="main">
				<div class="blog-list">
					<div class="blog-item"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import zbInfoItem from '@/components/item/zb-infoItem.vue';
	import blogList from './blogList.vue';
	import updateUserForm from './updateUserForm.vue';
	import { getUserInfo } from '@/http/user';
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia';
	import { ref } from 'vue';
	const user = useUserStore();
	const { userInfo } = storeToRefs(user);
	const type = ref('read');
	const handlerUpdate = () => {
		type.value = 'edit';
	};
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		justify-content: space-between;
		gap: 20px;
		// align-items: center;
		margin: 15px;

		.left {
			background-color: $white;
			border-radius: 20px;
			flex-basis: 40%;
			height: 600px;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			gap: 30px;

			.title {
				// color: $themeColor;
				font-weight: 600;
				font-size: 18px;
				margin-bottom: 50px;
			}

			.avatar {
				width: 200px;
				height: 200px;
				border-radius: 50%;
				overflow: hidden;
				img {
					width: 100%;
					height: 100%;
				}
			}

			.name {
				font-size: 25px;
				font-weight: 800;
				margin-top: 10px;
			}

			.data {
				display: flex;
				justify-content: space-around;
				align-items: center;
				gap: 40px;

				.data-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					gap: 6px;
					.text {
						font-weight: 500;
					}

					.number {
						font-weight: 600;
					}
				}
			}
		}

		.right {
			flex-basis: 60%;
			background-color: $white;
			border-radius: 20px;

			.top {
				height: 50px;
				display: flex;
				justify-content: space-between;
				border-bottom: 2px solid #ccc;
				.item {
					font-weight: 700;
					line-height: 50px;
					padding-left: 20px;
				}
			}
		}
	}

	.main {
		height: 600px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.left {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			gap: 10px;
			.left-info {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-bottom: 15px;
				gap: 10px;
				.left-avatar {
					width: 300px;
					height: 300px;
					border-radius: 50%;
					border: 8px solid #fff;
					&-img {
						width: 300px;
						height: 300px;
						border-radius: 50%;
						box-shadow: 0px 5px 5px #fcfcfc;
					}
				}

				.left-name {
					font-size: 40px;
					font-weight: 600;
					margin-top: 20px;
				}
				.left-description {
					color: #ccc;
					font-size: 20px;
					// margin-top: 5px;
				}
			}

			.left-updateButton {
				// padding-top: 40px;
			}
		}
	}
</style>
