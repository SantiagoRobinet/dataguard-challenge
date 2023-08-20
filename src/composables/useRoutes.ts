import { defineAsyncComponent, ref } from 'vue'
import Plugins from "../views/Plugins.vue";
import { useRouter } from "vue-router";
import { useTabsStore } from '@/stores/tabs';
import { usePluginsStore } from '@/stores/plugins';
import axios from 'axios';

export function useRoutes() {

    const { setTabsState } = useTabsStore()
    const { setPluginsState } = usePluginsStore()

    const items = ref();
    const loading = ref(true);


    async function fetchAndRegisterRoutes() {
        try {
            const { data } = await axios('http://localhost:3000/data');
            items.value = data;
            loading.value = false;
            createRoutes();
        } catch (error) {
            console.error('Error fetching data:', error);
            loading.value = false;
        } finally {
            setTabsState({
                tabs: items.value.tabs,
                tabdata: items.value.tabdata
            })
            setPluginsState({
                plugins: items.value.plugins
            })
        }
    }

    const router = useRouter();
    const routesNames: string[] = [];

    function createRoutes() {
        items?.value.tabs.forEach((item: string) => {
            const routeName: string = items.value.tabdata[item]["title"];
            routesNames.push(routeName);

            router.addRoute({
                name: routeName,
                path: `/${routeName.toLocaleLowerCase()}`,
                component:   defineAsyncComponent(() =>
                        import('../views/Plugins.vue')
                      ),
                props: { tabdata: { tabId: item } },
            });
        });

        router.push(routesNames[0].toLocaleLowerCase());
    }

    return {
        loading,
        fetchAndRegisterRoutes,
        routesNames
    }
}