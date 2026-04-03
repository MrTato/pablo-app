<script setup lang="ts">
defineProps<{
  keypadRows: string[][]
  activeKey: string
}>()

const emit = defineEmits<{
  append: [token: string]
  clear: []
  backspace: []
}>()
</script>

<template>
  <div class="space-y-3">
    <div
      v-for="(row, rowIndex) in keypadRows"
      :key="`row-${rowIndex}`"
      class="grid grid-cols-3 gap-3"
    >
      <button
        v-for="token in row"
        :key="token"
        type="button"
        class="rounded-[1rem] border px-4 py-4 text-xl font-semibold text-[color:var(--color-key-text)] shadow-[0_8px_20px_rgba(108,79,20,0.08)] transition sm:py-5 [font-family:Arial,sans-serif]"
        :class="activeKey === token
          ? 'border-[color:var(--color-key-active-border)] bg-[var(--color-key-active-bg)] text-[color:var(--color-shell-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_0_0_3px_var(--color-key-active-ring)]'
          : 'border-[color:var(--color-key-border)] bg-white hover:-translate-y-0.5 hover:bg-[var(--color-key-hover-bg)] active:translate-y-0'"
        @click="emit('append', token)"
      >
        {{ token }}
      </button>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <button
        type="button"
        class="rounded-[1rem] border px-4 py-4 text-base font-semibold transition sm:py-5 [font-family:Arial,sans-serif]"
        :class="activeKey === 'clear'
          ? 'border-[color:var(--color-clear-active-border)] bg-[var(--color-clear-active-bg)] text-[color:var(--color-shell-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_0_0_3px_var(--color-key-active-ring)]'
          : 'border-[color:var(--color-clear-idle-border)] bg-[var(--color-clear-idle-bg)] text-[color:var(--color-shell-text)] hover:bg-[var(--color-clear-idle-hover)] active:translate-y-0'"
        @click="emit('clear')"
      >
        Limpiar
      </button>
      <button
        type="button"
        class="rounded-[1rem] border px-4 py-4 text-base font-semibold transition sm:py-5 [font-family:Arial,sans-serif]"
        :class="activeKey === 'backspace'
          ? 'border-[color:var(--color-backspace-active-border)] bg-[var(--color-backspace-active-bg)] text-[color:var(--color-key-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_0_0_3px_var(--color-key-active-ring)]'
          : 'border-[color:var(--color-backspace-idle-border)] bg-[var(--color-backspace-idle-bg)] text-[color:var(--color-key-text)] hover:bg-[var(--color-backspace-idle-hover)] active:translate-y-0'"
        @click="emit('backspace')"
      >
        Borrar
      </button>
    </div>
  </div>
</template>
