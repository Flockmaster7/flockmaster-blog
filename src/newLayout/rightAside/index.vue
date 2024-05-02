<template>
	<div class="rightAside-container">
		<div class="top">
			<NoticeOperator></NoticeOperator>
			<zb-theme></zb-theme>
			<LoginOperator></LoginOperator>
		</div>
		<div class="center">
			<FindMe></FindMe>
			<LastestComments></LastestComments>
			<HotBlogs></HotBlogs>
		</div>
		<div class="footer"></div>
	</div>
</template>

<script lang="ts" setup>
	import LastestComments from './latestComments.vue';
	import HotBlogs from './hotBlogs.vue';
	import FindMe from './findMe.vue';
	import LoginOperator from './loginOperator.vue';
	import NoticeOperator from './noticeOperator.vue';
</script>

<style lang="scss" scoped>
	.rightAside-container {
		padding: 20px;
		.top {
			// width: 40px;
			height: 50px;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			gap: 30px;

			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
	}
</style>
