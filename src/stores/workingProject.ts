import { defineStore } from 'pinia'
import { makeIDGenerator, addNextSibling, moveSelectedDown, moveSelectedLeft, moveSelectedRight, moveSelectedUp, addChild, addPreviousSibling, deleteNode } from '@/utils/MindMap'
import { useMainProjectStore } from './mainProject'
import { computed } from 'vue'
import { type INode } from '@/type/MindMap/workFormat'
import { ShortcutManager } from '@/utils/InputEvent'
import getInputEventManagerConfig from './config/inputEventManager'
import getOperationGatewayMapConfig from './config/operationGatewayMap'
import { type workFormat } from '@/type/MindMap'

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

		const selected = new Set<string>()

		const state = new Map([
			['isEdit', false],
			['isSelected', false],
			['isMultiSelected', false]
		])

		return {
			project,
			rootTopicNode,
			IDGenerator,
			selected,
			state,
			inputEventManager: new ShortcutManager(getInputEventManagerConfig()),
			operationGatewayMap: new Map<string, boolean>(getOperationGatewayMapConfig())
		}
	},
	actions: {
		clearSelected () {
			this.selected.clear()
		},
		addSelected (...id: string[]) {
			id.forEach((id) => {
				this.selected.add(id)
			})
		},
		removeSelected (...id: string[]) {
			id.forEach((id) => {
				this.selected.delete(id)
			})
		},
		operationGateway (operationName: string) {
			const stateKey = [JSON.stringify(Array.from(this.state.entries()).reduce<Record<string, boolean>>((pre, cur) => {
				pre[cur[0]] = cur[1]
				return pre
			}, {})), operationName].join('/')
			console.log(stateKey)
			return this.operationGatewayMap.get(stateKey) ?? true
		},
		addNextSibling () {
			const newSelectedArr: workFormat.INode[] = []
			this.selected.forEach((value) => {
				const node = this.project.rootTopic.get(value)
				if (node == null) {
					throw new Error('node not found')
				}
				newSelectedArr.push(addNextSibling(node, this.IDGenerator, this.project))
			})
			this.clearSelected()
			newSelectedArr.forEach((value) => {
				this.selected.add(value.id)
			})
		},
		addPreviousSibling () {
			const newSelectedArr: workFormat.INode[] = []
			this.selected.forEach((value) => {
				const node = this.project.rootTopic.get(value)
				if (node == null) {
					throw new Error('node not found')
				}
				newSelectedArr.push(addPreviousSibling(node, this.IDGenerator, this.project))
			})
			this.clearSelected()
			newSelectedArr.forEach((value) => {
				this.selected.add(value.id)
			})
		},
		addChild () {
			const newChild: workFormat.INode[] = []
			this.selected.forEach((value) => {
				const node = this.project.rootTopic.get(value)
				if (node == null) {
					throw new Error('node not found')
				}
				const newSelected = addChild(node, this.IDGenerator, this.project)
				newChild.push(newSelected)
			})
			this.clearSelected()
			newChild.forEach((value) => {
				this.selected.add(value.id)
			})
		},
		deleteSelected () {
			this.selected.forEach((value) => {
				const node = this.project.rootTopic.get(value)
				if (node != null) {
					deleteNode(node, this.project)
				}
			})
			this.clearSelected()
		},
		moveSelectedLeft () {
			const newSelectedArr: workFormat.INode[] = []
			const deletedArr: workFormat.INode[] = []
			this.selected.forEach((value) => {
				const node = this.project.rootTopic.get(value)
				if (node == null) {
					throw new Error('node not found')
				}
				const newSelected = moveSelectedLeft(node)
				deletedArr.push(node)
				newSelectedArr.push(newSelected)
			})
			deletedArr.forEach((value) => {
				this.selected.delete(value.id)
			})
			newSelectedArr.forEach((value) => {
				this.selected.add(value.id)
			})
		},
		moveSelectedRight () {
			const newSelectedArr: workFormat.INode[] = []
			const deletedArr: workFormat.INode[] = []
			this.selected.forEach((value) => {
				const node = this.project.rootTopic.get(value)
				if (node == null) {
					throw new Error('node not found')
				}
				const newSelected = moveSelectedRight(node)
				deletedArr.push(node)
				newSelectedArr.push(newSelected)
			})
			deletedArr.forEach((value) => {
				this.selected.delete(value.id)
			})
			newSelectedArr.forEach((value) => {
				this.selected.add(value.id)
			})
		},
		moveSelectedUp () {
			const newSelectedArr: workFormat.INode[] = []
			const deletedArr: workFormat.INode[] = []
			this.selected.forEach((value) => {
				const node = this.project.rootTopic.get(value)
				if (node == null) {
					throw new Error('node not found')
				}
				const newSelected = moveSelectedUp(node)
				deletedArr.push(node)
				newSelectedArr.push(newSelected)
			})
			deletedArr.forEach((value) => {
				this.selected.delete(value.id)
			})
			newSelectedArr.forEach((value) => {
				this.selected.add(value.id)
			})
		},
		moveSelectedDown () {
			const newSelectedArr: workFormat.INode[] = []
			const deletedArr: workFormat.INode[] = []
			this.selected.forEach((value) => {
				const node = this.project.rootTopic.get(value)
				if (node == null) {
					throw new Error('node not found')
				}
				const newSelected = moveSelectedDown(node)
				deletedArr.push(node)
				newSelectedArr.push(newSelected)
			})
			deletedArr.forEach((value) => {
				this.selected.delete(value.id)
			})
			newSelectedArr.forEach((value) => {
				this.selected.add(value.id)
			})
		}

	}
})
