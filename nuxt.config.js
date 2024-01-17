import colors from 'vuetify/es5/util/colors'
const lightTheme = {
  primary: "#024650",
  info: "#21c1d6",
  success: "#4CAF50",
  accent: "#fc4b6c",
  warning: "#ffb22a",
  default: "#563dea",
  background: "#ECEFF1",
};
const darkTheme = {
  primary: "#024650", 
  info: "#21c1d6",
  success: "#4CAF50",
  accent: "#fc4b6c",
  warning: "#ffb22a",
  default: "#563dea",
};

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - crud-ui',
    title: 'crud-ui',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  auth: {
    // Options
    strategies: {
      local: {
        endpoints: {
          login: {
            url: process.env.LOGIN_URL,
            method: "post",
            propertyName: "token",
          },
          logout: false,
          user: {
            url: process.env.PROFILE_URL,
            method: "get",
            propertyName: "user"
          }
        },
        token: {
          property: "jwt",
          global: true,
          required: true,
          type: "Bearer",
        },
        user: {
          property: false,
          autoFetch: true,
        },
      }
    },
    redirect: {
      login: "/auth/login",
      callback: "/auth/login",
      logout: "/auth/login",
      home: "/",
    },
  },

  axios: {
    baseURL: process.env.BASE_URL,
  },

  env: {
    baseURL: process.env.BASE_URL
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      options: {
        customProperties: true,
      },
      themes: {
        dark: darkTheme,
        light: lightTheme,
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
