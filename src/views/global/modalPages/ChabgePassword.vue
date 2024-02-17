<template>
      <AppModal v-model="dialog">
         <div class="app-modal__body">
            <div class="Password">
                  <div class="Password__change">
                        <h1>Change password</h1>
                        <form>
                              <label for="old_password">Old password</label>
                              <div class="Login__form-input">
                                    <input :type="showPassword ? 'text' : 'password'" id="password" v-model="form.old_password" placeholder="Old password">
                                    <img :src="eye" @click="ChangePassword" :class="showPassword ? 'Login_hide' : 'Login_show'" alt="eye">
                                    <img :src="hide" @click="ChangePassword" :class="showPassword ? 'Login_show' : 'Login_hide'" alt="hide">
                              </div>
                              <label for="new_password">New password</label>
                              <div class="Login__form-input" >
                                    <input :type="showPassword1 ? 'text' : 'password'" id="password" v-model="form.new_password" placeholder="New password">
                                    <img :src="eye" @click="ChangePassword1" :class="showPassword1 ? 'Login_hide' : 'Login_show'" alt="eye">
                                    <img :src="hide" @click="ChangePassword1" :class="showPassword1 ? 'Login_show' : 'Login_hide'" alt="hide">
                              </div>
                              <label for="confirm_new_password">Confirm new password</label>
                              <div class="Login__form-input">
                                    <input :type="showPassword2 ? 'text' : 'password'" id="password" v-model="form.new_password_confirm" placeholder="Confirm new password">
                                    <img :src="eye" @click="ChangePassword2" :class="showPassword2 ? 'Login_hide' : 'Login_show'" alt="eye">
                                    <img :src="hide" @click="ChangePassword2" :class="showPassword2 ? 'Login_show' : 'Login_hide'" alt="hide">
                              </div>
                              <button type="submit" @click="Save">Change</button>
                        </form>
                  </div>
            </div>
        </div>
      </AppModal>
</template>

<script setup>
import { ref, defineExpose } from 'vue'
import AppModal from '@/ui/app-modal.vue'
import eye from '@/assets/images/eye.svg'
import hide from '@/assets/images/hide.svg'
import http from '@/plagens/Axios'
import Notification from '@/plagens/Notification'


const dialog = ref(false)
const showPassword = ref(false);
const showPassword1 = ref(false);
const showPassword2 = ref(false);
const ChangePassword = () => {
      showPassword.value = !showPassword.value
}; 
const ChangePassword1 = () => {
      showPassword1.value = !showPassword1.value
}; 
const ChangePassword2 = () => {
      showPassword2.value = !showPassword2.value
}; 
const form = ref({
  old_password: "",
  new_password: "",
  new_password_confirm: ""
})
const Save = () => {
      http.post("user/change-password/", {
            old_password: form.value.old_password,
            new_password: form.value.new_password,
            new_password_confirm: form.value.new_password_confirm 
      }).then(res => {
            if(res.status === 200){
                  Notification({text: "Everything is okay !!! "}, {type: "success"})
            }
      }).catch(err => {
            console.log(err);
            Notification({text: "Something Wrong !!! "}, {type: "danger"})
      })
}
const openModal = () => {
      dialog.value = true
}
defineExpose({openModal});
</script>

<style lang="scss" scoped>
$input_bg: #edf2f7;
.app-modal__body{
    width: 100%;
    padding: 20px;
    .Password {
      padding: 20px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .Password__change {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            h1 {
                  font-weight: 600;
                  font-size: 30px;
                  color: #272a2c;
                  margin: 20px auto;
            }
            Form {
                  width: 100%;
                  margin: 30px 0;
                  display: flex;
                  flex-direction: column;
                  label {
                        margin: 10px 0;
                        font-weight: 500;
                        font-size: 16px;
                        color: #2c2728;
                  }
                  .Login__form-input {
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
                              margin-right: 5px;
                              border: none;
                        }
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
      }
    }
}
</style>