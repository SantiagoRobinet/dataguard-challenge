<script setup lang="ts">
import PluginItem from '@/components/PluginItem.vue';
import { usePluginsStore } from '@/stores/plugins';

const props = defineProps<{
    title: string,
    activePlugins: string[],
    disabledPlugins: string[],
    inactivePlugins: string[]
}>()
const { getPlugins } = usePluginsStore()

const getActivePlugins = getPlugins(props.activePlugins)
const getDisabledPlugins = getPlugins(props.disabledPlugins)
const getInactivePlugins = getPlugins(props.inactivePlugins)

const emit = defineEmits(['onPluginClicked'])

//payload type is used in tabs Store. DONT FORGET to refactor it.
const handleClick = (payload: { pluginId: string, isActive: boolean }) => {
    emit('onPluginClicked', payload)
}

</script>

<template>
    <h2>{{ title }} Plugins</h2>
    <div class="flex-container">
        <PluginItem v-for="activePlugin in getActivePlugins" :id="activePlugin.id" :title="activePlugin.title"
            :description="activePlugin.description" isActive @onClick="handleClick" class="flex-item" />

        <PluginItem v-for="inactivePlugin in getInactivePlugins" :id="inactivePlugin.id" :title="inactivePlugin.title"
            :description="inactivePlugin.description" @onClick="handleClick" class="flex-item" />

        <PluginItem v-for="disabledPlugin in getDisabledPlugins" :id="disabledPlugin.id" :title="disabledPlugin.title"
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