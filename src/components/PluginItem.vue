<script setup lang="ts">
import Switch from './SwitchItem.vue';

const props = defineProps<{
    id: string,
    title: string,
    description: string,
    isActive?: boolean,
    isDisabled?: boolean
}>()

const emit = defineEmits(['onClick'])

const handleClick = ({ isActive }: { isActive: boolean }) => {
    emit('onClick', { pluginId: props.id, isActive })
}
</script>

<template>
    <div class="container" :class="{ disabled: isDisabled }">
        <div class="container__details">
            <h3 class="container__details__title">{{ props.title }}</h3>
            <p>{{ props.description }}</p>
        </div>
        <Switch @onClick="handleClick" :isActive="props.isActive" displayStatus />
    </div>
</template>

<style lang="scss" scoped>
.container {
    border: 2px solid rgb(196, 196, 196);
    border-radius: 8px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    width: calc(24.33% - 20px);
    min-width: 300px;
    max-width: 350px;
    height: 200px;
    background-color: #f2f2f2;
    margin: 10px;
    box-sizing: border-box;

    &__details {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &__title {
            font-size: 24px;
        }

    }

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