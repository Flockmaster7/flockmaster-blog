<template>
	<div
		class="circleFriendCommentPost-container animate__animated animate__fadeIn">
		<el-input
			v-model="commentQuery"
			clearable
			placeholder="评论"
			ref="inputRef"></el-input>
		<!-- <ZbEmojiSelect @selectEmoji="selectEmoji"></ZbEmojiSelect> -->
		<el-button type="primary" @click="comment">发送</el-button>
	</div>
</template>

<script setup lang="ts">
	import { PINGLUNPYQ } from '@/constant';
	import useStore from '@/store';
	import { CircleFriendForm } from '@/types';
	import { systemNotice } from '@/utils/notice';
	import { ElMessage } from 'element-plus';
	import { storeToRefs } from 'pinia';
	import { onMounted, ref } from 'vue';
	// import ZbEmojiSelect from '@/components/common/zb-emoji-select.vue';

	interface PropsType {
		circleFriendId: number;
		replyTo?: number;
	}

	interface EmitsType {
		(e: 'handlerComment'): void;
		(e: 'handlerBlur'): void;
	}

	const props = defineProps<Readonly<PropsType>>();
	const emits = defineEmits<EmitsType>();

	const commentQuery = ref('');
	const { user, circleFriend } = useStore();
	const { userInfo } = storeToRefs(user);

	const comment = async () => {
		const form: CircleFriendForm = {
			circleFriendId: props.circleFriendId,
			content: commentQuery.value,
			userId: userInfo.value.id
		};
		props.replyTo && (form.replyTo = props.replyTo);
		const res1 = await circleFriend.comment(form);
		const res2 = await circleFriend.getCommentListById({
			pageNum: 1,
			pageSize: 999,
			circleFriendId: props.circleFriendId
		});
		if (res1 && res2) {
			ElMessage.success('评论成功');
			systemNotice(PINGLUNPYQ);
			commentQuery.value = '';
			emits('handlerComment');
		}
	};

	// 自动聚焦
	const inputRef = ref<HTMLElement | null>(null);
	onMounted(() => {
		inputRef.value?.focus();
	});

	const selectEmoji = (emoji: string) => {
		console.log(emoji);
		// commentQuery.value += emoji;
	};
</script>

<style lang="scss" scoped>
	@import '../../static/css/mixins.scss';
	.circleFriendCommentPost-container {
		@include flex-center(4px);
	}
</style>
