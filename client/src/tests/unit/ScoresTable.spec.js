import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from 'vuetify'
import Vue from "vue"
import ScoresTable from "@/components/ScoresTable";

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(Vuetify)

describe('Components: ScoresTable', () => {  
  let wrapper;
  
  wrapper = shallowMount(ScoresTable, {
    localVue
  })

  test('it should render copy footer', () => {
    wrapper.vm.addField();
    expect(wrapper.vm.fields).toBe(2);
  })
})