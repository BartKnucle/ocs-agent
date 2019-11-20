import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import UpDown from '@/components/customs/UpDown.vue'

const localVue = createLocalVue()


describe('components/customs/UpDown', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
    Vue.use(Vuetify)
  })

  test('is a Vue instance', () => {
    const wrapper = mount(UpDown, {
      localVue,
      vuetify,
      propsData: {
        up: true,
        }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Is green', () => {
    const wrapper = mount(UpDown, {
      localVue,
      vuetify,
      propsData: {
        up: true,
        }
    })
    const chip = wrapper.find('.v-chip')
    expect(chip.text()).toBe('UP')
    expect(chip.classes()).toContain('green')
  })

  test('Is red', () => {
    const wrapper = mount(UpDown, {
      localVue,
      vuetify,
      propsData: {
        up: false,
        }
    })
    const chip = wrapper.find('.v-chip')
    expect(chip.text()).toBe('DOWN')
    expect(chip.classes()).toContain('red')
  })
})
