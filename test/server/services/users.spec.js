const fs = require('fs')
const app = require('@/test/setup/feathers')
const users = require('@/server/services/users/service')
app.configure(users)

beforeAll(() => {
  fs.rmdirSync(app.get('homePath'), { recursive: true })
})

describe('\'interfaces\' service', () => {
  it('User to be created', async () => {
    const created = await app.service('/api/users').create({ _id: '123456' })
    expect(created).toHaveProperty('_id')
    expect(created._id).toBe('123456')
  })

  it('On user connection', async () => {
    const connected = await app.service('/api/users').onConnect({ user: { _id: '123456' } })
    expect(connected).toHaveProperty('online')
    expect(connected.online).toBe(true)
  })

  it('On user disconnection', async () => {
    const disconnected = await app.service('/api/users').onDisconnect({ user: { _id: '123456' } })
    expect(disconnected).toHaveProperty('online')
    expect(disconnected.online).toBe(false)
  })
})
