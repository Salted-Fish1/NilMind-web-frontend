<script setup lang="ts">

interface Props {
	name: string
}

const props = defineProps<Props>()
</script>

<template>
	<div class="project">
		<div class="image">
			<img src="@/assets/200*120.png" >
		</div>
		<div class="name">{{ props.name }}</div>
	</div>
</template>

<style scoped lang="less">
.project {
	// display: flex;
	// flex-direction: column;

	// align-items: center;

	width: 200px;
	height: 160px;

	border: 1px solid rgba(0, 0, 0, .12);
	box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
	border-radius: 5px;

	.image {
		display: flex;

		width: 200px;
		height: 120px;

		align-items: center;
		justify-content: center;

		box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
	}

	.name {
		display: flex;

		justify-content: center;
		align-items: center;

		height: 40px;
		width: 200px;

		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
}
</style>
