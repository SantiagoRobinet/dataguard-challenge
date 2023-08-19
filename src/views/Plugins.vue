<script setup lang="ts">
import { useTabsStore } from '@/stores/tabs';
import PluginsList from '@/components/PluginsList.vue';

const { tabdata } = defineProps<{
  tabdata: { tabId: string }
}>()

const { getTab, updateTab } = useTabsStore()
const tab = getTab(tabdata.tabId);


const handleClick = (payload:  { pluginId: string, isActive: boolean }) => {
  updateTab(payload, tabdata.tabId)
}

</script>

<template>
  <main>
    <PluginsList 
    :title="tab.title"
    :active-plugins="tab.active" 
    :disabled-plugins="tab.disabled"
    :inactive-plugins="tab.inactive"
    @onPluginClicked="handleClick"
    />
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