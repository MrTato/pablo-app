<script setup lang="ts">
defineProps<{
  value: string
}>()
</script>

<template>
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
        :class="value ? 'text-[#38260a]' : 'text-[#7b5208]'"
      >
        {{ value || 'Aqui se mostrara su salario neto.' }}
      </p>
    </div>
  </section>
</template>
