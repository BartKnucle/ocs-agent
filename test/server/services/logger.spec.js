const path = require('path')
const fs = require('fs')
const testPath = path.join(require('os').homedir(), '.ocs-agent', 'test', 'logger')
const app = require('@/test/setup/feathers')
const setup = require('@/server/services/setup/service')
const logger = require('@/server/services/logger/service')
app.set('homePath', testPath)
app.set('deviceId', '123456')
app.configure(setup)
app.configure(logger)

beforeAll(() => {
  fs.rmdirSync(testPath, { recursive: true })
})

describe('\'logger\' service', () => {
  it('Service setup', () => {
    app.service('/api/logger').setup(app)
    app.service('/api/setup').emit('started', 'setup')
  })

  it('Service created', () => {
    expect(app.services).toHaveProperty('api/logger')
  })

  it('Log to be created', async () => {
    const created = await app.service('/api/logger').log({ level: 0, text: 'log test' })
    expect(created.level).toBe(0)
    expect(created.text).toBe('log test')
  })
})

afterAll(() => {
  fs.rmdirSync(testPath, { recursive: true })
})
