<script setup lang="ts">
useHead({
  script: [
    {
      key: 'theme-init',
      tagPosition: 'head',
      innerHTML: `(function () {
        var fallbackTheme = 'gray';
        var storedTheme = window.localStorage.getItem('app-theme');
        var theme = storedTheme || fallbackTheme;
        document.documentElement.setAttribute('data-theme', theme);
      }())`
    }
  ]
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
