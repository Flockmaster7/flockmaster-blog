<template>
	<div>
		<!-- <el-card> -->
		<el-form
			ref="formRef"
			label-width="60px"
			:rules="formRules"
			inline
			hide-required-asterisk
			:model="updateForm"
			style="max-width: 460px">
			<el-form-item label="用户名" prop="name">
				<el-input v-model="updateForm.name" />
			</el-form-item>
			<el-form-item label="个性签名" prop="description">
				<el-input v-model="updateForm.description" type="textarea" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="saveForm(formRef)"
					>保存</el-button
				>
			</el-form-item>
		</el-form>
		<!-- </el-card> -->
	</div>
</template>

<script setup lang="ts">
	import { getUserInfo, updateUserInfo } from '@/http/user';
	import { GetUserInfoResType } from '@/types';
	import cache from '@/utils/cache';
	import type { FormInstance, FormRules } from 'element-plus';
	import { ElMessage } from 'element-plus';
	import { reactive, ref } from 'vue';
	import { userStore } from '@/store/user';
	import { storeToRefs } from 'pinia';

	const user = userStore();
	const { type } = storeToRefs(user);

	const userInfo = ref(
		cache.getCache<GetUserInfoResType>(import.meta.env.VITE_USERINFO)
	);

	const updateForm = reactive({
		name: userInfo.value.name,
		description: userInfo.value.description
	});

	const formRef = ref<FormInstance>();

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
			cache.setCache<GetUserInfoResType>(
				import.meta.env.VITE_USERINFO,
				res.data
			);
		}
	};

	// 保存
	const saveForm = async (formEl: FormInstance | undefined) => {
		if (!formEl) return;
		await formEl.validate(async (valid) => {
			if (!valid) {
				console.log('注册校验不通过');
			}
			const { data: res } = await updateUserInfo(updateForm);
			// 保存到本地
			cache.setCache(import.meta.env.VITE_USERINFO, res.data);
			ElMessage({
				message: '保存成功',
				type: 'success'
			});
			type.value = 'read';
		});
	};
</script>

<style scoped></style>
