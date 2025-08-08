<template>
      <div class="Login">
            <AppModal v-model="dialog" :width="''">
                  <div class="Login_roles">
                        <p>Select your role</p>
                        <select v-model="role.selected_role">
                              <option selected disabled hidden value="">Select your role</option>
                              <option v-for="item in role.roles" :key="item.id" :value="item">
                                    {{ item }}
                              </option>
                        </select>
                        <div class="Login_roles-action">
                              <button @click="Login_With_Role">Save</button>
                        </div>
                  </div>
            </AppModal>
            <div class="Login_item">
                  <h1>System entrance</h1>
                  <Form @submit="Login">
                        <label for="login">Username</label>
                        <Field rules="required" :modelValue="form.username" v-slot="{ errors  }" name="Username">
                              <input type="text" v-model="form.username" id="login" placeholder="Username">
                              <p class="login_input-error" v-if="errors && errors.length">
                                    {{ errors[0] }}
                              </p>
                        </Field>
                        <label for="password">Password</label>
                        <Field rules="required" :modelValue="form.password" v-slot="{ errors  }" name="Password">
                              <div class="Login_form-input">
                                    <input :type="showPassword ? 'text' : 'password'" id="password" v-model="form.password" placeholder="Password">
                                    <img :src="eye" @click="ChangePassword" :class="showPassword ? 'Login_hide' : 'Login_show'" alt="eye">
                                    <img :src="hide" @click="ChangePassword" :class="showPassword ? 'Login_show' : 'Login_hide'" alt="hide">
                              </div>
                              <p class="login_input-error" v-if="errors && errors.length">
                                    {{ errors[0] }}
                              </p>
                        </Field>
                        <button type="submit">ENTER</button>
                  </Form>
            </div>
      </div>
</template>

<script setup>

import { Field, Form } from "vee-validate"
import { ref } from "vue"
import { useRouter } from "vue-router"
import AppModal from '@/ui/app-modal.vue'
import Notification from '@/plagens/Notification'
import https from "@/plagens/Axios"
import eye from '@/assets/images/eye.svg'
import hide from '@/assets/images/hide.svg'

const router = useRouter()
const showPassword = ref(false);
const dialog = ref(false)
const form = ref({
      username: "",
      password: ""
})
const role = ref({
      roles: [],
      selected_role: ""
})
const ChangePassword = () => {
      showPassword.value = !showPassword.value
}; 
const Login = () => {
      https.post("user/token/",{
            username: form.value.username,
            password: form.value.password
      }).then(res => {
            console.log(res);
            setTimeout(() => {
                  Notification({text: "Network Error !!!"}, {type: "danger"})
            }, 1500);
      }).catch(err => {
            if(err.response.data.roles){
                  Notification({text: "Select your role !!!"}, {type: "success"})
                  role.value.roles = err.response.data.roles
                  dialog.value = true
            }else{
                  Notification({text: "You have a mistake !!!"}, {type: "danger"})
            }
            console.log(err);
      })
      // router.push({name: 'products'})
};
const Login_With_Role = () => {
      https.post("user/token/", {
            username: form.value.username,
            password: form.value.password,
            current_role: role.value.selected_role
      }).then(res => {
            if(res.data.access){
                  localStorage.setItem('token', res.data.access)
                  localStorage.setItem('role', res.data.current_role)
                  if(res.data.current_role === 'warehouseman'){
                        router.push({name: 'products'})
                  }else if(res.data.current_role === 'director'){
                        router.push({name: "dashboard"})
                  }else if(res.data.current_role === 'salesman'){
                        router.push({name: "salesmanNavbar"})
                  }else if(res.data.current_role === 'financier'){
                        router.push({name: "income"})
                  }
                  dialog.value = false
            }
      }).catch( err => {
            console.log(err);
      })
};
</script>

<style lang="scss" scoped>
$blue-color: #435ebe;
$input_bg: #edf2f7;
.Login {
      width: 100%;
      background-color: #f3f7f9;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      .Login_roles {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            p {
                  font-size: 30px;
                  margin-bottom: 20px;
                  word-spacing: 0,5px;
            }
            select {
                  width: 90%;
                  height: 35px;
                  font-size: 16px;
                  border-radius: 5px;
            }
        .Login_roles-action {
            width: 100%;
            display: flex;
            margin-top: -15px;
            margin-right: 25px;
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
      .Login_item {
            max-width: 60%;
            background: #fff;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px 0px;
            h1 {
                  font-weight: 600;
                  font-size: 30px;
                  color: #272a2c;
                  margin: 20px auto;
            }
           Form {
            width: 60%;
            margin: 50px 0px;
            display: flex;
            flex-direction: column;
            .Login_form-input {
                  width: 100%;
                  display: flex;
                  align-items: center;
                  background-color: $input_bg;
                  img {
                        width: 20px;
                        background: transparent;
                  }
                  %input_act {
                  cursor: pointer;
                  background-color: transparent;
                  margin-right: 10px;

                  }
                  .Login_show {
                        @extend %input_act;
                        display: block;
                  }
                  .Login_hide {
                        @extend %input_act;
                        display: none;
                  }
            }
      }
      }
      input {
            width: 100%;
            font-weight: 400;
            font-size: 14px;
            height: 45px;
            padding-left: 15px;
            color: #272a2c;
            background: $input_bg;
            border-radius: 5px;
            outline: none;
            margin-right: 5px;
            border: none;
      }
      .login_input-error{
            margin-top: 5px;
            color: red;
            font-size: 15px;
            font-weight: 500;
      }
      label {
            margin: 10px 0px;
            font-weight: 500;
            font-size: 16px;
            color: #2c272B;
      }
      button {
            margin-top: 40px;
            border: none;
            padding: 10px 0px;
            color: #fff;
            font-size: 16px;
            background-color: $blue-color;
            border-radius: 5px;
            cursor: pointer;
      }
      @media (min-width: 576px) {
            .Login_item {
                  width: 80%;
                  Form {
                        width: 80%;
                  }
            }
      }
      @media (max-width: 576px) {
            .Login_item {
                  width: 100%;
                  Form {
                        width: 90%;
                  }
            }
      }
}

</style>