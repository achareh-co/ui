<script setup lang="ts">
import { ref } from 'vue'

const dark = ref(false)

function toggleColorMode() {
  dark.value = !dark.value
  document.documentElement.classList.toggle('dark', dark.value)
}
</script>

<template>
  <UApp>
    <main class="mx-auto flex max-w-3xl flex-col gap-12 px-10 py-14">
      <header class="flex items-start justify-between gap-8">
        <div>
          <p class="text-sm text-muted">
            Vue playground
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

      <UCard
        title="Button"
        description="Same components, registered by the Vite plugin"
      >
        <div class="flex flex-wrap items-center gap-4">
          <UButton label="Primary" />
          <UButton
            label="Outline"
            variant="outline"
          />
          <UButton
            label="Soft"
            color="success"
            variant="soft"
          />
          <UButton
            label="Ghost"
            color="neutral"
            variant="ghost"
          />
          <UButton
            label="Error"
            color="error"
            variant="subtle"
          />
        </div>
        <div class="mt-8">
          <UButton
            label="Rounded"
            variant="outline"
            color="neutral"
            :ui="{ base: 'rounded-full' }"
          >
            <template #leading>
              <span aria-hidden="true">+</span>
            </template>
          </UButton>
        </div>
      </UCard>

      <UCard
        title="Color"
        description="Palette step, semantic role, and emphasis alpha"
      >
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
      </UCard>

      <UCard
        title="Typography"
        description="RTL-Fa role. typo-label-large sets size, line-height, weight, tracking, and family"
      >
        <p
          class="typo-label-large text-default"
          data-typography="label-large"
        >
          typo-label-large
        </p>
      </UCard>
    </main>
  </UApp>
</template>
