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

    // TODO:finalize test
// it('Game Add', async () => {
//     const wrapper = shallowMount(GameAddDialog, { localVue })

//     const commit = jest.fn()

//     const name = "Azul"
//     const coop = true

//     await actions.createGame({ commit }, { name, coop })

//     expect(commit).toHaveBeenCalledWith(
//         "CREATE_GAME", { name: "Azul", coop: true })
// })