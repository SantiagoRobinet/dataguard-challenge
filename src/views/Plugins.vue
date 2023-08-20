<script setup lang="ts">
import { useTabsStore } from '@/stores/tabs';
import PluginsList from '@/components/PluginsList.vue';
import { computed, watch } from 'vue';

const { tabdata } = defineProps<{
  tabdata: { tabId: string }
}>()

const { getTab, updateData } = useTabsStore()
const tab = getTab(tabdata.tabId);

const activePlugins = computed(() => {
  return tab.active
})
const inactivePlugins = computed(() => {
  return tab.inactive
})
const disabledPlugins = computed(() => {
  return tab.disabled
})

const handleClick = (payload: { pluginId: string, isActive: boolean }) => {
  updateData(payload, tabdata.tabId)
}
</script>

<template>
  <main>
    <PluginsList :title="tab.title" :plugins="{ activePlugins, inactivePlugins, disabledPlugins }"
      @onPluginClicked="handleClick" />
  </main>
</template>

<style lang="scss" scoped>
main {
  padding: 24px;
  overflow: auto;
}

h2 {
  font-size: 18px;
  margin-bottom: 32px;
}
</style>