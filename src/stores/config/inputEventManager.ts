import { useWorkingProjectStore } from '../workingProject'
const getInputEventManagerConfig = () => {
	const store = useWorkingProjectStore()
	const inputEventManagerConfig: Array<[string[], () => void]> = [
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
		]
	]
	return inputEventManagerConfig
}

export default getInputEventManagerConfig
