import TestToTest from "@/components/TestToTest"
import { mount } from '@vue/test-utils'
// import flushPromises from 'flush-promises'
// import db from "@/db";


// jest.mock(db)
// beforeEach(() => {
//     jest.clearAllMocks()
// })

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

    // Event tests


    it('If button is clicked - ul is hidden', async () => {
        const wrapper = mount(TestToTest)
        wrapper.find('button[type="reset"]').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.find('ul').isVisible()).toBe(false)
    })

    // Emit test

    // TODO:finalize this

    it('If form submitted - emit event', () => {
        const wrapper = mount(TestToTest)
        const input = wrapper.find('[data-testid="name"]')

        input.setValue('David')
        wrapper.trigger('submit')

        // const formSubmittedCalls = wrapper.emitted('formSubmitted')
        // expect(formSubmittedCalls).toHaveLength(1)

        const expectedPayload = { name: "David" }
        expect(wrapper.emitted('submitted')[0][0]).toMatchObject(expectedPayload)

    })


    // Mock API calls


    // it('If API called - display list with items', async () => {
    //     const call = db.database().ref("users")

    //     call.mockResolvedValueOnce()
    //     const wrapper = mount(TestToTest)

    //     await wrapper.vm.$nextTick()

    //     expect(call).toHaveBeenCalledTimes(1)
    //     expect(wrapper.find('ul').isVisible()).toBe(true)
    // })

})
