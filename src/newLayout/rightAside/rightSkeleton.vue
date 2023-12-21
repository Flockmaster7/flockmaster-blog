<template>
	<div class="rightSkeleton-container">
		<div class="comment-item" v-for="item in 3" :key="item">
			<div class="comment-item-avatar">
				<el-skeleton-item
					variant="image"
					:style="{
						width: 40 + 'px',
						height: 40 + 'px',
						borderRadius: 8 + 'px'
					}" />
			</div>
			<div class="comment-item-info">
				<div class="top">
					<el-skeleton-item variant="text" />
				</div>
				<div class="bottom">
					<el-skeleton-item variant="text" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
	.rightSkeleton-container {
		display: flex;
		flex-wrap: wrap;
		gap: 15px;
	}
	.comment-item {
		max-width: 210px;
		display: flex;
		align-items: center;
		gap: 10px;

		&-avatar {
			width: 40px;
			height: 40px;

			img {
				width: 100%;
				height: 100%;
				border-radius: 5px;
			}
		}

		&-info {
			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 10px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;

				.name {
					font-size: 13px;
					color: $gray;
				}

				.date {
					font-size: 10px;
					color: $gray;
				}
			}

			.bottom {
				border-radius: 4px;
				padding: 4px;
				background: var(--theme-data-show);
				width: 150px;
				font-size: 12px;
				margin-top: 4px;

				p {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
</style>
