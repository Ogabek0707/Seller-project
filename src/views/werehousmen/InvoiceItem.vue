<template>
      <div class="invoice">
        <div class="add">
            <div class="input_bar-info">
                <span>{{ supplier.title }}</span>
                <span>{{ status.total_sum }}</span>
            </div>
            <button type="submit" @click="Add" v-if="status.status == 'new'">Add input invoice</button>
        </div>
        <AppModal v-model="dialog">
            <div class="Modal">
                    <div class="Password__change">
                    <h1>Add product</h1>
                    <form>
                        <label for="product">Select product</label>
                        <select id="product" class="form__select" v-model="product_list.product">
                            <option disabled selected hidden value=""></option>
                            <option :value="item.id" v-for="(item,index) in product_lists" :key="index">{{ item.title }}</option>
                        </select>
                        <label for="quantity">Quantity</label>
                        <input class="form__input" type="number" id="quantity" placeholder="Quantity" v-model="product_list.quantity">
                        <label for="quantity">Price</label>
                        <input class="form__input" type="number" id="quantity" placeholder="Quantity" v-model="product_list.price">
                        <button type="submit" @click="AddItem">Add product</button>
                    </form>
                </div>
            </div>
        </AppModal>
        <AppModal v-model="dialog2">
            <div class="Modal">
                    <div class="Password__change">
                    <h1>Edit product</h1>
                    <form>
                        <label for="quantity">Quantity</label>
                        <input class="form__input" type="number" id="quantity" placeholder="Quantity" v-model="product_list2.quantity">
                        <label for="quantity">Price</label>
                        <input class="form__input" type="number" id="quantity" placeholder="Quantity" v-model="product_list2.price">
                        <button type="submit" @click="EditItem">Edit product</button>
                    </form>
                </div>
            </div>
        </AppModal>
        <AppModal v-model="dialog3">
            <div class="app-modal__body">
                <div class="modal">
                    <h3>Are you sure you want to deletes ?</h3>
                    <div class="modal_act">
                        <button class="btn1" @click="DeleteC">cancel</button>
                        <button class="btn2" @click="DeleteP">delete</button>
                    </div>
                </div>
            </div>
        </AppModal>
        <div class="product_list-table">
            <AppTable :headers="headers" :body="invoice">
            <template #body_product="{item}">
                <span class="product_lists-table-text">{{ item.product.title }}</span>
            </template>
            <template #body_code="{item}">
                <span class="product_lists-table-text">{{ item.product.code }}</span>
            </template>
            <template #body_action="{item}">
                <div class="action" v-if="status.status == 'new'">
                    <span class="edit" @click="Edit(item)"><i class="fa-solid fa-pen-to-square"></i></span>        
                    <span class="delete" @click="DeleteItem(item)"><i class="fa-solid fa-trash-can"></i></span>        
                </div>
            </template>
        </AppTable>
        <div class="pagination">
            <div class="back" v-if="status.status == 'confirmed'">
                <button @click="Back" ><i class="left fa-solid fa-left-long"> <span>Back</span></i></button>
            </div>
            <div class="actions" @click="Add" v-if="status.status == 'new'">
                <button class="btn" @click="Save">save</button>
                <button class="btn" @click="Confirm">confirm</button>
                <button class="btn" @click="Delete">delete</button>
            </div>
            <div class="Pagination">
            <VPagination v-model="params.page" :pages="params.last_page" :range-size="1" active-color="#EAF5FF" @update:modelValue="getProduct"/>
            </div>
        </div>
        </div>
      </div>
</template>

<script setup>
import http from '@/plagens/Axios'
import AppTable from '@/ui/app-table.vue'
import AppModal from '@/ui/app-modal.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import VPagination from "@hennge/vue3-pagination"
import store from '@/store'
import Notification from '@/plagens/Notification'


