<script setup lang="ts">
const links = [
  {
    navText: 'About us',
  },
  {
    navText: 'Projects',
  },
  {
    navText: 'Contact us',
  },
]

const versions = [
  {
    versionText: 'Version 1',
  },
  {
    versionText: 'Version 2',
  },
  {
    versionText: 'Version 3',
  },
  {
    versionText: 'Version 4',
  },
  {
    versionText: 'Version 5',
  },
  {
    versionText: 'Version 6',
  },
  {
    versionText: 'Version 7',
  },
]

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
</script>

<template>
  <header class="header">
    <div class="container header__wrapper">
      <NuxtLink to="/" class="header__logo" aria-label="Logo">
        <IconsLogo class="header__logo" />
      </NuxtLink>
      <div class="header__content-wrapper">
        <div class="header__dropdown-wrapper">
          <p class="header__quote">
            Quote History:
            <span class="header__span-quote">v1</span>
          </p>
          <div class="header__dropdown-content">
            <ul class="header__dropdown">
              <li
                v-for="(el, idx) in versions"
                :key="idx"
                class="header__dropdown-li"
                @click="closeNav"
              >
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer noopener"
                  class="header__dropdown-version"
                  >{{ el.versionText }}</a
                >
              </li>
            </ul>
          </div>
        </div>
        <nav class="header__nav-wrapper" :class="{ open: isOpen }">
          <ul class="header__nav-list">
            <li v-for="(el, idx) in links" :key="idx" class="header__nav-li">
              <button class="header__nav-btn">
                {{ el.navText }}
              </button>
            </li>
            <li class="header__nav-li">
              <button class="header__nav-btn header__nav-btn--download">
                <span class="header__btn-icon"><IconsDownload /></span>
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
