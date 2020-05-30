import TestToTest from "@/components/TestToTest"
import { mount, shallowMount } from '@vue/test-utils'

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


    // Watcher test

    it("emits input event when items-set changes", () => {
        const wrapper = shallowMount(TestToTest);

        wrapper.vm.$options.watch.internalValue.call(wrapper.vm, 15);

        expect(wrapper.emitted("items-set")[0][0]).toBe(15);
    });


    // Event tests


    it('If button is clicked - ul is hidden', async () => {
        const wrapper = mount(TestToTest)
        wrapper.find('button[type="reset"]').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.find('ul').isVisible()).toBe(false)
    })

    // Spy tests

    it('Spy if destroyed', async () => {
        jest.useFakeTimers()
        const sbeforeDestroySpy = jest.spyOn(TestToTest, 'beforeDestroy')
        const wrapper = mount(TestToTest)
        wrapper.vm.counter = 9
        jest.advanceTimersByTime(1000)
        expect(sbeforeDestroySpy).toHaveBeenCalled()
    })


    // Lifecycles test 

    it('Test mounted logic', async () => {
        const wrapper = mount(TestToTest)
        expect(wrapper.vm.counter).toBe(0)
        jest.advanceTimersByTime(1000)
        expect(wrapper.vm.counter).toBe(1)
        jest.advanceTimersByTime(1000)
        expect(wrapper.vm.counter).toBe(2)
    })



})
