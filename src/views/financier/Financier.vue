<template>
    <section class="salesman">
       <div :class="isShow ? 'salesman__sidebar' : 'salesman__sidebar'">
        <Sidebar :items="sidebar_items"/>
       </div>
       <div class="salesman__main1">
        <div class="salesman-navbar">
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
  {title: 'Income', path:"/income", icon:"fa-solid fa-coins", keys: 'financier'},
  {title: 'Expence', path:"/expence", icon:"fa-solid fa-coins", keys: 'financier'},
])
</script>

<style lang="scss" scoped>
$bg-color: #F2F7FF;
.salesman{
  width: 100%;
  height: 100%;
  display: flex;
  %salesman__global{
    height: 100%;
    background-color: $bg-color;
    transition: all 0.4s linear;
  }
  .salesman__main1{
    width: calc(100% - 300px);
    @extend %salesman__global
  }
  .salesman__main{
    width: calc(100% - 53px);
    @extend %salesman__global
  }
  .salesman__sidebar1{
    width: 62px;
    transition: all 0.4s linear;
  }
  .salesman__sidebar{
    width: 300px;
  }
  .salesman-navbar{
    width: 100%;
    position: sticky;
    top: 0;
  }
}
@media screen and (max-width: 1024px) {
  %salesman__global2{
    height: 100%;
    background-color: $bg-color;
    transition: all 0.4s linear;
  }
  .salesman__sidebar{
    width: 62px !important;
  }
  .salesman__main1{
    width: calc(100% - 53px) !important;
    @extend %salesman__global2;
  }
}
</style>