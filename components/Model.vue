<script setup lang="ts">
import { ForgeViewer, AggregatedForgeViewer } from '~/assets/scripts/viewer'

interface iProps {
  id: string
  type: 'facade' | 'building' | 'aggregated'
}

const props = defineProps<iProps>()

const li = [
  {
    text: 'Total Number of Panels',
    number: '20',
  },
  {
    text: 'Window to Wall Ratio',
    number: '2/3',
  },
  {
    text: 'Carbon Footprint Reduction %',
    number: '40%',
  },
]

async function loadViewer() {
  let viewer

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
}

// onMounted(() => {
//   loadViewer()
// })
</script>

<template>
  <div class="model">
    <div class="model__about">
      <p class="model__italic-text">
        Use your mouse or touchbar to spin the building model
        <span>
          <IconsDragArrow class="model__icon" />
        </span>
      </p>
    </div>
    <div class="grid model__bottom-block">
      <div class="model__3d-wrapper">
        <div id="ForgeViewer" class="viewer-container"></div>
      </div>
      <div class="model__list-wrapper">
        <ul class="model__list">
          <li v-for="(item, idx) in li" :key="idx" class="model__li">
            <div class="model__line"></div>
            <div class="model__text-wrapper">
              <p class="model__text">{{ item.text }}</p>
              <p class="model__number">{{ item.number }}</p>
            </div>
            <div v-if="idx + 1 === li.length" class="model__line"></div>
          </li>
        </ul>
        <div class="model__btn-wrapper">
          <button class="model__report-btn">SUSTAINABILITY REPORT</button>
        </div>
      </div>
    </div>
  </div>
</template>
