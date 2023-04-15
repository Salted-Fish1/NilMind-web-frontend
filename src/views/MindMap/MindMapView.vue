<script setup lang="ts">
import MenuBar from '@/components/MindMap/MenuBar/MenuBar.vue'
import MindMapEditor from '@/components/MindMap/Editor/MindMapEditor.vue'
import TabBar from '@/components/MindMap/TabBar/TabBar.vue'

import { useWorkingProjectStore } from '@/stores/workingProject'
import { computed } from 'vue'

const store = useWorkingProjectStore()
const inputEventArgs = computed(() => {
	return store.inputEventArgs
})

</script>

<template>
	<div
		class="mind-map"
		tabindex="0"
		@keydown="(event) => store.inputEventManager.handleInputEvent(event, inputEventArgs)"
		@click="(event) => store.inputEventManager.handleClickEvent(event, inputEventArgs)"
		@blur="store.inputEventManager.handleBlurEvent"
	>
		<menu-bar />
		<mind-map-editor />
		<tab-bar />
	</div>
</template>

<style scoped lang="less">
.mind-map {
	height: 100vh;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	animation: expand 0.5s ease-in-out;
}

.mind-map:focus {
	border: none;
	outline: none;
}

@keyframes expand {
  0% {
		height: 30vh
  }
}
</style>
