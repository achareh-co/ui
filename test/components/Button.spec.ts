import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import Button from '../../src/runtime/components/Button.vue'
import { appConfig } from '../mocks/imports'

describe('Button', () => {
  it('renders a primary button', () => {
    const wrapper = mount(Button, {
      props: { label: 'Save' }
    })

    expect(wrapper.text()).toContain('Save')
    expect(wrapper.attributes('data-slot')).toBe('base')
    expect(wrapper.classes()).toContain('bg-primary')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('applies color, variant and size', () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Delete',
        color: 'error',
        variant: 'outline',
        size: 'lg'
      }
    })

    const classes = wrapper.classes()
    expect(classes).toContain('text-error')
    expect(classes).toContain('ring-error/50')
    expect(classes).toContain('px-3')
  })

  it('merges slot classes from the ui prop', () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Save',
        ui: { label: 'font-bold' }
      }
    })

    expect(wrapper.find('[data-slot="label"]').classes()).toContain('font-bold')
  })

  it('renders the leading slot', () => {
    const wrapper = mount(Button, {
      props: { label: 'Next' },
      slots: { leading: '<span data-test="icon">+</span>' }
    })

    expect(wrapper.find('[data-test="icon"]').exists()).toBe(true)
    expect(wrapper.find('[data-slot="leading"]').exists()).toBe(true)
  })

  it('sets the disabled attribute', () => {
    const wrapper = mount(Button, {
      props: { label: 'Save', disabled: true }
    })

    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('reads default variants from app config', () => {
    appConfig.ui.button = { defaultVariants: { size: 'xl' } }
    const wrapper = mount(Button, { props: { label: 'Save' } })
    expect(wrapper.classes()).toContain('text-base')
    delete appConfig.ui.button
  })

  it('passes accessibility checks', async () => {
    const wrapper = mount(Button, {
      props: { label: 'Save changes' }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
