<template>
	<div class="leftAside-container">
		<div class="top">
			<img src="../../static/images/admin_bg.png" alt="" />
		</div>
		<div class="center">
			<navBar></navBar>
		</div>
		<div class="footer">
			<SiteSratistics></SiteSratistics>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import navBar from './navBar.vue';
	import SiteSratistics from './siteStatistics.vue';
</script>

<style lang="scss" scoped>
	.leftAside-container {
		padding: 20px 40px;
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
