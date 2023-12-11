<template>
	<div class="operator-container">
		<div
			:class="{ dianzan: true, active: isDianzan }"
			@click="handlerDianzan">
			<zb-svg-icon
				name="like"
				:size="18"
				:color="isDianzan ? '#5cbfef' : ''" />
			{{ count }}
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';

	interface PropsType {
		circleFriendId: number;
		dianzanCount: number;
		isDianzan: boolean;
	}

	interface EmitsType {
		(e: 'dianzan', id: number): void;
		(e: 'cancelDianzan', id: number): void;
	}

	const props = defineProps<Readonly<PropsType>>();
	const emits = defineEmits<EmitsType>();

	const count = ref(props.dianzanCount);

	const handlerDianzan = () => {
		if (!props.isDianzan) dianzan();
		else cancelDianzan();
	};

	const dianzan = () => {
		emits('dianzan', props.circleFriendId);
		count.value += 1;
		console.log('点赞朋友圈');
	};

	const cancelDianzan = () => {
		emits('cancelDianzan', props.circleFriendId);
		count.value -= 1;
		console.log('取消点赞朋友圈');
	};
</script>

<style lang="scss" scoped>
	.operator-container {
		display: flex;
		justify-content: space-between;
		border-radius: 6px;
		padding: 10px 20px;
		// background: #fff7ff;
		background: var(--theme-operator-color);

		.dianzan {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 2px;
			font-size: 14px;
			color: $gray;
		}

		.active {
			color: #5cbfef;
		}

		.dianzan:hover {
			cursor: pointer;
		}
	}
</style>
