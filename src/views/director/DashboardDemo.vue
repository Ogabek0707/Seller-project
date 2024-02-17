<template>
      <div class="dash">
            <section class="dashboard_head">
                  <div class="dashboard_head-item">
                        <h3>Current month profit</h3>
                        <p>{{ dashboard.profit }}</p>
                  </div>
                  <div class="dashboard_head-item">
                        <h3>Current month income</h3>
                        <p>{{ dashboard.total_income }}</p>
                  </div>
                  <div class="dashboard_head-item">
                        <h3>Current month expense</h3>
                        <p>{{ dashboard.total_expense }}</p>
                  </div>
            </section>
            <section class="dashboard_charts">
                  <BarChart/>
            </section>
            <section class="dashboard_tops">
                  <div class="dashboard_clients">
                        <h2>Top clients</h2>
                        <AppTable :headers="headers" :body="top_clients">
                              <template #body_title="{ item }">
                                    <span class="product__lists-table_text">{{ item.title }}</span>
                              </template>
                        </AppTable>
                        <div class="pagination">
                              <VPagination v-model="params.page" :pages="params.last_page" :range-size="1" active-color="#EAF5FF" @update:modelValue="getTopClient"/>
                        </div>
                  </div>
                  <div class="dashboard_clients">
                        <h2>Top Products</h2>
                        <AppTable :headers="headers2" :body="top_products">
                              <template #body_title="{ item }">
                                          <span class="product__lists-table_text">{{ item.title }}</span>
                              </template>
                        </AppTable>
                        <div class="pagination">
                              <VPagination v-model="params.page" :pages="params.last_page" :range-size="1" active-color="#EAF5FF" @update:modelValue="getTopClient"/>
                        </div>
                  </div>
            </section>
      </div>
</template>

<script setup>
import http from "@/plagens/Axios";
import { ref } from "vue";
import VPagination from '@hennge/vue3-pagination'
import AppTable from '@/ui/app-table.vue'
// import BarChart from '@/components/Layouts/BarChartDemo.vue'


let dashboard = ref({})
let top_clients = ref({})
let top_products = ref({})
let income_expense = ref({})
let params = ref({
      page: 1,
      per_page: 10,
      last_page: null,
})
let params2 = ref({
      page: 1,
      per_page: 10,
      last_page: null,
})
const headers = ref([
      {title: 'N', value: 'index'},
      {title: 'Client name', value: 'title'},
      {title: 'Phone number', value: 'phone_number'},
      {title: 'Total sale', value: 'total_sales'},
])
const headers2 = ref([
      {title: 'N', value: 'index'},
      {title: 'Product name', value: 'title'},
      {title: 'Code', value: 'code'},
      {title: 'Total sale', value: 'total_sales'},
])
const getDashboard = () => {
      http.get('dashboard/monthly-profit/').then(res=>{
            dashboard.value = res.data
      })
}
const getTopClient = () => {
      http.get('dashboard/top-clients/').then(res=>{
            top_clients.value = res.data.results
           top_clients.value.forEach((item, index) => {
            item.index = 
            params.value.page * params.value.per_page - 
            (params.value.per_page - 1) + index;
        });
        params.value.last_page = Math.ceil(res.data.count / params.value.per_page)
      })
}
const getTopProducts = () => {
      http.get('dashboard/top-products/').then(res=>{
            top_products.value = res.data.results
           top_products.value.forEach((item, index) => {
            item.index = params2.value.page * params2.value.per_page - 
            (params.value.per_page - 1) + index;
        });
        params2.value.last_page = Math.ceil(res.data.count / params2.value.per_page)
      })
}
const getAnnualy = () => {
      http.get('dashboard/annual-profit/').then(res=>{
            income_expense.value = res.data
      })
}
getAnnualy()
getTopClient()
getTopProducts()
getDashboard()
</script>

<style lang="scss" scoped>
.dash{
      width: 100%;
      height: 100vh;
      .dashboard_head {
            display: flex;
            gap: 20px;
            align-items: center;
            justify-content: center;
            margin-top: 15px;
            .dashboard_head-item {
                  width: 250px;
                  height: 100px;
                  border-radius: 10px;
                  background-color: #57caeb;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-direction: column;
                  color: #fff;
                  p {
                        font-size: 18px;
                        margin-top: 5px;
                  }
            }
      }
}
.dashboard_tops {
    display: flex;
    grid-template-columns: auto;
    .dashboard_clients {
      overflow-x: scroll;
      h2 {
            margin: 10px 0;
      }
     }
}
@media (max-width: 776px){
      .dashboard_tops {
    display: flex;
    flex-wrap: wrap;
}
}
</style>