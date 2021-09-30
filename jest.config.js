module.exports = {
  preset: 'jest-puppeteer',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  reporters: ['default', 'jest-screenshot/reporter']
}
