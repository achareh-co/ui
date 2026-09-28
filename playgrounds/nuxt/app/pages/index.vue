<script setup lang="ts">
const dark = ref(false)
const name = ref('متن قابل پاک کردن')
const amount = ref('')
const phone = ref('')

function toggleColorMode() {
  dark.value = !dark.value
  document.documentElement.classList.toggle('dark', dark.value)
}
</script>

<template>
  <main class="mx-auto flex max-w-3xl flex-col gap-12 px-10 py-14">
    <header class="flex items-start justify-between gap-8">
      <div>
        <p class="text-sm text-muted">
          Nuxt playground
        </p>
        <h1 class="text-highlighted text-2xl font-semibold">
          Achareh UI
        </h1>
      </div>
      <UButton
        :label="dark ? 'Light' : 'Dark'"
        color="neutral"
        variant="outline"
        @click="toggleColorMode"
      />
    </header>

    <section class="flex flex-col gap-6">
      <div>
        <h2 class="text-highlighted text-lg font-semibold">
          Button
        </h2>
        <p class="text-muted text-sm">
          variant, weight, radius, loading and icons
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-4">
        <UButton label="Solid" />
        <UButton
          label="Soft"
          variant="soft"
        />
        <UButton
          label="Outline"
          variant="outline"
        />
        <UButton
          label="Ghost"
          variant="ghost"
        />
        <UButton
          label="Error"
          color="error"
          variant="outline"
        />
      </div>
      <div class="flex flex-wrap items-center gap-4">
        <UButton
          label="Bold"
          weight="bold"
        />
        <UButton
          label="Light"
          weight="light"
        />
        <UButton
          label="Full"
          radius="full"
        />
        <UButton
          label="Loading"
          loading
        />
      </div>
      <div class="flex flex-wrap items-center gap-4">
        <UButton label="Share">
          <template #leading>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M12 5v10M8 9l4-4 4 4M6 19h12" />
            </svg>
          </template>
        </UButton>
        <UButton label="Confirm">
          <template #trailing>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M5 12l5 5L20 7" />
            </svg>
          </template>
        </UButton>
        <UButton
          aria-label="Edit"
          radius="full"
        >
          <template #leading>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M4 20h4l10-10-4-4L4 16v4z" />
            </svg>
          </template>
        </UButton>
      </div>
      <UButton
        label="Block"
        block
      />
    </section>

    <section class="flex max-w-sm flex-col gap-6">
      <div>
        <h2 class="text-highlighted text-lg font-semibold">
          Input
        </h2>
        <p class="text-muted text-sm">
          state, clear, numeric and direction
        </p>
      </div>
      <UInput
        v-model="name"
        placeholder="نام"
        clearable
      />
      <UInput
        v-model="amount"
        placeholder="فقط عدد"
        numeric
        state="error"
      />
      <UInput
        v-model="phone"
        placeholder="شماره موبایل"
        numeric
        clearable
        direction="ltr"
        empty-direction="rtl"
        state="success"
      >
        <template
          v-if="phone"
          #trailing
        >
          +98
        </template>
      </UInput>
      <UInput
        model-value="غیرفعال"
        placeholder="غیرفعال"
        disabled
      />
      <UInput
        placeholder="هشدار"
        state="warning"
        weight="light"
      />
    </section>

    <section class="flex flex-col gap-6">
      <div>
        <h2 class="text-highlighted text-lg font-semibold">
          Color
        </h2>
        <p class="text-muted text-sm">
          Palette step, semantic role, and emphasis alpha
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-4">
        <span
          class="bg-primary-50 size-12 rounded-md"
          data-palette="primary-50"
        />
        <span
          class="bg-primary-50/high size-12 rounded-md"
          data-emphasis="primary-50/high"
        />
        <span
          class="bg-default hover:bg-on-primary size-12 rounded-md"
          data-semantic-hover="on-primary"
        />
        <span
          class="bg-primary text-on-primary rounded-md px-4 py-2"
          data-semantic="on-primary"
        >
          on-primary
        </span>
        <span
          class="text-on-primary/high"
          data-emphasis-text="on-primary/high"
        >
          text-on-primary/high
        </span>
        <span
          class="bg-red-500 size-12 rounded-md"
          data-tailwind="red-500"
        />
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="text-highlighted text-lg font-semibold">
        Typography
      </h2>
      <p
        class="typo-label-large text-default"
        data-typography="label-large"
      >
        typo-label-large
      </p>
    </section>
  </main>
</template>
