<script lang="ts" setup>
import { ref } from 'vue';
import { useTabsStore } from '../stores/tabs'

const { toggleAllPlugins } = useTabsStore()
const isEnabled = ref(false)

const handleClick = () => {
    toggleAllPlugins(isEnabled.value)
}

</script>
<template>
    <div class="container">
        <p>All plugins enabled</p>
        <span @click="handleClick">Switch</span>
    </div>
</template>
<style>
.container {
    display: flex;
    justify-content: space-around;
    padding-bottom: 18px;
}
</style>