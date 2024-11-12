// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-24',
  future: { compatibilityVersion: 4 },

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },

    vscode: {},
  },

  ssr: true,

  experimental: {
    componentIslands: true,
    // renderJsonPayloads: false,
    typedPages: true,
  },

  modules: [
    '@nuxt/eslint',
    'nuxt-auth-utils',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],

  runtimeConfig: {
    proxyUrl: process.env.NUXT_PROXY_URL,
    public: {
      appUrl: process.env.NUXT_PUBLIC_APP_URL,
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  colorMode: {
    classSuffix: '',
    fallback: 'dark',
  },

  css: ['~/assets/styles/app.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  // nitro: {
  //   // prerender: {
  //   //   crawlLinks: true,
  //   //   failOnError: false,
  //   // },
  //   routeRules: {
  //     '/px/**': {
  //       proxy: "http://localhost:8000/**"
  //     }
  //   }
  // },
})