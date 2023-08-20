import { defineStore } from 'pinia'
import { type ITab } from '../types/tab'
import axios from 'axios'
import { usePluginsStore } from './plugins'

interface State {
  tabs: string[],
  tabdata: Record<string, ITab>
}

export const useTabsStore = defineStore('tabs', {
  state: (): State => ({
    tabs: [],
    tabdata: {}
  }),
  getters: {
    getTab: (state) => {
      return (tabId: string) => state.tabdata[tabId]
    }
  },
  actions: {
    setTabsState({tabs, tabdata}: any) {
      this.tabs = tabs
      this.tabdata = tabdata
    },
    async updateData({ pluginId, isActive }: { pluginId: string, isActive: boolean }, tabId: string) {
      const { getAllPlugins } = usePluginsStore()
      const originSection = isActive ? 'active' : 'inactive'
      const newSection = isActive ? 'inactive' : 'active'

      const updatedData = {
        tabs:[...this.tabs],
        tabdata:{
          ...this.tabdata,
            [tabId]: {
              ...this.tabdata[tabId],
              [originSection]: this.tabdata[tabId][originSection].filter((element) => element !== pluginId),
              [newSection]: [...this.tabdata[tabId][newSection], pluginId]
            }
        },
        plugins: getAllPlugins
      };

      const post = await axios.put('http://localhost:3000/data', updatedData)

      if(post.statusText === 'OK'){
        this.tabdata[tabId][originSection] = this.tabdata[tabId][originSection].filter((element) => element !== pluginId)
        this.tabdata[tabId][newSection].push(pluginId)
      }

    }
  }

})
