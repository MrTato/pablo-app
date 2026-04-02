<script setup lang="ts">
import { computed } from 'vue'

const liveValue = ref('')
const activeKey = ref('')
let activeKeyTimeout: ReturnType<typeof setTimeout> | undefined

const keypadRows = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['0', '.', '00']
]

function flashKey(token: string) {
  activeKey.value = token

  if (activeKeyTimeout) {
    clearTimeout(activeKeyTimeout)
  }

  activeKeyTimeout = setTimeout(() => {
    activeKey.value = ''
  }, 140)
}

function appendValue(token: string) {
  flashKey(token)
  liveValue.value += token
}

function clearValue() {
  flashKey('clear')
  liveValue.value = ''
}

function backspaceValue() {
  flashKey('backspace')
  liveValue.value = liveValue.value.slice(0, -1)
}

function normalizeNumericInput(value: string) {
  return value.replace(/[^0-9.]/g, '')
}

function handleKeydown(event: KeyboardEvent) {
  if (/^[0-9.]$/.test(event.key)) {
    flashKey(event.key)
  }

  if (event.key === 'Backspace') {
    flashKey('backspace')
  }
}

function handleInput(value: string) {
  liveValue.value = normalizeNumericInput(value)
}

const hasInvalidNumber = computed(() => {
  if (!liveValue.value) {
    return false
  }

  return !/^\d+(\.\d+)?$/.test(liveValue.value)
})
</script>

<template>
  <div class="grid lg:grid-cols-[0.72fr_1.48fr] xl:grid-cols-[0.68fr_1.52fr]">
    <SalaryHero />

    <section class="px-4 py-5 sm:px-6 sm:py-6 lg:px-10 lg:py-8 xl:px-12">
      <div class="rounded-[1.6rem] border border-[#8d6816]/14 bg-white p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] sm:p-4">
        <div class="grid gap-4 lg:grid-cols-2">
          <SalaryInputPanel
            :model-value="liveValue"
            :has-invalid-number="hasInvalidNumber"
            @update:model-value="handleInput"
            @keydown="handleKeydown"
          >
            <SalaryKeypad
              :keypad-rows="keypadRows"
              :active-key="activeKey"
              @append="appendValue"
              @clear="clearValue"
              @backspace="backspaceValue"
            />
          </SalaryInputPanel>

          <SalaryOutputPanel :value="liveValue" />
        </div>
      </div>
    </section>
  </div>
</template>
