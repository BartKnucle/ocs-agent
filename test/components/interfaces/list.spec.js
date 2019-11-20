import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import list from '@/components/interfaces/list.vue'

const localVue = createLocalVue()


describe('components/device/list', () => {
  let vuetify = new Vuetify()
  Vue.use(Vuetify)
  let wrapper = mount(list, {
    localVue,
    vuetify
  })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Operstate up', () => {
    expect(wrapper.vm.getStatus('up')).toEqual(true)
  })

  test('Operstate down', () => {
    expect(wrapper.vm.getStatus('down')).toEqual(false)
  })
})
