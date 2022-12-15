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
        <div class="header__nav-wrapper">
          <ul class="header__nav-list">
            <li v-for="(el, idx) in links" :key="idx" class="header__nav-li">
              <button class="header__nav-btn">
                {{ el.navText }}
              </button>
            </li>
          </ul>
          <button class="header__nav-btn header__nav-btn--download">
            <span class="header__btn-icon"><IconsDownload /></span>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
