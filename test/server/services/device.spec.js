const app = require('@/test/setup/feathers')
const device = require('@/server/services/device/service')

app.set('deviceId', '123456')
app.configure(device)

describe('\'Device\' service', () => {
  it('Service created', () => {
    expect(app.service('/api/device')).toBeTruthy()
  })

  it('Update device informations', async () => {
    await app.service('/api/device').updateDevice()
    const infos = await app.service('/api/device').find()
    expect(infos).toBeTruthy()
  })
})
