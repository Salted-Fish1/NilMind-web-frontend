<script setup lang="ts">
interface IProps {
	msg: string
}

const props = defineProps<IProps>()
</script>

<template>
	<div class="form-item">
		<div class="msg">{{ props.msg }}</div>
		<slot></slot>
	</div>
</template>

<style scoped lang="less">
</style>
