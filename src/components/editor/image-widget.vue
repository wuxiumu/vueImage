<template>
  <draggable class="img_effect_file"
             :class="{active: active}"
             :style="{'border-radius': position.radius + 'px'}"
             :x="position.x"
             :y="position.y"
             :w="position.width"
             :h="position.height"
             :active.sync="active"
             ref="widget"
             :drag-cancel="'.cancel'"
             @dragging="onDrag"
             @resizing="onResize">
    <slot></slot>
  </draggable>
</template>

<script>
import cloneDeep from 'lodash/clonedeep'

export default {
  name: 'image-widget',
  props: {
    position: {
      type: Object,
      default() {
        return {
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          radius: 0
        }
      }
    }
  },
  methods: {
    onResize(x, y, width, height) {
      const newPosition = Object.assign({}, cloneDeep(this.position), {
        x: Math.round(x),
        y: Math.round(y),
        width: Math.round(width),
        height: Math.round(height)
      })
      this.$emit('change-position', cloneDeep(newPosition))
    },
    onDrag(x, y) {
      const newPosition = Object.assign({}, cloneDeep(this.position), {
        x: Math.round(x),
        y: Math.round(y)
      })
      this.$emit('change-position', newPosition)
    }
  },
  watch: {
    'position.width'(value) {
      this.$refs.widget.width = value
    },
    'position.height'(value) {
      this.$refs.widget.height = value
    },
    'position.x'(value) {
      this.$refs.widget.left = value
    },
    'position.y'(value) {
      this.$refs.widget.top = value
    }
  }
}
</script>
<style scoped>
.img_effect_file {
  /* background-color: #ccc;
  border: 1px dashed gray; */
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px dashed #fff;
  cursor: move;
  color: #ddd;
}

.img_effect_file .p1 {
  margin-top: 8px;
  margin-bottom: 0;
}

.img_effect_file .p1 input {
  width: 60px;
}

/* TODO
这里可以控制关闭按钮的显示隐藏
其中 .active 是在当前框为选中状态的时候才有
*/
/* .widget .close {
  display: none;
}
.widget.active:hover .close {
  display: inline-block;
} */
</style>
