interface INode {
	id: string
	title: string
	class?: string

	notes?: INotes
	labels?: string[]

	children?: INode[]
}

interface ITheme {
	id: string
	// todo...
}

interface INotes {
	plain: {
		content: string
	}
}

interface IProject {
	id: string
	title: string
	rootTopic: INode
	theme: ITheme
}

interface IMainProject {
	mainProjectName: string
	projectID: IProject[]
}

export type {
	INode,
	ITheme,
	INotes,
	IProject,
	IMainProject
}
