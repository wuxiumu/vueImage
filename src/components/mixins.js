export default {
  methods: {
    initPositions() {
      let vm = this
      const { background, ratio, positions } = vm.model
      vm.ratio = ratio || 1.0
      const bg = new Image()
      bg.src = background
      bg.onload = function () {
        let $bg = $('.img_effect_bg')
        let width = $bg.width()
        let height = $bg.height()

        // 获取背景图片的绝对定位
        let bgPosition = $bg.offset()
        vm.bgX = bgPosition.left
        vm.bgY = bgPosition.top

        if (bg.naturalWidth) {
          vm.setBackgroundSize(width, height, bg.naturalWidth, bg.naturalHeight)
          vm.originalAvatars = positions
        } else {
          vm.setBackgroundSize(width, height, bg.width, bg.height)
          vm.originalAvatars = positions
        }
      }
    },
    setBackgroundSize(width, height, originalWidth, originalHeight) {
      this.ratioWidth = width / originalWidth
      this.ratioHeight = height / originalHeight
    }
  },
  watch: {
    model: {
      handler: 'initPositions',
      deep: true
    }
  }
}
