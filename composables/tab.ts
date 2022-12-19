import { iBlokBody } from '~/types/story'
import { keysGenerator } from '~/assets/scripts/utils/ea'

export interface iTab {
  _uid?: string
  isOpen: boolean
  components: iBlokBody[]
}

export const useTab = () => {
  const tabs = useState<iTab[]>('tabs', () => [])

  const addTab = (value: iTab) => {
    const updatedValue: iTab = { ...value, _uid: keysGenerator(8) }
    tabs.value = [...tabs.value, updatedValue]
  }

  const addTabs = (value: iTab[]) => {
    const updatedTabs: iTab[] = value.map(tab => ({
      ...tab,
      _uid: keysGenerator(8),
    }))
    tabs.value = [...tabs.value, ...updatedTabs]
  }

  const close = (_uid: string) => {
    tabs.value = tabs.value.map(tab => {
      if (tab._uid === _uid) {
        return { ...tab, isOpen: false }
      }
      return tab
    })
  }

  const open = (_uid: string) => {
    tabs.value = tabs.value.map(tab => {
      if (tab._uid === _uid) {
        return { ...tab, isOpen: true }
      }
      return { ...tab, isOpen: false }
    })
  }

  return { tabs, close, open, addTab, addTabs }
}
