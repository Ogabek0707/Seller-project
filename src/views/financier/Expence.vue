<template>
      <div class="financier">
        <div class="add" v-if="role !== 'director'">
            <button @click="openModal">Add Expence</button>
        </div>
        <AppTable :headers="headers" :body="form">

        </AppTable>
        <div class="pagination">
            <VPagination v-model="params.page" :pages="params.last_page" :range-size="1" active-color="#EAF5FF" @update:modelValue="salesman"/>
        </div>
      </div>
      <ExpenseModal ref="addexpense"/>
</template>

<script setup>
import http from "@/plagens/Axios";
import { ref, onMounted } from "vue";
import IncomeModal from './IncomeModal.vue'
import AppTable from '@/ui/app-table.vue'
import VPagination from "@hennge/vue3-pagination"
import ExpenseModal from './ExpenceModal.vue'


let form = ref([])
let addexpense = ref('')
let role = localStorage.getItem("role")
const openModal = () => {
    addexpense.value.openModal()
}
const params = ref({
    page: 1,
    per_page: 10,
    last_page: null,
})
const headers = ref([
    {title: "N", value: "index"},
    {title: "Invoice", value: "invoice"},
    {title: "Returned Invoice", value: "returned_invoice"},
    {title: "Amount", value: "amount"},
    {title: "Description", value: "description"},
])
const salesman = () =>{
      http.get('finance/expense/',{
        params: {
            per_page: params.value.per_page,
            page: params.value.page,
        }
    }).then(res => {
        form.value = res.data.results
        console.log(res.data.results);
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