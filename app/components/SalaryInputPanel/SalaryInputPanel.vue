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
  <section class="rounded-[1.35rem] border border-[#8d6816]/12 bg-[#fffdf8] p-4 sm:p-5 lg:p-6">
    <div class="mb-4">
      <p class="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#936d1b]">
        Salario Bruto
      </p>
      <p class="mt-2 text-sm text-[#8a6a28]">
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
        class="min-h-40 w-full resize-none rounded-[1.2rem] border px-5 py-5 text-lg leading-8 text-[#38260a] outline-none transition duration-200 placeholder:text-[#b28a33] sm:min-h-44 sm:text-xl lg:min-h-48"
        :class="hasInvalidNumber
          ? 'border-red-400 bg-red-50/80 focus:border-red-500 focus:bg-red-50 focus:ring-4 focus:ring-red-200/80'
          : 'border-[#b8891f]/16 bg-white focus:border-[#e8b631]/50 focus:bg-white focus:ring-4 focus:ring-[#e8b631]/18'"
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
          class="absolute right-4 top-4 rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white shadow-lg"
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
