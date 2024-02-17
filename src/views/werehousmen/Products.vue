<template>
    <div class="product_list">
        <AddProduct ref="add_product"/>
        <!-- <productModal ref="product_list"/> -->
        <div class="product_lists-action">
            <router-link to="/group-brand" class="btn">
            <span>Groups and Brands</span>
            <i class="right fa-solid fa-right-long"></i>
            </router-link>
            <button @click="openModal" v-if="role !== 'director'" class="btn">Add Product</button>
        </div>
        <div class="product_list-table">
            <AppTable :headers="headers" :body="product_lists">
                <template #body_group="{ item }">
                        <span>{{ item.group.title }}</span>
                </template>
                <template #body_brand="{ item }">
                        <span>{{ item.brand.title }}</span>
                </template>
                <template #body_description="{ item }">
                        <span class="product_lists-table-text">{{ item.description }}</span>
                 </template>
                <template #body_title="{ item }">
                        <router-link :to="{ name: 'single_product', params: { id: item.id } }" class="product_lists-table-text">{{ item.title }}</router-link>
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
import http from "@/plagens/Axios";
import VPagination from "@hennge/vue3-pagination"
import AddProduct from "./AddProduct.vue";

const product_lists = ref([])
const dialog = ref(false)
const add_product = ref('')
let role = localStorage.getItem("role")
const params = ref({
    page: 1,
    per_page: 10,
    last_page: null,
})
const openModal = () => {
    add_product.value.openModal()
}
const headers = ref([
    {title: "N", value: "index"},
    {title: "Name", value: "title"},
    {title: "Code", value: "code"},
    {title: "Brand", value: "brand"},
    {title: "Group", value: "group"},
    {title: "Arrival price", value: "current_arrival_price"},
    {title: "Selling price", value: "current_selling_price"},
    {title: "Description", value: "description"},
])
const getProduct = () => {
    http.get('warehouse/product/', {
        params: {
            per_page: params.value.per_page,
            page: params.value.page,
        }
    }).then(res => {
        product_lists.value = res.data.results
        product_lists.value.forEach((item, index) => {
            item.index = 
            params.value.page * params.value.per_page - 
            (params.value.per_page - 1) + index;
        });
        params.value.last_page = Math.ceil(res.data.count / params.value.per_page)
    })
}
onMounted(() => {
    getProduct()
});
</script>

<style lang="scss" scoped>
$blue-color: #435EBE;
.product_list {
    width: 100%;
    height: 100vh;
    .product_lists-action {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 15px;
        gap: 15px;
        .btn {
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            background-color: $blue-color;
            cursor: pointer;
            display: flex;
            color: white;
            gap: 8px;
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
        width: 100%;
        display: flex;
        flex-direction: column;
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
        width: 98%;
        display: flex;
        align-items: center;
        justify-content: end;
        margin: 10px 0px;
    }
}
</style>