import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['@/assets/styles/index.scss'],

  modules: ['@pinia/nuxt', '@nuxtjs/eslint-module'],

  buildModules: [
    [
      '@storyblok/nuxt',
      {
        accessToken: process.env.STORYBLOK_TOKEN,
        apiOptions: {
          region: 'us',
        },
      },
    ],
  ],

  publicRuntimeConfig: {
    STORYBLOK_TOKEN: process.env.STORYBLOK_TOKEN,
    DEXTALL_STORYBLOK_TOKEN: process.env.DEXTALL_STORYBLOK_TOKEN,
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
    AIRTABLE_BASE: process.env.AIRTABLE_BASE,
    ENVIROMENT: process.env.NODE_ENV,
  },

  // head: {
  //   title: 'emotion',
  //   meta: [
  //     { charset: 'utf-8' },
  //     { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  //     { hid: 'description', name: 'description', content: '' },
  //   ],
  //   link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  // },
})
