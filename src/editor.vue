<template>
  <editor :submit-api="submitUrl"
          :model.sync="model"
          @create="create"
          @remove="remove"
          @save="save"></editor>
</template>

<script>
import Editor from './components/editor'
import UrlHelper from 'utilities/url'

export default {
  name: 'background-editor',
  components: {
    Editor
  },
  props: {
    fetchApi: {
      type: String,
      default: '/api/placeholders'
    },
    submitApi: {
      type: String,
      default: '/api/save'
    }
  },
  data() {
    return {
      model: {}
    }
  },
  computed: {
    submitUrl() {
      return UrlHelper.wrapUrl(this.submitApi)
    }
  },
  created() {
    let vm = this
    $.getJSON(UrlHelper.wrapUrl(vm.fetchApi)).then(res => {
      vm.model = res
    })
  },
  methods: {
    create({ x, y, width, height }) {
      this.model.positions.push({
        x,
        y,
        width,
        height
      })
    },
    remove(index) {
      this.model.positions.splice(index, 1, null)
    },
    save(result) {
      // if (result.success) {
      //   location.reload(true)
      // } else {
      //   alert(result.error)
      // }
      return result
    }
  }
}
</script>
