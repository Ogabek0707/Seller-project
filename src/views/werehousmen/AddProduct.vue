<template>
<AppModal v-model="dialog">
       <div class="app-modal__body">
            <div class="modal">
                  <h3>Add Product</h3>
                  <form>
                        <div class="modal__form-img">
                              <img :src="product.image" alt="user" />
                              <div class="modal__form-change-img">
                                    <label for="file">Change image</label>
                                    <input type="file" ref="file" id="file" @change="handleChange($event)"/>
                              </div>
                        </div>
                            <label for="product_name">Product Name</label>
                            <input v-model="product.title" class="form__input" type="text" id="product_name" placeholder="Product Name">
                            <label for="product_code">Product code</label>
                            <input v-model="product.code" class="form__input" type="text" id="product_code" placeholder="Product code">
                            <label for="arrival_price">Arrival price</label>
                            <input v-model="product.current_arrival_price" class="form__input" type="number" id="arrival_price" placeholder="Arrival price">
                            <label for="selling_price">Selling price</label>
                            <input v-model="product.current_selling_price" class="form__input" type="number" id="selling_price" placeholder="Selling price">
                            <label for="group">Select group</label>
                            <select v-model="product.group" id="group" class="form__select">
                                <option disabled selected hidden value="">Select product group</option>
                                <option value="1">Smartphones</option>
                                <option value="2">Laptops</option>
                                <option value="3">Desktops</option>
                                <option value="4">Accessories</option>
                            </select>
                            <label for="brand">Select brand</label>
                            <select v-model="product.brand" id="brand" class="form__select" data-v-43eaa27e="">
                                <option disabled selected hidden value="">Select product brand</option>
                                <option value="1">Apple</option>
                                <option value="2">Samsung</option>
                                <option value="3">OnePlus</option>
                                <option value="4">Huawei</option>
                                <option value="5">Xiaomi</option>
                            </select>
                            <label for="desc">Description</label>
                            <textarea v-model="product.description" class="form__text" id="desc" placeholder="Description">
                            </textarea>
                            <button type="submit" @click="AddProduct"> Add Product </button>
                        </form>
                </div>
            </div>
</AppModal>
</template>

<script setup>
import http from "@/plagens/Axios"
import Notification from "@/plagens/Notification"
import AppModal from '@/ui/app-modal.vue'
import { ref, defineExpose } from "vue"

const dialog = ref(false)
const image = ref(null);
const handleChange = (event) => {
  image.value = event.target.files[0];
};
const product = ref({
      title: "",
      code: "",
      current_arrival_price: "",
      current_selling_price: "",
      group: null,
      brand: null,
      description: "",
      image: ""
})
const openModal = () => {
    dialog.value = true
}
defineExpose({openModal})
const AddProduct = (e) => {
      e.preventDefault();
      const form = new FormData();
      form.append("title", product.value.title );
      form.append("code" , product.value.code );
      form.append("current_arrival_price" , product.value.current_arrival_price );
      form.append("current_selling_price" , product.value.current_selling_price );
      form.append("group" , product.value.group );
      form.append("description" , product.value.description );
      form.append("brand" , product.value.brand );
      form.append("image" , image.value );
    http.post("warehouse/product/", form, {
       headers: {
           "content-type": "multipart/form-data",
       },
    } ).then( res => {
        if(res.status == 201){
            Notification({text: " Product added !!!"}, {type: "success"})
            window.location.reload()
        }
    }).catch(err => {
            console.log(err);
            Notification({text: " Something Wrong !!!"}, {type: "danger"})
      })
}
</script>

<style lang="scss" scoped>
.app-modal__body {
    width: 100%;
    padding: 20px;
    .modal {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h3{
            text-align: center;
            margin: 10px 0;
            font-size: 25px;
        }
        Form {
            width: 75%;
            margin: 15px 0;
            display: flex;
            flex-direction: column;   
            .modal__form-img {
                width: 100%;
                display: flex;
                justify-content: center;
                cursor: pointer;
                img {
                    width: 80px;
                    height: 80px;
                    -o-object-fit: cover;
                    object-fit: cover;
                    border-radius: 50%;
                    position: relative;
                }
                .modal__form-change-img {
                    display: block;
                    position: absolute;
                    width: 80px;
                    height: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    background-color: rgba(240,241,245,.7);
                    border-radius: 50%;
                    label {
                        text-align: center;
                        font-size: 14px;
                        cursor: pointer;
                    }
                    input {
                        opacity: 0;
                        cursor: pointer;
                    }
                }
            }
            label {
                margin: 10px 0;
                font-weight: 500;
                font-size: 16px;
                color: #2c2728;
            }
            .form__input, .form__select, .form__text {
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
            .form__text {
                padding-top: 10px;
                height: 70px;
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