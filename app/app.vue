<script setup lang="ts">
const liveValue = ref('')

const keypadRows = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['0', '.', '00']
]

function appendValue(token: string) {
  liveValue.value += token
}

function clearValue() {
  liveValue.value = ''
}

function backspaceValue() {
  liveValue.value = liveValue.value.slice(0, -1)
}
</script>

<template>
  <div class="min-h-screen overflow-hidden bg-[#eef1ea] text-[#163128]">
    <NuxtRouteAnnouncer />

    <div class="relative isolate flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-14">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.16),_transparent_30%),linear-gradient(180deg,_#f4f5ef_0%,_#e5ebe1_40%,_#dbe4d7_100%)]" />
      <div class="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(22,49,40,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(22,49,40,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />

      <main class="relative w-full max-w-7xl overflow-hidden rounded-[2rem] border border-[#244638]/12 bg-[#f8f8f3]/92 shadow-[0_24px_90px_rgba(31,64,45,0.14)]">
        <div class="grid lg:grid-cols-[0.72fr_1.48fr] xl:grid-cols-[0.68fr_1.52fr]">
          <aside class="border-b border-[#244638]/10 bg-[linear-gradient(180deg,rgba(27,67,50,0.98),rgba(22,49,40,0.98))] px-6 py-8 text-[#eef3eb] sm:px-8 sm:py-10 lg:border-r lg:border-b-0 lg:px-8 lg:py-12 xl:px-10">
            <p class="text-[0.7rem] font-semibold uppercase tracking-[0.38em] text-emerald-100/70">
              Calculadora Salarial
            </p>
            <h1 class="mt-4 max-w-xs text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:max-w-sm lg:text-[3.2rem] lg:leading-[1.05] xl:text-[3.5rem] [font-family:Georgia,'Times_New_Roman',serif]">
              Calculadora del salario neto.
            </h1>
            <p class="mt-5 max-w-sm text-base leading-7 text-emerald-50/72 sm:text-lg">
              Puede ingresar su salario bruto y subsecuentemente se mostrara su salario neto.
            </p>

          </aside>

          <section class="px-4 py-5 sm:px-6 sm:py-6 lg:px-10 lg:py-8 xl:px-12">
            <div class="rounded-[1.6rem] border border-[#244638]/10 bg-white/80 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:p-4">
              <div class="grid gap-4 lg:grid-cols-2">
                <section class="rounded-[1.35rem] border border-[#244638]/10 bg-[#fbfcf8] p-4 sm:p-5 lg:p-6">
                  <div class="mb-4">
                    <p class="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#4f6b5c]">
                      Salario Bruto
                    </p>
                    <p class="mt-2 text-sm text-[#5c7266]">
                      Ingrese el monto base
                    </p>
                  </div>

                  <label class="block">
                    <span class="sr-only">Input value</span>
                    <textarea
                      v-model="liveValue"
                      rows="5"
                      placeholder="Ingrese su salario bruto..."
                      class="min-h-40 w-full resize-none rounded-[1.2rem] border border-[#244638]/12 bg-[#f2f5ef] px-5 py-5 text-lg leading-8 text-[#18372b] outline-none transition duration-200 placeholder:text-[#7e9388] focus:border-emerald-900/25 focus:bg-white focus:ring-4 focus:ring-emerald-900/8 sm:min-h-44 sm:text-xl lg:min-h-48"
                    />
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
                        class="rounded-[1rem] border border-[#244638]/10 bg-white px-4 py-4 text-xl font-semibold text-[#214233] shadow-[0_8px_20px_rgba(31,64,45,0.06)] transition hover:-translate-y-0.5 hover:bg-[#f8fbf6] active:translate-y-0 sm:py-5"
                        @click="appendValue(token)"
                      >
                        {{ token }}
                      </button>
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        class="rounded-[1rem] border border-[#7c5a22]/15 bg-[#caa56a] px-4 py-4 text-base font-semibold text-[#2f2412] transition hover:bg-[#d5b17a] active:translate-y-0 sm:py-5"
                        @click="clearValue"
                      >
                        Limpiar
                      </button>
                      <button
                        type="button"
                        class="rounded-[1rem] border border-[#244638]/10 bg-[#e7eee3] px-4 py-4 text-base font-semibold text-[#214233] transition hover:bg-[#eef4eb] active:translate-y-0 sm:py-5"
                        @click="backspaceValue"
                      >
                        Borrar
                      </button>
                    </div>
                  </div>
                </section>

                <section class="rounded-[1.35rem] border border-[#244638]/10 bg-[linear-gradient(180deg,#f5f7f1_0%,#eef3ea_100%)] p-4 sm:p-5 lg:p-6">
                  <div class="mb-4">
                    <p class="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#4f6b5c]">
                      Salario Neto
                    </p>
                    <p class="mt-2 text-sm text-[#5c7266]">
                      Resultado mostrado
                    </p>
                  </div>

                  <div class="flex min-h-64 rounded-[1.2rem] border border-[#244638]/10 bg-white px-5 py-5 sm:min-h-72 lg:min-h-[24rem]">
                    <p class="w-full break-words text-xl leading-8 text-[#163128] sm:text-2xl lg:text-[2rem] lg:leading-10 [font-family:Georgia,'Times_New_Roman',serif]">
                      {{ liveValue || 'Aqui se mostrara su salario neto.' }}
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>
