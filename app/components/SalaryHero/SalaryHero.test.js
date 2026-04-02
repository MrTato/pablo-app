import { mount } from '@vue/test-utils'
import SalaryHero from './SalaryHero.vue'

describe('SalaryHero', () => {
  it('renders the calculator title and description', () => {
    const wrapper = mount(SalaryHero)

    expect(wrapper.text()).toContain('Calculadora Salarial')
    expect(wrapper.text()).toContain('Calculadora del salario neto.')
    expect(wrapper.text()).toContain('Puede ingresar su salario bruto')
  })
})
