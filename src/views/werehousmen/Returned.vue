<template>
      <div class="product_list">
        <AppModal v-model="dialog">
            <div class="app-modal__body">
                <div class="input_output">
                    <h1>Add Product</h1>
                    <form>
                        <label for="returned">Select client</label>
                        <select v-model="returned_invoice.client">
                            <option :value="item.id" v-for="(item,index) in $store.state.client" :key="index" >{{ item.title   }}</option>
                        </select>
                        <label for="description">Description</label>
                        <textarea v-model="returned_invoice.description" class="form__text" id="desc" placeholder="Description"></textarea>
                        <button type="submit" @click="Add_Returned"> Add Returned invoice </button>
                    </form>
                </div>
            </div>
        </AppModal>
        <AppModal v-model="dialog2">
            <div class="app-modal__body">
                <div class="input_output">
                    <h1>Edit output invoice</h1>
                    <form>
                        <label for="description">Description</label>
                        <textarea class="form__text" id="desc" placeholder="Description" v-model="returned_invoice2.description">
                        </textarea>
                        <button type="submit" @click="EditReturned"> Edit output invoice </button>
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
        <div class="product_lists-action">
            <button class="btn" @click="AddReturned"  v-if="role !== 'director'">Add return Invoice</button>
        </div>
        <div class="product_list-table">
            <AppTable :headers="headers" :body="returned">
                <template #body_client="{ item }">
                        <router-link :to="{ name: 'returnedItem', params: { id: item.id } }" class="product_lists-table-text">{{ item.client.title }}</router-link>
                </template>
                <template #body_address="{ item }">
                        <span>{{ item.client.address }}</span>
                </template>
                  <template #body_phone_number="{ item }">
                        <span>{{ item.client.phone_number }}</span>
                  </template>
                  <template #body_action="{item}">
                      <div class="action">
                        <span class="eye" @click="Eye(item.id)"><i class="fa-solid fa-eye"></i></span>        
                        <span class="edit" v-if="item.status == 'new'" @click="Edit(item)"><i class="fa-solid fa-pen-to-square"></i></span>        
                        <span class="delete" v-if="item.status == 'new'" @click="DeleteReturned(item.id)"><i class="fa-solid fa-trash-can"></i></span>        
                      </div>
                  </template>
            </AppTable>
            <div class="pagination">
                <VPagination v-model="params.page" :pages="params.last_page" :range-size="1" active-color="#EAF5FF" @update:modelValue="getProduct"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AppTable from '@/ui/app-table.vue'
import AppModal from '@/ui/app-modal.vue'
import http from "@/plagens/Axios";
import VPagination from "@hennge/vue3-pagination"
import { useRouter } from "vue-router";
import store from "@/store";
import Notification from "@/plagens/Notification";

const returned = ref([])
const dialog = ref(false)
const dialog2 = ref(false)
const id = ref(null)
const dialog3 = ref(false)
const router = useRouter()
let role = localStorage.getItem("role")

