import { defineStore } from 'pinia'
import { type ITab } from '../types/tab'
import axios from 'axios'
import { usePluginsStore } from './plugins'
import { watch } from 'vue'

interface State {
  tabs: string[],
  tabdata: Record<string, ITab>
}

type ITabSections = Pick<ITab, 'active' | 'disabled'>

export const useTabsStore = defineStore('tabs', {
  state: (): State => ({
    tabs: [],
    tabdata: {}
  }),
  getters: {
    getTab: (state) => {
      return (tabId: string) => state.tabdata[tabId]
    },
    arePluginsEnabled(state){
      const tabsNames: string[] =  Object.keys(state.tabdata);
      const tabsWithElements: any = [];
      
      
      if(tabsNames.length){
        tabsNames.forEach(tabId => {
          if (state.tabdata[tabId].active.length > 0 || state.tabdata[tabId].inactive.length > 0) {
            tabsWithElements.push(tabId);
          }
        });

      }


      console.log( Object.keys(state.tabdata))
      console.log('elements', Boolean(tabsWithElements.length))
      return tabsWithElements.length
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

      const payload = {
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

      const post = await axios.put('http://localhost:3000/data', payload)

      if(post.statusText === 'OK'){
        this.tabdata[tabId][originSection] = this.tabdata[tabId][originSection].filter((element) => element !== pluginId)
        this.tabdata[tabId][newSection].push(pluginId)
      }

    },
    async toggleAllPlugins(isEnabled: boolean){
      const { getAllPlugins } = usePluginsStore()

      const originSection = isEnabled ? 'active'  : 'disabled'
      const newSection= isEnabled ? 'disabled' : 'active'
      const newTabData: any = {}
      
      this.tabs.forEach((tab) => {
        const actualTabData = this.tabdata[tab]

        newTabData[tab] = {
          title: actualTabData['title'],
          icon: actualTabData['icon'],
          [originSection]: [],
          inactive:[],
          [newSection]:[...actualTabData.active,...actualTabData.inactive, ...actualTabData.disabled]
        }
      })

      const payload = {
        tabs:[...this.tabs],
        tabdata: { ...newTabData},
        plugins: getAllPlugins
      }
 
      const post = await axios.put('http://localhost:3000/data', payload)
      
      if(post.statusText === 'OK'){
       this.tabdata = newTabData
      }
    }
  }

})
