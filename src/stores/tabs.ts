import { defineStore } from 'pinia'
import { type ITab } from '../types/tab'

interface State {
  tabs: Record<string, ITab>
}

export const useTabsStore = defineStore('tabs' ,{
  state: ():State => ({
    tabs: {
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
        disabled:["plugin9"],
        inactive:  ["plugin10"]
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
      return (tabId: string) => state.tabs[tabId]
    }
  }

})
