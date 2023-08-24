import { ref } from 'vue'
import { useRouter } from "vue-router";
import { useTabsStore } from '@/stores/tabs';
import { usePluginsStore } from '@/stores/plugins';
import axios from 'axios';
import { api } from '@/constants/api';

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

    const router = useRouter();


    async function fetchAndRegisterRoutes() {
        try {
            const { data } = await axios(api.dataURL);
            items.value = data;
            loading.value = false;
            createRoutes();
        } catch (error) {
            loading.value = false;
            router.push('/error');
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
                component: () =>
                    import('../views/PluginsView.vue')
                ,
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