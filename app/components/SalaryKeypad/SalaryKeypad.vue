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
        class="rounded-[1rem] border px-4 py-4 text-xl font-semibold text-[#4b350d] shadow-[0_8px_20px_rgba(108,79,20,0.08)] transition sm:py-5 [font-family:Arial,sans-serif]"
        :class="activeKey === token
          ? 'border-[#d39d1b]/35 bg-[#f7df9a] text-[#38260a] shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_0_0_3px_rgba(232,182,49,0.22)]'
          : 'border-[#8d6816]/10 bg-white hover:-translate-y-0.5 hover:bg-[#fff7e2] active:translate-y-0'"
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
          ? 'border-[#c89112]/28 bg-[#efcc6a] text-[#38260a] shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_0_0_3px_rgba(232,182,49,0.22)]'
          : 'border-[#b8891f]/18 bg-[#e8b631] text-[#38260a] hover:bg-[#efc44d] active:translate-y-0'"
        @click="emit('clear')"
      >
        Limpiar
      </button>
      <button
        type="button"
        class="rounded-[1rem] border px-4 py-4 text-base font-semibold transition sm:py-5 [font-family:Arial,sans-serif]"
        :class="activeKey === 'backspace'
          ? 'border-[#c89112]/22 bg-[#f8e8b7] text-[#4b350d] shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_0_0_3px_rgba(232,182,49,0.18)]'
          : 'border-[#8d6816]/12 bg-[#f8f0d8] text-[#4b350d] hover:bg-[#f4e3b3] active:translate-y-0'"
        @click="emit('backspace')"
      >
        Borrar
      </button>
    </div>
  </div>
</template>
