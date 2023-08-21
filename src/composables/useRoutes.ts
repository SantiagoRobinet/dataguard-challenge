import { defineAsyncComponent, ref } from 'vue'
import { useRouter } from "vue-router";
import { useTabsStore } from '@/stores/tabs';
import { usePluginsStore } from '@/stores/plugins';
import axios from 'axios';

interface IAllRoutes {
    name: string,
    icon: string,
    id: string,
    path: string
}

export function useRoutes() {

    const { setTabsState } = useTabsStore()
    const { setPluginsState } = usePluginsStore()

    const items = ref();
    const loading = ref(true);


    async function fetchAndRegisterRoutes() {
        try {
            console.log(import.meta.env.VITE_API_BASE_URL)
            const { data } = await axios(`${import.meta.env.VITE_API_BASE_URL}/data`);
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
    const allRoutes: IAllRoutes[] = [];

    function createRoutes() {
        items?.value.tabs.forEach((item: string) => {
            const routeName: string = items.value.tabdata[item]["title"];
            const routeIcon: string = items.value.tabdata[item]["icon"];
            const routePath: string = `/${routeName.toLocaleLowerCase()}`

            allRoutes.push({ name: routeName, icon: routeIcon, id: item, path: routePath });

            router.addRoute({
                name: routeName,
                path: routePath,
                component: defineAsyncComponent(() =>
                    import('../views/PluginsView.vue')
                ),
                props: { tabdata: { tabId: item } },
            });
        });

        router.push(allRoutes[0]['name'].toLocaleLowerCase());
    }

    return {
        loading,
        fetchAndRegisterRoutes,
        allRoutes
    }
}