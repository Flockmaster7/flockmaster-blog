<template>
	<div class="loginOperator-container" @click="changeLoginState">
		<zb-svg-icon
			name="login"
			autoDark
			size="18"
			v-if="!loginState"></zb-svg-icon>
		<zb-svg-icon name="logout" autoDark :size="18" v-else></zb-svg-icon>
	</div>
	<el-dialog v-model="loginVisible" width="30%">
		<login @closeLogin="closeLogin"></login>
	</el-dialog>
</template>

<script lang="ts" setup>
	import login from './login.vue';
	import { isLogin, newLogout } from '@/utils/login';
	import { ElMessageBox } from 'element-plus';
	import { ref } from 'vue';

	const loginState = ref(isLogin());

	const changeLoginState = () => {
		if (loginState.value) {
			logoutBlog();
		} else {
			loginBlog();
		}
	};

	const logoutBlog = () => {
		ElMessageBox.confirm('是否退出登录', 'Warning', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			newLogout();
			loginState.value = isLogin();
		});
	};

	const loginBlog = () => {
		loginVisible.value = true;
	};

	const loginVisible = ref(false);
	const closeLogin = () => {
		loginState.value = isLogin();
		loginVisible.value = false;
		console.log(loginState.value);
	};
</script>

<style lang="scss" scoped>
	.loginOperator-container {
		display: flex;
		align-items: center;
	}

	.loginOperator-container:hover {
		cursor: pointer;
	}
</style>
