import TheFooter from "@/components/TheFooter"
import { mount, shallowMount } from '@vue/test-utils'

describe('TheFooter', () => {
    it('Shallow test', async () => {
        const wrapper = mount(TheFooter)
        expect(wrapper.html()).toMatchSnapshot()
    })
})