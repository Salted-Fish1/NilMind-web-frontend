import { defineStore } from 'pinia'
import { makeIDGenerator } from '@/utils/MindMap'
import { useMainProjectStore } from './mainProject'
import { computed } from 'vue'
import { type INode } from '@/type/MindMap/workFormat'

export const useWorkingProjectStore = defineStore('workingProject', {
	state: () => {
		const IDGenerator = makeIDGenerator()

		const mainProjectStore = useMainProjectStore()
		const projectMapper = computed(() => {
			return mainProjectStore.mainProject.projectIDMap
		})
		const currentProjectID = computed(() => {
			return mainProjectStore.currentProjectID
		})

		const project = computed(() => {
			return projectMapper.value.get(currentProjectID.value)!
		})

		const rootTopicNode = computed(() => {
			let rootNode: INode = {
				id: 'defaultRootNode',
				title: 'defaultRootNode'
			}
			for (const item of project.value.rootTopic) {
				if (item[1].parentNode == null) {
					rootNode = item[1]
					break
				}
			}
			if (rootNode.id === 'defaultRootNode') {
				throw new Error('no root node detected')
			}
			return rootNode
		})

		return {
			project,
			rootTopicNode,
			IDGenerator
		}
	}
})
