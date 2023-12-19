<template>
	<div class="allReply" @click="getChildrenList" v-show="!isLoading">
		查看全部回复
	</div>
	<zb-loading v-show="isLoading" :height="50"></zb-loading>
</template>

<script setup lang="ts">
	import zbLoading from '@/components/common/zb-loading.vue';
	import useStore from '@/store';
	import { ref } from 'vue';

	interface PropsType {
		id: number;
	}

	interface EmitsType {
		(e: 'closeAllReply'): void;
	}

	const { blog } = useStore();

	const props = defineProps<PropsType>();
	const emits = defineEmits<EmitsType>();

	const isLoading = ref(false);

	//获取子评论
	const getChildrenList = async () => {
		isLoading.value = true;
		await blog.getChildrenComment(props.id, 1, 999);
		isLoading.value = false;
		emits('closeAllReply');
	};
</script>

<style lang="scss" scoped>
	.allReply {
		margin-top: 15px;
		font-size: 13px;
		color: var(--theme-text-1);
	}

	.allReply:hover {
		cursor: pointer;
	}
</style>
