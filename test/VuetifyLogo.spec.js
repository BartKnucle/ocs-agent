import { mount } from '@vue/test-utils'
import Logo from '@/client/components/VuetifyLogo.vue'

describe('Logo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Logo)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
