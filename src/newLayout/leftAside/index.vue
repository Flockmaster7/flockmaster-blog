<template>
	<div class="leftAside-container" ref="leftAside">
		<div class="top">
			<img v-lazy="userInfo.user_image" alt="" />
			<p class="name">{{ userInfo.name }}</p>
		</div>
		<div class="center">
			<navBar></navBar>
		</div>
		<div class="footer">
			<SiteSratistics :isLoading="isLoading"></SiteSratistics>
			<Subfield></Subfield>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import useStore from '@/store';
	import navBar from './navBar.vue';
	import SiteSratistics from './siteStatistics.vue';
	import { storeToRefs } from 'pinia';
	import { isLogin } from '@/utils/login';
	import useSkeleton from '@/hooks/useSkeleton';
	import Subfield from './subfield.vue';

	const { common, user, notice } = useStore();
	const { userInfo } = storeToRefs(user);

	const getInfo = async () => {
		if (isLogin()) {
			await user.getUserProfile();
			await notice.getNoRead(userInfo.value?.id);
		}
	};
	getInfo();

	const { isLoading } = useSkeleton(common.getWebsite);
</script>

<style lang="scss" scoped>
	.leftAside-container {
		padding: 20px 40px;
		.top {
			width: 100%;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			gap: 15px;
			.name {
				color: #fcbffc;
				font-size: 16px;
				font-family: 'Gill Sans', 'Gill Sans MT', Calibri,
					'Trebuchet MS', sans-serif;
			}

			img {
				width: 40px;
				height: 40px;
				border-radius: 50%;
			}
		}
	}
</style>
