module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-essential',
		'plugin:@typescript-eslint/recommended'
	],
	overrides: [],
	// parser: '@typescript-eslint/parser',
	// parserOptions: {
	// 	ecmaVersion: 'latest',
	// 	sourceType: 'module'
	// },
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 6,
		sourceType: 'module'
	},
	plugins: ['vue', '@typescript-eslint'],
	rules: {
		// off=0, warn=1, error=2, 如果是数组, 第二项表示参数option
		'vue/multi-word-component-names': 0,
		'vue/no-unused-vars': 1,
		'@typescript-eslint/no-explicit-any': 1,
		'@typescript-eslint/no-unused-vars': 1,
		'prefer-const': 1, //使用const
		'no-var': 2, //对var禁止
		'no-console': 1, //警告console
		'no-unused-vars': 1, //警告有声明后未被使用的变量或参数
		'no-debugger': 1, //警告debugger
		eqeqeq: 2, // 警告使用全等
		'no-const-assign': 2, //禁止修改const声明的变量
		'no-func-assign': 2, //禁止重复的函数声明
		'no-dupe-args': 2, //函数参数不能重复
		'no-const-assign': 2, //禁止修改const声明的变量
		'no-dupe-keys': 2, //在创建对象字面量时不允许键重复
		'no-duplicate-case': 2, //switch中的case标签不能重复
		'no-alert': 2 //禁止使用alert confirm prompt
	}
};
