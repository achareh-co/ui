import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StoryIcon from '../storybook/StoryIcon.vue'
import Button from './Button.vue'

const ICONS = {
  share: 'M12 5v10M8 9l4-4 4 4M6 19h12',
  edit: 'M4 20h4l10-10-4-4L4 16v4z',
  check: 'M5 12l5 5L20 7'
} as const

const VARIANTS = ['solid', 'soft', 'outline', 'ghost'] as const
const WEIGHTS = ['light', 'bold'] as const
const TYPES = ['button', 'submit', 'reset'] as const
const PADDINGS = ['dense', 'compact', 'cozy', 'comfortable'] as const
const RADII = ['none', 'xs', 'sm', 'full'] as const
const STATES = ['default', 'hover', 'pressed', 'focused', 'disabled'] as const

const ACCENT_COLORS = ['primary', 'secondary', 'tertiary', 'error', 'success', 'warning', 'info'] as const
const NEUTRAL_COLORS = ['neutral', 'neutral-low', 'neutral-container', 'neutral-variant', 'inverse-neutral'] as const
const INVERSE_COLORS = [
  'inverse-primary',
  'inverse-secondary',
  'inverse-tertiary',
  'inverse-error',
  'inverse-success',
  'inverse-warning',
  'inverse-info'
] as const
const FIXED_COLORS = ['primary-fixed', 'secondary-fixed', 'tertiary-fixed', 'white-fixed'] as const
const BUTTON_COLORS = [...ACCENT_COLORS, ...NEUTRAL_COLORS, ...INVERSE_COLORS, ...FIXED_COLORS] as const

const PLAYGROUND_LABEL = 'دکمه'
const BLOCK_LABEL = 'دکمه تمام‌عرض'
const LOADING_LABEL = 'در حال بارگذاری'
const DISABLED_LABEL = 'غیرفعال'
const LEADING_ICON_LABEL = 'اشتراک‌گذاری'
const TRAILING_ICON_LABEL = 'تأیید'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: VARIANTS },
    color: { control: { type: 'select' }, options: [...BUTTON_COLORS] },
    weight: { control: { type: 'select' }, options: WEIGHTS },
    paddingX: { control: { type: 'select' }, options: PADDINGS },
    paddingY: { control: { type: 'select' }, options: PADDINGS },
    radius: { control: { type: 'select' }, options: RADII },
    block: { control: 'boolean' },
    type: { control: { type: 'select' }, options: TYPES },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' }
  },
  args: {
    variant: 'solid',
    color: 'primary',
    weight: 'bold',
    paddingX: 'compact',
    paddingY: 'compact',
    radius: 'xs',
    block: false,
    type: 'button',
    loading: false,
    disabled: false
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: args => ({
    components: { Button, StoryIcon },
    setup: () => ({ args, label: PLAYGROUND_LABEL }),
    template: '<Button v-bind="args">{{ label }}</Button>'
  })
}

export const Variants: Story = {
  render: args => ({
    components: { Button, StoryIcon },
    setup: () => ({ args, variants: VARIANTS }),
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;">
        <Button
          v-for="v in variants"
          :key="v"
          v-bind="args"
          :variant="v"
        >{{ v }}</Button>
      </div>
    `
  })
}

export const Colors: Story = {
  render: args => ({
    components: { Button, StoryIcon },
    setup: () => ({ args, colors: ACCENT_COLORS }),
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;">
        <Button
          v-for="c in colors"
          :key="c"
          v-bind="args"
          :color="c"
        >{{ c }}</Button>
      </div>
    `
  })
}

