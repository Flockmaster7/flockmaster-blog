<template>
	<div class="operator-container">
		<div class="dianzan active" @click="dianzan">
			<zb-svg-icon name="like" :size="18" color="#5cbfef" />
			{{ dianzanCount }}
		</div>
	</div>
</template>

<script setup lang="ts">
	interface PropsType {
		circleFriendId: number;
		dianzanCount: number;
	}

	interface EmitsType {
		(e: 'dianzan', id: number): void;
	}

	const props = defineProps<PropsType>();
	const emits = defineEmits<EmitsType>();

	const dianzan = () => {
		emits('dianzan', props.circleFriendId);
		console.log('点赞朋友圈');
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
