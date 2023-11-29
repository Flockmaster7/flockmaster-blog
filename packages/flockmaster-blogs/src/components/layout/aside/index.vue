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

		<!-- 标签云卡片 -->
		<!-- <el-card>
			<el-collapse v-model="activeTag">
				<el-collapse-item name="1">
					<template #title>
						<el-icon class="head-icon"><Guide /></el-icon>
						<text class="head-text"> 标签云 </text>
					</template>
					<div class="tag-List">
						<el-check-tag
							v-for="item in tagAsideList"
							:key="item.id"
							:checked="tagChecked.includes(item.id)"
							color="skyblue"
							@change="(status: boolean) => onChangeTag(status, item.id)"
							>{{ item.tag_name }}</el-check-tag
						>
					</div>
				</el-collapse-item>
			</el-collapse>
		</el-card> -->
	</div>
</template>

<script setup lang="ts">
	import MySetting from './setting.vue';
	import SiteInfo from './siteInfo.vue';
	import WebsiteInfo from './websiteInfo.vue';
	import UserInfo from './userInfo.vue';

	//标签云
	// const tgStore = useTagStore();
	// const { tagAsideList } = storeToRefs(tgStore);
	// const activeTag = ref(['1']);

	// tgStore.getAsideTgLIst(1, 9);
	// // 标签选中
	// const { getBlogListParams } = storeToRefs(blog);
	// const tagChecked = ref<number[]>([]);
	// const onChangeTag = async (status: boolean, id: number) => {
	// 	if (status) tagChecked.value.push(id);
	// 	else {
	// 		let index = tagChecked.value.indexOf(id);
	// 		if (index !== -1) tagChecked.value.splice(index, 1);
	// 	}
	// 	//获取标签对应的文章列表
	// 	getBlogListParams.value = {
	// 		tags: tagChecked.value
	// 	};
	// 	blog.getBlogList(1, 9, getBlogListParams.value);
	// };
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
