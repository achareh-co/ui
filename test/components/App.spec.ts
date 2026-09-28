import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import App from '../../src/runtime/components/App.vue'
import Input from '../../src/runtime/components/Input.vue'

const root = (wrapper: ReturnType<typeof mount>) => wrapper.find('[data-slot="root"]')

describe('App', () => {
  it('renders an rtl root by default', () => {
    const wrapper = mount(App, {
      slots: { default: '<p>متن</p>' }
    })

    expect(root(wrapper).exists()).toBe(true)
    expect(root(wrapper).attributes('dir')).toBe('rtl')
    expect(root(wrapper).classes()).toContain('bg-default')
    expect(wrapper.find('p').text()).toBe('متن')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('sets the dir attribute from the prop', () => {
    const wrapper = mount(App, { props: { dir: 'ltr' } })
    expect(root(wrapper).attributes('dir')).toBe('ltr')
  })

  it('merges root classes from class and ui', () => {
    const wrapper = mount(App, {
      props: { class: 'min-h-0', ui: { root: 'isolate-auto' } }
    })

    expect(root(wrapper).classes()).toContain('min-h-0')
    expect(root(wrapper).classes()).not.toContain('min-h-screen')
    expect(root(wrapper).classes()).toContain('isolate-auto')
  })

  it('passes its direction to Input', () => {
    const wrapper = mount(App, {
      props: { dir: 'ltr' },
      slots: { default: () => h(Input, { modelValue: 'abc' }) }
    })

    expect(wrapper.find('[data-slot="field"]').attributes('dir')).toBe('ltr')
  })

  it('passes accessibility checks', async () => {
    const wrapper = mount(App, {
      slots: { default: '<p>متن</p>' }
    })

    expect(await axe(root(wrapper).element, {
      rules: { region: { enabled: false } }
    })).toHaveNoViolations()
  })
})
