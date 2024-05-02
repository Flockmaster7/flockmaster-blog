<template>
	<div class="noticeItem-container" @click="read">
		<div class="red-point" v-if="isRead === '未读'"></div>
		<!-- <div class="user">{{ notice?.user?.name }}</div> -->
		<div class="left">
			<div class="content">{{ notice?.message?.content }}</div>
			<zb-time :time="notice.createdAt" type="fromNow"></zb-time>
		</div>
		<div class="read">{{ isRead }}</div>
	</div>
</template>

<script setup lang="ts">
	import useStore from '@/store';
	import { Notice } from '@/types';
	import { storeToRefs } from 'pinia';
	import { ref } from 'vue';

	interface PropsType {
		notice: Notice;
	}

	const props = defineProps<PropsType>();
	const { notice: noticeStore } = useStore();
	const { noReadNum } = storeToRefs(noticeStore);

	const isRead = ref(props?.notice?.isRead ? '已读' : '未读');

	const read = async () => {
		if (isRead.value === '已读') return;
		const form = {
			id: props.notice?.id,
			isRead: 1
		};
		const res = await noticeStore.readNotice(form);
		if (res) {
			isRead.value = '已读';
			noReadNum.value -= 1;
		}
	};
</script>

<style lang="scss" scoped>
	@import '../../static/css/mixins.scss';

	.noticeItem-container {
		@include flex-between(0);
		width: 100%;
		height: 60px;
		// background-color: var(--theme-card-bg-color);
		border-top: 1px solid var(--theme-box-show-1);
		padding: 0 20px;

		.left {
			@include flex-column-box(8px);
		}

		.read {
			font-size: 14px;
			color: var(--theme-text-1);
		}

		.red-point {
			position: absolute;
			right: 0;
			top: 0;
			width: 6px;
			height: 6px;
			border-radius: 50%;
			background-color: red;
		}

		&:hover {
			cursor: pointer;
		}
	}
</style>
