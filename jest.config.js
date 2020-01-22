module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  setupFiles: ['./test/setup'],
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  transformIgnorePatterns: ['./server', '/node_modules/'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/client/**/*.vue',
    '<rootDir>/client/store/**/*.js',
    '<rootDir>/server/**/*.js'
  ]
}
