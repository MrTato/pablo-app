import { mount } from '@vue/test-utils'
import SalaryOutputPanel from './SalaryOutputPanel.vue'

describe('SalaryOutputPanel', () => {
  it('renders the placeholder with the gold text tone when empty', () => {
    const wrapper = mount(SalaryOutputPanel, {
      props: {
        value: ''
      }
    })

    const output = wrapper.get('p[class*="break-words"]')
    expect(output.text()).toContain('Aqui se mostrara su salario neto.')
    expect(output.attributes('class')).toContain('text-[#7b5208]')
  })

  it('renders the provided value with the standard text color', () => {
    const wrapper = mount(SalaryOutputPanel, {
      props: {
        value: '2500.00'
      }
    })

    const output = wrapper.get('p[class*="break-words"]')
    expect(output.text()).toBe('2500.00')
    expect(output.attributes('class')).toContain('text-[#38260a]')
  })
})
