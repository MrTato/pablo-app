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

function flashKey(token: string) {
  activeKey.value = token

  if (activeKeyTimeout) {
    clearTimeout(activeKeyTimeout)
  }

  activeKeyTimeout = setTimeout(() => {
    activeKey.value = ''
  }, 140)
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

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  liveValue.value = normalizeNumericInput(target.value)
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
    <aside class="border-b border-[#d6a11a]/20 bg-[linear-gradient(180deg,#f1c33b_0%,#dca41c_100%)] px-6 py-8 text-[#4d3207] sm:px-8 sm:py-10 lg:border-r lg:border-b-0 lg:px-8 lg:py-12 xl:px-10">
      <p class="text-[0.7rem] font-semibold uppercase tracking-[0.38em] text-[#7b5208]/85">
        Calculadora Salarial
      </p>
      <h1 class="mt-4 max-w-xs text-4xl leading-tight tracking-tight text-[#3f2905] sm:text-5xl lg:max-w-sm lg:text-[3.2rem] lg:leading-[1.05] xl:text-[3.5rem] [font-family:Georgia,'Times_New_Roman',serif]">
        Calculadora del salario neto.
      </h1>
      <p class="mt-5 max-w-sm text-base leading-7 text-[#5f3f09]/88 sm:text-lg">
        Puede ingresar su salario bruto y subsecuentemente se mostrara su salario neto.
      </p>
    </aside>

    <section class="px-4 py-5 sm:px-6 sm:py-6 lg:px-10 lg:py-8 xl:px-12">
      <div class="rounded-[1.6rem] border border-[#8d6816]/14 bg-white p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] sm:p-4">
        <div class="grid gap-4 lg:grid-cols-2">
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
                v-model="liveValue"
                rows="5"
                placeholder="Ingrese su salario bruto..."
                inputmode="decimal"
                class="min-h-40 w-full resize-none rounded-[1.2rem] border px-5 py-5 text-lg leading-8 text-[#38260a] outline-none transition duration-200 placeholder:text-[#b28a33] sm:min-h-44 sm:text-xl lg:min-h-48"
                :class="hasInvalidNumber
                  ? 'border-red-400 bg-red-50/80 focus:border-red-500 focus:bg-red-50 focus:ring-4 focus:ring-red-200/80'
                  : 'border-[#b8891f]/16 bg-white focus:border-[#e8b631]/50 focus:bg-white focus:ring-4 focus:ring-[#e8b631]/18'"
                @keydown="handleKeydown"
                @input="handleInput"
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

            <div class="mt-4 space-y-3">
              <div
                v-for="(row, rowIndex) in keypadRows"
                :key="`row-${rowIndex}`"
                class="grid grid-cols-3 gap-3"
              >
                <button
                  v-for="token in row"
                  :key="token"
                  type="button"
                  class="rounded-[1rem] border px-4 py-4 text-xl font-semibold text-[#4b350d] shadow-[0_8px_20px_rgba(108,79,20,0.08)] transition sm:py-5"
                  :class="activeKey === token
                    ? 'border-[#d39d1b]/35 bg-[#f7df9a] text-[#38260a] shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_0_0_3px_rgba(232,182,49,0.22)]'
                    : 'border-[#8d6816]/10 bg-white hover:-translate-y-0.5 hover:bg-[#fff7e2] active:translate-y-0'"
                  @click="appendValue(token)"
                >
                  {{ token }}
                </button>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  class="rounded-[1rem] border px-4 py-4 text-base font-semibold transition sm:py-5"
                  :class="activeKey === 'clear'
                    ? 'border-[#c89112]/28 bg-[#efcc6a] text-[#38260a] shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_0_0_3px_rgba(232,182,49,0.22)]'
                    : 'border-[#b8891f]/18 bg-[#e8b631] text-[#38260a] hover:bg-[#efc44d] active:translate-y-0'"
                  @click="clearValue"
                >
                  Limpiar
                </button>
                <button
                  type="button"
                  class="rounded-[1rem] border px-4 py-4 text-base font-semibold transition sm:py-5"
                  :class="activeKey === 'backspace'
                    ? 'border-[#c89112]/22 bg-[#f8e8b7] text-[#4b350d] shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_0_0_3px_rgba(232,182,49,0.18)]'
                    : 'border-[#8d6816]/12 bg-[#f8f0d8] text-[#4b350d] hover:bg-[#f4e3b3] active:translate-y-0'"
                  @click="backspaceValue"
                >
                  Borrar
                </button>
              </div>
            </div>
          </section>

          <section class="rounded-[1.35rem] border border-[#8d6816]/12 bg-[linear-gradient(180deg,#ffffff_0%,#fff9ed_100%)] p-4 sm:p-5 lg:p-6">
            <div class="mb-4">
              <p class="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#936d1b]">
                Salario Neto
              </p>
              <p class="mt-2 text-sm text-[#8a6a28]">
                Resultado mostrado
              </p>
            </div>

            <div class="flex min-h-64 rounded-[1.2rem] border border-[#8d6816]/10 bg-white px-5 py-5 sm:min-h-72 lg:min-h-[24rem]">
              <p
                class="w-full break-words text-xl leading-8 sm:text-2xl lg:text-[2rem] lg:leading-10 [font-family:Georgia,'Times_New_Roman',serif]"
                :class="liveValue ? 'text-[#38260a]' : 'text-[#7b5208]'"
              >
                {{ liveValue || 'Aqui se mostrara su salario neto.' }}
              </p>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>
