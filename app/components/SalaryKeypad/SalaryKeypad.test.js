import { mount } from '@vue/test-utils'
import SalaryKeypad from './SalaryKeypad.vue'

const keypadRows = [
  ['7', '8', '9'],
  ['4', '5', '6']
]

describe('SalaryKeypad', () => {
  it('renders keypad buttons and emits append on number clicks', async () => {
    const wrapper = mount(SalaryKeypad, {
      props: {
        keypadRows,
        activeKey: ''
      }
    })

    await wrapper.get('button').trigger('click')

    expect(wrapper.text()).toContain('7')
    expect(wrapper.emitted('append')).toEqual([['7']])
  })

  it('emits clear and backspace from action buttons', async () => {
    const wrapper = mount(SalaryKeypad, {
      props: {
        keypadRows,
        activeKey: ''
      }
    })

    const buttons = wrapper.findAll('button')
    await buttons.at(-2).trigger('click')
    await buttons.at(-1).trigger('click')

    expect(wrapper.emitted('clear')).toHaveLength(1)
    expect(wrapper.emitted('backspace')).toHaveLength(1)
  })

  it('applies active styling to matching pressed keys', () => {
    const wrapper = mount(SalaryKeypad, {
      props: {
        keypadRows,
        activeKey: 'clear'
      }
    })

    const clearButton = wrapper.findAll('button').at(-2)
    expect(clearButton.attributes('class')).toContain('bg-[#efcc6a]')
  })
})
