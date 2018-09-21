import BackgroundEditor from './editor.vue'

const selector = '.calendar-maker'
let app = new Vue({
  components: {
    'background-editor': BackgroundEditor
  }
})
app.$mount(selector)
