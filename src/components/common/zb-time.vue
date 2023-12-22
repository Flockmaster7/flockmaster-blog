<template>
	<span class="time">{{ createdAt }}</span>
</template>

<script setup lang="ts">
	import { getTimeFormNow } from '@/utils/dayFormat';
	import { computed } from 'vue';

	interface PropsType {
		time: string;
		type?: 'date' | 'fromNow' | 'all';
	}

	const props = withDefaults(defineProps<PropsType>(), {
		type: 'all'
	});

	const createdAt = computed(() => {
		if (props.type === 'date') {
			return props.time.split(' ')[0];
		} else if (props.type === 'fromNow') {
			return getTimeFormNow(props.time);
		}
		return props.time;
	});
</script>

<style lang="scss" scoped>
	.time {
		font-size: 14px;
		color: #8a919f;
	}
</style>
