<script setup lang="ts">
import { useWorkingProjectStore } from '@/stores/workingProject'
import { useMainProjectStore } from '@/stores/mainProject'

import { computed, ref } from 'vue'

const store = useWorkingProjectStore()
const mainStore = useMainProjectStore()

const project = computed(() => {
	return store.project
})

const operationItems = ref([
	{
		name: 'Topic'
	},
	{
		name: 'Subtopic'
	},
	{
		name: 'Delete'
	}
])
</script>

<template>
	<div class="menu-bar">
		<div class="meta-info">
			<button id="side-bar-button"></button>
			<div class="project-name">
				<span id="main-project-name">
					{{ mainStore.mainProject.mainProjectName }}
				</span>
				<span id="current-project-name">
					{{ project.title }}
				</span>
			</div>
		</div>
		<div class="operation">
			<div class="operation-item"
				v-for="item in operationItems"
				:key="item.name"
			>
				{{ item.name }}
			</div>
		</div>
		<div class="window-controls">
			window-controls
		</div>
	</div>
</template>

<style scoped lang="less">
.menu-bar {
	flex: 0 0 5vh;
	display: flex;
  justify-content:space-between;
  align-items: center;

	background-color: #F5F5F5;

	// min-height: 5vh;

	padding: 0 10px;

	.meta-info {
		display: flex;
		align-items: center;
		margin-left: -10px;

		#side-bar-button {
			padding: 15px;
			margin: 10px;

			cursor: pointer;

			background-color: transparent;
			border: none;
			background-image: url('/node_modules/feather-icons/dist/icons/menu.svg');
			background-repeat: no-repeat;
			background-origin: content-box;
			background-position: center;
		}

		.project-name {
			#main-project-name::after {
				content: ' / ';
			}
		}
	}

	.operation {
		display: flex;
		gap: 10px;
	}
}
</style>
