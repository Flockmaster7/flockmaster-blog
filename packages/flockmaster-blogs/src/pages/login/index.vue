<template>
	<div class="login-container">
		<div class="login-container--leftBox">
			<img src="@/static/images/login_bg.png" alt="Flockmaster" />
			<h2>Flockmaster Blog</h2>
			<p>欢迎来到我的个人博客</p>
		</div>
		<div class="login-container--rightBox">
			<img class="logo" src="@/static/images/logo.png	" alt="" />
			<p class="header">Welcome to Flockmaster Blog</p>
			<div class="form" v-show="type === 'login'">
				<el-form
					ref="loginFormRef"
					label-width="60px"
					:rules="formRules"
					inline
					hide-required-asterisk
					:model="loginForm"
					style="max-width: 460px">
					<div class="form-list">
						<el-form-item prop="user_name">
							<el-input v-model="loginForm.user_name" />
						</el-form-item>
						<el-form-item prop="password">
							<el-input
								v-model="loginForm.password"
								show-password
								type="password" />
						</el-form-item>
						<el-form-item>
							<div class="bottom-button">
								<el-button
									@click="submitLoginForm(loginFormRef)"
									>登录</el-button
								>
							</div>
						</el-form-item>
					</div>
				</el-form>
			</div>
			<div class="form" v-show="type === 'register'">
				<el-form
					ref="registerFormRef"
					label-width="60px"
					:rules="formRules"
					inline
					hide-required-asterisk
					:model="registerForm"
					style="max-width: 460px">
					<div class="form-list">
						<el-form-item prop="user_name">
							<el-input v-model="registerForm.user_name" />
						</el-form-item>
						<el-form-item prop="password">
							<el-input
								v-model="registerForm.password"
								show-password
								type="password" />
						</el-form-item>
						<el-form-item>
							<div class="bottom-button">
								<el-button
									@click="submitRegisterForm(registerFormRef)"
									>注册</el-button
								>
							</div>
						</el-form-item>
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
			<div
				class="create-account"
				@click="
					changeFormType(type === 'login' ? 'register' : 'login')
				">
				<p>{{ type === 'login' ? '新用户' : '已有账号' }}?</p>
				<p class="create">
					{{ type === 'register' ? '去登录' : '创建账号' }}
				</p>
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
	import { useUserStore } from '@/store/user';
	import { GetUserInfoResType } from '@/types';

	const store = useUserStore();
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
			router.push('/home');
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
			ElMessage({
				message: '登录成功',
				type: 'success'
			});
			type.value = 'login';
			registerForm.user_name = '';
			registerForm.password = '';
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
	@media screen and (max-width: 540px) {
		.login-container {
			&--leftBox {
				display: none !important;
			}
			&--rightBox {
				flex-basis: 100% !important;
			}
		}
	}
	.login-container {
		display: flex;
		min-height: 90vh;
		padding: 10px 0;

		&--leftBox {
			flex-basis: 50%;
			padding: 1rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 1rem;
			background-color: $themeColor;

			img {
				width: 100%;
				max-width: 400px;
			}

			h2 {
				font-size: 1.75rem;
				font-weight: 500;
				color: $white;
			}

			p {
				max-width: 500px;
				font-size: 1.2rem;
				text-align: center;
				color: $white;
			}
		}

		&--rightBox {
			background-color: $white;
			flex-basis: 50%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 30px;

			.logo {
				max-width: 150px;
				// margin: auto;
				// margin-bottom: 2rem;
			}

			.header {
				margin-bottom: 1rem;
				font-size: 1.2rem;
				font-weight: 500;
				color: $gray;
				text-align: center;
			}

			.form {
				:deep(.el-input) {
					border-bottom: 2px solid #b2b3b2;
				}

				:deep(.el-input__wrapper) {
					border: 0;
					background-color: #ffffff;
					border-bottom: #a4c4b5;
					box-shadow: none;
				}

				.form-list {
					transition: 1s;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					gap: 10px;
					.forgot {
						font-size: 14px;
						color: #717775;
					}
				}
			}

			.create-account {
				display: flex;

				font-size: 14px;
				color: #717775;
				.create {
					color: #a4c4b5;
					margin-left: 10px;
					text-decoration: underline;
				}
				.create:hover {
					cursor: pointer;
				}
			}

			.bottom-button {
				margin-top: 20px;
				:deep(.el-button) {
					width: 130px;
					background-color: #a4c4b5;
					border-radius: 15px;
					transition: 1s;
				}
				:deep(.el-button:hover) {
					color: #fff;
					width: 160px;
					background-color: #84c5a7;
					border-radius: 15px;
				}
			}
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
