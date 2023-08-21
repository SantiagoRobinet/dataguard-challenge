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

const getActivePlugins = computed(() => pluginsStore.getPlugins(props.plugins.activePlugins))
const getDisabledPlugins = computed(() => pluginsStore.getPlugins(props.plugins.disabledPlugins))
const getInactivePlugins = computed(() => pluginsStore.getPlugins(props.plugins.inactivePlugins))

const emit = defineEmits(['onPluginClicked'])

const handleClick = (payload: UpdatePluginPayload) => {
    emit('onPluginClicked', payload)
}

</script>

<template>
    <h2>{{ title }} Plugins</h2>
    <div class="flex-container">
        <PluginItem v-for="activePlugin in getActivePlugins" :key="activePlugin.title" :id="activePlugin.id" :title="activePlugin.title"
            :description="activePlugin.description" isActive @onClick="handleClick" class="flex-item" />

        <PluginItem v-for="inactivePlugin in getInactivePlugins" :key="inactivePlugin.title" :id="inactivePlugin.id" :title="inactivePlugin.title"
            :description="inactivePlugin.description" @onClick="handleClick" class="flex-item" />

        <PluginItem v-for="disabledPlugin in getDisabledPlugins" :key="disabledPlugin.title" :id="disabledPlugin.id" :title="disabledPlugin.title"
            :description="disabledPlugin.description" isDisabled class="flex-item" />
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