export const NeutralColors: Story = {
  parameters: { controls: { disable: true } },
  render: args => ({
    components: { Button, StoryIcon },
    setup: () => ({ args, colors: NEUTRAL_COLORS, variants: VARIANTS }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div v-for="v in variants" :key="v">
          <div style="margin-bottom:8px;font-weight:600;">{{ v }}</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;">
            <Button
              v-for="c in colors"
              :key="c"
              v-bind="args"
              :variant="v"
              :color="c"
            >{{ c }}</Button>
          </div>
        </div>
      </div>
    `
  })
}

export const InverseColors: Story = {
  parameters: { controls: { disable: true } },
  render: args => ({
    components: { Button, StoryIcon },
    setup: () => ({ args, colors: INVERSE_COLORS }),
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;background:var(--color-inverse-surface);padding:16px;border-radius:8px;">
        <Button
          v-for="c in colors"
          :key="c"
          v-bind="args"
          :color="c"
        >{{ c }}</Button>
      </div>
    `
  })
}

export const FixedColors: Story = {
  parameters: { controls: { disable: true } },
  render: args => ({
    components: { Button, StoryIcon },
    setup: () => ({ args, colors: FIXED_COLORS }),
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;">
        <Button
          v-for="c in colors"
          :key="c"
          v-bind="args"
          :color="c"
        >{{ c }}</Button>
      </div>
    `
  })
}

export const Weights: Story = {
  render: args => ({
    components: { Button, StoryIcon },
    setup: () => ({ args, weights: WEIGHTS }),
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;">
        <Button
          v-for="w in weights"
          :key="w"
          v-bind="args"
          :weight="w"
        >{{ w }}</Button>
      </div>
    `
  })
}

export const Block: Story = {
  args: { block: true },
  render: args => ({
    components: { Button, StoryIcon },
    setup: () => ({ args, label: BLOCK_LABEL }),
    template: `
      <div style="max-width:328px;padding:16px;">
        <Button v-bind="args">{{ label }}</Button>
      </div>
    `
  })
}

export const Loading: Story = {
  args: { loading: true },
  render: args => ({
    components: { Button, StoryIcon },
    setup: () => ({ args, label: LOADING_LABEL }),
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;align-items:center;">
        <Button v-bind="args">{{ label }}</Button>
        <div style="width:280px;">
          <Button v-bind="args" block>{{ label }}</Button>
        </div>
      </div>
    `
  })
}

export const Disabled: Story = {
  args: { disabled: true },
  render: args => ({
    components: { Button, StoryIcon },
    setup: () => ({ args, label: DISABLED_LABEL }),
    template: '<Button v-bind="args">{{ label }}</Button>'
  })
}

export const WithLeadingIcon: Story = {
  render: args => ({
    components: { Button, StoryIcon },
    setup: () => ({ args, icon: ICONS.share, label: LEADING_ICON_LABEL }),
    template: `
      <Button v-bind="args">
        <template #leading>
          <StoryIcon :d="icon" />
        </template>
        {{ label }}
      </Button>
    `
  })
}

export const WithTrailingIcon: Story = {
  render: args => ({
    components: { Button, StoryIcon },
    setup: () => ({ args, icon: ICONS.check, label: TRAILING_ICON_LABEL }),
    template: `
      <Button v-bind="args">
        {{ label }}
        <template #trailing>
          <StoryIcon :d="icon" />
        </template>
      </Button>
    `
  })
}

export const IconOnly: Story = {
  render: args => ({
    components: { Button, StoryIcon },
    setup: () => ({ args, icon: ICONS.edit }),
    template: `
      <Button v-bind="args" aria-label="ویرایش">
        <template #leading>
          <StoryIcon :d="icon" />
        </template>
      </Button>
    `
  })
}

export const IconSpacing: Story = {
  parameters: { controls: { disable: true } },
  render: args => ({
    components: { Button, StoryIcon },
    setup: () => ({ args, icon: ICONS.share, weights: WEIGHTS }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:center;">
        <div
          v-for="w in weights"
          :key="w"
          style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;justify-content:center;"
        >
          <Button v-bind="args" :weight="w">{{ w }} · متن</Button>
          <Button v-bind="args" :weight="w" aria-label="آیکون">
            <template #leading>
              <StoryIcon :d="icon" />
            </template>
          </Button>
          <Button v-bind="args" :weight="w">
            <template #leading>
              <StoryIcon :d="icon" />
            </template>
            {{ w }} · آیکون ابتدا
          </Button>
          <Button v-bind="args" :weight="w">
            {{ w }} · آیکون انتها
            <template #trailing>
              <StoryIcon :d="icon" />
            </template>
          </Button>
        </div>
      </div>
    `
  })
}

export const IconWeights: Story = {
  parameters: { controls: { disable: true } },
  render: args => ({
    components: { Button, StoryIcon },
    setup: () => ({ args, icon: ICONS.share, weights: WEIGHTS }),
    template: `
      <div style="display:flex;gap:12px;align-items:center;justify-content:center;">
        <Button
          v-for="w in weights"
          :key="w"
          v-bind="args"
          :weight="w"
        >
          <template #leading>
            <StoryIcon :d="icon" />
          </template>
          {{ w }}
        </Button>
      </div>
    `
  })
}

export const ColorsVariantsMatrix: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button, StoryIcon },
    setup: () => ({ variants: VARIANTS, colors: ACCENT_COLORS }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div v-for="v in variants" :key="v">
          <div style="margin-bottom:8px;font-weight:600;">{{ v }}</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;">
            <Button
              v-for="c in colors"
              :key="c"
              :variant="v"
              :color="c"
            >{{ c }}</Button>
          </div>
        </div>
      </div>
    `
  })
}

export const PaddingMatrix: Story = {
  parameters: { controls: { disable: true } },
  render: args => ({
    components: { Button, StoryIcon },
    setup: () => ({ args, paddings: PADDINGS, icon: ICONS.share }),
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;">
        <div v-for="py in paddings" :key="py">
          <div style="margin-bottom:8px;font-weight:600;">py={{ py }}</div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
            <Button
              v-for="px in paddings"
              :key="px"
              v-bind="args"
              :padding-x="px"
              :padding-y="py"
            >px={{ px }}</Button>
            <Button
              v-for="px in paddings"
              :key="'icon-' + px"
              v-bind="args"
              :padding-x="px"
              :padding-y="py"
              aria-label="آیکون"
            >
              <template #leading>
                <StoryIcon :d="icon" />
              </template>
            </Button>
          </div>
        </div>
      </div>
    `
  })
}

