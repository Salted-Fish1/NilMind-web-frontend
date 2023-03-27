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

export {
	getFakeData,
	makeIDGenerator,
	fetchMainProjectData,
	fetchCreateNewMainProjectData
}
