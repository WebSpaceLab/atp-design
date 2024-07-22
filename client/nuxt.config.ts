// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    "@nuxt/eslint",
    "nuxt-auth-utils",
    '@pinia/nuxt',
    "@nuxt/content",
    "@nuxt/image",
    '@nuxtjs/color-mode',
  ],
  runtimeConfig: {
    public: {
      clientUrl: process.env.NUXT_PUBLIC_CLIENT_URL,
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
    },
  },
})
