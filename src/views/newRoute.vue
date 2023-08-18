<script setup lang="ts">
const props = defineProps<{label:string}>()
</script>

<template>
  <main>
    <h2>new route</h2>
    <div>
      All the different plugins
    </div>
    <div>
      {{ label }}
    </div>
  </main>
</template>

<style lang="scss">

</style>