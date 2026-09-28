import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import Input from '../../src/runtime/components/Input.vue'
import { appConfig } from '../mocks/imports'

describe('Input', () => {
  it('renders an empty field', () => {
    const wrapper = mount(Input, {
      props: { placeholder: 'نام' }
    })

    const input = wrapper.find('input')
    expect(wrapper.attributes('data-slot')).toBe('root')
    expect(input.attributes('data-slot')).toBe('base')
    expect(input.attributes('placeholder')).toBe('نام')
    expect(input.element.value).toBe('')
    expect(wrapper.classes()).toContain('border-xs')
    expect(wrapper.classes()).toContain('px-6')
    expect(wrapper.classes()).toContain('py-8')
    expect(wrapper.classes()).toContain('rounded-xs')
    expect(input.classes()).toContain('typo-body-large')
    expect(wrapper.find('[data-slot="field"]').attributes('dir')).toBe('rtl')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('applies state, weight and padding', () => {
    const wrapper = mount(Input, {
      props: {
        state: 'error',
        weight: 'light',
        paddingX: 'dense',
        paddingY: 'compact',
        radius: 'sm'
      }
    })

    expect(wrapper.classes()).toContain('text-error')
    expect(wrapper.classes()).toContain('border-error/medium')
    expect(wrapper.classes()).toContain('px-2')
    expect(wrapper.classes()).toContain('py-4')
    expect(wrapper.classes()).toContain('rounded-sm')
    expect(wrapper.find('input').classes()).toContain('typo-body-small')
    expect(wrapper.find('input').classes()).toContain('caret-error')
  })

  it('merges slot classes from the ui prop', () => {
    const wrapper = mount(Input, {
      props: { ui: { base: 'font-bold' } }
    })

    expect(wrapper.find('[data-slot="base"]').classes()).toContain('font-bold')
  })

  it('renders leading and trailing slots', () => {
    const wrapper = mount(Input, {
      slots: {
        leading: '<span data-test="leading"></span>',
        trailing: '<span data-test="trailing"></span>'
      }
    })

    expect(wrapper.find('[data-slot="leading"]').exists()).toBe(true)
    expect(wrapper.find('[data-slot="trailing"]').exists()).toBe(true)
  })

  it('converts Persian and Arabic digits', async () => {
    const wrapper = mount(Input, {
      props: { modelValue: '', numeric: true }
    })

    await wrapper.find('input').setValue('۱۲٤')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['124'])
    expect(wrapper.find('input').attributes('inputmode')).toBe('numeric')
  })

  it('clears the value and emits clear', async () => {
    const wrapper = mount(Input, {
      props: { modelValue: 'متن', clearable: true }
    })

    await wrapper.find('[data-slot="clear"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
    expect(wrapper.emitted('clear')).toHaveLength(1)
  })

  it('hides clear when the field is empty or disabled', () => {
    const empty = mount(Input, { props: { clearable: true, modelValue: '' } })
    const disabled = mount(Input, { props: { clearable: true, modelValue: 'متن', disabled: true } })

    expect(empty.find('[data-slot="clear"]').exists()).toBe(false)
    expect(disabled.find('[data-slot="clear"]').exists()).toBe(false)
    expect(disabled.classes()).toContain('pointer-events-none')
  })

  it('switches direction when the field is filled', () => {
    const empty = mount(Input, {
      props: { direction: 'ltr', emptyDirection: 'rtl', modelValue: '' }
    })
    const filled = mount(Input, {
      props: { direction: 'ltr', emptyDirection: 'rtl', modelValue: '0912' }
    })

    expect(empty.find('[data-slot="field"]').attributes('dir')).toBe('rtl')
    expect(filled.find('[data-slot="field"]').attributes('dir')).toBe('ltr')
  })

  it('emits enter', async () => {
    const wrapper = mount(Input)
    await wrapper.find('input').trigger('keydown.enter')
    expect(wrapper.emitted('enter')).toHaveLength(1)
  })

  it('reads default variants from app config', () => {
    appConfig.ui.input = { defaultVariants: { weight: 'light' } }
    const wrapper = mount(Input)
    expect(wrapper.find('input').classes()).toContain('typo-body-small')
    delete appConfig.ui.input
  })

  it('passes accessibility checks', async () => {
    const wrapper = mount(Input, {
      attrs: { 'aria-label': 'نام' }
    })

    expect(await axe(wrapper.element, {
      rules: { region: { enabled: false } }
    })).toHaveNoViolations()
  })
})
