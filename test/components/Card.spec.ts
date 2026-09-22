import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import Card from '../../src/runtime/components/Card.vue'

describe('Card', () => {
  it('renders title, description and body', () => {
    const wrapper = mount(Card, {
      props: {
        title: 'Invoice',
        description: 'September'
      },
      slots: {
        default: 'Body copy'
      }
    })

    expect(wrapper.find('[data-slot="title"]').text()).toBe('Invoice')
    expect(wrapper.find('[data-slot="description"]').text()).toBe('September')
    expect(wrapper.find('[data-slot="body"]').text()).toContain('Body copy')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders header and footer slots', () => {
    const wrapper = mount(Card, {
      slots: {
        header: '<span data-test="header">Head</span>',
        default: 'Body',
        footer: '<span data-test="footer">Foot</span>'
      }
    })

    expect(wrapper.find('[data-test="header"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="footer"]').exists()).toBe(true)
  })

  it('merges ui overrides per slot', () => {
    const wrapper = mount(Card, {
      props: {
        title: 'Invoice',
        ui: { title: 'uppercase' }
      }
    })

    expect(wrapper.find('[data-slot="title"]').classes()).toContain('uppercase')
  })

  it('passes accessibility checks', async () => {
    const wrapper = mount(Card, {
      props: {
        title: 'Invoice',
        description: 'September totals'
      },
      slots: {
        default: 'Line items'
      }
    })

    expect(await axe(wrapper.element, {
      rules: {
        region: { enabled: false }
      }
    })).toHaveNoViolations()
  })
})
