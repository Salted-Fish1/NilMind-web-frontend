import dayjs from 'dayjs'
import { type storageFormat, type workFormat } from '@/type/MindMap'
import axios from 'axios'

const generateTimeStamp = () => {
	return dayjs().format('YYYY-MM-DD-HH-mm-SSS')
}

const generateRandomString = (length: number) => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	let result = ''
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length))
	}
	return result
}

function * makeIDGenerator (): Generator<string, string, null> {
	while (true) {
		const timestamp = generateTimeStamp()
		const ramdomString = generateRandomString(6)
		const result = [timestamp, ramdomString].join('/')
		yield result
	}
}

const getFakeData = (generator: Generator<string, string, null>, key: string) => {
	const result: storageFormat.IProject = {
		id: generator.next().value,
		title: 'Demo1' + key,
		rootTopic: {
			id: generator.next().value,
			title: 'RootTopic',
			children: [
				{
					id: generator.next().value,
					title: 'Child1',
					children: [
						{
							id: generator.next().value,
							title: 'subChild1',
							labels: ['label1', 'label2'],
							children: [
								{
									id: generator.next().value,
									title: 'subsubChild'
								}
							]
						}
					]
				},
				{
					id: generator.next().value,
					title: 'Child2',
					notes: {
						plain: {
							content: 'Child2s Nodets'
						}
					},
					labels: ['label1', 'label2']
				}
			]
		},
		theme: {
			id: generator.next().value
		}
	}
	return result
}

const getFakeDataByRequest = async () => {
	const result = await axios.get('http://localhost:4000/data.json')

	return result
}

const storageFormatToWorkFormat = (
	data: storageFormat.IProject[],
	mainProjectName: string) => {
	const workStateTransformer = (
		workStateNodeMap: Map<string, workFormat.INode>,
		storageStateNodeMap: Map<string, storageFormat.INode>,
		curNode: storageFormat.INode,
		curLevel: number
	) => {
		const { children, ...result } = curNode
		const workStateNode: workFormat.INode = result

		workStateNodeMap.set(result.id, workStateNode)
		storageStateNodeMap.set(result.id, curNode)

		workStateNode.level = curLevel

		children?.forEach(child => {
			workStateTransformer(workStateNodeMap, storageStateNodeMap, child, curLevel + 1)
		})

		return workStateNode
	}

	const workStateChildrenTransformer = (
		workStateNodeMap: Map<string, workFormat.INode>,
		storageStateNodeMap: Map<string, storageFormat.INode>,
		curNode: workFormat.INode
	) => {
		const curStorageNode = storageStateNodeMap.get(curNode.id)!
		const curWorkStateNode = workStateNodeMap.get(curNode.id)!

		if (curStorageNode.children != null) {
			const childrenArr: workFormat.INode[] = []
			curStorageNode.children.forEach((child) => {
				// childrenArr.push(workStateChild)
				const result = workStateChildrenTransformer(workStateNodeMap, storageStateNodeMap, child)
				childrenArr.push(result)
			})
			curWorkStateNode.children = childrenArr
		}
		return curWorkStateNode
	}

	const workStateSiblingTransformer = (
		workStateNodeMap: Map<string, workFormat.INode>,
		curNode: workFormat.INode,
		parentNode: workFormat.INode | null
	) => {
		curNode.children?.forEach((child) => {
			workStateSiblingTransformer(workStateNodeMap, child, curNode)
		})

		if (parentNode == null) {
			return curNode
		}

		curNode.parentNode = parentNode
		const curIndex = parentNode.children?.findIndex((child) => child.id === curNode.id)
		if (curIndex === -1 || curIndex === undefined) {
			return curNode
		}
		if (parentNode.children![curIndex - 1] !== undefined) {
			curNode.previousSibling = parentNode.children![curIndex - 1]
		}
		if (parentNode.children![curIndex + 1] !== undefined) {
			curNode.nextSibling = parentNode.children![curIndex + 1]
		}

		return curNode
	}

	const mainProject: workFormat.IMainProject = {
		mainProjectName,
		projectID: data.map((project) => project.id),
		projectIDMap: new Map<string, workFormat.IProject>()
	}
	data.forEach((project) => {
		const workStateNodeMap = new Map<string, workFormat.INode>()
		const storageStateNodeMap = new Map<string, storageFormat.INode>()

		let rootTopic = workStateTransformer(workStateNodeMap, storageStateNodeMap, project.rootTopic, 0)
		rootTopic = workStateChildrenTransformer(workStateNodeMap, storageStateNodeMap, rootTopic)
		workStateSiblingTransformer(workStateNodeMap, rootTopic, null)

		const curProject: workFormat.IProject = {
			id: project.id,
			title: project.title,
			rootTopic: workStateNodeMap,
			theme: project.theme
		}

		mainProject.projectIDMap.set(project.id, curProject)
	})

	return mainProject
}

const fetchMainProjectData = async (mainProjectID: string) => {
	const fakeData = (await getFakeDataByRequest()).data

	const mainProject = storageFormatToWorkFormat(fakeData, 'Demo4Test')

	return mainProject
}

