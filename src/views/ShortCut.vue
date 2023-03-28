<script setup lang="ts">
import { ref, Ref } from 'vue'
import { ShortcutManager } from '@/utils/InputEvent'

const keyArr: Ref<string[]> = ref([])

const mindmapShortcutManager = new ShortcutManager([
	[['Control', 'Shift', 'Enter'], () => {
		console.log('trigger')
	}]
])

const handler = (keyArr: string[]) => {
	console.log('ues')
	console.log(keyArr)
}
</script>

<template>
	<div
		class="div"
		tabindex="0"
		@keydown="(event) => mindmapShortcutManager.handleInputEvent(event, keyArr, handler)"
		@blur="mindmapShortcutManager.handleBlurEvent"
	>
		{{ keyArr }}
	</div>
</template>

<style scoped lang="less">
.div {
	width: 100vw;
	height: 100vh;
	background-color: silver;

	display: flex;
	align-items: center;
	justify-content: center;

	font-size: 30px;
}

.div:focus {
	background: transparent;
	border: none;
	outline: none;
	background-color: aqua;
}
</style>
