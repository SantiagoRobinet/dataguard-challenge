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
    console.log(payload)
    emit('onPluginClicked', payload)
}

</script>

<template>
    <main>
        <h2>{{ title }} Plugins</h2>
        <PluginItem v-for="activePlugin in getActivePlugins" :id="activePlugin.id" :title="activePlugin.title"
            :description="activePlugin.description" isActive @onClick="handleClick" />

        <PluginItem v-for="inactivePlugin in getInactivePlugins" :id="inactivePlugin.id" :title="inactivePlugin.title"
            :description="inactivePlugin.description" />

        <PluginItem v-for="disabledPlugin in getDisabledPlugins" :id="disabledPlugin.id" :title="disabledPlugin.title"
            :description="disabledPlugin.description" @onClick="handleClick" isDisabled />
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