export const Radius: Story = {
  parameters: { controls: { disable: true } },
  render: args => ({
    components: { Button, StoryIcon },
    setup: () => ({ args, radii: RADII, icon: ICONS.share }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:center;">
        <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;">
          <Button
            v-for="r in radii"
            :key="r"
            v-bind="args"
            :radius="r"
          >{{ r }}</Button>
        </div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;">
          <Button
            v-for="r in radii"
            :key="'icon-' + r"
            v-bind="args"
            :radius="r"
            aria-label="آیکون"
          >
            <template #leading>
              <StoryIcon :d="icon" />
            </template>
          </Button>
        </div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;">
          <Button
            v-for="r in radii"
            :key="'leading-' + r"
            v-bind="args"
            :radius="r"
          >
            <template #leading>
              <StoryIcon :d="icon" />
            </template>
            {{ r }}
          </Button>
        </div>
      </div>
    `
  })
}

export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: '.is-hover',
      active: '.is-pressed',
      focusVisible: '.is-focused'
    }
  },
  render: args => ({
    components: { Button, StoryIcon },
    setup: () => ({ args, variants: VARIANTS, states: STATES }),
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;">
        <div v-for="v in variants" :key="v">
          <div style="margin-bottom:8px;font-weight:600;">{{ v }}</div>
          <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;">
            <div
              v-for="s in states"
              :key="s"
              style="display:flex;flex-direction:column;align-items:center;gap:8px;"
            >
              <div style="font-size:12px;">{{ s }}</div>
              <Button
                v-bind="args"
                :variant="v"
                :disabled="s === 'disabled'"
                :class="{
                  'is-hover': s === 'hover',
                  'is-pressed': s === 'pressed',
                  'is-focused': s === 'focused',
                }"
              >لیبل</Button>
            </div>
          </div>
        </div>
      </div>
    `
  })
}
