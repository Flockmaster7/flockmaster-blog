<template>
	<div class="login-container">
		<div class="login-container--bg"></div>
		<div class="login-container--rightBox">
			<div class="login-container--logo">
				<img class="logo" src="@/static/images/logo/vite.svg" alt="" />
			</div>
			<div class="login-container--form">
				<el-form
					ref="formRef"
					label-width="60px"
					:rules="loginFormRules"
					inline
					hide-required-asterisk
					:model="loginForm"
					style="max-width: 460px">
					<el-form-item label="账号" prop="user_name">
						<el-input v-model="loginForm.user_name" />
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input
							v-model="loginForm.password"
							type="password" />
					</el-form-item>
					<!-- <el-form-item label="验证码">
						<el-input v-model="formLabelAlign.type" />
					</el-form-item> -->
					<el-form-item>
						<div class="bottom-box">
							<el-button @click="resetForm(formRef)"
								>重置</el-button
							>
							<el-button
								type="primary"
								@click="submitForm(formRef)"
								>登录</el-button
							>
							<router-link to="#">忘记密码</router-link>
						</div>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { reactive, ref } from 'vue';
	import type { FormInstance, FormRules } from 'element-plus';

	const loginForm = reactive({
		user_name: '',
		password: ''
	});

	const formRef = ref<FormInstance>();

	const loginFormRules = reactive<FormRules>({
		user_name: [
			{
				required: true,
				message: '请输入账号',
				trigger: 'blur'
			},
			{
				min: 6,
				max: 13,
				message: '账号应在6到13位',
				trigger: 'blur'
			}
		],
		password: [
			{
				required: true,
				message: '请输入密码',
				trigger: 'change'
			},
			{
				min: 6,
				max: 13,
				message: '密码应在6到13位',
				trigger: 'blur'
			}
		]
	});

	const submitForm = async (formEl: FormInstance | undefined) => {
		if (!formEl) return;
		await formEl.validate((valid) => {
			if (!valid) {
				console.log('登录校验不通过');
			}
			console.log(loginForm);
		});
	};

	const resetForm = (formEl: FormInstance | undefined) => {
		if (!formEl) return;
		formEl.resetFields();
	};
</script>

<style lang="scss" scoped>
	.bottom-button {
		width: 100%;
		display: flex;

		// &--forget {
		// 	margin-left: 20px;
		// }
	}

	.login-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 90vh;

		&--bg {
			width: 60%;
			height: 100%;
			background-color: #fff;
			background-image: url('@/static/images/login_bg.png');
			background-repeat: no-repeat;
			background-size: cover;
		}

		&--rightBox {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 40%;
			height: 100%;
			background-color: #eee;
			// background-image: url('@/static/images/login_bg_right.png');
			background-repeat: no-repeat;
			background-size: cover;
		}

		&--form {
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #fff;
			width: 60%;
			height: 300px;
		}

		&--logo {
			width: 100px;
			height: 100px;
			border-radius: 50%;
			position: relative;
			.logo {
				position: absolute;
				width: 100px;
				height: 100px;
				border-radius: 50%;
				bottom: -15%;
			}
		}
	}

	.el-form {
		margin-left: 36px;
	}
</style>
