<template>
      <AppModal v-model="dialog">
            <div class="Login_roles">
                  <p>Select your role</p>
                  <select v-model="role.selected_role">
                        <option disabled selected hidden value="">Select your role</option>
                        <option v-for="item in $store?.state?.me?.roles" :key="item.id" :value="item">
                              {{ item }}
                        </option>
                  </select>
                  <div class="Login_roles-action">
                        <button @click="Send">Save</button>
                  </div>
            </div>
      </AppModal>
</template>

<script setup>
import AppModal from '@/ui/app-modal.vue'
import { ref, defineExpose } from 'vue'
import store from '@/store'
import http from '@/plagens/Axios'
import { useRouter } from 'vue-router'
import Notification from '@/plagens/Notification'

const dialog = ref(false)
const router = useRouter()
const role = ref({
      selected_role:""
})
const openModal = () => {
      dialog.value = true
}
defineExpose({openModal})
const Send = () => {
      http.post('user/change-role/',{
            role: role.value.selected_role
      }).then( res => {
            if(res.status === 200){
            if(role.value.selected_role === 'warehouseman'){
                  router.push({name: "products"})
            }else if(role.value.selected_role === 'director'){
                  router.push({name: "dashboard"})
            }else if(role.value.selected_role === 'salesman'){
                  router.push({name: "salesmanNavbar"})
            }else if(role.value.selected_role === 'financier'){
                  router.push({name: "income"})
            }
            dialog.value = false
            }
      }).catch( err => {
            console.log(err);
      })
}
</script>

<style lang="scss" scoped>
$blue-color: #435ebe;
 .Login_roles {

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 30px;
      p {
            font-size: 30px;
            margin-bottom: 20px;
            word-spacing: 0.5px;
      }
      select {
            width: 100%;
            height: 35px;
            font-size: 16px;
            border-radius: 5px;
      }
      .Login_roles-action {
            width: 100%;
            margin-top: 25px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            button {
                  border: none;
                  color: #fff;
                  background-color: $blue-color;
                  padding: 12px 20px;
                  border-radius: 5px;
                  font-size: 16px;
                  cursor: pointer;
            }
      }
 }
</style>