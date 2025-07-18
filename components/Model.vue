<script setup lang="ts">
import { ForgeViewer, AggregatedForgeViewer } from '~/assets/scripts/viewer'
import { useQoutesStories } from '~/composables/stories/quotes'
import { useReportStory } from '~/composables/stories/report'

interface iProps {
  id: string
  type: 'facade' | 'building' | 'aggregated'
}

const props = defineProps<iProps>()
const isModel = ref(false)

const route = useRoute()

const { name, version } = route.params
const { story, listenStory } = await useQoutesStories(
  name as string,
  version as string
)

const { story: reportStory } = await useReportStory()

const report = computed(() => {
  return reportStory.value?.content?.file?.filename
})

console.log(report.value)

const items = computed(() => {
  return [
    {
      text: 'Total Number of Panels',
      number: story.value.content.total_number_of_panels,
    },
    {
      text: 'Window to Wall Ratio %',
      number: story.value.content.window_to_wall_ratio,
    },
    {
      text: 'Carbon Footprint Reduction %',
      number: story.value.content.carbon_footprint_reduction,
    },
  ]
})

async function loadViewer() {
  let viewer

  if (!props.type || !props.id) {
    return
  }

  if (props.type === 'facade') {
    viewer = new ForgeViewer('ForgeViewer', props.id, 'facade')
  }

  if (props.type === 'aggregated') {
    viewer = new AggregatedForgeViewer('ForgeViewer', props.id)
  }

  if (props.type === 'building') {
    viewer = new ForgeViewer('ForgeViewer', props.id, 'source')
  }

  await viewer.start()
  isModel.value = true
}

const config = useRuntimeConfig()

onMounted(() => {
  // if (config.ENVIROMENT !== 'development') {
    loadViewer()
  // }
})

listenStory(version)

const getImgSrc = (img: string, size?: string) => {
  if (!img) {
    return null
  }
  return useStoryblokImage(img, { size })
}

const isReportPopupOpen = ref(false)
</script>

<template>
  <div class="model">
    <Teleport to="#app">
      <ReportPopup
        :is-open="isReportPopupOpen"
        @close="isReportPopupOpen = false"
      />
    </Teleport>
    <div v-if="isModel" class="model__about">
      <p class="model__italic-text">
        Use your mouse or touchbar to spin the building model
        <span>
          <IconsDragArrow class="model__icon" />
        </span>
      </p>
    </div>
    <div class="grid model__bottom-block">
      <div
        v-if="isModel || story.content?.model[0]?.thumbnail?.filename"
        class="model__3d-wrapper"
      >
        <div v-if="isModel" id="ForgeViewer" class="viewer-container"></div>
        <img
          v-else
          class="model__img"
          :src="
            getImgSrc(story.content.model[0].thumbnail.filename, '1920x1080')
          "
          alt="Image"
        />
      </div>
      <div class="model__list-wrapper">
        <ul class="model__list">
          <li v-for="(item, idx) in items" :key="idx" class="model__li">
            <div class="model__line"></div>
            <div class="model__text-wrapper">
              <p class="model__text">{{ item.text }}</p>
              <p class="model__number">{{ item.number }}</p>
            </div>
            <div v-if="idx + 1 === items.length" class="model__line"></div>
          </li>
        </ul>
        <div class="model__btn-wrapper">
          <a
            v-if="report"
            :href="report"
            target="_blank"
            download
            class="model__report-btn"
          >
            SUSTAINABILITY REPORT
          </a>
          <div v-else class="model__report-btn model__report-btn--disabled">
            SUSTAINABILITY REPORT (SOON)
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
