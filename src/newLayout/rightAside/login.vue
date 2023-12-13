<template>
	<div class="login-container">
		<div class="content-box">
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

			<div class="create-account">
				<p>{{ '游客' }}?</p>
				<p class="create" @click="visitorQuickLogin">
					{{ '点我快速登录' }}
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
	import { getUserInfo, login, register } from '@/http/user.ts';
	import cache from '@/utils/cache';
	import { useRouter } from 'vue-router';
	import { useUserStore } from '@/store/user';
	import { UserInfo } from '@/types';
	import { v4 as uuidv4 } from 'uuid';

	interface PropsType {
		redirect?: boolean;
	}

	interface EmitsType {
		(e: 'closeLogin'): void;
	}

	const store = useUserStore();
	const { userInfo } = storeToRefs(store);

	const router = useRouter();
	const emits = defineEmits<EmitsType>();

	const props = defineProps<PropsType>();

	const type = ref('login');

	const loginForm = reactive(
		import.meta.env.VITE_MODE_NAME === 'production'
			? {
					user_name: '',
					password: ''
			  }
			: {
					user_name: 'admin',
					password: '123456'
			  }
	);
	const loginFormRef = ref<FormInstance>();
	// 登录
	const submitLoginForm = async (formEl: FormInstance | undefined) => {
		if (!formEl) return;
		await formEl.validate(async (valid) => {
			if (!valid) {
				console.log('登录校验不通过');
			}
			try {
				const { data: res } = await login(loginForm);
				ElMessage({
					message: '登录成功',
					type: 'success'
				});
				getUserProfile();
				cache.setCache(
					import.meta.env.VITE_ACCESS_TOKEN,
					res.data.token
				);
				emits('closeLogin');
				// 跳转
				redirect();
				resetFrom();
			} catch (error: any) {
				ElMessage.error(error.message);
			}
		});
	};

	const visitorRegister = async () => {
		const registerForm = {
			user_name: uuidv4(),
			password: '123456'
		};
		await register(registerForm);
		loginForm.password = registerForm.password;
		loginForm.user_name = registerForm.user_name;
	};

	const visitorLogin = async () => {
		const { data: res } = await login(loginForm);
		if (res.code === 200) {
			cache.setCache(import.meta.env.VITE_ACCESS_TOKEN, res.data.token);
			await getUserProfile();
		}
	};

	const resetFrom = () => {
		loginForm.user_name = '';
		loginForm.password = '';
	};

	const redirect = () => {
		if (props.redirect) {
			if (router.currentRoute.value.query.from)
				router.push(String(router.currentRoute.value.query.from));
			else router.push('/home');
		}
	};

	const visitorQuickLogin = async () => {
		await visitorRegister();
		await visitorLogin();
		emits('closeLogin');
		redirect();
		resetFrom();
		ElMessage({
			message: '登录成功',
			type: 'success'
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

	// 获取用户信息
	const getUserProfile = async () => {
		const { data: res } = await getUserInfo();
		if (res.code === 200) {
			userInfo.value = res.data;
			cache.setCache<UserInfo>(import.meta.env.VITE_USERINFO, res.data);
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
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.content-box {
			width: 400px;
			border-radius: 16px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 30px;
			padding: 30px 0;
		}

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
				color: var(--theme-active-color);
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
				border-radius: 15px;
				transition: 1s;
			}
			:deep(.el-button:hover) {
				width: 160px;
				border-radius: 15px;
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
@/http/user/user
