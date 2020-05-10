import TestToTest from "@/components/TestToTest"
import { mount } from '@vue/test-utils'

describe('TestToTest', () => {

    // Markup output tests

    it('If items are empty - hide ul', async () => {
        const wrapper = mount(TestToTest)
        wrapper.setData({
            items: []
        })
        await wrapper.vm.$nextTick()
        expect(wrapper.find('ul').isVisible()).toBe(false)
    })

    it('If items is set - show ul', async () => {
        const wrapper = mount(TestToTest)
        wrapper.setData({
            items: ['hi']
        })
        await wrapper.vm.$nextTick()
        expect(wrapper.find('ul').isVisible()).toBe(true)
    })

    it('If items is set - li contains item', async () => {
        const wrapper = mount(TestToTest)
        wrapper.setData({
            items: ['hi']
        })
        await wrapper.vm.$nextTick()
        expect(wrapper.html()).toContain('<li>hi</li>')
    })

    it('If items contain hi - li contains text hi', async () => {
        const wrapper = mount(TestToTest)
        wrapper.setData({
            items: ['hi']
        })
        await wrapper.vm.$nextTick()
        expect(wrapper.find('li').element.textContent).toBe('hi')
    })

    // Snapshot testing

    it('Snapshot test', async () => {
        const wrapper = mount(TestToTest)
        wrapper.setData({
            items: ['hi']
        })
        expect(wrapper).toMatchSnapshot()
    })


    it('Snapshot test', async () => {
        const wrapper = mount(TestToTest, {
            propsData: {
                value: 'blabla'
            }
        })
        expect(wrapper).toMatchSnapshot()
    })



    // Event tests


    it('If button is clicked - ul is hidden', async () => {
        const wrapper = mount(TestToTest)
        wrapper.find('button[type="reset"]').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.find('ul').isVisible()).toBe(false)
    })

})
