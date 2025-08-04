<template>
      <section class="groups_brands router">
            <router-link to="/products" class="to">
            <i class="left fa-solid fa-left-long"></i>
            <span>Back</span>
            </router-link>
            <div class="groups_brands__item">
                  <div class="group">
                        <p>Groups</p>
                        <AppTable :headers="headers" :body="body">
                              <template #body_action="{item}">
                                    <button @click="DeleteG(item)" class="btn1">delete</button>
                              </template>
                        </AppTable>
                        <button class="btn2" @click="AddG">Create</button>
                  </div>
                  <br>
                  <div class="group">
                        <p>Brands</p>
                        <AppTable :headers="headers" :body="body2">
                              <template #body_action="{item}">
                                    <button @click="DeleteB(item)" class="btn1">delete</button>
                              </template>
                        </AppTable>
                        <button class="btn2" @click="AddB">Create</button>
                  </div>
            </div> 
            <AppModal v-model="dialog">
                  <div class="app-modal__body">
                        <section class="group_brand">
                              <h1>Groups</h1>
                              <form>
                                    <label for="group_name">Group Name</label>
                                    <input class="form__input" type="text" id="group_name" placeholder="Group Name" v-model="group.title">
                                    <button type="submit" @click="AddGroup"> Add groups </button>
                              </form>
                        </section>
                  </div>
            </AppModal>
            <AppModal v-model="dialog2">
                  <div class="app-modal__body">
                        <section class="group_brand">
                              <h1>Brands</h1>
                              <form>
                                    <label for="group_name">Brand Name</label>
                                    <input class="form__input" type="text" id="group_name" placeholder="Brand Name" v-model="brand.title">
                                    <button type="submit" @click="AddBrand"> Add brands </button>
                              </form>
                        </section>
                  </div>
            </AppModal>
            <AppModal v-model="dialog3">
                  <div class="modal">
                        <h3>Are You sure you want to delete ?</h3>
                        <div class="modal_act">
                              <button class="btn1" @click="dialog3 = false">Cancel</button>
                              <button class="btn2" @click="deleteGroup">Delete</button>
                        </div>
                  </div>
            </AppModal>
            <AppModal v-model="dialog4">
                  <div class="modal">
                        <h3>Are You sure you want to delete ?</h3>
                        <div class="modal_act">
                              <button class="btn1" @click="dialog4 = false">Cancel</button>
                              <button class="btn2" @click="deleteBrand">Delete</button>
                        </div>
                  </div>
            </AppModal>
      </section>
</template>

<script setup>
import http from "@/plagens/Axios";
import Notification from "@/plagens/Notification";
import AppTable from "@/ui/app-table.vue"
import AppModal from '@/ui/app-modal.vue'
import { onMounted, ref } from "vue";

let body = ref([])
let id = ref(null)
let dialog = ref(false)
let dialog2 = ref(false)
let dialog3 = ref(false)
let dialog4 = ref(false)
let body2 = ref([])
let headers = ([
    {title: "N", value: "id"},
    {title: "Name", value: "title"},
    {title: "Action", value: "action"},
])
const group = ref({
      title: ''
})
const brand = ref({
      title: ''
})
const AddG = () => {
      dialog.value = true
}
const AddB = () => {
      dialog2.value = true
}
const DeleteG = (item) => {
      if(item){
            id.value = item.id
      }else{
            id.value = null
      }
      dialog3.value = true
}
const DeleteB = (item) => {
      if(item){
            id.value = item.id
      }else{
            id.value = null
      }
      dialog3.value = true
}
const deleteGroup = (e) => {
      e.preventDefault()
      http.delete(`warehouse/group/${id.value}`).then(res => {
            console.log(res);
            Notification({text: 'Deleted Group'}, {type: 'danger'})
            setTimeout(()=>{
                  location.reload()
            },1500)
      }).catch(err => {
            console.log(err);
            Notification({text: 'Something wrong'}, {type: 'danger'})
      })
}
const deleteBrand = (e) => {
      e.preventDefault()
      http.delete(`warehouse/brand/${id.value}`).then(res => {
            console.log(res);
            Notification({text: 'Deleted Brand'}, {type: 'danger'})
            setTimeout(()=>{
                  location.reload()
            },1500)
      }).catch(err => {
            console.log(err);
            Notification({text: 'Something wrong'}, {type: 'danger'})
      })
}
const AddGroup = (e) => {
      e.preventDefault();
      
      http.post('warehouse/group/',{
            title: group.value.title
      }).then(res => {
            console.log(res);
            Notification({text: 'Added Groups'}, {type: 'success'})
            // setTimeout(()=>{
            //       location.reload()
            // },1500)
      }).catch(err => {
            console.log(err);
            Notification({text: 'Something wrong'}, {type: 'danger'})
            setTimeout(()=>{
                  location.reload()
            },1500)
      })
}
const AddBrand = (e) => {
      e.preventDefault();
      
      http.post('warehouse/brand/',{
            title: brand.value.title
      }).then(res => {
            console.log(res);
            Notification({text: 'Added Groups'}, {type: 'success'})
            // setTimeout(()=>{
            //       location.reload()
            // },1500)
      }).catch(err => {
            console.log(err);
            Notification({text: 'Something wrong'}, {type: 'danger'})
            setTimeout(()=>{
                  location.reload()
            },1500)
      })
}
const getBrand = () => {
      http.get('warehouse/group/').then(res => {
            body.value = res.data.results
      })
}
const getGroup = () => {
      http.get('warehouse/brand/').then(res => {
            body2.value = res.data.results
      })
}
onMounted(() => {
      getBrand()
      getGroup()
})
</script>

<style lang="scss" scoped>
.groups_brands {
    width: 100%;
    height: 100vh;
    padding: 10px;
    .to {
      padding: 8px 5px;
      border-radius: 5px;
      color: #fff;
      background-color: #435ebe;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      border: none;
      height: 34px;
      width: 100px;
    }
    .groups_brands__item{
      display: flex;
      .group{
            width: 50%;
            p{
                  text-align: center;
                  font-size: 23px;
                  font-weight: 500;
            }
            .btn1{
                  padding: 4px 8px;
                  border: none;
                  border-radius: 3px;
                  background-color: #ff7976;
                  color: #fff;
                  font-size: 14px;
                  cursor: pointer; 
            }
            .btn2{
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
    }
}
.app-modal__body {
    width: 100%;
    padding: 20px;
    .group_brand {
      width: 100%;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      h1 {
            font-size: 20px;
            letter-spacing: .8px;
            margin-bottom: 10px;
      }
      form {
            width: 80%;
            display: flex;
            flex-direction: column;
            label {
                  margin: 10px 0;
                  font-weight: 500;
                  font-size: 16px;
                  color: #2c2728;
            }
            .form__input {
                  height: 45px;
                  padding-left: 15px;
                  color: #272a2c;
                  background: #edf2f7;
                  width: 100%;
                  font-weight: 400;
                  font-size: 14px;
                  border-radius: 5px;
                  outline: none;
                  border: none;
            }
            button {
                  width: 100%;
                  font-weight: 400;
                  font-size: 14px;
                  border-radius: 5px;
                  outline: none;
                  border: none;
                  margin-top: 20px;
                  padding: 10px 0;
                  background-color: #435ebe;
                  color: #fff;
                  cursor: pointer;
            }
      }
    }
}
.modal {
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
       h3 {
            text-align: center;
            margin: 10px 0;
            font-size: 25px;
      }
      .modal_act{
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