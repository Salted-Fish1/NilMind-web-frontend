<script setup lang="ts">
import { useWorkingProjectStore } from '@/stores/workingProject'
import { useMainProjectStore } from '@/stores/mainProject'
import { INode } from '@/type/MindMap/workFormat'
import { computed } from 'vue'

const mainStore = useMainProjectStore()
const store = useWorkingProjectStore()

const currentProjectID = computed(() => {
	return mainStore.currentProjectID
})

const projects = computed(() => {
	return mainStore.mainProject.projectID.map((id) => {
		return mainStore.mainProject.projectIDMap.get(id)
	})
})

const rootTopicNode = computed(() => {
	return store.rootTopicNode
})

const TopicNum = computed(() => {
	let counter = 0
	const handler = (node: INode) => {
		counter++
		node.children?.forEach((item) => {
			handler(item)
		})
	}
	handler(rootTopicNode.value)
	return counter
})

const createNewProject = () => {

}

const TopicNumString = computed(() => {
	return `Topic: ${TopicNum.value}`
})
</script>

<template>
	<div class="tab-bar">
		<div class="projects">
			<template v-for="item in projects" :key="item?.id">
				<div
					class="item project-item"
					:class="{ 'current-project': item?.id === currentProjectID}"
				>
					{{ item?.title }}
				</div>
			</template>
			<div class="item project-operation" @click="createNewProject">
				<img src="/node_modules/feather-icons/dist/icons/plus.svg">
			</div>
		</div>

		<div class="meta-info">
			<div class="item info-item">{{ TopicNumString }}</div>
			<div class="item info-item">100%</div>
			<div class="item info-item">MarkDown</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.tab-bar {
	background-color: #F5F5F5;
	flex: 0 0 5vh;

	display: flex;
	align-items: center;
	justify-content: space-between;

	.projects {
		height: 100%;

		display: flex;
		align-items: center;

		gap: 10px;
		margin:0 10px;

		.project-item {
			position: relative;
			color: #9A9C9A;
		}

		.current-project {
			background-color: #E2E2E2;
			color: black;
		}

		.project-operation {
			display: flex;
			align-items: center;
		}

		.project-operation img {
			width: 12px;
		}
	}

	.meta-info {
		height: 100%;

		display: flex;
		align-items: center;

		gap: 10px;
		margin:0 10px;
	}
}

.item {
	padding: 3px 10px;
	margin: 5px 0;
	border-radius: 5px;
	font-size: 14px;
}

.item:hover {
	background-color: #E2E2E2;
	animation: fadeInOut 0.2s ease-in-out;
}

@keyframes fadeInOut {
  0% {
		background-color: transparent;
  }
}
</style>
