<template>
  <div class="editor-container">
    <div class="nav_btn">
      <button type="button" @click="$emit('create', {x: x, y:y})">新建</button>
      <div style="position: relative;">
        <button type="button" @click="save()">保存 </button>
        <div class="tips" v-show="ads">
          保存成功
        </div>
      </div> 
      <button type="button" @click="returnys()">返回</button>
    </div>
    <img class="img_effect_bg"
         :src="model.background"
         alt="background-image" />
    <template v-for="(position, index) in model.positions">
      <widget :key="index"
              v-if="position"
              :position.sync="position"
              :ratio-width="ratioWidth"
              :ratio-height="ratioHeight"
              :ratio-radius="ratioRadius"
              
              @change-position="changePosition($event, index)"
              @close="remove(index)">
        <a href="javascript:;"
           class="close"
           @click="remove(index)">删除</a>
        {{ position.width }} {{ position.height }}
        <p class="p1" >
          圆角:<input class="input_radius cancel"
                 :value="position.radius"
                 @change="change('radius', $event, index, position)"
                 type="text"
                 placeholder="设置圆角大小">
        </p>
        <p class="p1">
          宽: <input class="input_width cancel"
                 :value="position.width"
                 @change="change('width', $event, index, position)"
                 type="text"
                 placeholder="设置宽度">
        </p>
        <p class="p1">
          高: <input class="input_height cancel"
                 :value="position.height"
                 @change="change('height', $event, index, position)"
                 type="text"
                 placeholder="设置高度">
        </p>
      </widget>
    </template>
    <!-- <div>
      <li><a href="#"></a></li>
    </div> -->
    <menu-list v-show="showMenu"
               :x="menuX"
               :y="menuY"
               @create="create"
               @save="save"></menu-list>
  </div>
</template>

<script>
import cloneDeep from 'lodash/clonedeep'
import mixins from '../mixins'
import Widget from './image-widget'
import MenuList from './menu'
import ImageWidget from 'vue-draggable-resizable'
Vue.component('draggable', ImageWidget)

export default {
  name: 'background-editor',
  mixins: [mixins],
  components: {
    Widget,
    MenuList
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
  data() {
    
    return {
      ads: false,
      showMenu: false,
      bgX: 0,
      bgY: 0,
      menuX: 0,
      menuY: 0,
      originalAvatars: [],
      avatars: [],
      ratio: 1.0,
      ratioWidth: 1.0,
      ratioHeight: 1.0,
      ratioRadius: 1.0,
      positions: []
    }
  },
  
  methods: {
    change(prop, e, index, position) {
      let newPosition = cloneDeep(position)
      newPosition[prop] = +e.target.value
      this.changePosition(newPosition, index)
    },
    changePosition(newPosition, index) {
      let model = cloneDeep(this.model)
      model.positions[index] = newPosition
      this.$emit('update:model', model)
    },
    create(e) {
      this.$emit('create', {
        id: 0,
        x: e.x,
        y: e.y,
        width: 150,
        height: 150,
        radius: 20
      })
    },
    remove(index) {
      this.$emit('remove', index)
    },

    returnys() {
      window.history.go(-1)
    },

    close() {
      // if (confirm("您确定要关闭本页吗？")){
      //   window.opener=null;
      //   window.open('','_self');
      //   window.close();
      // }else{}

      window.opener = null
      window.open('', '_self')
      window.close()
    },
    
    save() {
        
      let vm = this
      const { background, positions } = vm.model
      const { ratioWidth, ratioHeight, ratioRadius, ratio } = vm
      let pos = []
      $('.img_effect_file').each(function() {
        let $el = $(this)
        const { top, left } = $el.position()
        pos.push({
          id: 1,
          x: left / ratioWidth,
          y: top / ratioHeight,
          width: $el.width() / ratioWidth,
          height: $el.height() / ratioHeight,
          radius: $el.find('input').val() / ratioRadius //获取圆角
        })
      })

      let result = {
        positions: pos,
        background,
        ratio
      }
      $.ajax({
        url: this.submitApi,
        contentType: 'application/json',
        data: JSON.stringify(result),
        dataType: 'json',
        type: 'POST'
      }).then(
        res => {
          vm.$emit('save', {
            success: true
          }),
          vm.ads = true
          i = setTimeout(() => {
            vm.ads = false
          }, 3000)

        },
        error => {
          vm.$emit('save', {
            success: false,
            error: error
          })
        }
      )
    }
  },
  mounted() {
    let vm = this
    document.oncontextmenu = function() {
      return false
    }
    document.body.onmouseup = function(e) {
      if (e.button === 2) {
        vm.menuX = e.pageX - vm.bgX
        vm.menuY = e.pageY - vm.bgY
        vm.showMenu = true
      } else {
        vm.showMenu = false
      }
    }
  }
}
</script>

<style scoped>
/* .img_effect_bg {
  width: 100%;
  z-index: -1;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
} */

.editor-container {
  position: relative;
}

.nav_btn {
  position: fixed;
  left: 8px;
  top: 8px;
  width: 100px;
}

.nav_btn button {
  display: block;
  width: 100px;
  height: 30px;
  margin-bottom: 10px;
}

.nav_btn .tips{
  position: absolute; 
  left: 108px; 
  top: 0;
  z-index: 19930320;
  height: 30px;
  padding: 0 20px;
  font-size: 14px;
  line-height: 30px;
  color: #fff;
  white-space: nowrap;
  background-color: rgba(0, 0, 0, .6);
}

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
}

.img_effect .img_box .img_effect_file.on {
  border: 1px solid #fb5d5a;
}

.img_effect .img_box .img_effect_file img {
  position: absolute;
}
</style>
