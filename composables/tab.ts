import { iBlokBody } from '~/types/story'

export interface iTab {
  _uid?: string
  isOpen: boolean
  components: iBlokBody[]
  name?: string
}

let idx = 0

export const useTab = () => {
  const tabs = useState<iTab[]>('tabs', () => [])

  const router = useRouter()

  const addTab = (value: iTab) => {
    const updatedValue: iTab = { ...value, _uid: idx.toString() }
    tabs.value = [...tabs.value, updatedValue]
    idx++
  }

  const addTabs = (value: iTab[]) => {
    value.forEach(tab => {
      addTab(tab)
    })
  }

  const close = (_uid: string) => {
    tabs.value = tabs.value.map(tab => {
      if (tab._uid === _uid) {
        router.push({ query: null })
        return { ...tab, isOpen: false }
      }
      return tab
    })
  }

  const open = (_uid: string, closePrevious = true) => {
    tabs.value = tabs.value.map(tab => {
      if (tab._uid === _uid) {
        router.push({ query: { tab: _uid } })
        return { ...tab, isOpen: true }
      }
      return { ...tab, isOpen: closePrevious ? false : tab.isOpen }
    })
  }

  return { tabs, close, open, addTab, addTabs }
}
