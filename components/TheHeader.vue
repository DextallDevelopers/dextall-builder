<script setup lang="ts">
import { useQoutesStories } from '~~/composables/stories/quotes'
import { ToastColor } from '~/composables/toasts'

const route = useRoute()

const { name, version } = route.params

const { stories, story } = await useQoutesStories(
  name as string,
  version as string
)

const { open: openTab, close: closeTab, tabs } = useTab()

const additionalTabs = computed(() => tabs.value.filter(tab => tab.name))

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
  try {
    isWaiting.value = true
    const siteURL = window.location.href + '/pdf'
    const url = `https://api.html2pdf.app/v1/generate?html=${siteURL}&landscape=true&apiKey=3wrhnNNhHtKWM5rnLdczVtUGAnONZtOHJd044U3qFG1F7ccu2DYhNBmgdQdfiPrF`

    function download(blob, filename) {
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      // the filename you want
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }

    await fetch(url, { method: 'GET' })
      .then(response => response.blob().then(blob => download(blob, 'quote')))
      .then(response => console.log(response))
      .catch(err => console.error(err))
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
            <li v-if="tabs[4]" class="header__nav-li">
              <button class="header__nav-btn" @click="openTab(tabs[4]._uid)">
                About us
              </button>
            </li>
            <li class="header__nav-li">
              <a
                class="header__nav-btn"
                href="#projects"
                @click="tabs.forEach(tab => closeTab(tab._uid))"
              >
                Projects
              </a>
            </li>
            <li class="header__nav-li">
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
