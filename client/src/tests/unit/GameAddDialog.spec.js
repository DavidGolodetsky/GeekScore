import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from 'vuetify'
import Vue from "vue"
import GameAddDialog from "@/components/GameAddDialog";
import TheDialog from "@/components/TheDialog";

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuetify)

localVue.component(
    'TheDialog', TheDialog
)


it('Game Add', async () => {
    const wrapper = shallowMount(GameAddDialog, { localVue })
    expect(wrapper.exists()).toBe(true)
})