import App from './app.vue'

const selector = '.calendar-maker'
let app = new Vue({
  components: {
    'xiaole-maker': App
  }
})
app.$mount(selector)
