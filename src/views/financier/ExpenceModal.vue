<template>
   <div class="financier">
      <AppModal v-model="dialog">
         <div class="modal">
            <h3>Add Expense</h3>
            <Form @submit="send">
                  <label for="product"  v-if="forms.returned_invoice == ''">Select invoice</label>
                  <Field rules="required" :modelValue="forms.invoice" v-slot="{ errors }" name="Select invoice" v-if="forms.returned_invoice == ''">
                        <select id="product" class="form__select" v-model="forms.invoice">
                              <option value="" disabled selected hidden></option>
                              <option :value="item.id" v-for="item in invoice_supplier" :key="item.id">{{ item?.title }}</option>
                        </select>
                        <p class="login__input-error" v-if="errors && errors.length">
                              {{ errors[0] }}
                        </p>
                  </Field>
                  <label for="product"  v-if="forms.invoice == ''">Select returned invoice</label>
                  <Field rules="required" :modelValue="forms.returned_invoice" v-slot="{ errors }" name="Select returned invoice" v-if="forms.invoice == ''">
                        <select id="product" class="form__select" v-model="forms.returned">
                              <option value="" disabled selected hidden></option>
                              <option :value="item.id" v-for="item in output_invoice_lists" :key="item.id">{{ item?.client?.title }}</option>
                        </select>
                        <p class="login__input-error" v-if="errors && errors.length">
                              {{ errors[0] }}
                        </p>
                  </Field>
                  <label for="product" >Amount</label>
                  <Field rules="required" :modelValue="forms.amount" v-slot="{ errors }" name="Amount">
                        <input type="number" class="form__input" id="product_name" placeholder="Amount" v-model="forms.amount">
                        <p class="login__input-error" v-if="errors && errors.length">
                              {{ errors[0] }}
                        </p>
                  </Field>
                  <label for="desc">Description</label>
                  <Field rules="required" :modelValue="forms.description" v-slot="{errors}" name="Description">
                        <input type="text" class="form__input" id="product_name" placeholder="Description" v-model="forms.description">
                        <p class="login__input-error" v-if="errors && errors.length">
                              {{ errors[0] }}
                        </p>
                  </Field>
                  <button type="submit">Add Expense</button>
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
let invoice_supplier = ref([])
let forms = ref({
      amount: "",
      invoice: '',
      returned_invoice: '',
      description: ''
})
const openModal = (item) => {
      dialog.value = true
      forms.value.tittle = item
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
            await http.post('finance/expense/', {
                  returned_invoice: forms.value.returned_invoice,
                  amount: forms.value.amount,
                  invoice: forms.value.invoice,
                  description: forms.value.description
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
            await http.get('warehouse/output-invoice/').then(res => {
                  output_invoice_lists.value = res.data.results
            })
      } catch(err) {
            console.log(err);
      }
}
async function getInvoiceSupplier() {
      try {
            await http.get('warehouse/supplier/').then(res => {
                  invoice_supplier.value = res.data.results
                  console.log(res.data.results);
            })
      } catch(err) {
            console.log(err);
      }
}
getInvoiceOutput()
getInvoiceSupplier()
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