import { defineStore } from 'pinia'
import { fetchMainProjectData, fetchCreateNewMainProjectData } from '@/utils/MindMap'
import { type IMainProject, type IProject } from '@/type/MindMap/workFormat'

export const useMainProjectStore = defineStore('mainProject', {
	state: () => {
		const mainProject: IMainProject = {
			mainProjectName: '',
			projectID: [],
			projectIDMap: new Map<string, IProject>()
		}

		const currentProjectID = ''

		return {
			mainProject,
			currentProjectID
		}
	},
	actions: {
		async init (mainProjectID: string) {
			this.mainProject = await fetchMainProjectData(mainProjectID)
			this.setCurrentProjectID()
		},
		async create () {
			this.mainProject = await fetchCreateNewMainProjectData()
			this.setCurrentProjectID()
		},
		setCurrentProjectID () {
			this.currentProjectID = this.mainProject.projectID[0]
		}
	}
})
