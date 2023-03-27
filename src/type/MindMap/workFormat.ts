import type * as storageFormat from './storageFormat'

interface INodeAddons {
	level?: number

	nextSibling?: INode
	previousSibling?: INode
	parentNode?: INode

	lastVisitedChild?: INode

	children?: INode[]
}

type INode = Omit<storageFormat.INode, 'children'> & INodeAddons

type INotes = storageFormat.INotes

type ITheme = storageFormat.ITheme

type IProject = Omit<storageFormat.IProject, 'rootTopic'> & {
	rootTopic: Map<string, INode>
}

interface IMainProject {
	mainProjectName: string
	projectID: string[]
	projectIDMap: Map<string, IProject>
}

export type {
	INode,
	ITheme,
	INotes,
	IProject,
	IMainProject
}
