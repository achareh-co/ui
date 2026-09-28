import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import StoryIcon from '../storybook/StoryIcon.vue'
import Input from './Input.vue'

const ICONS = {
  search: [
    'M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14z',
    'M20 20l-3.5-3.5'
  ]
} as const

const WEIGHTS = ['bold', 'light'] as const
const STATES = ['neutral', 'error', 'success', 'warning'] as const
const RADII = ['none', 'xs', 'sm'] as const
const PADDINGS = ['dense', 'compact', 'cozy', 'comfortable'] as const
const ALIGNS = ['start', 'center', 'end'] as const
const DIRECTIONS = ['rtl', 'ltr'] as const

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    placeholder: { control: 'text' },
    weight: { control: { type: 'select' }, options: WEIGHTS },
    state: { control: { type: 'select' }, options: STATES },
    radius: { control: { type: 'select' }, options: RADII },
    paddingX: { control: { type: 'select' }, options: PADDINGS },
    paddingY: { control: { type: 'select' }, options: PADDINGS },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    clearable: { control: 'boolean' },
    numeric: { control: 'boolean' },
    direction: { control: { type: 'select' }, options: DIRECTIONS },
    emptyDirection: { control: { type: 'select' }, options: [...DIRECTIONS, undefined] },
    align: { control: { type: 'select' }, options: ALIGNS }
  },
  args: {
    modelValue: '',
    placeholder: 'متن را وارد کنید',
    weight: 'bold',
    state: 'neutral',
    radius: 'xs',
    paddingX: 'cozy',
    paddingY: 'comfortable',
    readonly: false,
    disabled: false,
    clearable: false,
    numeric: false,
    direction: 'rtl',
    align: 'start'
  }
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: args => ({
    components: { Input },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: `
      <div style="max-width:328px;padding:16px;">
        <Input
          v-bind="args"
          v-model="value"
        />
      </div>
    `
  })
}

export const Weights: Story = {
  parameters: { controls: { disable: true } },
  render: args => ({
    components: { Input },
    setup: () => ({ args, weights: WEIGHTS }),
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:328px;padding:16px;">
        <Input
          v-for="w in weights"
          :key="w"
          v-bind="args"
          :weight="w"
          :placeholder="w"
        />
      </div>
    `
  })
}

export const ColorStates: Story = {
  parameters: { controls: { disable: true } },
  render: args => ({
    components: { Input },
    setup() {
      const value = ref('مقدار نمونه')
      return { args, value, STATES }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:328px;padding:16px;">
        <Input
          v-for="state in STATES"
          :key="state"
          v-bind="args"
          v-model="value"
          :state="state"
          :placeholder="state"
        />
      </div>
    `
  })
}

