<script setup lang="ts" >
import { computed } from 'vue';
import { useTabsStore } from '../stores/tabs'
import Switch from './SwitchItem.vue';

const tabsStore = useTabsStore()


const handleClick = () => {
    tabsStore.toggleAllPlugins(tabsStore.arePluginsEnabled)
}

const generalSwitchStatus = computed(() => {
    if (tabsStore.arePluginsEnabled) {
        return 'enabled'
    }
    return 'disabled'
})

</script>
<template>
    <div class="container" :class="{ 'container--green': tabsStore.arePluginsEnabled, 'container--red': !tabsStore.arePluginsEnabled }">
        <p>All plugins {{ generalSwitchStatus }}</p>
        <Switch @onClick="handleClick" :is-active="tabsStore.arePluginsEnabled" />
    </div>
</template>
<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: space-around;
    padding-bottom: 40px;

    &--green {
        background: linear-gradient(to top, rgb(117, 198, 117), rgb(117, 198, 117, 0.5), transparent, transparent);
    }

    &--red {
        background: linear-gradient(to top, rgb(192, 47, 47), rgb(192, 47, 47, 0.5), transparent, transparent);
    }
}

p {
    font-size: 16px;
}
</style>