export interface iTab {
  id: string
  isOpen: boolean
}

export const useTab = () => {
  const tabs = useState<iTab[]>('tabs', () => [])

  const addTab = (value: iTab) => {
    const updatedValue: iTab = { ...value, id: Date.now().toString() }
    tabs.value = [updatedValue, ...tabs.value]
  }

  const close = (id: string) => {
    tabs.value.map(tab => {
      if (tab.id === id) {
        return { ...tab, isOpen: false }
      }
      return tab
    })
  }

  const open = (id: string) => {
    tabs.value.map(tab => {
      if (tab.id === id) {
        return { ...tab, isOpen: true }
      }
      return tab
    })
  }

  return { tabs, close, open, addTab }
}