const params = ref({
    page: 1,
    per_page: 10,
    last_page: null,
})
const returned_invoice = ref({
    client: null,
    description: "",
})
const returned_invoice2 = ref({
    client: null,
    description: "",
})
const AddReturned = () => {
    dialog.value = true
}
const Eye = (id) => {
    router.push({name: "returnedItem", params: {id: id}})
} 
const Edit = (item) => {
    if(item){
        returned_invoice2.value.description = item.description
        id.value = item.id
    }else{
        id.value = null
    }
    dialog2.value = true
} 
const DeleteReturned= (item) => {
    if(item){
        id.value = item
    }else{
        id.value = null
    }
    dialog3.value = true
}
const DeleteC = (item) => {
    dialog3.value = false
} 
const headers = ref([
    {title: "N", value: "index"},
    {title: "Client", value: "client"},
    {title: "Total Sum", value: "total_sum"},
    {title: "Address", value: "address"},
    {title: "Phone", value: "phone_number"},
    {title: "Status", value: "status"},
    {title: "Description", value: "description"},
    {title: "Action", value: "action"},
])
const EditReturned = (e) => {
    e.preventDefault()
    http.put(`warehouse/returned-invoice/${id.value}/`,{
        description: returned_invoice2.value.description,
    }).then(res => {
        console.log(res);
        Notification({text: 'Updated Returned Invoice !!!'},{type: 'warning'})
        setTimeout(() => {
            location.reload()
        },1000)
    }).catch(err => {
        console.log(err);
        Notification({text: 'Something wrong !!!'},{type: 'danger'})
    })
}
const DeleteP = (e) => {
    e.preventDefault()
    http.delete(`warehouse/returned-invoice/${id.value}/`).then(res => {
        console.log(res);
        Notification({text: 'Deleted Returned Invoice !!!'},{type: 'danger'})
        setTimeout(() => {
            location.reload()
        },1000)
    }).catch(err => {
        console.log(err);
        Notification({text: 'Something wrong !!!'},{type: 'danger'})
    })
} 

const getProduct = () => {
    http.get('warehouse/returned-invoice/', {
        params: {
            per_page: params.value.per_page,
            page: params.value.page,
        }
    }).then(res => {
        console.log(res.data);
        returned.value = res.data.results
        returned.value.forEach((item, index) => {
            item.index = 
            params.value.page * params.value.per_page - 
            (params.value.per_page - 1) + index;
        });
        params.value.last_page = Math.ceil(res.data.count / params.value.per_page)
    })
}
const Add_Returned = (e) => {
    e.preventDefault();
    http.post('warehouse/returned-invoice/', {
        client: returned_invoice.value.client,
        description: returned_invoice.value.description,
    }).then(res => {
        console.log(res);
        Notification({text: "Added Output !!!"}, {type: "success"})
        router.push({name: "returnedItem", params: {id: res.data.id}})
    }).catch( err => {
        console.log(err)
        Notification({text: "Something wrong !!!"}, {type: "danger"})
    })
}
onMounted(() => {
    getProduct()
    store.dispatch('getClient')
});
</script>

<style lang="scss" scoped>
$blue-color: #435EBE;
.product_list {
    height: 100vh;
    .product_lists-action {
        width: 100%;
        display: flex;
        justify-content: end;
        padding: 15px;
        .btn {
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            background-color: $blue-color;
            cursor: pointer;
            display: flex;
            color: white;
            align-items: center;
            &:hover .right {
                transform: translateX(5px);
            }
            .right {
                font-size: 14px;
                transition: all 0.3s linear;
            }
        }
    }
    .product_list-table {
        width: 97%;
        display: flex;
        margin: -13px 0 0 15px;
        flex-direction: column;
        border-radius: 10px;
        overflow-x: scroll;
                .action{
            display: flex;
            justify-content: center;
            gap: 12px;
            .eye{
                    color: #435ebe;
                    cursor: pointer;
                    i{
                        font-size: 18px;
                    }
            }
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
        width: 98%;
        display: flex;
        align-items: center;
        justify-content: end;
        margin: 10px 0px;
    }
}





.app-modal__body {
    padding: 20px;
        h3{
        font-size: 30px;
        text-align: center;
        letter-spacing: 1px;
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
    .input_output {
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        h1 {
            text-align: center;
        }
        Form {
            width: 80%;
            display: flex;
            flex-direction: column;
            label {
                margin: 10px 0;
                font-weight: 500;
                font-size: 16px;
                color: #2c2728;
            }
            select {
                width: 100%;
                height: 35px;
                font-size: 16px;
                border-radius: 5px;
            }
            .form__text {
                padding: 10px;
                height: 70px;
                border: 1px solid #363636;
            }
            button {
                margin-top: 20px;
                padding: 10px 0;
                background-color: #435ebe;
                color: #fff;
                cursor: pointer;
                border: none;
                border-radius: 5px;
            }
        }
    }
}
</style>