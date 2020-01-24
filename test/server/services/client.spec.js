const path = require('path')
const fs = require('fs')
const testPath = path.join(require('os').homedir(), '.ocs-agent', 'test', 'client')
const app = require('@/test/setup/feathers')
const logger = require('@/server/services/logger/service')
const client = require('@/server/services/client/service')
app.set('homePath', testPath)
app.configure(logger)
app.configure(client)

beforeAll(() => {
  fs.rmdirSync(testPath, { recursive: true })
})

describe('\'users\' service', () => {
  it('Service setup', (done) => {
    app.service('/api/client').setup(app)
    done()
  })

  it('Service created', () => {
    expect(app.services).toHaveProperty('api/client')
  })
})

afterAll(() => {
  fs.rmdirSync(testPath, { recursive: true })
})
