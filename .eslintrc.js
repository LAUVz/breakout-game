module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    env: {
        browser: true,
        commonjs: true,
        node: true,
        mocha: true
    },
    extends: ['eslint:recommended'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        app: 'readonly'
    },
    // add your custom rules here
    rules: {
        'no-new': 0,
        indent: ['error', 4, { SwitchCase: 1 }],
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow semi colons
        semi: [2, 'always'],
        // allow debugger during development
        'no-debugger': 0,
        'no-console': 0
    }
};
