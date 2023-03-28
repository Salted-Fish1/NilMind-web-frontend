<script setup lang="ts">
import { useWorkingProjectStore } from '@/stores/workingProject'
import { computed } from 'vue'

interface IProps {
	currentNodeID: string
}

const props = defineProps<IProps>()

const store = useWorkingProjectStore()

const currentNode = computed(() => {
	const node = store.project.rootTopic.get(props.currentNodeID)
	if (!node) {
		throw new Error('node not found')
	}
	return node
})

const nodeClass = computed(() => {
	const level = (currentNode.value.level ?? 0) + 1
	if (level <= 5) { return `h${level}` }
	return 'p'
})

const isSelected = computed(() => {
	return store.selected.has(currentNode.value.id)
})

const handleClickCurrentNode = (event: MouseEvent) => {
	if (!isSelected.value) {
		store.addSelected(currentNode.value.id)
	} else {
		store.removeSelected(currentNode.value.id)
	}
}

</script>

<template>
	<div class="node-item">
		<div
			class="parent"
			:class="[nodeClass, {selected: isSelected}]"
			@click="handleClickCurrentNode"
		>
			<div>{{ currentNode.id.split('/')[1] }}</div>
			<div>Pre: {{ currentNode.previousSibling?.id.split('/')[1] }}</div>
			<div>Nex: {{ currentNode.nextSibling?.id.split('/')[1] }}</div>
		</div>
		<div class="children" v-if="currentNode.children">
			<template v-for="item of currentNode.children" :key="item.id">
				<node-item :current-node-i-d="item.id"></node-item>
			</template>
		</div>
	</div>
</template>

<style scoped lang="less">
.node-item {
	display: flex;

	user-select: none;
}

.parent {
	align-self: center;
}

.children {
	display: flex;
	flex-direction: column;
}

.selected {
	box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
}

.h1 {
	font-size: 36px;
	line-height: 1.2;

	color: black;

	padding: 0.5em;
	margin: 0.5em;

	border-radius: 0.2em;

	background-color: #ffffff;
}
.h2 {
	font-size: 1.75em;
	line-height: 1.225;

	color: black;

	padding: 0.4em;
	margin: 0.4em;

	border-radius: 0.2em;
	background-color: #F5CD6C;
}
.h3 {
	font-size: 1.4em;
	line-height: 1.43;

	color: black;

	padding: 0.3em;
	margin: 0.3em;

	border-radius: 0.2em;
	background-color: #FFE685;
}
.h4 {
	color: black;
	padding: 0.2em;
	margin: 0.2em;
	font-size: 1.25em;

	border-radius: 0.2em;
	background-color: #F4D7A1;
}
.h5 {
	color: black;
	padding: 0.1em;
	margin: 0.1em;
	font-size: 1em;

	border-radius: 0.2em;
	background-color: #FFE685;
}
.p {
	color: #777;
	padding: 0.1em;
	margin: 0.1em;
	font-size: 1em;

	border-radius: 0.2em;
	background-color: #FFE685;
}

</style>
