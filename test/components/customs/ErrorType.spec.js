import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import ErrorType from '@/components/customs/ErrorType.vue'

const localVue = createLocalVue()
const vuetify = new Vuetify()
Vue.use(Vuetify)
const wrapper = mount(ErrorType, {
  localVue,
  vuetify
})

describe('components/customs/ErrorType', () => {
  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('is Info', async () => {
    wrapper.setProps({ level: 0 })
    await Vue.nextTick()
    const chip = wrapper.find('.v-chip')
    expect(chip.text()).toBe('Info')
    expect(chip.classes()).toContain('yellow')
  })

  test('is Warning', async () => {
    wrapper.setProps({ level: 1 })
    await Vue.nextTick()
    const chip = wrapper.find('.v-chip')
    expect(chip.text()).toBe('Warning')
    expect(chip.classes()).toContain('orange')
  })

  test('is error', async () => {
    wrapper.setProps({ level: 2 })
    await Vue.nextTick()
    const chip = wrapper.find('.v-chip')
    expect(chip.text()).toBe('Error')
    expect(chip.classes()).toContain('red')
  })
})
