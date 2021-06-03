module.exports = {
  root: false,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    "eol-last": 0,
 "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
  }
}
