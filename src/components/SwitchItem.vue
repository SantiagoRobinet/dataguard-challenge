<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    isActive?: boolean,
    displayStatus?: boolean;
}>()

const emit = defineEmits(['onClick'])

const handleClick = () => {
    emit('onClick', {isActive: props.isActive})
}

const pluginStatus = computed(() => {
    if (props.isActive) {
        return 'Allowed'
    }
    return 'Blocked'
})

</script>

<template>
    <div class="container__switch">
        <label class="switch">
            <input @click="handleClick" type="checkbox" :checked="isActive">
            <span class="slider round"></span>
        </label>
        <span v-if="displayStatus" class="status" :class="{ 'status--green': isActive, 'status--red': !isActive }">{{
            pluginStatus
        }}</span>
    </div>
</template>

<style lang="scss" scoped>
.container {
    &__switch {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-left: 12px;
    }

    @media screen and (max-width: 768px) {
        .flex-item {
            width: calc(20.33% - 20px);
            margin: 10px 0;
        }
    }
}


.switch {
    position: relative;
    display: inline-block;
    width: 45px;
    height: 25px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(192, 47, 47);
    -webkit-transition: .4s;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 17px;
    width: 17px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}

input:checked+.slider {
    background-color: rgb(117, 198, 117);
}

input:focus+.slider {
    box-shadow: 0 0 1px rgb(117, 198, 117);
}

input:checked+.slider:before {
    -webkit-transform: translateX(20px);
    -ms-transform: translateX(20px);
    transform: translateX(20px);
}

.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

.disabled {
    opacity: 0.4;
    pointer-events: none;
}

.status {
    font-weight: bold;
    font-size: 12px;
    padding-top: 6px;

    &--green {
        color: rgb(117, 198, 117);
    }

    &--red {
        color: rgb(192, 47, 47);
    }
}
</style>