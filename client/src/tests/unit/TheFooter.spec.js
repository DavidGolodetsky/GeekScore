import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vue from 'vue'
import TheFooter from '@/components/TheFooter'

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuetify)

describe('Components: TheFooter', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(TheFooter, {
      localVue
    })
  })

  test('it should render copy footer', () => {
    expect(wrapper.find('[data-test-copy]').text()).toBe('©  2020 — Geek Score')
  })
})
