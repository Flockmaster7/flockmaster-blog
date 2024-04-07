<template>
	<div class="container animate__animated animate__fadeInLeft">
		<!-- 个人信息卡片 -->
		<UserInfo></UserInfo>
		<!-- 设置 -->
		<MySetting></MySetting>
		<!-- 网站资讯 -->
		<WebsiteInfo></WebsiteInfo>
		<!-- 站点信息卡片 -->
		<SiteInfo></SiteInfo>
	</div>
</template>

<script setup lang="ts">
	import MySetting from './setting.vue';
	import SiteInfo from './siteInfo.vue';
	import WebsiteInfo from './websiteInfo.vue';
	import UserInfo from './userInfo.vue';
</script>

<style lang="scss" scoped>
	// 设置右侧卡片宽度
	.el-card {
		width: 300px;
	}

	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		// margin-top: 15px;
		gap: 10px;
		// overflow-y: scroll;

		// 标签云卡片
		.tag-List {
			display: flex;
			flex-wrap: wrap;
			gap: 6px;
		}

		// 右侧卡片标题icon
		:deep(.head-icon) {
			font-size: 18px;
			margin-right: 5px;
		}

		// 右侧卡片标题文字
		:deep(.head-text) {
			font-size: 14px;
			font-weight: 700;
		}

		// 右侧卡片刷新
		:deep(.head-refresh) {
			margin-left: 10px;
		}
	}

	// 右侧卡片标题icon
	.head-icon {
		font-size: 18px;
		margin-right: 5px;
	}

	// 右侧卡片标题文字
	.head-text {
		font-size: 14px;
		font-weight: 700;
	}

	// 右侧卡片刷新
	.head-refresh {
		margin-left: 10px;
	}
</style>
