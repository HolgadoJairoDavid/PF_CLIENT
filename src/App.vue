<script setup>

import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import { useRoute } from "vue-router";
import { useAccessStore } from "./stores/userStore";

import { ref, provide } from 'vue' /* Para el nuevo chat */

const store = useAccessStore();

const route = useRoute();

/* ! ////////////// */

const API_BASE_URL = 'http://localhost:5001'

  // const SOCKET_URL = 'http://localhost:5001'
  // const socket = io(SOCKET_URL)

  const rooms = ref([])
  const currentRoom = ref('')
  const members = ref([])
  const messages = ref({})
  const privateMemberMsg = ref([])
  const newMessages = ref({})

  const setRooms = (rms) => {
    rooms.value = rms
  }
  const setCurrentRoom = (cr) => {
    currentRoom.value = cr
  }
  const setMembers = (mbs) => {
    members.value = mbs
  }
  const setMessages = (mgs) => {
    messages.value = mgs
  }
  const setPrivateMemberMsg = (pmm) => {
    privateMemberMsg.value = pmm
  }
  const setNewMessages = (nm) => {
    newMessages.value = nm
  }

  provide('chat-context', {
    API_BASE_URL,
    // socket,
    rooms,
    setRooms,
    currentRoom,
    setCurrentRoom,
    members,
    setMembers,
    messages,
    setMessages,
    privateMemberMsg,
    setPrivateMemberMsg,
    newMessages,
    setNewMessages
  })

/* ! ////////////// */

const routesToNavBar = [
  "about",
  "profile",
  "home",
  "admin",
  "donation",
  "studentView",
];

</script>

<template>
  <Navbar
    v-if="
      routesToNavBar.includes(route.name) &&
      store.access &&
      route.name !== 'landing'
    "
  />
  <RouterView />
  <!-- RouterView nos permite ver las rutas de nuestro proyecto -->
</template>

<style lang="scss">
:root {
  --body: #000;
  --container: #191919;
  --border: #969696;
  --content: #ededed;
  --title: #fff;
  --principal: #f2e600;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: var(--body);
}
::-webkit-scrollbar {
  width: 7px;
  background-color: var(--border);
}

::-webkit-scrollbar-thumb {
  background-color: var(--principal);
  border-radius: 5px;
}
</style>
