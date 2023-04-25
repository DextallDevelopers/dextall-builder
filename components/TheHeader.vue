<script setup lang="ts">
import { useQoutesStories } from '~~/composables/stories/quotes'
import { ToastColor } from '~/composables/toasts'

const route = useRoute()

const { name, version } = route.params
const config = useRuntimeConfig()

const { stories, story } = await useQoutesStories(
  name as string,
  version as string
)

const { open: openTab, close: closeTab, tabs } = useTab()

const additionalTabs = computed(() => tabs.value.filter(tab => tab.name))

const isAbout = computed(() => {
  return story.value?.content?.is_about_active
})

const { isAuth, isWaiting } = useAppState()

const versions = computed(() => {
  return stories.value
    .map(s => ({ name: s.name, link: s.full_slug }))
    .sort(function (a, b) {
      return ('' + a.name).localeCompare(b.name)
    })
})

const isOpen = ref(false)

const toggleNav = () => {
  isOpen.value = !isOpen.value
}

const closeNav = () => {
  isOpen.value = false
}

onMounted(async () => {
  document.body.addEventListener('click', closeNav)
})

onBeforeUnmount(() => {
  document.body.removeEventListener('click', closeNav)
})

const { addToast } = useToasts()

const onPdf = async () => {
  const siteURL = window.location.origin + window.location.pathname + '/pdf'

  const body = {
    source: siteURL,
    format: 'Ledger',
    media: 'print',
    margin_top: 10,
    margin_unit: 'px',
    test: config.ENVIROMENT !== 'production',
  }

  try {
    isWaiting.value = true

    async function downloadFile(url: string, fileName: string) {
      await fetch(url, {
        method: 'get',
        referrerPolicy: 'no-referrer',
      })
        .then(res => {
          console.log(res)
          return res
        })
        .then(res => res.blob())
        .then(res => {
          const aElement = document.createElement('a')
          aElement.setAttribute('download', fileName + '.pdf')
          const href = URL.createObjectURL(res)
          aElement.href = href
          // aElement.setAttribute('href', href);
          aElement.setAttribute('target', '_blank')
          aElement.click()
          URL.revokeObjectURL(href)
        })
    }

    const response = await fetch('https://docamatic.com/api/v1/pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${config.DOCAMATIC_API_KEY}`,
      },
      body: JSON.stringify(body),
    }).then(res => res.json())

    await downloadFile(response.document, name as string)
  } catch (error) {
    console.log(error)
    addToast({
      color: ToastColor.danger,
      id: Date.now().toString(),
      text: `Some errors was occured, ${error.message}`,
    })
  } finally {
    isWaiting.value = false
  }
}
</script>

<template>
  <header class="header">
    <div class="container header__wrapper">
      <a
        href="#main"
        class="header__logo"
        aria-label="Logo"
        @click="tabs.forEach(tab => closeTab(tab._uid))"
      >
        <IconsLogo class="header__logo" />
      </a>
      <div v-if="isAuth" class="header__content-wrapper">
        <div class="header__dropdown-wrapper">
          <p class="header__quote">
            Quote History:
            <span class="header__span-quote">{{ story.name }}</span>
          </p>
          <div class="header__dropdown-content">
            <ul class="header__dropdown">
              <li
                v-for="(el, idx) in versions"
                :key="idx"
                v-editable="stories[idx].content"
                class="header__dropdown-li"
                @click="closeNav"
              >
                <a :href="'/' + el.link" class="header__dropdown-version">{{
                  el.name
                }}</a>
              </li>
            </ul>
          </div>
        </div>
        <nav
          v-if="isAuth"
          class="header__nav-wrapper"
          :class="{ open: isOpen }"
        >
          <ul class="header__nav-list">
            <li
              v-for="tab in additionalTabs"
              :key="tab._uid"
              class="header__nav-li"
            >
              <button class="header__nav-btn" @click="openTab(tab._uid)">
                {{ tab.name }}
              </button>
            </li>
            <li v-if="isAbout" class="header__nav-li">
              <button class="header__nav-btn" @click="openTab(tabs[4]._uid)">
                Advantages
              </button>
            </li>
            <li v-if="story.content.show_projects" class="header__nav-li">
              <a
                class="header__nav-btn"
                href="#projects"
                @click="tabs.forEach(tab => closeTab(tab._uid))"
              >
                Projects
              </a>
            </li>
            <li v-if="story?.content?.contacts?.length" class="header__nav-li">
              <a
                class="header__nav-btn"
                href="#contacts"
                @click="tabs.forEach(tab => closeTab(tab._uid))"
              >
                Contact Us
              </a>
            </li>
            <li class="header__nav-li">
              <button
                class="header__nav-btn header__nav-btn--download"
                @click="onPdf"
              >
                <span class="header__btn-icon">
                  <IconsDownload />
                </span>
                Download PDF
              </button>
            </li>
          </ul>
        </nav>
        <button
          class="header__burger burger"
          :class="[isOpen && 'burger--open']"
          aria-label="Navigation button"
          @click.stop="toggleNav"
        >
          <span class="burger__dot burger__dot--1"></span>
          <span class="burger__dot burger__dot--2">
            <span class="burger__close-icon">
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.934143"
                  y="0.830566"
                  width="12"
                  height="1"
                  transform="rotate(45 0.934143 0.830566)"
                  fill="#ffffff"
                />
                <rect
                  x="0.580597"
                  y="9.31586"
                  width="12"
                  height="1"
                  transform="rotate(-45 0.580597 9.31586)"
                  fill="#ffffff"
                />
              </svg>
            </span>
          </span>
          <span class="burger__dot burger__dot--3"></span>
        </button>
      </div>
    </div>
  </header>
</template>
