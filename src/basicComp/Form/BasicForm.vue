<script setup lang="ts">
interface IProps {
	labelWidth?: number
}

const props = defineProps<IProps>()
</script>

<template>
	<div class="form">
		<slot></slot>
	</div>
</template>

<style scoped lang="less">
.form {

}
:slotted(.msg) {
	background-color: aqua;
	width: v-bind('$props.labelWidth')px
}
</style>
