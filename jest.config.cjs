module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/app/components'],
  testMatch: ['**/*.test.js'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  moduleNameMapper: {
    '^@vue/test-utils$': '<rootDir>/node_modules/@vue/test-utils/dist/vue-test-utils.cjs.js'
  },
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.js$': 'babel-jest'
  }
}
