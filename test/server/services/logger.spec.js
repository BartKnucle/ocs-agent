const app = require('@/test/setup/feathers')
const logger = require('@/server/services/logger/service')
app.configure(logger)

describe('\'Logger\' service', () => {
  it('Service created', () => {
    expect(app.service('/api/logger')).toBeTruthy()
  })

  it('Create a log', async () => {
    const log = {
      level: 0,
      text: 'test'
    }

    const logged = await app.service('/api/logger').log(log)
    expect(logged).toBeTruthy()
  })
})
