import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import ErrorType from '@/components/customs/ErrorType.vue'

const localVue = createLocalVue()

describe('components/customs/ErrorType', () => {
  const vuetify = new Vuetify()
  Vue.use(Vuetify)
  const wrapper = mount(ErrorType, {
    localVue,
    vuetify
  })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('is Info', () => {
    wrapper.setProps({ level: 0 })
    const chip = wrapper.find('.v-chip')
    expect(chip.text()).toBe('Info')
    expect(chip.classes()).toContain('yellow')
  })

  test('is Warning', () => {
    wrapper.setProps({ level: 1 })
    const chip = wrapper.find('.v-chip')
    expect(chip.text()).toBe('Warning')
    expect(chip.classes()).toContain('orange')
  })

  test('is error', () => {
    wrapper.setProps({ level: 2 })
    const chip = wrapper.find('.v-chip')
    expect(chip.text()).toBe('Error')
    expect(chip.classes()).toContain('red')
  })
})
