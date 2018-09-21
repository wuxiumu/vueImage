<template>
  <ul class="menu"
      :style="{top: y + 'px', left: x + 'px'}">
    <li>
      <a href="javascript:;"
         @click="$emit('create', {x: x, y:y})">新建占位</a>
    </li>
    <li>
      <a href="javascript:;"
         @click="$emit('save', $event)">保存</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'menu',
  props: {
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style scoped>
.menu {
  width: 100px;
  border: 1px solid #ccc;
  background-color: #fff;
  position: absolute;
  z-index: 10;
  margin: 0;
}
.menu li {
  list-style: none;
  margin: 10px 0 10px -20px;
}
.menu li a,
.menu li a:link,
.menu li a:active,
.menu li a:visited {
  color: #000;
  text-decoration: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.menu li a:hover {
  color: #ccc;
}
</style>
