const app = require('@/test/setup/feathers')
const files = require('@/server/services/files/service')

app.configure(files)

describe('\'Files\' service', () => {
  it('Service created', () => {
    expect(app.service('/api/files')).toBeTruthy()
  })
})
