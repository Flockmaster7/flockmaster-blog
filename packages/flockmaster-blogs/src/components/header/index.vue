<template>
	<div class="header-container">
		<div class="leftBox">
			<div class="logo">
				<div class="logo--text">Flockmaster</div>
				<div class="logo--logo">blogs</div>
			</div>
			<div class="mainBox">
				<div class="navLink" v-for="(item, index) in navLinkList">
					<router-link :to="item.src" @click="changeTag">{{
						item.title
					}}</router-link>
				</div>
			</div>
		</div>
		<!-- <div class="search">
			<el-input
				v-model="searchText"
				placeholder="你想要的这里都有"
				:suffix-icon="Search" />
		</div> -->
		<div class="rightBox">
			<div class="avater" @click="toUserDetail">
				<img src="@/static/images/login_bg.png" alt="" />
			</div>
			<el-popconfirm
				width="220"
				confirm-button-text="确定"
				cancel-button-text="取消"
				:icon="InfoFilled"
				icon-color="$themeColor"
				@confirm="confirm"
				title="是否退出登录？">
				<template #reference>
					<el-icon color="#fff" :size="20"><Tools /></el-icon>
				</template>
			</el-popconfirm>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import { navLinkList } from './nav';
	import { isLogin, logout } from '@/utils/login';
	import { Search } from '@element-plus/icons-vue';
	import { InfoFilled } from '@element-plus/icons-vue';
	import { ref } from 'vue';

	const router = useRouter();

	const toUserDetail = () => {
		if (!isLogin()) return;
		router.push('/my');
	};

	const changeTag = () => {
		window.scrollTo({
			top: 0
		});
	};

	// 退出登录
	const confirm = () => {
		console.log(11);
		logout();
	};

	const searchText = ref('');
</script>

<style lang="scss" scoped>
	.header-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 80px;
		background-color: $themeColor;

		.leftBox {
			display: flex;
			justify-content: center;
			align-items: center;
			.logo {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 40px;
				line-height: 40px;
				text-align: center;
				margin-right: 30px;
				img {
					width: 40px;
					height: 40px;
					border-radius: 50%;
				}
				&--text {
					font-size: 24px;
					font-weight: 700;
					margin-left: 5px;
				}

				&--logo {
					position: relative;
					left: 5px;
					bottom: 5px;
				}
			}
		}

		.mainBox {
			display: flex;
			justify-content: center;
			align-items: center;
			.navLink {
				width: 100px;
				height: 100%;
				text-align: center;

				a {
					color: black;
				}

				a:hover {
					font-weight: 700;
					color: rgb(51, 49, 49);
					border-bottom: 1px solid $white;
				}
			}
		}

		.rightBox {
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			.avater {
				margin-right: 10px;
				img {
					width: 35px;
					height: 35px;
					border-radius: 50%;
				}
			}
		}
	}
</style>
