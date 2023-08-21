<script setup lang="ts">
import PluginItem from '@/components/PluginItem.vue';
import { usePluginsStore } from '@/stores/plugins';
import type { UpdatePluginPayload } from '@/types/plugin';
import { computed } from 'vue';

const props = defineProps<{
    title: string,
    plugins: {
        activePlugins: string[],
        disabledPlugins: string[],
        inactivePlugins: string[]
    }
}>()
const pluginsStore = usePluginsStore()


const allTabPlugins = computed(() => {
  return Object.values(props.plugins).flat().sort();
});


const emit = defineEmits(['onPluginClicked'])

const handleClick = (payload: UpdatePluginPayload) => {
    emit('onPluginClicked', payload)
}

</script>

<template>
    <h2>{{ title }} Plugins</h2>
    <div class="flex-container">
    <PluginItem
      v-for="plugin of allTabPlugins"
      :key="plugin"
      :id="plugin"
      :title="pluginsStore.plugins[plugin].title"
      :description="pluginsStore.plugins[plugin].description"
      :isActive="plugins.activePlugins.includes(plugin)"
      :isDisabled="plugins.disabledPlugins.includes(plugin)"
      @onClick="handleClick"
      class="flex-item"
    />

    </div>
</template>

<style lang="scss" scoped>
h2 {
    font-size: 18px;
    margin-bottom: 32px;
}

.flex-container {
    display: flex;
    flex-wrap: wrap;
}

@media screen and (max-width: 768px) {
    .flex-container {
        flex-direction: column;
    }

}
</style>