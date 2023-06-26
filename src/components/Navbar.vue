<script setup>
import { useAccessStore } from "../stores/userStore";
import { ref } from "vue";
import { useRouter } from "vue-router";
import CloudImage from "../components/CloudImage.vue";
import socket from "../lib/socket";
import clientServices from "./../services/ClienteService"

const store = useAccessStore();
const router = useRouter();
const checkImage = store.user.image?.split('/').length
const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
const handleLogOut = async () => {
  store.logOut();
  await clientServices.logout(store.user)
  router.push({ name: "landing" });
  socket.emit('logout', store.user)
};

</script>

<template>
  <nav class="bg-gray-900 w-full fixed top-0 --container--">
    <div class="max-w-screen-xl mx-auto p-3 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <router-link
          :to="{ name: 'home' }"
        ><img src="../assets/img/icon.svg" alt="HenryMoon Logo" class="h-16" /></router-link>
      </div>
      <ul
        :class="menuOpen ? 'block' : 'hidden'"
        class="md:flex md:flex-row md:w-auto md:items-center md:space-y-0 md:space-x-4 items-center text-center space-y-2 text-white text-xl flex flex-col justify-center"
      >
        <li class="flex items-center" v-if="store.admin">
          <router-link
            :to="{ name: 'admin' }"
            class="md:mx-2 text-white hover:text-yellow-300 cursor-pointer"
            >Admin Dash</router-link
          >
        </li>
        <li class="flex items-center">
          <router-link
            :to="{ name: 'profile' }"
            class="md:mx-2 text-white hover:text-yellow-300 cursor-pointer"
          >
          <img :src="store.user.image" alt="" v-if="checkImage >2"               class="w-16 h-16 border border-yellow-400 rounded-full object-cover ">
            <CloudImage
              :image-name="store.user.image"
              :key="store.user.image"
              v-else
              class="w-16 h-16 border border-yellow-400 rounded-full object-cover "
          /></router-link>
        </li>
        <li class="text-center">
          <router-link
            :to="{ name: 'home' }"
            class="text-white hover:text-yellow-300 cursor-pointer"
            >Home</router-link
          >
        </li>
        <li class="text-center">
          <router-link
            :to="{ name: 'about' }"
            class="text-white hover:text-yellow-300 cursor-pointer"
            >About</router-link
          >
        </li>
        <li class="flex items-center">
          <router-link
            :to="{ name: 'donation' }"
            class="md:mx-2 text-white hover:text-yellow-300 cursor-pointer"
            >Donation</router-link
          >
        </li>
        <!-- <li class="flex items-center">
          <router-link
            :to="{ name: 'home' }"
            class="md:mx-2 text-white hover:text-yellow-300 cursor-pointer"
            >My favorites</router-link
          >
        </li> -->
        <li class="text-center">
          <button
            @click="handleLogOut"
            class="text-white hover:text-yellow-300 cursor-pointer"
          >
            Log Out
          </button>
        </li>
      </ul>
      <button
        @click="toggleMenu"
        type="button"
        class="md:hidden text-white hover:text-yellow-300 cursor-pointer"
      >
        <svg
          class="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.--container-- {
  z-index: 1000000;
}
</style>
