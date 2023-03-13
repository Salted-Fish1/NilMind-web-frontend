<script setup lang="ts">
export interface IItem {
	key: string
	name: string
	img: string
}
interface IProps {
	item: IItem
}
const props = defineProps<IProps>()
</script>

<template>
	<div class="item">
		<div class="image">
			<img :src="props.item.img">
		</div>
		<div class="title">{{ props.item.name }}</div>
	</div>
</template>

<style scoped lang="less">
.item {
	border-radius: 100px;
}
</style>
