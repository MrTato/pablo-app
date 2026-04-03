<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

type ThemeOption = {
  id: string
  swatch: string
}

const themes: ThemeOption[] = [
  {
    id: 'gray',
    swatch: '#8f8f97'
  },
  {
    id: 'golden',
    swatch: '#e8b631'
  },
  {
    id: 'ocean',
    swatch: '#174e73'
  },
  {
    id: 'ledger',
    swatch: '#1f5b3a'
  }
]

const defaultTheme = 'gray'
const selectedTheme = useState('app-theme', () => {
  if (import.meta.client) {
    const documentTheme = document.documentElement.getAttribute('data-theme')

    if (documentTheme && themes.some(theme => theme.id === documentTheme)) {
      return documentTheme
    }
  }

  return defaultTheme
})
const isThemeMenuOpen = ref(false)
const pickerRef = ref<HTMLElement | null>(null)

function selectTheme(themeId: string) {
  selectedTheme.value = themeId
  isThemeMenuOpen.value = false
}

function handleDocumentClick(event: MouseEvent) {
  if (!pickerRef.value) {
    return
  }

  const target = event.target as Node | null
  if (target && !pickerRef.value.contains(target)) {
    isThemeMenuOpen.value = false
  }
}

onMounted(() => {
  const documentTheme = document.documentElement.getAttribute('data-theme')

  if (documentTheme && themes.some(theme => theme.id === documentTheme)) {
    selectedTheme.value = documentTheme
  }

  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})

watch(selectedTheme, (value) => {
  if (!import.meta.client) {
    return
  }

  document.documentElement.setAttribute('data-theme', value)
  window.localStorage.setItem('app-theme', value)
})
</script>

<template>
  <div class="min-h-screen overflow-hidden bg-white text-[color:var(--color-shell-text)]">
    <div class="relative isolate flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-14">
      <div class="absolute inset-0 [background-image:radial-gradient(circle_at_top_left,var(--color-backdrop-radial),transparent_26%),linear-gradient(180deg,_#ffffff_0%,var(--color-page-mid)_42%,var(--color-page-bottom)_100%)]" />
      <div class="absolute inset-0 opacity-18 [background-image:linear-gradient(var(--color-grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-grid-line-alt)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div
        ref="pickerRef"
        class="absolute right-4 top-4 z-30 sm:right-6 sm:top-6 lg:right-9 lg:top-9"
      >
        <div class="flex flex-col items-end gap-2">
          <button
            type="button"
            class="h-8 w-8 rounded-full border border-white/80 shadow-[0_10px_24px_rgba(48,34,8,0.14)] sm:h-9 sm:w-9"
            aria-label="Seleccionar color"
            :aria-expanded="isThemeMenuOpen"
            style="background-color: var(--color-picker-swatch);"
            @click="isThemeMenuOpen = !isThemeMenuOpen"
          />

          <div
            v-if="isThemeMenuOpen"
            class="flex flex-col items-end gap-2"
          >
            <button
              v-for="theme in themes"
              :key="theme.id"
              type="button"
              class="h-8 w-8 rounded-full border border-white/80 shadow-[0_10px_24px_rgba(48,34,8,0.14)] sm:h-9 sm:w-9"
              :aria-label="`Cambiar color a ${theme.id}`"
              :style="{ backgroundColor: theme.swatch }"
              @click="selectTheme(theme.id)"
            />
          </div>
        </div>
      </div>

      <main class="relative w-full max-w-7xl overflow-hidden rounded-[2rem] border border-[color:var(--color-shell-border)] bg-white/96 shadow-[0_24px_90px_var(--color-shell-shadow)]">
        <slot />
      </main>
    </div>
  </div>
</template>
