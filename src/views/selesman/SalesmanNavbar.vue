<template>
      <div class="menu">
            <div class="add">
                  <button @click="openModal" v-if="role !== 'director'">Add Client</button>
            </div>
            <AppTable :headers="headers" :body="form">
                  <template #body_action="{item}">
                      <div class="action">
                        <span class="edit" @click="Edit(item)"><i class="fa-solid fa-pen-to-square"></i></span>        
                        <span class="delete" @click="DeleteClient(item)"><i class="fa-solid fa-trash-can"></i></span>        
                      </div>
                  </template>
            </AppTable>
            <div class="pagination">
                  <VPagination v-model="params.page" :pages="params.last_page" :range-size="1" active-color="#EAF5FF" @update:modelValue="getProduct"/>
            </div>
      </div>
      <div class="modal1">
            <AppModal v-model="dialog">
            <div class="modal">
                  <h3 v-if="!id">Add Client</h3>
                  <h3 v-else>Edit Client</h3>
                  <form>
                        <label for="client_name">Client Name</label>
                        <input v-model="forms.title" class="form__input" type="text" placeholder="Client Name">
                        <label for="desc">Address</label>
                        <input v-model="forms.address" class="form__input" type="text" placeholder="Address">
                        <label for="desc">Phone Number</label>
                        <input v-model="forms.phone_number" class="form__input" type="text" placeholder="Phone Number">
                        <button type="submit" v-if="!id" @click="send"> Add Client </button>
                        <button type="submit" v-else @click="send"> Edit Client </button>
                  </form>
            </div>
      </AppModal>
      <AppModal v-model="dialog2">
            <div class="modal">
                  <h3>Are You sure you to delete</h3>
                  <div class="modal_act">
                        <button class="btn1" @click="dialog2 = false">Cancel</button>
                        <button class="btn2" @click="deleteModal">Delete</button>
                  </div>
            </div>
      </AppModal>
      </div>
</template>

<script setup>
import http from '@/plagens/Axios'
import AppTable from '@/ui/app-table.vue'
import { onMounted } from 'vue'
import VPagination from "@hennge/vue3-pagination"
import { ref, watch, defineExpose } from "vue";
import {Field, Form} from "vee-validate"
import AppModal from "@/ui/app-modal.vue"
import Notification from "@/plagens/Notification";
import { useRouter } from "vue-router";

const params = ref({
    page: 1,
    per_page: 10,
    last_page: null,
})
let role = localStorage.getItem("role")
const sidebar_items = ref([
  {title: 'Client', path:"/salesman", icon:"fa-solid fa-list", keys: 'product_lists'},
])
const form = ref([])
const dialog = ref(false)
const dialog2 = ref(false)
const id = ref(null)
const forms = ref({
      id: null,
      title: "",
      address: "",
      phone_number: ""
})
const openModal = () => {
      dialog.value = true
}
const headers = ref([
    {title: "N", value: "index"},
    {title: "Name", value: "title"},
    {title: "Address", value: "address"},
    {title: "Phone Number", value: "phone_number"},
    {title: "Action", value: "action"},
])
const salesman = () =>{
      http.get('sales/client/',{
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
const Edit = (value) => {
      if(value && value.id) {
            forms.value = {...value}
            id.value = value.id
      }
      dialog.value = true
}
watch(dialog,(value)=>{
      if(!value) {
            id.value = null
            forms.value.title = ""
            forms.value.address = ""
      }
})
const send = (e) => {
      e.preventDefault();
      
      if(!id.value) {
            http.post('sales/client/',{
                  title: forms.value.title,
                  address: forms.value.address,
                  phone_number: forms.value.phone_number,
            }).then(res=>{
                  dialog.value = false
            Notification({text: "Supplier added !!!"},{type: "success"})
               if(res.status === 201){
                  location.reload()
               }         
            })

      }else{
           http.put(`sales/client/${id.value}/`,{
                  title: forms.value.title,
                  address: forms.value.address,
                  phone_number: forms.value.phone_number,
            }).then(res=>{
                  Notification({text: "Supplier updated !!!"},{type: "warning"})
               if(res.status === 200){
                  location.reload()
               }         
            })
      dialog.value = false
      }
      if(!id.value){
            Notification({text: "Supplier added !!!"},{type: "success"})
            }else{
                  Notification({text: "Supplier updated !!!"},{type: "warning"})
            }
}
const DeleteClient = (value) => {
      if(value && value.id) forms.value = value
      id.value = value.id
      dialog2.value = true
}
const deleteModal = () => {
      http.delete(`sales/client/${id.value}/`).then(res=>{
            console.log(res);
            Notification({text: "Client deleted !!!"},{type: "danger"})
            location.reload()
      })
}
onMounted(()=>{
      salesman()
})
</script>

<style lang="scss" scoped>
.menu{
      width: 100%;
      height: 100vh;
      .action{
            display: flex;
            justify-content: center;
            gap: 12px;
            .edit{
                  color: #57caeb;
                  cursor: pointer;
                  i{
                        font-size: 18px;
                  }
            }
            .delete{
                  color: #ff7976;
                  cursor: pointer;
                  i{
                        font-size: 18px;
                  }
            }
      }
      .pagination {
        width: 98%;
        display: flex;
        align-items: center;
        justify-content: end;
        margin: 10px 0px;
    }
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
}
.modal{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h3 {
      text-align: center;
      margin: 10px 0;
      font-size: 25px;
    }
     Form {
            width: 70%;
            margin: 15px 0;
            display: flex;
            flex-direction: column;
            label {
                  margin: 10px 0;
                  font-weight: 500;
                  font-size: 16px;
                  color: #2c2728;
            }
            input {
                  width: 100%;
                  font-weight: 400;
                  font-size: 14px;
                  height: 45px;
                  padding-left: 15px;
                  color: #272a2c;
                  background: #edf2f7;
                  border-radius: 5px;
                  outline: none;
                  border: none;
            }
            button {
                  margin-top: 40px;
                  border: none;
                  padding: 10px 0;
                  color: #fff;
                  font-size: 16px;
                  background-color: #435ebe;
                  border-radius: 5px;
                  cursor: pointer;
            }
      }
   .modal_act {
      margin-top: 40px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 30px;
      button {
            padding: 15px 50px;
            border: none;
            border-radius: 5px;
            font-size: 18px;
            color: #fff;
            cursor: pointer;
            margin-bottom: 20px;
      }
      .btn1 {
            background-color: #57caeb;
      }
      .btn2 {
           background-color: #ff7976;
      }
    }
}
</style>