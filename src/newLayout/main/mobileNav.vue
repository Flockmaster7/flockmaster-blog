<template>
	<el-drawer v-model="mobileNavOpen" size="40%" title="导航" direction="ltr">
		<div class="operatorMain">
			<div class="operator-avatar">
				<zb-image
					:src="userInfo.user_image"
					:style="{
						height: 70 + 'px',
						width: 70 + 'px',
						borderRadius: 50 + '%'
					}" />
			</div>
			<div class="operator-list">
				<div
					class="operator-item"
					@click="handleOperator(item)"
					v-for="(item, index) in navList"
					:key="index">
					<zb-svg-icon
						:name="item.icon"
						:autoDark="true"></zb-svg-icon>
					<span>{{ item.title }}</span>
				</div>
			</div>
		</div>
	</el-drawer>
</template>

<script setup lang="ts">
	import useStore from '@/store';
	import { HeaderNavType } from '@/types';
	import { isLogin, logout } from '@/utils/login';
	import { ElMessageBox } from 'element-plus';
	import { storeToRefs } from 'pinia';
	import { computed, ref } from 'vue';
	import { useRouter } from 'vue-router';
	import { mobileNav } from '@/config/headerNav';

	const { user, common } = useStore();
	const { userInfo } = storeToRefs(user);
	const { mobileNavOpen } = storeToRefs(common);
	const router = useRouter();

	const navList = computed(() => {
		if (isLogin()) {
			return mobileNav.filter((item) => {
				return item.type !== 'login';
			});
		} else {
			return mobileNav.filter((item) => {
				return item.type !== 'logout';
			});
		}
	});

	// 移动端
	// 选中nav
	const currentNav = ref('首页');
	// 点击下来菜单
	const handleOperator = (operator: HeaderNavType) => {
		if (operator.type === 'logout') {
			ElMessageBox.confirm('是否退出登录', 'Warning', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				logout();
				mobileNavOpen.value = false;
			});
		} else {
			currentNav.value = operator.title;
			router.push(operator.src);
			mobileNavOpen.value = false;
		}
	};
</script>

<style lang="scss" scoped>
	.operatorMain {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 35px;

		.operator-list {
			display: flex;
			flex-direction: column;
			gap: 30px;
			.operator-item {
				display: flex;
				gap: 7px;
				// justify-content: center;
				align-items: center;
			}
		}
	}
</style>
