<script setup>
import ClienteService from "../services/ClienteService";
import socket from "../lib/socket";
import { useAccessStore } from "../stores/userStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import CloudImage from "../components/CloudImage.vue";
import Ranking from "../components/Ranking.vue";
const store = useAccessStore();
const router = useRouter();
 /* ! Genera error */
import  clienteService  from '../services/ClienteService'
const totalPoints = ref(0)

const histories = ref([])

onMounted(async () => {
  if (!store.access) {
    router.push({ name: "login" });
    return
  } else {
  
  const {data} = await ClienteService.getRankingInGamesByUser(store.user._id)
  if (data.length) {
    totalPoints.value = data.reduce((total, game) => {
    return total + game.total;
}, 0)
  
}
  }

  const {data} = await clienteService.getRankingInGamesByUser(store.user._id)

  histories.value = data

});


const deleteUser = () => {

  const userId = store.user._id;

  ClienteService.deleteUserById(userId)
    .then(async () => {
      await ClienteService.logout(store.user);
      router.push({ path: `/deleted/${userId}` });
    })
    .catch((error) => {
      console.error("Error deleting user: ", error);
    });
};

const updateUser = () => {
  router.push({ name: "updateUser" });
};

const checkImage= store.user.image?.split("/").length;
</script>

<template>
  <div
    class="min-h-screen flex flex-col justify-center m-auto overflow-auto"
    v-if="store.access"
  >
    <div class="text-white text-center text-3xl mt-24 font-bold">
      <h1>MY PROFILE</h1>
    </div>
    <div
      class="--container-- m-3 p-2 flex flex-col h-screen md:flex-row overflow-hidden"
    >
      <div class="--container-- md:w-3/4 flex flex-col w-auto p-3 m-2">
        <div
          class="--container-- border border-yellow-300 m-2 p-2 flex flex-col items-center md:flex-row"
        >
          <div class="flex flex-col items-center">
            <div
              class="border border-yellow-300 w-[200px] m-3 rounded-full overflow-hidden"
            >

            <!-- ! //////// Generan error -->
              <img
                :src="store.user.image"
                alt=""
                v-if="checkImage > 2"
                class="w-60 border border-yellow-400 rounded-full object-cover"
              />
              <CloudImage
                :imageName="store.user.image"
                :key="store.user.image"
                v-else
              />
            <!-- ! //////// Generan error -->

            </div>
            <div class="text-white text-3xl font-bold">
              <p>{{ `${store.user.name} (${store.user.group})` }}</p>
            </div>
          </div>

          <div class="md:w-2/3 m-3 bg-black text-white">
            <h2 class="text-3xl mt-2 font-bold text-center">
              {{ store.user.name }} <span> {{ store.user.lastName }}</span>
            </h2>

            <div class="text-2xl m-4 text-left">
              <p>{{ store.user.email }}</p>
              <p>Birth: {{ store.user.birthdate.slice(0,10) }}</p>
              <p>Country: {{ store.user.country }}</p>
              <p>Cohort: {{ store.user.cohort }}</p>
              <p>Group {{ store.user.group }}</p>
              <p v-for="TA in store.user.groupDetail">TA: {{ TA.TAname }}</p>
              <p>Total Points: {{ totalPoints }}</p>
            </div>
            <span class="text-lg"
              ><button
                class="w-fit m-5 px-10 bg-yellow-400 hover:bg-yellow-700 text-black text-center font-bold uppercase rounded-lg"
                @click="updateUser"
              >
                Edit
              </button></span
            >
            <span class="text-lg"
              ><button
                type="button"
                class="w-fit px-10 bg-red-400 hover:bg-red-700 text-black text-center font-bold uppercase rounded-lg"
                @click="deleteUser"
              >
                Delete
              </button></span
            >
          </div>
        </div>
        <div
          class="--container-- border border-gray-300 bg-gray-900 m-2 p-2 flex flex-col items-center md:flex-col overflow-x-hidden"
        >
          <h1
            class="text-yellow-400 text-center text-2xl font-bold m-2 p-2 sticky"
          >
            GAMES HISTORY
          </h1>

          <div v-for="history in histories" class="w-full px-4 py-2 text-white flex justify-between">
            <p>{{ history.game[0].name }}</p>
            <p>Partidas: {{ history.timesPlayed }}</p>
            <p>Puntos totales: {{ history.total === 0 ? '-' : history.total }}</p>
          </div>
          <!-- <div
            class="border border-yellow-300 text-white text-2xl m-2 p-2 md:w-full"
          >
            <p>
              <span style="float: left">Flappy Bird</span>
              <span style="float: right">100 Puntos</span>
            </p>
          </div>
          <div
            class="border border-yellow-300 text-white text-2xl m-2 p-2 md:w-full"
          >
            <p>
              <span style="float: left">Gartic Phone</span>
              <span style="float: right">150 Puntos</span>
            </p>
          </div>
          <div
            class="border border-yellow-300 text-white text-2xl m-2 p-2 md:w-full"
          >
            <p>
              <span style="float: left">Meme Generator</span>
              <span style="float: right">250 Puntos</span>
            </p>
          </div> -->
        
        </div>
      </div>
      <div
        class="border border-gray-300 mt-6 p-3 bg-gray-900 md:w-1/4 h-[80vh]"
      >
        <h1 class="text-yellow-400 text-center text-2xl font-bold m-1 p-1">
          RANKING
        </h1>
        <Ranking />

      </div>
    </div>
  </div>
</template>
