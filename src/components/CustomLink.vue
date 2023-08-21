<script setup lang="ts">
defineProps<{
    to: string,
    label: string,
    icon: string
}>()

</script>

<template>
    <RouterLink :to="to">
        <img :src="`/${icon}.png`" />
        {{ label }}
    </RouterLink>
</template>

<style lang="scss" scoped>
a {
    text-decoration: none;
    transition: 0.4s;
    padding: 10px 0;
    position: relative;
    padding-left: 24px;
    color: black;
    font-size: 18px;
    display: flex;
    align-items: center;
    /* 
    Using 'router-link-active' instead of 'router-link-exact-active',
    allow us to see the link active even if we go deeper in the URL
    linke "/marketing/something"
    */

    &.router-link-active {
        background-color: white;

        &:before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background-color: #ff0000;
        }
    }
}

img {
    height: 21px;
    width: 21px;
    margin-right: 18px;
}
</style>
