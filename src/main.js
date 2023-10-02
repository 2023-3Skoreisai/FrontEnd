import { createVuestic } from 'vuestic-ui'
import '@fontsource-variable/noto-sans-jp';
import 'vuestic-ui/styles/essential.css'
import 'vuestic-ui/styles/typography.css'
import './assets/main.scss'
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App)

// Use vue-router
app.use(router);

// Use Vuestic UI with all-import
app.use(
  createVuestic({
    config: {
      colors: {
        variables: {
          // Default colors
          primary: "#38761d",
          secondary: "#002c85",
          success: "#40e583",
          info: "#2c82e0",
          danger: "#e34b4a",
          warning: "#ffc200",
          gray: "#babfc2",
          dark: "#34495e",
        },
        presets:{
          light:{
            primary: "#4b8333",
          },
          dark:{
            primary: "#38761d",
          }
        }
      },
    },
  })
)

app.mount('#app')
