<template>
  <div class="img_effect clearfix">
    <div class="img_box">
      <img class="img_effect_bg"
           :src="model.background"
           alt="">
      <template v-for="(avatar, index) in avatars">
        <avatar :width="avatar.width"
                :height="avatar.height"
                :radius="avatar.radius"
                :ratio="ratio / ratioHeight"
                :image="avatar.image"
                @init="init($event, index)"
                @click="click($event, index)"
                @uploadfile="upload"
                :class="{on: index === currentIndex}"
                :key="index"
                :style="{left: avatar.x, top: avatar.y}" />
      </template>
    </div>
    <ul class="img_operation clearfix">
      <li class="replace">
        <a href="javascript:;"
           @click="chooseFile">
          <i></i>
          <span>更换</span>
        </a>
      </li>
      <li class="rotating">
        <a href="javascript:;"
           @click="rotate">
          <i></i>
          <span>旋转</span>
        </a>
      </li>
      <li class="flip_horizontal">
        <a href="javascript:;"
           @click="flipY">
          <i></i>
          <span>垂直</span>
        </a>
      </li>
      <li class="flip_vertical">
        <a href="javascript:;"
           @click="flipX">
          <i></i>
          <span>水平</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import Avatar from './avatar'
import mixins from '../mixins'
export default {
  name: 'calendar-maker',
  mixins: [mixins],
  components: {
    Avatar
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    submitApi: {
      type: String,
      required: true
    }
  },
  created() {
    window.calendarMaker = this
  },
  data() {
    return {
      originalAvatars: [],
      avatars: [],
      currentIndex: 0,
      ratio: 1.0,
      ratioWidth: 1.0,
      ratioHeight: 1.0,
      ratioRadius: 1.0
    }
  },
  computed: {
    myCroppa() {
      return (
        this.avatars[this.currentIndex] && this.avatars[this.currentIndex].entry
      )
    }
  },
  methods: {
    init(entry, i) {
      this.avatars[i].entry = entry
    },
    click(entry, i) {
      this.currentIndex = i
    },
    rotate() {
      this.myCroppa && this.myCroppa.rotate()
    },
    flipX() {
      this.myCroppa && this.myCroppa.flipX()
    },
    flipY() {
      this.myCroppa && this.myCroppa.flipY()
    },
    chooseFile() {
      this.myCroppa && this.myCroppa.chooseFile();
    },
    upload(file){
         var id_object=this.avatars[this.currentIndex];
         var fd = new FormData()
              fd.append('file', file)
              fd.append('id', id_object.id)

              $.ajax({
                url: 'https://wx.xiaoledingzhi.com/index.php/product/save_vue_image',
                data: fd,
                type: 'POST',
                processData: false,
                contentType: false,
                beforeSend: function(){

                    $(".js_vue_alert").show();
                    $(".js_vue_alert_content").text("更换图片正在保存中！");
                    
                },
                success: function(data) {
                    $(".js_vue_alert").hide();
                    
                }
              })
    },
    save() {
      return new Promise((resolve, reject) => {
        let vm = this
        const {
          submitApi,
          avatars,
          ratioWidth,
          ratioHeight,
          ratioRadius,
          originalAvatars
        } = vm

        let formData = new FormData()
        
        let allImages = avatars.map(c => {
          return c.entry && c.entry.promisedBlob('image/png', 1)
        })



        formData.append('ratioWidth', ratioWidth)
        formData.append('ratioHeight', ratioHeight)

        console.log(ratioRadius);

        let avatares=[];
        
        Promise.all(allImages).then(res => {
          let isValid = true

          res.forEach((blob, index) => {
            if (blob) {
              let avatar = originalAvatars[index]
              let name = 'img' + index
              formData.append(name, blob)
              avatares.push(avatar)
            } else {
              isValid = false
            }
          })
          
          formData.append('avatares',JSON.stringify(avatares))
          if (!isValid) {
            let response = {
              success: false,
              error: '请上传所有需要的图片'
            }
            vm.$emit('save', response)
            reject(response)
          } else {
            $.ajax({
              url: submitApi,
              type: 'POST',
              cache: false,
              data: formData,
              processData: false,
              contentType: false,
              xhrFields: {
                withCredentials: true
              },
              crossDomain: true
            }).then(
              res => {
                vm.$emit('save', res)
                resolve(res)
              },
              error => {
                reject({
                  success: false,
                  error: error
                })
              }
            )
          }
        })
      })
    }
  },
  watch: {
    originalAvatars(value, oldValue) {
      let ratioWidth = this.ratioWidth
      let ratioHeight = this.ratioHeight
      this.avatars = value.map(it => {
        return {
          image: it.image,
          width: Math.round(it.width * ratioWidth),
          height: Math.round(it.height * ratioHeight),
          x: Math.round(it.x * ratioWidth) + 'px',
          y: Math.round(it.y * ratioHeight) + 'px',
          radius: it.radius * ratioWidth,
          id: it.id
        }
      })
    }
  }
}
</script>

<style scoped>
.img_effect {
  margin: 0 10px;
}
.img_effect .img_box {
  position: relative;
  width: 100%;
}
.img_effect .img_box .img_effect_bg {
  display: block;
  width: 100%;
}

.img_effect .img_box .img_effect_file {
  position: absolute;
  overflow: hidden;
  border: 1px solid transparent;
/*  background-color: transparent;*/
}

.img_effect .img_box .img_effect_file.on {
  border: 1px solid #fb5d5a;
}

.img_effect .img_box .img_effect_file img {
  position: absolute;
}
</style>
