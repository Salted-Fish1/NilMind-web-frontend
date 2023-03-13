module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'standard-with-typescript',
		'plugin:vue/vue3-essential'
	],
	overrides: [
	],
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json'],
		tsconfigRootDir: '.',
		extraFileExtensions: ['.vue']
	},
	plugins: [
		'vue'
	],
	ignorePatterns: ['*.d.ts', 'vite.config.ts', '.eslintrc.cjs'],
	rules: {
		'no-tabs': ['error', { allowIndentationTabs: true }],
		indent: ['error', 'tab'],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/indent': 'off'
	}
}
