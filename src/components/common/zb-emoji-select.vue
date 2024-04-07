<template>
	<div>
		<Vue3EmojiPicker
			v-model="selectedEmoji"
			@select="clickEmoji"
			mode="prepend"
			:hide-search="true" />
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import Vue3EmojiPicker from 'vue3-emoji-picker';
	import 'vue3-emoji-picker/css';

	interface EmitsType {
		(e: 'selectEmoji', val: string): void;
	}
	const emits = defineEmits<EmitsType>();

	const selectedEmoji = ref('');

	const clickEmoji = (emoji: any) => {
		console.log(emoji);
		emits('selectEmoji', emoji);
	};
</script>

<style lang="scss" scoped></style>
