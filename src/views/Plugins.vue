<script setup lang="ts">
import PluginItem from '@/components/PluginItem.vue';
import { useTabsStore } from '@/stores/tabs';
import { onBeforeMount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, reactive, ref } from 'vue';

const { tabdata } = defineProps<{
  tabdata: {tabId: string}
}>()

const { getTab } = useTabsStore()
const tab = ref();

onMounted(() => {
console.log(tabdata.tabId)
  tab.value = getTab(tabdata.tabId)
})

</script>

<template>
  <main>
    <p>{{ tabdata.tabId}}</p>
    <p>{{ tab}}</p>

    <!-- <h2>{{ tab.title }} Plugins</h2>
    <PluginItem v-for="activePlugin in tab.active" title="Plugin Active"
      description="Aliqua tempor nostrud occaecat enim nulla proident nostrud enim adipisicing pariatur velit" />

    <PluginItem v-for="disabledPlugin in tab.disabled" title="Plugin Disbled"
      description="Aliqua tempor nostrud occaecat enim nulla proident nostrud enim adipisicing pariatur velit" />

    <PluginItem v-for="inactivePlugin in tab.inactive" title="Plugin Inactive"
      description="Aliqua tempor nostrud occaecat enim nulla proident nostrud enim adipisicing pariatur velit" /> -->

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