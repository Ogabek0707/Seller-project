<template>
  <div class="sidebar">
    <div class="sidebar__img">
      <button @click="icon"><i class="img-icon fa-solid fa-bars-staggered"></i></button>
    </div>
    <div class="sidebar__items">
      <!-- <router-link
        to="/products"
        active-class="sidebar__item1"
        class="sidebar__item"
      >
        <span><i class="fa-solid fa-list"></i></span>
        <span :class="isShow ? 'sidebar__items-title' : ''">Products</span>
      </router-link> -->

      <router-link
       v-for="(item, index) in props.items"
       :key="index" 
       :to="item.path"
       class="sidebar__item"
       active-class="sidebar__item1"
       :class="{sidebar__item1: $route.meta.child == `${item.keys}`}"
       >
        <span><i :class="item.icon"></i></span>
        <span :class="isShow ? 'sidebar__items-title' : ''">
        {{ item.title }}</span>                        
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

let icon1 = ref(false)
const icon = () =>{
    icon1.value = !icon1.value
    console.log(icon1.value);
}
const props = defineProps({
  items: {
    type: Array
  }
})

</script>

<style lang="scss" scoped>
$blue-color: #435ebe;
$hover-color: #f0f1f5;
$bg-color: #fff;
.sidebar1 {
  width: 53px;
  height: 100vh;
  position: fixed;
  background-color: $bg-color;
  transition: all 0.4s linear;
  overflow: hidden;
}
.sidebar {
  width: 300px;
  height: 100vh;
  position: fixed;
  background-color: $bg-color;
  transition: all 0.4s linear;
}
.sidebar__img {
  margin: 20px;
  button {
    background-color: #fff;
    border: none;
  }
  .img-icon {
    font-size: 20px;
    color: $blue-color;
    cursor: pointer;
  }
}
.sidebar__items {
  width: 100%;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @mixin sidebar__item($color, $bg_color) {
    color: $color;
    background-color: $bg_color;
  }
  // .sidebar__items-title{
  //     display: block;
  // }
  %sidebar_item {
    // display: block;
    width: 90%;
    margin: 10px;
    padding: 12px 17px;
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 15px;
    border-radius: 5px;
    cursor: pointer;
  }
  .sidebar__item {
    @extend %sidebar_item;
    @include sidebar__item($blue-color, transparent);
    &:hover {
      background-color: $hover-color;
    }
  }
  .sidebar__item1 {
    @extend %sidebar_item;
    @include sidebar__item(#fff, $blue-color);
    &:hover {
      background-color: $blue-color;
    }
  }
}
@media screen and (max-width: 1024px) {
  .sidebar {
    width: 53px;
    height: 100vh;
    position: fixed;
    background-color: $bg-color;
    transition: all 0.4s linear;
    overflow: hidden;
  }
  .sidebar1 {
    width: 300px;
    height: 100vh;
    position: fixed;
    background-color: $bg-color;
    transition: all 0.4s linear;
    z-index: 999;
    overflow: visible;
  }

  @mixin sidebar__item($color, $bg_color) {
    color: $color;
    background-color: $bg_color;
  }
  %sidebar_item {
    display: block;
    width: 90%;
    margin: 10px;
    padding: 12px 17px;
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 15px;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