const fetchCreateNewMainProjectData = async () => {
	const createData = (await getFakeDataByRequest()).data as storageFormat.IMainProject

	const mainProject = storageFormatToWorkFormat(createData.projectID, 'Untitled')

	return mainProject
}

const createNewNode = (IDGenerator: Generator<string, string, null>) => {
	const newNode: workFormat.INode = {
		id: IDGenerator.next().value,
		title: 'New Topic'
	}

	return newNode
}

const addNextSibling = (curNode: workFormat.INode, IDGenerator: Generator<string, string, null>, project: workFormat.IProject) => {
	console.log('trigger')

	if (curNode.parentNode == null) {
		return curNode
	}
	if (curNode.parentNode.children == null) {
		throw new Error('wrong tree struct')
	}

	const newNode = createNewNode(IDGenerator)

	const curIndex = curNode.parentNode.children.findIndex((value) => {
		return curNode.id === value.id
	})

	curNode.parentNode.children.splice(curIndex + 1, 0, newNode)
	newNode.parentNode = curNode.parentNode

	if (curNode.nextSibling != null) {
		newNode.nextSibling = curNode.nextSibling
		curNode.nextSibling.previousSibling = newNode
	}
	newNode.previousSibling = curNode
	curNode.nextSibling = newNode
	if (curNode.level != null) {
		newNode.level = curNode.level
	}
	project.rootTopic.set(newNode.id, newNode)

	return newNode
}

const addPreviousSibling = (curNode: workFormat.INode, IDGenerator: Generator<string, string, null>, project: workFormat.IProject) => {
	if (curNode.parentNode == null) {
		return curNode
	}
	if (curNode.parentNode.children == null) {
		throw new Error('wrong tree struct')
	}

	const newNode = createNewNode(IDGenerator)

	const curIndex = curNode.parentNode.children.findIndex((value) => {
		return curNode.id === value.id
	})

	curNode.parentNode.children.splice(curIndex, 0, newNode)
	newNode.parentNode = curNode.parentNode
	if (curNode.level != null) {
		newNode.level = curNode.level
	}

	if (curNode.previousSibling != null) {
		newNode.previousSibling = curNode.previousSibling
		curNode.previousSibling.nextSibling = newNode
	}
	newNode.nextSibling = curNode
	curNode.previousSibling = newNode

	project.rootTopic.set(newNode.id, newNode)
	return newNode
}

const moveSelectedLeft = (curNode: workFormat.INode) => {
	if (curNode.parentNode != null) {
		curNode.parentNode.lastVisitedChild = curNode
		return curNode.parentNode
	}
	return curNode
}

const moveSelectedRight = (curNode: workFormat.INode) => {
	if (curNode.children == null) {
		return curNode
	}
	if (curNode.lastVisitedChild != null) {
		return curNode.lastVisitedChild
	}
	curNode.lastVisitedChild = curNode.children[0]
	return curNode.lastVisitedChild
}

const moveSelectedUp = (curNode: workFormat.INode) => {
	if (curNode.previousSibling != null) {
		return curNode.previousSibling
	}
	return curNode
}

const moveSelectedDown = (curNode: workFormat.INode) => {
	if (curNode.nextSibling != null) {
		return curNode.nextSibling
	}
	return curNode
}

const addChild = (curNode: workFormat.INode, IDGenerator: Generator<string, string, null>, project: workFormat.IProject) => {
	if (curNode.children == null) {
		curNode.children = []
	}
	const newNode = createNewNode(IDGenerator)
	newNode.parentNode = curNode
	if (curNode.level != null) {
		newNode.level = curNode.level + 1
	}
	project.rootTopic.set(newNode.id, newNode)
	curNode.children.push(newNode)

	const previousSiblingIndex = curNode.children.findIndex((value) => {
		return value.id === newNode.id
	}) - 1

	if (curNode.children[previousSiblingIndex] !== undefined) {
		newNode.previousSibling = curNode.children[previousSiblingIndex]
		curNode.children[previousSiblingIndex].nextSibling = newNode
	}
	return newNode
}

const deleteNode = (curNode: workFormat.INode, project: workFormat.IProject) => {
	const parentNode = curNode.parentNode
	if (parentNode == null) {
		return
	}
	project.rootTopic.delete(curNode.id)
	const curIndex = parentNode.children!.findIndex((value) => {
		return value.id === curNode.id
	})
	parentNode.children?.splice(curIndex, 1)

	const previousSibling = curNode.previousSibling
	const nextSibling = curNode.nextSibling
	if ((previousSibling != null) && (nextSibling != null)) {
		previousSibling.nextSibling = nextSibling
		nextSibling.previousSibling = previousSibling
	} else if (previousSibling == null && nextSibling != null) {
		delete nextSibling.previousSibling
	} else if (previousSibling != null && nextSibling == null) {
		delete previousSibling.nextSibling
	}

	curNode.children?.forEach((value) => {
		deleteNode(value, project)
	})
}

export {
	getFakeData,
	makeIDGenerator,
	fetchMainProjectData,
	fetchCreateNewMainProjectData,
	addNextSibling,
	moveSelectedLeft,
	moveSelectedRight,
	moveSelectedUp,
	moveSelectedDown,
	addChild,
	addPreviousSibling,
	deleteNode
}
