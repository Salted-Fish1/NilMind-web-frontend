<script setup lang="ts">
import { useWorkingProjectStore } from '@/stores/workingProject'
import { computed, ref } from 'vue'

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
	store.inputEventArgs = props.currentNodeID
	setTimeout(() => {
		store.inputEventArgs = undefined
	})
}

const isDrag = ref(false)

const handleDragStart = () => {
	console.log('handleDragStart')
	isDrag.value = true
}
const handleDragEnd = () => {
	console.log('handleDragEnd')
	isDrag.value = false
}

const handleOnDrag = () => {
	console.log('onDrag')
}

const isDragOver = ref(false)
const handleDragEnter = () => {
	console.log('handleDragEnter')
	isDragOver.value = true
}
const handleDragLeave = (event: DragEvent) => {
	if ((event.currentTarget as HTMLElement)?.contains(event.relatedTarget as HTMLElement)) {
		return
	}
	console.log('handleDragLeave')
	isDragOver.value = false
}

</script>

<template>
	<div class="node-item" :class="{dragging: isDrag}">
		<div
			class="parent"
			:class="[nodeClass, {selected: isSelected}, {dragover: isDragOver}]"
			@click="handleClickCurrentNode"
			draggable="true"
			@dragstart="handleDragStart"
			@dragend="handleDragEnd"
			@drag="handleOnDrag"
			@dragleave="handleDragLeave"
			@dragenter="handleDragEnter"
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
	outline: 5px dashed silver;
}

.parent {
	align-self: center;
}

.parent:hover {
	box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
	animation: fadeInOut 0.1s ease-in-out;
}

.children {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.selected {
	box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
	animation: fadeInOut 0.05s ease-in-out;
}

.selected:hover {
	box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset,
	rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
}

.dragging {
	opacity: 0.5;
}

.dragover {
	outline: 7px solid white;
}

@keyframes fadeInOut {
  0% {
    box-shadow: none;
  }
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
