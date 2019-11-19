import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import ErrorType from '@/components/customs/ErrorType.vue'

const localVue = createLocalVue()


describe('error_type', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
    Vue.use(Vuetify)
  })

  test('is a Vue instance', () => {
    const wrapper = mount(ErrorType, {
      localVue,
      vuetify,
      propsData: {
        level: 0,
        }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Is yellow', () => {
    const wrapper = mount(ErrorType, {
      localVue,
      vuetify,
      propsData: {
        level: 0,
        }
    })
    const chip = wrapper.find('.v-chip')
    expect(chip.text()).toBe('Info')
    expect(chip.classes()).toContain('yellow')
  })

  test('Is orange', () => {
    const wrapper = mount(ErrorType, {
      localVue,
      vuetify,
      propsData: {
        level: 1,
        }
    })
    const chip = wrapper.find('.v-chip')
    expect(chip.text()).toBe('Warning')
    expect(chip.classes()).toContain('orange')
  })

  test('Is red', () => {
    const wrapper = mount(ErrorType, {
      localVue,
      vuetify,
      propsData: {
        level: 2,
        }
    })
    const chip = wrapper.find('.v-chip')
    expect(chip.text()).toBe('Error')
    expect(chip.classes()).toContain('red')
  })
})
