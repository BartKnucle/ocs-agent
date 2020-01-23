const path = require('path')
const fs = require('fs')
const testPath = path.join(require('os').homedir(), '.ocs-agent', 'test', 'setup')
const app = require('@/test/setup/feathers')
const setup = require('@/server/services/setup/setup.service')
app.set('homePath', testPath)
app.configure(setup)

beforeAll(() => {
  fs.rmdirSync(testPath, { recursive: true })
})

describe('\'setup\' service', () => {
  it('Service setup', (done) => {
    app.service('/api/setup').on('started', (service) => {
      expect(service).toBe('setup')
      done()
    })

    app.service('/api/setup').setup(app)
  })

  it('Service created', () => {
    expect(app.services).toHaveProperty('api/setup')
  })
})

afterAll(() => {
  fs.rmdirSync(testPath, { recursive: true })
})
