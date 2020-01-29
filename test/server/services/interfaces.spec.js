const app = require('@/test/setup/feathers')
const interfaces = require('@/server/services/interfaces/service')
app.configure(interfaces)

describe('\'interfaces\' service', () => {
  it('Get interfaces list', async () => {
    const interfaces = await app.service('/api/interfaces').getInterfaces()
    expect(interfaces.length).toBeTruthy()
  })

  it('Get the interfaces names', async () => {
    const interfaces = await app.service('/api/interfaces').getInterfacesNames()
    expect(interfaces).toBeTruthy()
  })

  it('Get the default interface', async () => {
    const iface = await app.service('/api/interfaces').getDefaultInterface()
    expect(iface).toBeTruthy()
  })

  it('Add interfaces', async () => {
    await app.service('/api/interfaces').addInterfaces()
  })

  it('Update interfaces', async () => {
    await app.service('/api/interfaces').updateIfaces()
  })
})
