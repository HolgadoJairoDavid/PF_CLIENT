<script setup>
import ClienteService from "../services/ClienteService"
import { useAccessStore } from "../stores/userStore";
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import CloudImage from "../components/CloudImage.vue";
import Ranking from "../components/Ranking.vue";
const store = useAccessStore();
const router = useRouter();
const checkImage = store.user.image.split('/').length
onMounted(() => {
  if (!store.access) {
    router.push({ name: "login" });
  }
})

const deleteUser = () => {
  const userId = store.user._id

  ClienteService.deleteUserById(userId)
    .then(() => {
      router.push({ name: "landing" })
    })
    .catch((error) => {
      console.error("Error al eliminar el usuario:", error)
    })
}

const updateUser = ()=>{
  const userId = store.user._id

  ClienteService.updateUserById(userId)
    .then(() => {
      router.push({ name: "updateUser" })
    })
    .catch((error) => {
      console.error("Error updating profile:", error)
    })
}

</script>

<template>
  <div class="min-h-screen flex flex-col justify-center m-auto overflow-auto" v-if="store.access">
    <div class="text-white text-center text-3xl mt-24 font-bold">
      <h1>MY PROFILE</h1>
    </div>
    <div class="--container-- m-3 p-2 flex flex-col h-screen md:flex-row overflow-hidden">
      <div class="--container-- md:w-3/4 flex flex-col w-auto p-3 m-2">
        <div class="--container-- border border-yellow-300 m-2 p-2 flex flex-col items-center md:flex-row">
          <div class="flex flex-col items-center">
            <div class="border border-yellow-300 w-[200px] m-3 rounded-full overflow-hidden">
              <img :src="store.user.image" alt="" v-if="checkImage > 2" class="w-60 border border-yellow-400 rounded-full object-cover ">
              <CloudImage :imageName="store.user.image" :key="store.user.image" v-else/>
            </div>
            <div class="text-white text-3xl font-bold">
              <p>{{ `${store.user.name} ${store.user.group}` }}</p>
            </div>
          </div>

          <div class="md:w-2/3 m-3 bg-black text-white">
            <h2 class="text-3xl mt-2 font-bold text-center">
              {{ store.user.name }}
            </h2>

            <div class="text-2xl m-4 text-left">
              <p>{{ store.user.email }}</p>
              <p>Group {{ store.user.group }}</p>
              <p>TA: TA-Name</p>
              <p>Total Points: 500</p>
            </div>
            <span class="text-lg"><button
                class=" w-fit m-5 px-10 bg-yellow-400 hover:bg-yellow-700 text-black text-center font-bold uppercase rounded-lg"
                @click="updateUser">Edit</button></span>
            <span class="text-lg"><button type="button"
                class="w-fit px-10 bg-red-400 hover:bg-red-700 text-black text-center font-bold uppercase rounded-lg"
                @click="deleteUser">Delete</button></span>
          </div>
        </div>
        <div
          class="--container-- border border-gray-300 bg-gray-900 m-2 p-2 flex flex-col items-center md:flex-col overflow-auto overflow-x-hidden">
          <h1 class="text-yellow-400 text-center text-2xl font-bold m-2 p-2 sticky">
            GAMES HISTORY
          </h1>
          <div class="border border-yellow-300 text-white text-2xl m-2 p-2 md:w-full">
            <p>
              <span style="float: left">Flappy Bird</span>
              <span style="float: right">100 Puntos</span>
            </p>
          </div>
          <div class="border border-yellow-300 text-white text-2xl m-2 p-2 md:w-full">
            <p>
              <span style="float: left">Gartic Phone</span>
              <span style="float: right">150 Puntos</span>
            </p>
          </div>
          <div class="border border-yellow-300 text-white text-2xl m-2 p-2 md:w-full">
            <p>
              <span style="float: left">Meme Generator</span>
              <span style="float: right">250 Puntos</span>
            </p>
          </div>
          <!-- <div class="border border-yellow-300 text-white text-2xl m-2 p-2 md:w-full">
                    <p>
                        <span style="float: left;">GAME 4</span>
                        <span style="float: right;">xxx Puntos</span>
                    </p>
                </div> -->
          <!-- <div class="border border-yellow-300 text-white text-2xl m-2 p-2">
                        <p>
                            <span style="float: left;">GAME 5</span>
                            <span style="float: right;">xxx Puntos</span>
                        </p>
                    </div>
                    <div class="border border-yellow-300 text-white text-2xl m-2 p-2">
                        <p>
                            <span style="float: left;">GAME 6</span>
                            <span style="float: right;">xxx Puntos</span>
                        </p>
                    </div>
                    <div class="border border-yellow-300 text-white text-2xl m-2 p-2">
                        <p>
                            <span style="float: left;">GAME 7</span>
                            <span style="float: right;">xxx Puntos</span>
                        </p>
                    </div>
                    <div class="border border-yellow-300 text-white text-2xl m-2 p-2">
                        <p>
                            <span style="float: left;">GAME 8</span>
                            <span style="float: right;">xxx Puntos</span>
                        </p>
                            </div>
                            <div class="border border-yellow-300 text-white text-2xl m-2 p-2">
                                <p>
                                    <span style="float: left;">GAME 9</span>
                                    <span style="float: right;">xxx Puntos</span>
                                </p>
                            </div>
                            <div class="border border-yellow-300 text-white text-2xl m-2 p-2">
                                <p>
                                    <span style="float: left;">GAME 10</span>
                                    <span style="float: right;">xxx Puntos</span>
                                </p>
                            </div> -->
        </div>
      </div>
      <div class=" border border-gray-300 mt-6 p-3 bg-gray-900 md:w-1/4 h-[80vh]">
        <h1 class="text-yellow-400 text-center text-2xl font-bold m-1 p-1">
          RANKING
        </h1>
        <Ranking />

        <!-- <div class="border border-yellow-300 w-full m-2 flex items-center md:flex-row">
                        <div class="border border-yellow-300 w-[80px] m-2 flex items-center rounded-full overflow-hidden">
                            <img src="../assets/img/icon.png" alt="Camilo" class="w-full h-full object-cover" />
                        </div>
                        <div class=" md:w-2/3 m-2 text-white text-center">
                            <h3 class="text-xl mt-2 font-bold ">
                                Aufer Contreras
                            </h3>
                            <p class="text-xl mt-3">xxx Puntos</p>
                        </div>
                    </div>
                    <div class="border border-yellow-300 w-full m-2 flex items-center md:flex-row">
                        <div class="border border-yellow-300 w-[80px] m-2 flex items-center rounded-full overflow-hidden">
                            <img src="../assets/img/icon.png" alt="Camilo" class="w-full h-full object-cover" />
                        </div>
                        <div class=" md:w-2/3 m-2 text-white text-center">
                            <h3 class="text-xl mt-2 font-bold ">
                                Aufer Contreras
                            </h3>
                            <p class="text-xl mt-3">xxx Puntos</p>
                        </div>
                    </div>
                    <div class="border border-yellow-300 w-full m-2 flex items-center md:flex-row">
                        <div class="border border-yellow-300 w-[80px] m-2 flex items-center rounded-full overflow-hidden">
                            <img src="../assets/img/icon.png" alt="Camilo" class="w-full h-full object-cover" />
                        </div>
                        <div class=" md:w-2/3 m-2 text-white text-center">
                            <h3 class="text-xl mt-2 font-bold ">
                                Aufer Contreras
                            </h3>
                            <p class="text-xl mt-3">xxx Puntos</p>
                        </div>
                    </div>
                    <div class="border border-yellow-300 w-full m-2 flex items-center md:flex-row">
                        <div class="border border-yellow-300 w-[80px] m-2 flex items-center rounded-full overflow-hidden">
                            <img src="../assets/img/icon.png" alt="Camilo" class="w-full h-full object-cover" />
                        </div>
                        <div class=" md:w-2/3 m-2 text-white text-center">
                            <h3 class="text-xl mt-2 font-bold ">
                                Aufer Contreras
                            </h3>
                            <p class="text-xl mt-3">xxx Puntos</p>
                        </div>
                    </div>
                    <div class="border border-yellow-300 w-full m-2 flex items-center md:flex-row">
                        <div class="border border-yellow-300 w-[80px] m-2 flex items-center rounded-full overflow-hidden">
                            <img src="../assets/img/icon.png" alt="Camilo" class="w-full h-full object-cover" />
                        </div>
                        <div class=" md:w-2/3 m-2 text-white text-center">
                            <h3 class="text-xl mt-2 font-bold ">
                                Aufer Contreras
                            </h3>
                            <p class="text-xl mt-3">xxx Puntos</p>
                        </div>
                    </div> -->
        <!-- </div> -->
      </div>

    </div>
  </div>
</template>
