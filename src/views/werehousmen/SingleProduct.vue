<template>
<section class="single_product">
      <img alt="product" :src="single_product.image">
      <div>
            <p class="single_product-name">{{ single_product.title }}</p>
            <div class="single_product-features">
                  <p>
                        <span>Group: </span>
                        <span>{{ single_product_group.title }}</span>
                  </p>
                  <p>
                        <span>Brand: </span>
                        <span>{{ single_product_brand.title }}</span>
                  </p>
                  <p>
                        <span>Price: </span>
                        <span>{{ single_product.current_selling_price }}</span>
                  </p>
                  <p>
                        <span>Code: </span>
                        <span>{{ single_product.code }}</span>
                  </p>
                  <p>
                        <span>Description</span>
                  </p>
                        <h5>{{ single_product.description }}</h5>
            </div>
            <div class="single_product-act">
                  <button @click="ProductEdit(single_product)">Edit</button>
                  <button @click="ProductDelete">Delete</button>
            </div>
<AppModal v-model="dialog">
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
      </div>

<AppModal v-model="dialog2">
       <div class="app-modal_body">
            <div class="modal">
                  <h3>Edit Product</h3>
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
                            <select v-model="product.brand" id="brand" class="form__select">
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
                            <button type="submit" @click="AddProduct"> Edit Product </button>
                        </form>
                </div>
            </div>
</AppModal>
</section>
</template>

<script setup>
import http from "@/plagens/Axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import AppModal from '@/ui/app-modal.vue'
import Notification from "@/plagens/Notification";

const route = useRoute()
const router = useRouter()
const dialog = ref(false)
const dialog2 = ref(false)
const single_product = ref([])
const single_product_group = ref([])
const single_product_brand = ref([])
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
const ProductDelete = () => {
      dialog.value = true
}
const ProductEdit = (item) => {
      dialog2.value = true
      product.value = {...item}
}
const getSingleProduct = () => {
      http.get(`warehouse/product/${route.params.id}`).then( res => {
            single_product.value = res.data
            single_product_group.value = res.data.group
            single_product_brand.value = res.data.brand
            console.log(res.data);
      })
}
onMounted( () => {
      getSingleProduct()
});



const DeleteC = () => {
      dialog.value = false
}
const DeleteP = () => {
      http.delete(`warehouse/product/${route.params.id}`).then(res => {
          console.log(res);
          router.push({name: "products"})
          Notification({text: "Deleted Product!!! "}, {type: "danger"})
      }).catch(err => {
            console.log(err);
      })
}




const image = ref(null);
const handleChange = (event) => {
  image.value = event.target.files[0];
};
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
    http.put(`warehouse/product/${single_product.value.id}/`, form, {
       headers: {
           "content-type": "multipart/form-data",
       },
    } ).then( res => {
            Notification({text: " Edit Product !!!"}, {type: "success"})
            window.location.reload()
    }).catch(err => {
            console.log(err);
            Notification({text: " Something Wrong !!!"}, {type: "danger"})
      })
}
 </script>

<style lang="scss" scoped>
.single_product {
    width: 100%;
    padding: 30px;
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 25px;
    img {
            width: 500px;
            height: 500px;
            border-radius: 15px;
    }
    .single_product-name {
            font-size: 30px;
            letter-spacing: 1px;
     }
     .single_product-features {
            margin-top: 30px;
            p {
                  font-size: 18px;
                  margin: 12px 0;
                  span:first-child {
                        color: #435ebe;
                  }
                  span:nth-child(2) {
                        color: #4c4c4c;
                  }
            }
            h5 {
                  font-weight: 400;
                  font-size: 15px;
                  color: #656565;
                  letter-spacing: .8px;
            }
      }
      .single_product-act {
            display: grid;
            grid-template-columns: auto auto;
            grid-template-rows: 40px 40px;
            gap: 10px;
            margin-top: 60px;
            button {
                  border: none;
                  border-radius: 5px;
                  color: #fff;
                  font-size: 18px;
                  cursor: pointer;
                  letter-spacing: .8px;
            }
            button:first-child {
                  background-color: #435ebe;
            }
            button:nth-child(2) {
                  background-color: #ff7976;
            }
      }
}
@media (max-width: 830px){
      .single_product {
            flex-wrap: wrap;
      }
}



.app-modal__body {
    width: 100%;
    padding: 10px;
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



.app-modal_body {
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