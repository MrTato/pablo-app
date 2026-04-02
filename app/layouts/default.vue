<template>
  <div class="min-h-screen overflow-hidden bg-white text-[#38260a]">
    <div class="relative isolate flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-14">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(232,182,49,0.1),_transparent_26%),linear-gradient(180deg,_#ffffff_0%,_#fffdf8_42%,_#fbf4e2_100%)]" />
      <div class="absolute inset-0 opacity-18 [background-image:linear-gradient(rgba(111,78,12,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(111,78,12,0.025)_1px,transparent_1px)] [background-size:48px_48px]" />

      <main class="relative w-full max-w-7xl overflow-hidden rounded-[2rem] border border-[#8d6816]/14 bg-white/96 shadow-[0_24px_90px_rgba(99,71,12,0.12)]">
        <slot />
      </main>
    </div>
  </div>
</template>
