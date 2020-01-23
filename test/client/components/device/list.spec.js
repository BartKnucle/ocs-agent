import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import list from '@/client/components/device/list.vue'

const localVue = createLocalVue()

describe('components/device/list', () => {
  const vuetify = new Vuetify()
  Vue.use(Vuetify)
  const wrapper = mount(list, {
    localVue,
    vuetify
  })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Device transformation', () => {
    const device = {
      _id: '123456',
      hostname: 'name'
    }
    expect(wrapper.vm.getDevice(device)).toEqual([{ _id: '_id', data: '123456' }, { _id: 'hostname', data: 'name' }])
  })
})
