<script setup lang="ts">
import PluginItem from '@/components/PluginItem.vue';

const { tabdata } = defineProps<{
  tabdata: {
    title: string,
    icon: string,
    active: string[],
    disabled: string[],
    inactive: string[]
  }
}>()
</script>

<template>
  <main>

    <h2>{{ tabdata.title }} Plugins</h2>
    <PluginItem v-for="activePlugin in tabdata.active" title="Plugin Active"
      description="Aliqua tempor nostrud occaecat enim nulla proident nostrud enim adipisicing pariatur velit" />

    <PluginItem v-for="inactivePlugin in tabdata.inactive" title="Plugin Inactive"
      description="Aliqua tempor nostrud occaecat enim nulla proident nostrud enim adipisicing pariatur velit" />

    <PluginItem v-for="disabledPlugin in tabdata.disabled" title="Plugin Disbled"
      description="Aliqua tempor nostrud occaecat enim nulla proident nostrud enim adipisicing pariatur velit" />


  </main>
</template>

<style lang="scss">
main {
  padding: 24px;
}

h2 {
  font-size: 18px;
  margin-bottom: 32px;
}
</style>