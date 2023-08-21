<script setup lang="ts" >
import { computed, ref } from 'vue';
import { useTabsStore } from '../stores/tabs'
import Switch from './SwitchItem.vue';

const props = defineProps<{
    isEnabled: boolean
}>()

const tabsStore = useTabsStore()
const isStatusEnabled = ref(props.isEnabled)

const handleClick = () => {
    tabsStore.toggleAllPlugins(isStatusEnabled.value)
    isStatusEnabled.value = !isStatusEnabled.value
}

const generalSwitchStatus = computed(() => {
    if (isStatusEnabled.value) {
        return 'enabled'
    }
    return 'disabled'
})

</script>
<template>
    <div class="container" :class="{ 'container--green': isStatusEnabled, 'container--red': !isStatusEnabled }">
        <p>All plugins {{ generalSwitchStatus }}</p>
        <Switch @onClick="handleClick" :is-active="isStatusEnabled" />
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