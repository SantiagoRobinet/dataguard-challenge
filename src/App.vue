<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import axios from 'axios'
import { onBeforeUpdate, ref } from 'vue';
import Plugins from './views/Plugins.vue';


const router = useRouter()
const routesNames: string[] = []
const items = ref();
const loading = ref(true);

async function fetchData() {
  try {
    const {data} = await axios('http://localhost:3000/data');
    items.value = data;
    loading.value = false;
  } catch (error) {
    console.error('Error fetching data:', error);
    loading.value = false;
  } 
}

fetchData();

onBeforeUpdate(() => {
  items.value.tabs.forEach((item: string )=> {
    const routeName: string = items.value.tabdata[item]['title']
    routesNames.push(routeName)

    router.addRoute({ name: routeName, path:`/${routeName.toLocaleLowerCase()}`, component: Plugins, props:{ tabdata: items.value.tabdata[item] }})
  });

  router.push(routesNames[0].toLocaleLowerCase())
})


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
}</style>
