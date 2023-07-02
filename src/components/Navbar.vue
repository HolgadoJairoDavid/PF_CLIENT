<script setup>
import { useAccessStore } from "../stores/userStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import CloudImage from "../components/CloudImage.vue";
import socket from "../lib/socket";
import clientServices from "./../services/ClienteService"

const store = useAccessStore();
const router = useRouter();
const checkImage = store.user.image?.split('/').length
const menuOpen = ref(false);
const lightMode = ref(true)

const setTheme = (mode)=>{
  document.documentElement.setAttribute('data-theme', mode)
} 
const handleMode = ()=>{
  if(lightMode.value){
    setTheme("light")
    lightMode.value = false
  }else{
    setTheme("dark")
    lightMode.value = true
  }
}
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
const handleLogOut = async () => {
  await clientServices.logout(store.user)
  store.logOut();
  router.push({ name: "landing" });
};

</script>

<template>
  <nav class="nav">
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
            :class="lightMode ?  'text' : 'textL'"
            >Admin Dash</router-link
          >
        </li>
        <li class="flex items-center">
          <router-link
            :to="{ name: 'profile' }"
            :class="lightMode ?  'text' : 'textL'"
          >
          <img :src="store.user.image" 
            alt="" 
            v-if="checkImage >2"               
            class="w-16 h-16 border border-yellow-400 rounded-full object-cover "
            >
            <CloudImage
              :image-name="store.user.image"
              :key="store.user.image"
              v-else
              class="w-16 h-16 border border-yellow-400 rounded-full object-cover "
          /></router-link>
        </li>
        <li >
          <button :class="lightMode ?  'text' : 'textL'">
            <router-link
              :to="{ name: 'home' }"
              :class="lightMode ?  'text' : 'textL'"
              >Home</router-link>
          </button>
        </li>
        <li >
          <button :class="lightMode ?  'text' : 'textL'">
            <router-link
              :to="{ name: 'about' }"
              :class="lightMode ?  'text' : 'textL'"
              >About</router-link>
          </button>
        </li>
        <li >
          <button :class="lightMode ?  'text' : 'textL'">
            <router-link
              :to="{ name: 'donation' }"
              >Donation</router-link
            >
          </button>
        </li>
        <!-- <li class="flex items-center">
          <router-link
            :to="{ name: 'home' }"
            class=""
            >My favorites</router-link
          >
        </li> -->
        <li >
          <button
            @click="handleLogOut"
            :class="lightMode ?  'text' : 'textL'"
          >
            Log Out
          </button>
        </li>
        <li>
          <div class="mode">
            <button @click="handleMode" ><i :class= "lightMode ? 'fa-solid fa-sun fa-xl':'fa-solid fa-moon fa-xl'" :style="lightMode ? 'color: #e2e8f0':'color: #111827' " ></i></button>
          </div>
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

.nav{
  z-index: 1000000;
  background-color: var(--container) ;
  /* class="bg-gray-900 w-full fixed top-0 --container--" */
}
.mode{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 25px;
  width: 50px;
  height: 50px;
}

.text{
  color: var(--title);
}

.text:hover{
  scale: 1.1;
  color: var(--details);
}

.textL{
  color: var(--title);
}

.textL:hover{
  scale: 1.1;
  color: rgb(176, 176, 252);
}
</style>
