const path = require('path')
const fs = require('fs')
const testPath = path.join(require('os').homedir(), '.ocs-agent', 'test', 'interfaces')
const app = require('@/test/setup/feathers')
const device = require('@/server/services/device/service')
const interfaces = require('@/server/services/interfaces/service')
app.set('homePath', testPath)
app.configure(device)
app.configure(interfaces)

beforeAll(() => {
  fs.rmdirSync(testPath, { recursive: true })
})

describe('\'interfaces\' service', () => {
  it('Service setup', (done) => {
    app.service('/api/interfaces').setup(app)
    done()
  })

  it('Service created', () => {
    expect(app.services).toHaveProperty('api/interfaces')
  })

  it('Update interfaces', () => {
    app.service('/api/interfaces').updateIfaces()
      .then(() => {
        return app.service('/api/interfaces').find()
      })
      .then((interfaces) => {
        expect(interfaces.length).toBe(!0)
      })
  })
})

afterAll(() => {
  fs.rmdirSync(testPath, { recursive: true })
})
