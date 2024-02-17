<template>
      <AppModal v-model="dialog">
            <div class="modal">
                  <h3 v-if="!id">Add Supplier</h3>
                  <h3 v-else>Edit Supplier</h3>
                  <form>
                        <label for="product_name">Supplier Name</label>
                        <input v-model="forms.title" class="form__input" type="text" id="product_name" placeholder="Supplier Name">
                        <label for="desc">Address</label>
                        <input v-model="forms.address" class="form__input" type="text" id="product_name" placeholder="Address">
                        <button type="submit" @click="send" v-if="!id"> Add Supplier </button>
                        <button type="submit" @click="edit" v-else> Edit Supplier </button>
                  </form>
            </div>
      </AppModal>
      <div class="menu">
            <AppTable :headers="headers" :body="supplier">
                  <template #body_action="{item}">
                      <div class="action">
                        <span class="edit" @click="Edit(item)"><i class="fa-solid fa-pen-to-square"></i></span>        
                        <span class="delete" @click="DeleteSupplier(item)"><i class="fa-solid fa-trash-can"></i></span>        
                      </div>
                  </template>
            </AppTable>
            <button class="btn" @click="Create" v-if="role !== 'director'">Create</button>
      </div>
      <AppModal v-model="dialog2">
            <div class="modal">
                  <h3>Are You sure you to delete ?</h3>
                  <div class="modal_act">
                        <button class="btn1" @click="dialog2 = false">Cancel</button>
                        <button class="btn2" @click="deleteModal">Delete</button>
                  </div>
            </div>
      </AppModal>
</template>

<script setup>
import http from "@/plagens/Axios";
import store from "@/store";
import { onMounted, ref, watch } from "vue";
import { Store } from "vuex";
import AppTable from '@/ui/app-table.vue'
import AppModal from '@/ui/app-modal.vue'
import Notification from "@/plagens/Notification";

let supplier = ref([])
let dialog = ref(false)
let dialog2 = ref(false)
let id = ref(null)
let role = localStorage.getItem("role")
let forms = ref({
      title: "",
      address: "",
      credit: ""
})
let headers = ref([
    {title: "N", value: "id"},
    {title: "Name", value: "title"},
    {title: "Address", value: "address"},
    {title: "Credit", value: "credit"},
    {title: "Action", value: "action"},
])
const Supplier = () => {
      http.get('warehouse/supplier/').then(res => {
            console.log(res.data.results);
            supplier.value = res.data.results
      })
}
const Edit = (value) => {
      if(value && value.id) {
            forms.value = {...value}
            id.value = value.id
      }
      dialog.value = true
}
const send = () => {
      if(!id.value) {
            http.post('warehouse/supplier/', {
                  title: forms.value.title,
                  address: forms.value.address
            }).then(res=>{
                  Notification({text: "Supplier added !!!"},{type: "success"})
                  if(res.status === 201){
                        location.reload()
                  }
            })
      }
      if(!id.value){
            Notification({text: "Supplier added !!!"},{type: "success"})
      }
}
const edit = (e) => {
      e.preventDefault();
      
      http.put(`warehouse/supplier/${id.value}/`, {
            title: forms.value.title,
            address: forms.value.address
      }).then(res => {
            console.log(res);
            Notification({text: "Supplier updated !!!"},{type: "warning"})
            setTimeout(() => {
                  location.reload()
            }, 2000);
      }).catch(err =>{
            console.log(err);
            Notification({text: " Something wrong !!!"},{type: "danger"})
      })
      dialog.value = false
}
const deleteModal = () => {
      http.delete(`warehouse/supplier/${id.value}`).then(res => {
            console.log(res);
            Notification({text: "Supplier deleted !!!"}, {type: "danger"})
            if(res.status === 204){
                  location.reload()
            }
      })
}
const Create = () => {
      dialog.value = true
}
watch(dialog,(value) => {
      if(!value) {
            id.value = null
            forms.value.title = ""
            forms.value.address = ""
      }
})
const DeleteSupplier = (value) =>{
      if(value && value.id) forms.value = value
      id.value = value.id
      dialog2.value = true
}
onMounted(()=>{
      Supplier()
})
</script>

<style lang="scss" scoped>
.menu {
      width: 100%;
      height: 100vh;
      padding: 25px 10px;
      .btn {
            padding: 10px 20px;
            color: #fff;
            background-color: #57caeb;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-left: 10px;
            letter-spacing: .8px;
      }
}
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
.modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h3 {
      text-align: center;
      margin: 10px 0;
      font-size: 25px;
    }
    form {
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