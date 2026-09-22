<script setup lang="ts">
const dark = ref(false)

function toggleColorMode() {
  dark.value = !dark.value
  document.documentElement.classList.toggle('dark', dark.value)
}
</script>

<template>
  <main class="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-10">
    <header class="flex items-start justify-between gap-4">
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

    <UCard
      title="Button"
      description="color, variant, size and a per-slot ui override"
    >
      <div class="flex flex-wrap items-center gap-2">
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
      <div class="mt-4 flex flex-wrap items-center gap-2">
        <UButton
          label="xs"
          size="xs"
        />
        <UButton
          label="sm"
          size="sm"
        />
        <UButton
          label="md"
          size="md"
        />
        <UButton
          label="lg"
          size="lg"
        />
        <UButton
          label="xl"
          size="xl"
        />
      </div>
      <div class="mt-4">
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
      title="Card slots"
      description="header, body and footer stay independently themeable"
    >
      <p class="text-muted text-sm">
        Body slot. The footer below is a named slot.
      </p>
      <template #footer>
        <div class="flex justify-end">
          <UButton label="Continue" />
        </div>
      </template>
    </UCard>
  </main>
</template>
