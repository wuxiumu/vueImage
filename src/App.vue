<template>
  <calendar-maker :submit-api="submitUrl"
                  :model="model"
                  @save="save"></calendar-maker>
</template>

<script>
import CalendarMaker from './components/app'
import UrlHelper from 'utilities/url'

export default {
  name: 'app',
  components: {
    CalendarMaker
  },
  props: {
    fetchApi: {
      type: String,
      default: '/api/placeholders'
    },
    submitApi: {
      type: String,
      default: '/api/combine'
    }
  },
  data() {
    return {
      model: {}
    }
  },
  created() {
    let vm = this
    $.getJSON(UrlHelper.wrapUrl(vm.fetchApi)).then(res => {
      vm.model = res
    })
  },
  computed: {
    submitUrl() {
      return UrlHelper.wrapUrl(this.submitApi)
    }
  },
  methods: {
    save(res) {
      if (res.success && res.url) {
        // 保存成功时服务器返回url，客户端可以根据URL做需要的操作，这里是打开一个页面查看保存完的图片。
        let link = document.createElement('a')
        link.href = res.url
        link.target = '_blank'
        link.click()
      } else if (!res.success && res.error) {
        // 有错误消息时放在error字段
        alert(res.error)
      } else {
        console.log(['saved', res])
      }
    }
  }
}
</script>
