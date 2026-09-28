import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import Button from '../../src/runtime/components/Button.vue'
import { appConfig } from '../mocks/imports'

const icon = '<svg data-test="icon" viewBox="0 0 24 24"></svg>'

describe('Button', () => {
  it('renders a primary button', () => {
    const wrapper = mount(Button, {
      props: { label: 'Save' }
    })

    expect(wrapper.text()).toContain('Save')
    expect(wrapper.attributes('data-slot')).toBe('base')
    expect(wrapper.classes()).toContain('bg-primary')
    expect(wrapper.classes()).toContain('typo-title-medium')
    expect(wrapper.classes()).toContain('rounded-xs')
    expect(wrapper.classes()).toContain('px-4')
    expect(wrapper.classes()).toContain('py-4')
    expect(wrapper.classes()).toContain('min-h-14')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('applies color, variant and weight', () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Delete',
        color: 'error',
        variant: 'outline',
        weight: 'light'
      }
    })

    const classes = wrapper.classes()
    expect(classes).toContain('text-error')
    expect(classes).toContain('border-error/light')
    expect(classes).toContain('border-xs')
    expect(classes).toContain('bg-surface-container-low')
    expect(classes).toContain('typo-caption-medium')
  })

  it('applies padding and radius', () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Save',
        paddingX: 'comfortable',
        paddingY: 'dense',
        radius: 'full'
      }
    })

    const classes = wrapper.classes()
    expect(classes).toContain('px-8')
    expect(classes).toContain('py-2')
    expect(classes).toContain('min-h-12')
    expect(classes).toContain('rounded-full')
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

  it('renders leading and trailing slots', () => {
    const wrapper = mount(Button, {
      props: { label: 'Next' },
      slots: {
        leading: icon,
        trailing: icon
      }
    })

    expect(wrapper.find('[data-slot="leading"]').exists()).toBe(true)
    expect(wrapper.find('[data-slot="trailing"]').exists()).toBe(true)
    expect(wrapper.classes()).toContain('ps-8')
    expect(wrapper.classes()).toContain('pe-10')
    expect(wrapper.classes()).not.toContain('px-4')
  })

  it('replaces the trailing slot while loading', () => {
    const wrapper = mount(Button, {
      props: { label: 'Save', loading: true },
      slots: { trailing: icon }
    })

    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.find('[data-slot="spinner"]').exists()).toBe(true)
    expect(wrapper.find('[data-slot="trailing"]').exists()).toBe(false)
    expect(wrapper.classes()).toContain('cursor-progress!')
    expect(wrapper.classes()).toContain('gap-4')
  })

  it('renders a link when to is set', () => {
    const wrapper = mount(Button, {
      props: { label: 'Home', to: '/home' }
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('/home')
    expect(wrapper.attributes('type')).toBeUndefined()
  })

  it('sets the disabled attribute', () => {
    const wrapper = mount(Button, {
      props: { label: 'Save', disabled: true }
    })

    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('reads default variants from app config', () => {
    appConfig.ui.button = { defaultVariants: { weight: 'light' } }
    const wrapper = mount(Button, { props: { label: 'Save' } })
    expect(wrapper.classes()).toContain('typo-caption-medium')
    delete appConfig.ui.button
  })

  it('passes accessibility checks', async () => {
    const wrapper = mount(Button, {
      props: { label: 'Save changes' }
    })

    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
