<script setup lang="ts">
import NodeItem from './Comp/NodeItem.vue'

import { useWorkingProjectStore } from '@/stores/workingProject'
import { computed } from 'vue'

const backgroundColor = '#54A6D6'

const store = useWorkingProjectStore()
const rootTopicNode = computed(() => {
	return store.rootTopicNode
})
</script>

<template>
	<div id="editor">
		<node-item :currentNodeID="rootTopicNode.id" />
	</div>
</template>

<style scoped lang="less">
#editor {
	display: flex;

	flex: 2 0 0;
	min-height: 0;

	align-items: center;
	justify-content: center;

	background-color: v-bind(backgroundColor);
	color: white;
}

</style>
