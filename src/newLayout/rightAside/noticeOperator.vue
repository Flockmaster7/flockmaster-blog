<template>
	<div class="loginOperator-container" @click="openNoticeBox">
		<el-badge
			class="item"
			:value="noReadNum > 99 ? '99+' : noReadNum"
			:hidden="badgeHidden">
			<zb-svg-icon name="notice" autoDark :size="19"></zb-svg-icon>
		</el-badge>
	</div>
	<el-drawer
		v-model="noticeVisible"
		:append-to-body="true"
		:size="drawerOption.size"
		:direction="drawerOption.direction">
		<NoticeList></NoticeList>
		<template #header>
			<div class="header-container">
				<div class="title">消息通知</div>
				<!-- <zb-svg-icon
					@click="allRead"
					name="yijianyidu"
					color="#72767b"
					autoDark
					:size="18"></zb-svg-icon> -->
				<div :class="['icon', isRefreshing ? 'rotate-icon' : '']">
					<zb-svg-icon
						@click="refreshNotice"
						name="refresh"
						color="#72767b"
						autoDark
						:size="20"></zb-svg-icon>
				</div>
			</div>
		</template>
	</el-drawer>
</template>

<script lang="ts" setup>
	import { computed, ref } from 'vue';
	import NoticeList from './noticeList.vue';
	import useStore from '@/store';
	import { storeToRefs } from 'pinia';
	import { ElMessage } from 'element-plus';

	const noticeVisible = ref(false);
	const badgeHidden = computed(() => {
		return noReadNum.value <= 0 ? true : false;
	});

	const { notice, user, common } = useStore();
	const { noReadNum } = storeToRefs(notice);
	const { userInfo } = storeToRefs(user);
	const { isMobile } = storeToRefs(common);

	const drawerOption = computed(() => {
		if (isMobile.value) {
			return {
				size: '100%',
				direction: 'btt'
			};
		} else {
			return {
				size: '25%',
				direction: 'rtl'
			};
		}
	});

	const openNoticeBox = () => {
		noticeVisible.value = !noticeVisible.value;
	};

	const isRefreshing = ref(false);
	const refreshNotice = async () => {
		isRefreshing.value = true;
		const res = await notice.getNoticeList(1, 999, {
			userId: userInfo.value.id
		});
		if (res) {
			ElMessage.success('刷新消息成功！');
		}
		setTimeout(() => {
			isRefreshing.value = false;
		}, 500);
	};
</script>

<style lang="scss" scoped>
	@import '../../static/css/mixins.scss';

	@include icon-rotate();

	.header-container {
		@include flex-box(15px);
	}

	.item,
	.icon {
		&:hover {
			cursor: pointer;
		}
	}
</style>
