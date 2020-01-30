const app = require('@/test/setup/feathers')
const setup = require('@/server/services/setup/service')
app.configure(setup)

describe('\'Setup\' service', () => {
  it('Service created', () => {
    expect(app.service('/api/setup')).toBeTruthy()
  })

  it('Service Setup', async () => {
    await app.service('/api/setup').setup(app)
    const services = await app.service('/api/setup').find()
    expect(services).toBeTruthy()
  })
})
