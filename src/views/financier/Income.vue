<template>
      <div class="financier">
        <div class="add" v-if="role !== 'director'">
            <button @click="openModal">Add Income</button>
        </div>
        <AppTable :headers="headers" :body="form">

        </AppTable>
        <div class="pagination">
            <VPagination v-model="params.page" :pages="params.last_page" :range-size="1" active-color="#EAF5FF" @update:modelValue="salesman"/>
        </div>
      </div>
      <IncomeModal ref="addincome"/>
</template>

<script setup>
import http from "@/plagens/Axios";
import { ref, onMounted } from "vue";
import IncomeModal from './IncomeModal.vue'
import AppTable from '@/ui/app-table.vue'
import VPagination from "@hennge/vue3-pagination"


let form = ref([])
let addincome = ref('')
let role = localStorage.getItem("role")
const openModal = () => {
    addincome.value.openModal()
}
const params = ref({
    page: 1,
    per_page: 10,
    last_page: null,
})
const headers = ref([
    {title: "N", value: "index"},
    {title: "Income type", value: "income_type"},
    {title: "Invoice", value: "invoice"},
    {title: "Amount", value: "amount"},
])
const salesman = () =>{
      http.get('finance/income/',{
        params: {
            per_page: params.value.per_page,
            page: params.value.page,
        }
    }).then(res => {
        form.value = res.data.results
        form.value.forEach((item, index) => {
            item.index = 
            params.value.page * params.value.per_page - 
            (params.value.per_page - 1) + index;
        });
        params.value.last_page = Math.ceil(res.data.count / params.value.per_page)
    })
}
onMounted(()=>{
    salesman()
})
</script>

<style lang="scss" scoped>
.add {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding: 15px;
      button {
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            background-color: #435ebe;
            color: #fff;
            cursor: pointer;
            letter-spacing: .8px;
      }
    }
.financier {
      width: 100%;
      height: 100vh;
}
.pagination {
    width: 98%;
    display: flex;
    align-items: center;
    justify-content: end;
    margin: 10px 0px;
 }
</style>