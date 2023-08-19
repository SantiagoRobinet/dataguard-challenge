<script setup lang="ts">
const { title, description } = defineProps<{
    title: string,
    description: string,
}>()


</script>

<template>
    <div class="container">
        <div class="container__details">
            <h3 class="title">{{ title }}</h3>
            <p>{{ description }}</p>
        </div>
        <div class="container__switch">
            <label class="switch">
                <input type="checkbox">
                <span class="slider round"></span>
            </label>
            <span>Blocked</span>
        </div>
    </div>
</template>

<style lang="scss">
.container {
    border: 2px solid rgb(196, 196, 196);
    border-radius: 8px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    width: 350px;
    height: 200px;

    &__details {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    &__switch {
      place-items: center;
    }
}

.title {
    font-size: 24px;
}

.switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 24px;
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
    background-color: red;
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
    -webkit-transform: translateX(15px);
    -ms-transform: translateX(15px);
    transform: translateX(15px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}
</style>