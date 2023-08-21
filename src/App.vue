<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useRoutes } from './composables/useRoutes';
import LoadingView from './views/LoadingView.vue';
import GeneralSwitch from './components/GeneralSwitch.vue'
import CustomLink from './components/CustomLink.vue';

const { fetchAndRegisterRoutes, loading, allRoutes } = useRoutes()

fetchAndRegisterRoutes()

</script>

<template>
  <header>
    <!-- esto puede ser un Header component -->
    <div class="wrapper">
      <h1>Data<span class="bold">Guard</span></h1>

      <nav>
        <CustomLink v-for="route in allRoutes" :key="route.id" :to="route.path" :label="route.name" :icon="route.icon" />
      </nav>

    </div>
    <GeneralSwitch />
  </header>

  
  <LoadingView v-if="loading"/>
  <RouterView  v-else/>
</template>

<style lang="scss" scoped>
header {
  max-height: 100vh;
  background-color: rgb(233, 233, 233);
  min-width: 140px;
  max-width: 270px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
