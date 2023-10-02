/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  "env":{
    "node": true,
  },
  rules: {
    'vue/multi-word-component-names': 'off'                                             //この行を追加
  }
}
