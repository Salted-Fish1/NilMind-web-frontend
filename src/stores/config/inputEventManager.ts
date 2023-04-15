import { useWorkingProjectStore } from '../workingProject'
const getInputEventManagerConfig = () => {
	const store = useWorkingProjectStore()
	const inputEventManagerConfig: Array<[string[], (arg: unknown) => void]> = [
		[
			['Enter'], () => {
				store.addNextSibling()
			}
		],
		[
			['Shift', 'Enter'], () => {
				store.addPreviousSibling()
			}
		],
		[
			['ArrowLeft'], () => {
				store.moveSelectedLeft()
			}
		],
		[
			['ArrowRight'], () => {
				store.moveSelectedRight()
			}
		],
		[
			['ArrowUp'], () => {
				store.moveSelectedUp()
			}
		],
		[
			['ArrowDown'], () => {
				store.moveSelectedDown()
			}
		],
		[
			['Tab'], () => {
				store.addChild()
			}
		],
		[
			['Escape'], () => {
				store.clearSelected()
			}
		],
		[
			['Delete'], () => {
				store.deleteSelected()
			}
		],
		[
			['Backspace'], () => {
				store.deleteSelected()
			}
		],
		[
			['click'], (id: string) => {
				store.clearSelected()
				store.selected.add(id)
			}
		],
		[
			['Control-click'], (id: string) => {
				store.selected.add(id)
			}
		]
	]
	return inputEventManagerConfig
}

export default getInputEventManagerConfig
