const path = require('path')
const fs = require('fs')
const testPath = path.join(require('os').homedir(), '.ocs-agent', 'test', 'updates')
const app = require('@/test/setup/feathers')
const setup = require('@/server/services/setup/service')
const updates = require('@/server/services/updates/service')
app.set('homePath', testPath)
app.configure(setup)
app.configure(updates)

beforeAll(() => {
  fs.rmdirSync(testPath, { recursive: true })
})

describe('\'updates\' service', () => {
  it('Service setup', (done) => {
    app.service('/api/updates').on('started', (service) => {
      expect(service).toBe('updates')
      done()
    })

    app.service('/api/updates').setup(app)
  })

  it('Service created', () => {
    expect(app.services).toHaveProperty('api/updates')
  })
})

afterAll(() => {
  fs.rmdirSync(testPath, { recursive: true })
})
