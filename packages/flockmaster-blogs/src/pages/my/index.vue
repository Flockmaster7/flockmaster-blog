<template>
	<div class="my-container">
		<el-row justify="center">
			<el-col :span="12">
				<div class="main">
					<div class="left">
						<div class="left-info">
							<div class="left-avatar">
								<img
									class="left-avatar-img"
									src="@/static/images/logo/vite.svg" />
							</div>
							<div class="left-name">
								{{ userInfo?.name }}
							</div>
							<div class="left-description">
								{{ userInfo?.description }}
							</div>
						</div>

						<div class="left-updateButton" v-if="type === 'read'">
							<el-button @click="handlerUpdate"
								>修改信息</el-button
							>
						</div>
					</div>
				</div>
			</el-col>
			<el-col :span="12">
				<blogList v-show="type === 'read'"></blogList>
				<updateUserForm v-show="type === 'edit'"></updateUserForm>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
	import blogList from './blogList.vue';
	import updateUserForm from './updateUserForm.vue';
	import { getUserInfo } from '@/http/user';
	import { userStore } from '@/store/user';
	import { storeToRefs } from 'pinia';
	import { ref } from 'vue';
	const user = userStore();
	const { userInfo } = storeToRefs(user);
	const type = ref('read');
	const handlerUpdate = () => {
		type.value = 'edit';
	};
</script>

<style lang="scss" scoped>
	.my-container {
		// height: 100vh;
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
