const app = require('@/test/setup/feathers')
const updates = require('@/server/services/updates/service')
app.configure(updates)

describe('\'Updates\' service', () => {
  it('Service created', () => {
    expect(app.service('/api/updates')).toBeTruthy()
  })
})
