<template>
  <div class="profile">
    <UpdateUser ref="update_user" />
    <ChangeRole ref="change_role" />
    <ChangePassword ref="change_password"/>
    <div class="profile__items">
      <div class="profile__item1">
        <div class="profile__item1-img">
          <img :src="$store?.state?.me?.image" alt="" />
        </div>
        <p>
          {{ $store?.state?.me?.first_name }} {{ $store?.state?.me?.last_name }}
        </p>
        <button
          class="profile__item1-edit"
          @click="openModalEdit($store?.state?.me)"
        >
          Edit profile
        </button>
      </div>
      <div class="profile__item2">
        <p>
          <span>Phone number</span>
          <i class="fa-solid fa-right-long"></i>
          <span> {{ $store?.state?.me?.phone_number }}</span>
        </p>
        <p>
          <span>Email</span>
          <i class="fa-solid fa-right-long"></i>
          <span> {{ $store?.state?.me?.email }}</span>
        </p>
        <p>
          <span>Username</span>
          <i class="fa-solid fa-right-long"></i>
          <span> {{ $store?.state?.me?.username }}</span>
        </p>
        <p>
          <span>Roles</span>
          <i class="fa-solid fa-right-long"></i>
          <span v-for="item in $store?.state?.me?.roles" :key="item">
            {{ item }}</span
          >
        </p>
        <p>
          <span>Current role</span>
          <i class="fa-solid fa-right-long"></i>
          <span> {{ $store?.state?.me?.current_role }}</span>
          <button
            class="profile__item-change_role"
            @click="openModalCHangeRole"
          >
            change
          </button>
        </p>
        <button class="profile__item2-change-p" @click="openModalPassword">
          Change password
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import UpdateUser from "./modalPages/UpdateUser.vue"
import ChangeRole from "./modalPages/ChangeRole.vue"
import ChangePassword from "./modalPages/ChabgePassword.vue"
import { ref } from "vue";

const update_user = ref('');
const change_role = ref('');
const change_password = ref('');

const openModalEdit = (value) => {
    update_user.value.openModal(value)
};
const openModalCHangeRole = () => {
    change_role.value.openModal()
};
const openModalPassword = () => {
    change_password.value.openModal()
};
</script>

<style lang="scss" scoped>
$white-color: #fff;
$blue-color: #435ebe;
$green-color: #e7e732;
.profile {
  padding: 10px;
  margin: 10px;
  .profile__modal {
    h3 {
      font-size: 23px;
      margin: 15px 0px;
      font-weight: 500;
      text-align: center;
    }
  }
  .profile__back {
    width: 100px;
    margin-top: 15px;
    border: none;
    background-color: $blue-color;
    color: $white-color;
    padding: 10px 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    cursor: pointer;
    i {
      transition: all 0.3s linear;
    }
    &:hover i {
      transform: translateX(-5px);
    }
  }
  .profile__items {
    width: 100%;
    height: 100%;
    background-color: $white-color;
    margin-top: 25px;
    border-radius: 10px;
    padding: 50px 15px;
    display: flex;
    gap: 40px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    .profile__item1 {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      p {
        font-size: 22px;
        font-weight: 500;
      }
      .profile__item1-img {
        width: 240px;
        height: 240px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      }
      .profile__item1-edit {
        width: 100%;
        padding: 10px 0px;
        border: none;
        background-color: $blue-color;
        color: $white-color;
        border-radius: 5px;
        font-size: 17px;
        cursor: pointer;
      }
    }
    .profile__item2 {
      width: 300px;
      p {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        font-size: 18px;
        padding: 5px 0px;
        font-weight: 500;
        i {
          font-size: 14px;
          transition: all 0.3s linear;
        }
        &:hover i {
          transform: translateX(5px);
          color: $blue-color;
        }
        .profile__item-change_role {
          padding: 5px 10px;
          border: none;
          background-color: $blue-color;
          color: $white-color;
          font-size: 16px;
          border-radius: 5px;
          cursor: pointer;
        }
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .profile__item2-change-p {
        margin-top: 20px;
        width: 100%;
        padding: 10px 0px;
        background-color: $green-color;
        color: #000;
        border-radius: 5px;
        border: none;
        font-size: 17px;
        cursor: pointer;
      }
    }
    .profile__items-action {
      margin-top: 30px;
    }
  }
}
</style>
