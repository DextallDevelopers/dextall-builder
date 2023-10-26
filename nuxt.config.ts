export default defineNuxtConfig({
  css: ['@/assets/styles/index.scss'],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  typescript: {
    strict: false,
  },

  modules: [
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
    public: {
      STORYBLOK_TOKEN: process.env.STORYBLOK_TOKEN,
      DEXTALL_STORYBLOK_TOKEN: process.env.DEXTALL_STORYBLOK_TOKEN,
      AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
      AIRTABLE_BASE: process.env.AIRTABLE_BASE,
      MONDAY_KEY: process.env.MONDAY_KEY,
      DOCAMATIC_API_KEY: process.env.DOCAMATIC_API_KEY,
      ENVIROMENT: process.env.NODE_ENV,
    },
  },
})
