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
    tabs: ["tab1", "tab2", "tab3"],
    tabdata: {
      tab1: {
        title: "Marketing",
        icon: "icon-marketing",
        active: ["plugin1", "plugin2", "plugin4"],
        disabled: ["plugin3"],
        inactive: ["plugin5", "plugin6"]
      },
      tab2: {
        title: "Finance",
        icon: "icon-marketing",
        active: ["plugin7", "plugin8"],
        disabled: ["plugin9"],
        inactive: ["plugin10"]
      },
      tab3: {
        title: "Personnel",
        icon: "icon-marketing",
        active: ["plugin11"],
        disabled: ["plugin12"],
        inactive: ["plugin13"]
      },
    }

  }),
  getters: {
    getTab: (state) => {
      return (tabId: string) => state.tabdata[tabId]
    }
  },
  actions: {
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

      const post = await axios.post('http://localhost:3000/data', updatedData)
      console.log(post)
      this.tabdata[tabId][originSection] = this.tabdata[tabId][originSection].filter((element) => element !== pluginId)
      this.tabdata[tabId][newSection].push(pluginId)
    }
  }

})
