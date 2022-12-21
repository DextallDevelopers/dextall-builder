import eslintPlugin from 'vite-plugin-eslint'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['@/assets/styles/index.scss'],

  modules: [
    // '@nuxtjs/eslint-module',
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

  runtimeConfig: {
    STORYBLOK_TOKEN: process.env.STORYBLOK_TOKEN,
    ENVIROMENT: process.env.NODE_ENV,
  },

  typescript: {
    shim: false,
  },

  vite: {
    plugins: [eslintPlugin()],
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
