enum modifierKeys {
	'Control' = 'Control',
	'Shift' = 'Shift',
	'Alt' = 'Alt',
}

class ShortcutManager {
	actionMap = new Map<string, (...arg: unknown[]) => void>([
	])

	actionDevider = '-'

	static readonly modifierKeys = modifierKeys

	constructor (actionsArr: Array<[string[], (...arg: unknown[]) => void]>) {
		actionsArr.forEach((action) => {
			this.actionMap.set(action[0].join(this.actionDevider), action[1])
		})
	}

	getModifierKeys (event: KeyboardEvent | MouseEvent, keyArr?: string[]) {
		if (keyArr == null) {
			keyArr = []
		}
		if (event.ctrlKey) {
			keyArr.push(modifierKeys.Control)
		}
		if (event.shiftKey) {
			keyArr.push(modifierKeys.Shift)
		}
		if (event.altKey) {
			keyArr.push(modifierKeys.Alt)
		}
		return keyArr
	}

	handleInputEvent (
		event: KeyboardEvent,
		args?: unknown,
		keyArr?: string[],
		callback?: (keyArr: string[]) => void,
		inputRules: (event: KeyboardEvent) => boolean = (event: KeyboardEvent) => {
			if (event.key in modifierKeys) {
				return false
			}
			return true
		}
	) {
		event.preventDefault()

		if (args == null) {
			args = []
		}

		if (keyArr == null) {
			keyArr = []
		}
		keyArr.splice(0)

		const validationResult =
				inputRules !== undefined
					? inputRules(event)
					: false
		if (!validationResult) {
			return
		}

		this.getModifierKeys(event, keyArr)
		keyArr.push(event.key)

		const key = keyArr.join(this.actionDevider)
		const handler = this.actionMap.get(key)

		console.log(key)

		if (handler != null) {
			handler(args)
		}

		if (callback != null) {
			callback(keyArr)
		}
	}

	handleClickEvent (
		event: MouseEvent,
		args?: unknown,
		keyArr?: string[],
		callback?: (keyArr: string[]) => void,
		inputRules?: (event: MouseEvent) => boolean
	) {
		event.preventDefault()

		if (args == null) {
			args = []
		}

		if (keyArr == null) {
			keyArr = []
		}
		keyArr.splice(0)

		const validationResult =
				inputRules !== undefined
					? inputRules(event)
					: true
		if (!validationResult) {
			return
		}

		this.getModifierKeys(event, keyArr)
		keyArr.push(event.type)

		const key = keyArr.join(this.actionDevider)

		const handler = this.actionMap.get(key)

		if (handler != null) {
			handler(args)
		}

		if (callback != null) {
			callback(keyArr)
		}
	}

	handleBlurEvent (event: FocusEvent) {
		event.preventDefault()
	}
}

export { ShortcutManager }
