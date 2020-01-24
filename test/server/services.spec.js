const path = require('path')
const fs = require('fs')
const testPath = path.join(require('os').homedir(), '.ocs-agent', 'test', 'services')
const app = require('@/test/setup/feathers')
const { Services } = require('@/server/services/services.class')
app.set('homePath', testPath)

beforeAll(() => {
  fs.rmdirSync(testPath, { recursive: true })
})

describe('\'services\' service', () => {
  it('Services setup', () => {
    const services = new Services(app, ['setup'])
    expect(services.services).toStrictEqual(['setup'])
  })
})

afterAll(() => {
  fs.rmdirSync(testPath, { recursive: true })
})
