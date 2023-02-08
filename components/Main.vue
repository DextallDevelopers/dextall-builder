<script setup lang="ts">
import { iTab } from '~/composables/tab'
import { keysGenerator } from '~/assets/scripts/utils/ea'

interface iModel {
  id: string
  type: 'facade' | 'building' | 'aggregated'
}

interface iProps {
  scope?: string
  story?: any
  title?: string
  address?: string
  startQuoteDate?: string
  endQuoteDate?: string
  model?: iModel[]
}

const props = defineProps<iProps>()

const { open, tabs, addTabs } = useTab()
const route = useRoute()

const getTabComponents = tab => {
  if (tab) {
    const prefilledComponents = tab?.body.map(cc => ({
      data: cc,
      _uid: cc.uuid,
      component: cc.content.component,
    }))

    const zeroComponents = tab.zero_blocks.map(zb => ({
      data: { content: zb },
      _uid: zb._uid,
      component: zb.component,
    }))

    return [...prefilledComponents, ...zeroComponents]
  }
  return []
}

const additionalTabs = computed(() => {
  return props.story?.additional_tabs
})

const mainTabs: iTab[] = [
  {
    isOpen: false,
    components: [
      { _uid: keysGenerator(8), component: 'product_specifications' },
    ],
  },
  {
    isOpen: false,
    components: [{ _uid: keysGenerator(8), component: 'included' }],
  },
  {
    isOpen: false,
    components: [{ _uid: keysGenerator(8), component: 'drawings' }],
  },
  {
    isOpen: false,
    components: [{ _uid: keysGenerator(8), component: 'pricing' }],
  },
  {
    isOpen: false,
    components: [{ _uid: keysGenerator(8), component: 'about' }],
  },
]

addTabs(mainTabs)

if (additionalTabs.value?.length) {
  const additionalTabsWithContent: iTab[] = additionalTabs.value.map(tab => ({
    name: tab.tab_name,
    components: getTabComponents(tab),
    isOpen: false,
  }))

  addTabs(additionalTabsWithContent)
}

onMounted(() => {
  route.query.tab && open(route.query.tab as string)
})

const date = computed(() => {
  return useQuoteDate(props.startQuoteDate, props.endQuoteDate)?.value
})
</script>

<template>
  <section id="main" class="section section--pb main">
    <div class="container main__wrapper">
      <div class="main__date-wrapper">
        <div class="main__date">
          <p class="main__date-text">Date of the quote:</p>
          <p v-if="date.startFormattedDate" class="main__date-number">
            {{ date.startFormattedDate }}
          </p>
        </div>
        <div class="main__date">
          <p v-if="date.endFormattedDate" class="main__date-text">
            Time left before expiration:
          </p>
          <p
            class="main__date-number"
            v-html="`${date.timeLeft} (${date.endFormattedDate})`"
          />
        </div>
      </div>
      <p v-if="scope" class="main__text">{{ scope }}</p>
      <h2 v-if="title" class="main__title">{{ title }}</h2>
      <p v-if="address" class="main__desc">{{ address }}</p>
      <div class="main__btns-wrapper">
        <button class="main__btn" @click="open(tabs[0]._uid)">
          Product summary
        </button>
        <button class="main__btn" @click="open(tabs[1]._uid)">
          What's Included
        </button>
        <button class="main__btn" @click="open(tabs[2]._uid)">Drawings</button>
        <button class="main__btn" @click="open(tabs[3]._uid)">Pricing</button>
      </div>
      <div class="main__model-wrapper">
        <Model
          v-if="model && model[0]"
          :id="model[0]?.id"
          :type="model[0]?.type"
        />
      </div>
    </div>
    <Teleport to="#app">
      <TheTab
        v-for="tab in tabs"
        :id="tab._uid"
        :key="tab._uid"
        :is-open="tab.isOpen"
        :components="tab.components"
      />
    </Teleport>
  </section>
</template>