export const Radii: Story = {
  parameters: { controls: { disable: true } },
  render: args => ({
    components: { Input },
    setup: () => ({ args, RADII }),
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:328px;padding:16px;">
        <Input
          v-for="radius in RADII"
          :key="radius"
          v-bind="args"
          :radius="radius"
          :placeholder="'radius: ' + radius"
        />
      </div>
    `
  })
}

export const Paddings: Story = {
  parameters: { controls: { disable: true } },
  render: args => ({
    components: { Input },
    setup: () => ({ args, PADDINGS }),
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:400px;padding:16px;">
        <Input
          v-for="padding in PADDINGS"
          :key="padding"
          v-bind="args"
          :padding-x="padding"
          :padding-y="padding"
          :placeholder="'p-x / p-y: ' + padding"
        />
        <Input
          v-bind="args"
          padding-x="cozy"
          padding-y="comfortable"
          placeholder="پیش‌فرض (cozy × comfortable)"
        />
      </div>
    `
  })
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: args => ({
    components: { Input },
    setup() {
      const filled = ref('متن پر شده')
      return { args, filled }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:328px;padding:16px;">
        <Input v-bind="args" placeholder="پیش‌فرض (خالی)" />
        <Input v-bind="args" v-model="filled" placeholder="پر شده" />
        <Input v-bind="args" placeholder="غیرفعال" disabled />
        <Input v-bind="args" v-model="filled" placeholder="فقط خواندنی" readonly />
        <Input v-bind="args" v-model="filled" placeholder="خطا" state="error" />
      </div>
    `
  })
}

export const LeadingTrailingIcon: Story = {
  parameters: { controls: { disable: true } },
  render: args => ({
    components: { Input, StoryIcon },
    setup: () => ({ args, icon: ICONS.search }),
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:328px;padding:16px;">
        <Input v-bind="args" placeholder="آیکون ابتدا">
          <template #leading>
            <StoryIcon :d="icon" />
          </template>
        </Input>
        <Input v-bind="args" placeholder="آیکون انتها">
          <template #trailing>
            <StoryIcon :d="icon" />
          </template>
        </Input>
      </div>
    `
  })
}

export const PrefixSuffix: Story = {
  parameters: { controls: { disable: true } },
  render: args => ({
    components: { Input, StoryIcon },
    setup: () => ({ args, icon: ICONS.search }),
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:328px;padding:16px;">
        <Input v-bind="args" placeholder="مبلغ">
          <template #leading>
            <StoryIcon :d="icon" />
          </template>
          <template #prefix>جستجو</template>
        </Input>
        <Input v-bind="args" placeholder="مبلغ">
          <template #suffix>تومان</template>
        </Input>
      </div>
    `
  })
}

export const Clearable: Story = {
  args: { clearable: true },
  render: args => ({
    components: { Input },
    setup() {
      const value = ref('متن قابل پاک کردن')
      return { args, value }
    },
    template: `
      <div style="max-width:328px;padding:16px;">
        <Input v-bind="args" v-model="value" clearable />
      </div>
    `
  })
}

export const Align: Story = {
  parameters: { controls: { disable: true } },
  render: args => ({
    components: { Input },
    setup: () => ({ args, aligns: ALIGNS }),
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:328px;padding:16px;">
        <Input
          v-for="a in aligns"
          :key="a"
          v-bind="args"
          :align="a"
          :placeholder="'align: ' + a"
          model-value="متن نمونه"
        />
      </div>
    `
  })
}

export const Direction: Story = {
  parameters: { controls: { disable: true } },
  render: args => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <div style="max-width:328px;padding:16px;">
        <Input
          v-bind="args"
          v-model="value"
          placeholder="شماره موبایل"
          empty-direction="rtl"
          direction="ltr"
          align="start"
          numeric
          clearable
        >
          <template v-if="value" #trailing>+98</template>
        </Input>
      </div>
    `
  })
}

export const Numeric: Story = {
  args: { numeric: true },
  render: args => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <div style="max-width:328px;padding:16px;">
        <Input
          v-bind="args"
          v-model="value"
          placeholder="فقط عدد"
          numeric
        />
      </div>
    `
  })
}

export const StateWeightMatrix: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Input },
    setup: () => ({
      weights: WEIGHTS,
      rows: [
        { label: 'default', props: {} },
        { label: 'error', props: { state: 'error' } },
        { label: 'success', props: { state: 'success' } },
        { label: 'warning', props: { state: 'warning' } },
        { label: 'disabled', props: { disabled: true } },
        { label: 'readonly', props: { readonly: true, modelValue: 'فقط خواندنی' } }
      ]
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;padding:16px;">
        <div v-for="row in rows" :key="row.label">
          <div style="margin-bottom:8px;font-weight:600;">{{ row.label }}</div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;max-width:700px;">
            <div
              v-for="w in weights"
              :key="w"
              style="flex:1;min-width:200px;"
            >
              <Input
                :weight="w"
                v-bind="row.props"
                :placeholder="w"
              />
            </div>
          </div>
        </div>
      </div>
    `
  })
}
