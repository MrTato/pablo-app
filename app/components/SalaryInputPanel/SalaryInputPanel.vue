<script setup lang="ts">
defineProps<{
  modelValue: string
  hasInvalidNumber: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  keydown: [event: KeyboardEvent]
}>()

function onInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

function onKeydown(event: KeyboardEvent) {
  emit('keydown', event)
}
</script>

<template>
  <section class="rounded-[1.35rem] border border-[color:var(--color-panel-border)] bg-[var(--color-panel-bg)] p-4 sm:p-5 lg:p-6">
    <div class="mb-4">
      <p class="font-paloseco text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-label)]">
        Salario Bruto
      </p>
      <p class="font-paloseco mt-2 text-sm text-[color:var(--color-subtext)]">
        Ingrese el monto base
      </p>
    </div>

    <label class="relative block">
      <span class="sr-only">Input value</span>
      <textarea
        :value="modelValue"
        rows="5"
        placeholder="Ingrese su salario bruto..."
        inputmode="decimal"
        class="min-h-40 w-full resize-none rounded-[1.2rem] border px-5 py-5 text-lg leading-8 text-[color:var(--color-shell-text)] outline-none transition duration-200 placeholder:text-[color:var(--color-placeholder)] sm:min-h-44 sm:text-xl lg:min-h-48 [font-family:Arial,sans-serif]"
        :class="hasInvalidNumber
          ? 'border-red-400 bg-red-50/80 focus:border-red-500 focus:bg-red-50 focus:ring-4 focus:ring-red-200/80'
          : 'border-[color:var(--color-input-border)] bg-[var(--color-control-bg)] focus:border-[color:var(--color-input-focus-border)] focus:bg-[var(--color-control-bg)] focus:ring-4 focus:ring-[color:var(--color-input-focus-ring)]'"
        @keydown="onKeydown"
        @input="onInput"
      />

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <span
          v-if="hasInvalidNumber"
          class="font-paloseco absolute right-4 top-4 rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white shadow-lg"
        >
          numero invalido
        </span>
      </transition>
    </label>

    <div class="mt-4">
      <slot />
    </div>
  </section>
</template>
