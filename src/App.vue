<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useRoutes } from './composables/useRoutes';
import Loading from './views/Loading.vue';

const { fetchAndRegisterRoutes, loading, routesNames } = useRoutes()

fetchAndRegisterRoutes()
</script>

<template>
  <header>
    <div class="wrapper">
      <h1>Data<span class="bold">Guard</span></h1>

      <nav>
        <RouterLink v-for="route in routesNames" :to="`/${route.toLocaleLowerCase()}`">{{ route }}</RouterLink>
      </nav>

    </div>
  </header>

  
  <Loading v-if="loading"/>
  <RouterView  v-else/>
</template>

<style lang="scss" scoped>
header {
  max-height: 100vh;
  background-color: rgb(233, 233, 233);
  min-width: 140px;
  max-width: 270px;
  width: 100%;
}

h1 {
  padding: 16px;
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
.bold {
  font-weight: bold;
}
@media screen and (max-width: 550px) {
   h1 {
    font-size: 22px;
  }
}
</style>
