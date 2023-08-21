import { defineStore } from 'pinia'
import { type PluginDTO } from '../types/plugin'


interface State {
    plugins: Record<string, PluginDTO>
}

export const usePluginsStore = defineStore('plugins', {
    state: (): State => ({
        plugins: {}

    }),
    getters: {
        getPlugins: (state) => {
            return (pluginsIds: string[]) => pluginsIds.map((id: string) => ({ id: id, title: state.plugins[id]['title'], description: state.plugins[id]['description'] }))
        },
        getAllPlugins(state){
            return state.plugins
        }
    },
    actions: {
        setPluginsState({plugins}: State) {
            this.plugins = plugins
        }
    }
})
