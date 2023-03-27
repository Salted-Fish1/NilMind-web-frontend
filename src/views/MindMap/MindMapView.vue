<script setup lang="ts">
import MenuBar from '@/components/MindMap/MenuBar/MenuBar.vue'
import MindMapEditor from '@/components/MindMap/Editor/MindMapEditor.vue'
import TabBar from '@/components/MindMap/TabBar/TabBar.vue'

</script>

<template>
	<div class="mind-map">
		<menu-bar />
		<mind-map-editor />
		<tab-bar />
	</div>
</template>

<style scoped lang="less">
.mind-map {
	height: 100vh;
	// height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	animation: expand 0.5s ease-in-out;
}

@keyframes expand {
  0% {
		height: 30vh
  }
}
</style>