let invoice = ref([])
let status = ref([])
let supplier = ref([])
let product_lists = ref([])
let dialog = ref(false)
let dialog2 = ref(false)
let dialog3 = ref(false)
let confirm = ref([])
let route = useRoute()
let router = useRouter()
let id = ref(null)
let code = ref(null)
let product_list = ref({
    product: '',
    quantity: '',
    price: ''
})
let product_list2 = ref({
    quantity: '',
    price: ''
})
const params = ref({
    page: 1,
    per_page: 10,
    last_page: null,
})
const headers = ref([
    {title: "N", value: "index"},
    {title: "Product", value: "product"},
    {title: "Code", value: "code"},
    {title: "Price", value: "price"},
    {title: "Quantity", value: "quantity"},
    {title: "Invoice", value: "invoice"},
    {title: "Action", value: "action"},
])
const getProduct = () => {
    http.get('warehouse/input-invoice-item/', {
        params: {
            invoice: route.params.id,
            per_page: params.value.per_page,
            page: params.value.page,
        }
    }).then(res => {
        console.log(res);
        invoice.value = res.data.results
        invoice.value.forEach((item, index) => {
            item.index = 
            params.value.page * params.value.per_page - 
            (params.value.per_page - 1) + index;
        });
        params.value.last_page = Math.ceil(res.data.count / params.value.per_page)
    }).catch(err => {
        console.log(err);
    })
}
const Edit = (item) => {
    if(item){
        code.value = item.id
        product_list2.value.quantity = item.quantity
        product_list2.value.price = item.price
    }else{
        code.value = null
    }
    dialog2.value = true
}
const DeleteItem = (item) => {
    if(item){
        code.value = item.id
    }else{
        code.value = null
    }
    dialog3.value = true
}
const DeleteC = () => {
    dialog3.value = false
}
const DeleteP = () => {
    http.delete(`warehouse/input-invoice-item/${code.value}/`).then(res => {
        Notification({text: "Deleted Invoice Item !!!"}, {type: "danger"})
        setTimeout(()=>{
            location.reload()
        },2000)
    }).catch(err =>{
        console.log(err);
        Notification({text: "Something wrong !!!"}, {type: "danger"})
        setTimeout(()=>{
            location.reload()
        },2000)
    })
}
const Add = () => {
    id.value = route.params.id
    dialog.value = true
}
const AddItem = (e) => {
    e.preventDefault();
    http.post('warehouse/input-invoice-item/',{
        product: product_list.value.product,
        invoice: id.value,
        quantity: product_list.value.quantity,
        price: product_list.value.price
    }).then(res => {
        Notification({text: 'Invoice Item added '},{type: "success"})
        location.reload()
    }).catch(err=> {
        console.log(err);
    })
}
const EditItem = (e) => {
    e.preventDefault()
    http.put(`warehouse/input-invoice-item/${code.value}/`,{
        quantity: product_list2.value.quantity,
        price: product_list2.value.price,
    }).then(res => {
        console.log(res);
        Notification({text: 'Edit Invoice Item !!!'}, {type: 'warning'})
        setTimeout(() => {
            location.reload()
        },2000)
    }).catch(err => {
        console.log(err);
        Notification({text: 'Something wrong !!!'}, {type: 'danger'})
    })
}
const Confirm = () => {
    http.post(`warehouse/input-invoice/${route.params.id}/confirm/`).then(res => {
        console.log(res);
        Notification({text: 'Invoice Confirmed !!!'},{type: 'warning'})
        router.push({name: 'arrived'})
    }).catch(err => {
        console.log(err);
        Notification({text: 'Something wrong !!!'},{type: 'warning'})
    })
}
const Save = () => {
    router.push({name: 'arrived'})
}
const Back = () => {
    router.push({name: 'arrived'})
}
const Delete = () => {
    http.delete(`warehouse/input-invoice/${route.params.id}/`).then(res => {
        console.log(res);
    }).catch(err =>{
        console.log(err);
    })
    router.push({name: "arrived"})
    Notification({text: "Invoice item Deleted  !!!"}, {type: "danger"})
    setTimeout(() => {
        location.reload()
    }, 900)
}
const GetProduct = () => {
    http.get('warehouse/product/').then(res => {
        product_lists.value = res.data.results
        console.log(res.data.results);
    });
}
const getInvoice = () => {
    http.get(`warehouse/input-invoice/${route.params.id}`).then(res => {
        console.log(res.data);
        status.value = res.data
        supplier.value = res.data.supplier
    })
}
onMounted(()=>{
      getProduct()
      getInvoice()
      GetProduct()
})
console.log(store.state.group);
</script>

<style lang="scss" scoped>
$blue-color: #435EBE;
.invoice {
      width: 100%;
      height: 100vh;
      padding: 10px 15px;
      .Modal{
        width: 100%;
        padding: 20px;
        .Password__change {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            h1 {
                font-weight: 600;
                font-size: 30px;
                color: #272a2c;
                margin: 20px auto;
            }
            form {
                width: 70%;
                margin: 15px 0;
                display: flex;
                flex-direction: column;
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
                label {
                    margin: 10px 0;
                    font-weight: 500;
                    font-size: 16px;
                    color: #2c2728;
                }
                .form__input {
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
    .add{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .input_bar-info {
            display: flex;
            gap: 20px;
            span {
                padding: 10px 15px;
                border: 3px solid rgba(180,223,233,.4);
                border-radius: 5px;
                color: #435ebe;
                font-size: 18px;
                letter-spacing: .7px;
            }
        }
        button{
            border: none;
            border-radius: 5px;
            background-color: #435ebe;
            color: #fff;
            padding: 10px 15px;
            cursor: pointer;
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
    .product_list-table {
        width: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        overflow-x: scroll;
        .product_lists-table-text {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            color: #000;
            &:hover {
                color: $blue-color;
                font-size: 13.5px;
            }
        }
    }
    .pagination {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 0;
        .actions {
            display: flex;
            align-items: center;
            gap: 10px;
            button{
                padding: 10px 15px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            .btn:nth-child(1) {
                background-color: #57caeb;
                color: #fff;
                font-size: 17px;
            }
            .btn:nth-child(2) {
                background-color: #435ebe;
                color: #fff;
            }
            .btn:nth-child(3) {
                background-color: #ff7976;
                color: #fff;
            }
        }
    }
    .back{
        margin-top: 20px;
        button{
            width: 100px;
            padding: 10px 5px;
            border-radius: 5px;
            border: none;
            color: #fff;
            background-color: #435ebe;
            span{
                font-weight: 550;
                margin-left: 5px;
                font-size: 17px;
            }
        }
    }
}
.app-modal__body {
    padding: 20px;
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
}
</style>