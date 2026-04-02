import { mount } from '@vue/test-utils'
import SalaryInputPanel from './SalaryInputPanel.vue'

describe('SalaryInputPanel', () => {
  it('renders the provided value and emits updates from the textarea', async () => {
    const wrapper = mount(SalaryInputPanel, {
      props: {
        modelValue: '1500.25',
        hasInvalidNumber: false
      }
    })

    const textarea = wrapper.get('textarea')

    expect(textarea.element.value).toBe('1500.25')

    await textarea.setValue('2200.50')

    expect(wrapper.emitted('update:modelValue')).toEqual([['2200.50']])
  })

  it('emits keydown events and shows the invalid state', async () => {
    const wrapper = mount(SalaryInputPanel, {
      props: {
        modelValue: '12..4',
        hasInvalidNumber: true
      }
    })

    const textarea = wrapper.get('textarea')
    await textarea.trigger('keydown', { key: 'Backspace' })

    expect(wrapper.emitted('keydown')).toHaveLength(1)
    expect(textarea.attributes('class')).toContain('border-red-400')
    expect(wrapper.text()).toContain('numero invalido')
  })

  it('renders slot content below the textarea', () => {
    const wrapper = mount(SalaryInputPanel, {
      props: {
        modelValue: '',
        hasInvalidNumber: false
      },
      slots: {
        default: '<div class="slot-probe">slot content</div>'
      }
    })

    expect(wrapper.get('.slot-probe').text()).toBe('slot content')
  })
})
