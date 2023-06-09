<template>
	<div class="login-container">
		<div class="login-container--bg"></div>
		<div class="login-container--rightBox">
			<div class="login-container--logo">
				<img class="logo" src="@/static/images/logo/vite.svg" alt="" />
			</div>
			<div class="login-container--form" v-show="type === 'login'">
				<el-form
					ref="loginFormRef"
					label-width="60px"
					:rules="formRules"
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
							<el-button @click="resetForm(loginFormRef)"
								>重置</el-button
							>
							<el-button
								type="primary"
								@click="submitLoginForm(loginFormRef)"
								>登录</el-button
							>
						</div>
					</el-form-item>
					<div
						class="register-link"
						@click="changeFormType('register')"
						v-show="type === 'login'">
						注册
					</div>
					<div
						class="register-link"
						@click="changeFormType('forget')"
						v-show="type === 'login'">
						忘记密码
					</div>
				</el-form>
			</div>
			<div class="login-container--form" v-show="type === 'register'">
				<el-form
					ref="registerFormRef"
					label-width="60px"
					:rules="formRules"
					inline
					hide-required-asterisk
					:model="registerForm"
					style="max-width: 460px">
					<el-form-item label="账号" prop="user_name">
						<el-input v-model="registerForm.user_name" />
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input
							v-model="registerForm.password"
							type="password" />
					</el-form-item>
					<!-- <el-form-item label="验证码">
						<el-input v-model="formLabelAlign.type" />
					</el-form-item> -->
					<el-form-item>
						<div class="bottom-box">
							<el-button
								type="primary"
								@click="submitRegisterForm(registerFormRef)"
								>注册</el-button
							>
						</div>
					</el-form-item>
					<div
						class="register-link"
						@click="changeFormType('login')"
						v-show="type === 'login'">
						登录
					</div>
				</el-form>
			</div>
			<div class="login-container--form" v-show="type === 'forget'">
				<el-form
					ref="forgetFormRef"
					label-width="60px"
					:rules="formRules"
					inline
					hide-required-asterisk
					:model="forgetForm"
					style="max-width: 460px">
					<el-form-item label="账号" prop="user_name">
						<el-input v-model="forgetForm.user_name" />
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input
							v-model="forgetForm.password"
							type="password" />
					</el-form-item>
					<el-form-item label="确认密码" prop="password">
						<el-input
							v-model="forgetForm.second_password"
							type="password" />
					</el-form-item>
					<!-- <el-form-item label="验证码">
						<el-input v-model="formLabelAlign.type" />
					</el-form-item> -->
					<el-form-item>
						<div class="bottom-box">
							<el-button
								type="primary"
								@click="submitUpdatePasswordForm(forgetFormRef)"
								>修改</el-button
							>
						</div>
					</el-form-item>
					<div
						class="register-link"
						@click="changeFormType('login')"
						v-show="type === 'login'">
						登录
					</div>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { reactive, ref } from 'vue';
	import type { FormInstance, FormRules } from 'element-plus';
	import { ElMessage } from 'element-plus';
	import { storeToRefs } from 'pinia';
	import {
		getUserInfo,
		login,
		register,
		updatePassword
	} from '@/http/user/index';
	import cache from '@/utils/cache';
	import { useRouter } from 'vue-router';
	import { userStore } from '@/store/user';
	import { GetUserInfoResType } from '@/types';

	const store = userStore();
	const { userInfo } = storeToRefs(store);

	const router = useRouter();

	const type = ref('login');

	const loginForm = reactive({
		user_name: 'admin',
		password: '123456'
	});
	const loginFormRef = ref<FormInstance>();
	const submitLoginForm = async (formEl: FormInstance | undefined) => {
		if (!formEl) return;
		await formEl.validate(async (valid) => {
			if (!valid) {
				console.log('登录校验不通过');
			}
			const { data: res } = await login(loginForm);
			ElMessage({
				message: '登录成功',
				type: 'success'
			});
			getUserProfile();
			cache.setCache(import.meta.env.VITE_ACCESS_TOKEN, res.data.token);
			router.push('/');
		});
	};

	const registerForm = reactive({
		user_name: '',
		password: ''
	});
	const registerFormRef = ref<FormInstance>();
	const submitRegisterForm = async (formEl: FormInstance | undefined) => {
		if (!formEl) return;
		await formEl.validate(async (valid) => {
			if (!valid) {
				console.log('注册校验不通过');
			}
			const { data: res } = await register(registerForm);
			console.log(res.data);
			alert('注册成功');
			type.value = 'login';
		});
	};

	const forgetForm = reactive({
		user_name: '',
		password: '',
		second_password: ''
	});
	const forgetFormRef = ref<FormInstance>();
	const submitUpdatePasswordForm = async (
		formEl: FormInstance | undefined
	) => {
		if (!formEl) return;
		await formEl.validate(async (valid) => {
			if (!valid) {
				console.log('校验不通过');
			}
			const { user_name, password } = forgetForm;
			const { data: res } = await updatePassword({ user_name, password });
			console.log(res);
			alert('修改成功');
			type.value = 'login';
		});
	};

	const formRules = reactive<FormRules>({
		user_name: [
			{
				required: true,
				message: '请输入账号',
				trigger: 'blur'
			},
			{
				min: 3,
				max: 13,
				message: '账号应在3到13位',
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

	const resetForm = (formEl: FormInstance | undefined) => {
		if (!formEl) return;
		formEl.resetFields();
	};

	const changeFormType = (t: string) => {
		type.value = t;
	};

	const showForgetPassword = () => {};

	// 获取用户信息
	const getUserProfile = async () => {
		const { data: res } = await getUserInfo();
		if (res.code === 200) {
			userInfo.value = res.data;
			cache.setCache<GetUserInfoResType>(
				import.meta.env.VITE_USERINFO,
				res.data
			);
		}
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
