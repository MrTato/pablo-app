<script setup lang="ts">
defineProps<{
  value: string
}>()
</script>

<template>
  <section class="rounded-[1.35rem] border border-[color:var(--color-panel-border)] p-4 sm:p-5 lg:p-6 [background-image:linear-gradient(180deg,_#ffffff_0%,var(--color-panel-bg-alt)_100%)]">
    <div class="mb-4">
      <p class="font-paloseco text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-label)]">
        Salario Neto
      </p>
      <p class="font-paloseco mt-2 text-sm text-[color:var(--color-subtext)]">
        Resultado mostrado
      </p>
    </div>

    <div class="flex min-h-64 rounded-[1.2rem] border border-[color:var(--color-display-border)] bg-white px-5 py-5 sm:min-h-72 lg:min-h-[24rem]">
      <p
        class="w-full break-words text-xl leading-8 sm:text-2xl lg:text-[2rem] lg:leading-10 [font-family:Arial,sans-serif]"
        :class="value ? 'text-[color:var(--color-shell-text)]' : 'text-[color:var(--color-display-empty)]'"
      >
        {{ value || 'Aqui se mostrara su salario neto.' }}
      </p>
    </div>
  </section>
</template>
