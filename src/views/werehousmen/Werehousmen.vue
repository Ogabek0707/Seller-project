<template>
    <section class="warehouse">
       <div :class="isShow ? 'warehouse__sidebar' : 'warehouse__sidebar'">
        <Sidebar :items="sidebar_items"/>
       </div>
       <div class="warehouse__main1">
        <div class="warehouse-navbar">
            <Navbar/>
        </div>
        <router-view class="router"></router-view>
       </div>
    </section>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue';
import Navbar from '@/components/Navbar.vue';
import { onMounted, ref } from 'vue';
import store from '@/store'
onMounted(() => {
    store.dispatch('getMe')
});
const sidebar_items = ref([
  {title: 'Products', path:"/products", icon:"fa-solid fa-list", keys: 'product_lists'},
  {title: 'Arrived', path:"/arrived", icon:"fa-solid fa-building-circle-check"},
  {title: 'Delivered', path:"/delivered", icon:"fa-solid fa-building-circle-arrow-right"},
  {title: 'Returned', path:"/returned", icon:"fa-solid fa-building-circle-exclamation"},
  {title: 'Suppliers', path:"/suppliers", icon:"fa-solid fa-truck-field"},
])
</script>

<style lang="scss" scoped>
$bg-color: #F2F7FF;
.warehouse{
  width: 100%;
  height: 100%;
  display: flex;
  %warehouse__global{
    height: 100%;
    background-color: $bg-color;
    transition: all 0.4s linear;
  }
  .warehouse__main1{
    width: calc(100% - 300px);
    @extend %warehouse__global
  }
  .warehouse__main{
    width: calc(100% - 53px);
    @extend %warehouse__global
  }
  .warehouse__sidebar1{
    width: 62px;
    transition: all 0.4s linear;
  }
  .warehouse__sidebar{
    width: 300px;
  }
  .warehouse-navbar{
    width: 100%;
    position: sticky;
    top: 0;
  }
}
@media screen and (max-width: 1024px) {
  %warehouse__global2{
    height: 100%;
    background-color: $bg-color;
    transition: all 0.4s linear;
  }
  .warehouse__sidebar{
    width: 62px !important;
  }
  .warehouse__main1{
    width: calc(100% - 53px) !important;
    @extend %warehouse__global2;
  }
}
</style>