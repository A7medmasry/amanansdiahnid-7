import colors from 'vuetify/es5/util/colors'
export default {
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'initial-scale=1 width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" },
      { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Quicksand&display=swap" }
    ],
    script: [
      { "data-ad-client": "ca-pub-3374289978792695", async: "g" ,src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" }
    ]
  },
  loading: { color: '#1976d2' },
  css: [
  ],
  plugins: [
  ],
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  modules: [
  ],
  build: {
  }
}
