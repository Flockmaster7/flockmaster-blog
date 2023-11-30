<template>
	<div class="rightAside-container">
		<div class="top">
			<img src="../../static/images/admin_bg.png" alt="" />
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
	import LastestComments from './latestComments';
	import HotBlogs from './hotBlogs';
	import FindMe from './findMe';
</script>

<style lang="scss" scoped>
	.rightAside-container {
		padding: 20px 35px;
		.top {
			width: 40px;
			height: 40px;

			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
	}
</style>
