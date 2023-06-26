<script setup>
import { useAccessStore } from "../stores/userStore";
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import socket from "../lib/socket";
import Chat from "../components/Chat.vue";
import Games from "../components/Games.vue";
import Sidebar from "../components/Sidebar.vue";
import MessageForm from "../components/MessageForm.vue";

const store = useAccessStore()
const router = useRouter()
const usersOnline = ref(["-"]);
const usersOffline = ref(["-"]);

onMounted(() => {

  if (!store.access) {
    router.push({ name: 'login' })
  }

  if (!usersOnline.value.some(u => u._id === store.user._id)) {
    const usertemp = {
      user: {
        _id: store.user._id,
        name: store.user.name,
        group: store.user.group,
        email: store.user.email
      }
    }
    // console.log("userData ======================", usertemp);
    socket.emit("userData", usertemp);
  }
  // socket.on("connect", (attempt) => {
  //   socket.emit("userData", store);
  // });

  socket.on("currentData", (users) => {
    usersOnline.value = users.filter(u => u.isConnected)
    usersOffline.value = users.filter(u => !u.isConnected)
    // console.log("currentData =================================")
    // console.log("usersOnline", usersOnline.value)
    // console.log("usersOffline", usersOffline.value)
  });  

  });

onUnmounted(() => {
  socket.off("connect");
  socket.off("currentData");
  socket.off("disconnected");
});

const openTwilio = () => {
  const url = "https://video-app-4541-6703-dev.twil.io/";
  window.open(url, "_blank");
};


</script>
<template>
  <div v-if="store.access" class="min-h-screen flex flex-col m-auto justify-around overflow-hidden">
    <div class="h-full flex flex-col md:flex-row mt-24 font-bold p-3 m-3 overflow-hidden space-x-0 md:space-x-3">

      <!-- ! Panel de conectados -->

      <!-- <div class="border border-gray-400 bg-gray-900 md:w-1/4 w-full flex flex-col m-2 p-2 text-white">
        <div class="flex flex-col m-2 p-2 flex-grow">
          <h1 class="text-white text-center text-2xl">GROUP {{ store.user.group }}</h1>
          <div class="border border-yellow-400 m-2 p-2 text-white h-1/2 overflow-auto">
            <h3 class="text-center font-bold ">ONLINE 🟢</h3>
            <p v-for="user_on in usersOnline" :key="user_on._id">{{ user_on.name }}</p>
          
          </div>
          <div class="border border-yellow-400 m-2 p-2 text-white h-1/2 overflow-auto">
            <h3 class="text-center font-bold ">OFFLINE ⚫</h3>
            <p v-for="user_off in usersOffline" :key="user_off._id">{{ user_off.name }}</p>
          </div>
        </div>
      </div> -->

      <!-- ! Sidebar chat -->

      <div class="border border-yellow-400 md:w-2/3 w-full flex flex-col items-center m-2 p-2 text-white">
        <h3 class="text-white text-center text-2xl">GAMES PANEL</h3>
        <div class="m-2 p-2 text-white flex flex-wrap flex-col md:flex-row items-center">
          <Games />
        </div>
        <div class="center-div text-2xl">
          <button
            class="w-fit h-14 px-10 bg-yellow-300 hover:bg-yellow-700 text-black text-center font-bold uppercase rounded-lg"
            @click="openTwilio">Start VideoCall 📺</button>
        </div>
      </div>

      <!-- ! Chat anterior -->

      <!-- <div class="md:w-1/4 border border-gray-400 flex flex-col justify-between m-2 p-2 bg-gray-800">
        <h1 class="text-white text-center text-2xl m-2 p-2 sticky top-0">CHAT</h1>
        <div class="max-h-[90%] p-2">
          <Chat />
        </div>
      </div> -->
      <div class="md:w-1/3 border flex flex-col justify-between border-gray-400 m-2 p-2 overflow-auto">
        <div class="grow">
          <Sidebar />
        </div>
        <div class="grow">
          <MessageForm />
        </div>
      </div>
      <!-- ! Nuevo Chat -->
    </div>
  </div>
</template>


<style lang="scss" scoped>
@keyframes glow {
  from {
    box-shadow: 0px 0px 5px 5px #f5f5dc;
  }

  to {
    box-shadow: 0px 0px 10px 10px #f2e500;
  }
}

@keyframes glow {
  from {
    box-shadow: 0px 0px 5px 5px #f5f5dc;
  }

  to {
    box-shadow: 0px 0px 10px 10px #f2e500;
  }
}
</style>
