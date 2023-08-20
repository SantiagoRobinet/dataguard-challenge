<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useRoutes } from './composables/useRoutes';

const { fetchAndRegisterRoutes , loading, routesNames} = useRoutes()

fetchAndRegisterRoutes()
</script>

<template>
  <header>
    <div class="wrapper">
      <h1>Data<span class="bold">Guard</span></h1>

      <span v-if="loading">Loading...</span>
      <nav v-else>
        <RouterLink v-for="route in routesNames" :to="`/${route.toLocaleLowerCase()}`">{{ route }}</RouterLink>
      </nav>

    </div>
  </header>

  <RouterView />
</template>

<style lang="scss" scoped>
header {
  max-height: 100vh;
  background-color: rgb(233, 233, 233);
  min-width: 270px;
}

nav {
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    transition: 0.4s;
    padding: 10px 0;
    position: relative;
    padding-left: 24px;
    color: black;
    font-size: 18px;

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
}

h1 {
  padding: 16px;
}

.bold {
  font-weight: bold;
}
</style>
