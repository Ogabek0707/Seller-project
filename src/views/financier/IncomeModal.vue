<template>
   <div class="financier">
      <AppModal v-model="dialog">
         <div class="modal">
            <h3>Add Income</h3>
            <Form @submit="send">
                  <label for="brand">select income type</label>
                  <Field rules="required" :modelValue="forms.income_type" v-slot="{ errors }" name="Income type">
                        <select name="" id="brand" class="form__select" v-model="forms.income_type" @change="handechange($event)">
                              <option value="" disabled selected hidden>Select product brand</option>
                              <option value="from_sales">From sales</option>
                              <option value="from_outside">From outside</option>
                        </select>
                        <p class="login__input-error" v-if="errors && errors.length">
                              {{ errors[0] }}
                        </p>
                  </Field>
                  <label for="product" v-if="forms.income_type == 'from_sales'">Select sales</label>
                  <Field rules="required" :modelValue="forms.invoice" v-slot="{ errors }" name="select sales" v-if="forms.income_type == 'from_sales'">
                        <select id="product" class="form__select" v-model="forms.invoice">
                              <option value="" disabled selected hidden>Select sales</option>
                              <option :value="item.id" v-for="item in output_invoice_lists" :key="item.id">{{ item?.client?.title }}</option>
                        </select>
                        <p class="login__input-error" v-if="errors && errors.length">
                              {{ errors[0] }}
                        </p>
                  </Field>
                  <label for="desc">Amount</label>
                  <Field rules="required" :modelValue="forms.amount" v-slot="{errors}" name="Amount">
                        <input type="number" class="form__input" id="product_name" placeholder="Amount" v-model="forms.amount">
                        <p class="login__input-error" v-if="errors && errors.length">
                              {{ errors[0] }}
                        </p>
                  </Field>
                  <button type="submit">Add income</button>
            </Form>
         </div>
      </AppModal>
   </div>
</template>
<script setup>
import { ref, defineExpose, watch } from "vue";
import { Field, Form } from "vee-validate"
import AppModal from '@/ui/app-modal.vue'
import Notification from "@/plagens/Notification";
import http from "@/plagens/Axios";
import { useRouter } from "vue-router";

let router = useRouter()
let dialog = ref(false)
let output_invoice_lists = ref([])
let forms = ref({
      income_type: "",
      amount: "",
      invoice: null,
      title: ''
})
const openModal = (item) => {
      dialog.value = true
      forms.value.tittle = item
}
const handechange = (event) =>{
      console.log(event.target.value, 'type');
      if(event.target.value === 'form_sales'){
            forms.value.title = 'from_sales'
      }else{
            forms.value.title ='from_outside'
      }
}
watch(dialog, (value) => {
      if(!value) {
            forms.value.income_type = ""
            forms.value.amount = ""
            forms.value.invoice = null
            forms.value.title = false
      }
})

async function send(event) {
      try {
            await http.post('finance/income/', {
                  income_type: forms.value.income_type,
                  amount: forms.value.amount,
                  invoice: forms.value.invoice,
            }).then(res => {
                  if(res.status === 201){
                        location.reload()
                  }
            })
            dialog.value = false
            Notification({text: "Income added !!!"}, {type: 'success'})
      } catch(err) {
            console.log(err);
                  Notification({text: "Something wrong !!!"}, {type: 'danger'})
      }
}
async function getInvoiceOutput() {
      try {
            await http.get('warehouse/output-invoice').then(res => {
                  output_invoice_lists.value = res.data.results
                  console.log(res.data.results);
            })
      } catch(err) {
            console.log(err);
      }
}
getInvoiceOutput()
defineExpose({openModal})
</script>

<style lang="scss" scoped>
p{
      color: red;
      margin: 10px;
}
.financier {
      width: 100%;
      height: 100vh;
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
                  .form__select {
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
                  .form__input{
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
      }
}
</style>