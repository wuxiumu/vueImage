<template>
  <croppa class="img_effect_file js_img_effect_file"
          v-model="myCroppa"
          :width="+width"
          :height="+height"
          :radius="+radius"
          :placeholder="placeholder"
          :placeholder-font-size="+placeholderFontSize"
          canvas-color="transparent"
          :disabled="disabled"
          :prevent-white-space="preventWhiteSpace"
          :show-remove-button="showRemoveButton"
          :zoom-speed="1"
          :show-loading="true"
          accept="image/*"
          :quality="ratio"
          :initial-image="image"
          :disable-click-to-choose="disableClickToChoose"
          :image-border-radius="0"
          @file-choose="handleCroppaFileChoose"
          @file-size-exceed="handleCroppaFileSizeExceed"
          @file-type-mismatch="handleCroppaFileTypeMismatch"
          @image-remove="handleImageRemove"
          @move="handleCroppaMove"
          @zoom="handleCroppaZoom"
          @initial-image-loaded="imageLoaded"
          @init="init"
          @click="click"
          @touchstart="touchstart"
          @touchmove="touchmove"
          @touchend="touchend">
  </croppa>
</template>

<script>
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.min.css'
Vue.use(Croppa)
export default {
  name: 'xiaole-avatar',
  props: {
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    radius: {
      type: Number,
      default: 0
    },
    ratio: {
      type: Number,
      default: 1
    },
    image: {
      type: String
    }
  },
  data() {
    return {
      myCroppa: {},
      placeholder: '选择一张图片',
      placeholderFontSize: 0,
      disabled: false,
      preventWhiteSpace: true,
      disablePinchToZoom: false,
      showRemoveButton: false,
      withInitialImage: true,
      disableClickToChoose: true,
      isClick: false
    }
  },

  mounted() {
    $('.js_img_effect_file').each(function() {
      let $el = $(this)
      let radius = $el.attr("radius");
      $el.css("border-radius",radius + "px")
    })
  },

  watch: {
    withInitialImage() {
      this.refresh()
    },
    image(val) {
      console.log(['xxxx', val])
      // this.refresh()
    }
  },
  methods: {
    touchstart() {
      this.isClick = true
    },
    touchmove() {
      this.isClick = false
    },
    touchend() {
      if (this.isClick) {
        this.$emit('click', this.myCroppa)
        this.isClick = false
      }
    },
    click() {
      this.$emit('click', this.myCroppa)
    },
    init() {
      this.$emit('init', this.myCroppa)
    },
    refresh() {
      this.myCroppa.refresh()
    },
    remove() {
      this.myCroppa.remove()
    },
    zoomIn() {
      this.myCroppa.zoomIn()
    },
    moveUp() {
      this.myCroppa.moveUpwards(5)
    },
    // getDataUrl() {
    //   alert(this.myCroppa.generateDataUrl())
    // },
    // async printBlob() {
    //   let blob = await this.myCroppa.promisedBlob()
    //   console.log(blob)
    // },
    handleCroppaFileChoose(file) {
      // console.log(['file chose', file])
      // console.log(file)
      this.$emit('uploadfile',file)
    },
    // handleCroppaFileSizeExceed(file) {
    //   console.log('file size exceeded')
    //   console.log(file)
    // },
    // handleCroppaFileTypeMismatch(file) {
    //   console.log('file type mismatch')
    //   console.log(file)
    // },
    // handleImageRemove() {
    //   console.log('image removed')
    // },
    // handleCroppaMove() {
    //   console.log('moved')
    // },
    // handleCroppaZoom() {
    //   console.log('zoomed')
    // },
    // imageLoaded() {
    //   console.log(111)
    // }
  }
}
</script>
