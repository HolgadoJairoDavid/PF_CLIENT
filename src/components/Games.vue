<script setup>
import { useRouter } from "vue-router";
import { useGames } from "../stores/gameStore";
import { onMounted, ref, watch, computed } from 'vue';
import ClienteService from '../services/ClienteService';
import { useAccessStore } from "./../stores/userStore";

const userStore = useAccessStore()
const storeGame = useGames()
const router = useRouter()
const games = ref([])


const openGame = async (name) => {
  const gameToStore = games.value.find(game => game._id === name)
  storeGame.uploadGame(gameToStore)
  if(!gameToStore.isOwn) {
    const {data: ranking} = await ClienteService.countRankingThird({
      userID: userStore.user._id,
      gameID: name,
      cohort: userStore.user.cohort,
      group: userStore.user.group,
      isOwn: gameToStore.isOwn,
    })
   
  }
  router.push(`/game/${name}`)
}

// Acá brindaremos el método para cargar el store del juego y 
// el router push

const openDetailGame = (gameName) => {
  const gameToStore = games.value.find(game => game.name === gameName)
  storeGame.uploadGame(gameToStore)
  router.push({ name: 'detailGame' })

}

onMounted(async () => {
  const { data } = await ClienteService.getAllGames()
  games.value = data
  storeGame.uploadGames(data)
  setPages()
});

// Aqui empieza la logica del Paginado
const currentGames = ref(storeGame.games);
const page = ref(1);
const gamesPerPage = 4;
const pages = ref([]);

watch(storeGame.games, () => {
  currentGames.value = storeGame.games;
  setPages();
});

const displayedGames = computed(() => {
  const from = (page.value - 1) * gamesPerPage;
  const to = page.value * gamesPerPage;
  return storeGame.games.slice(from, to);
})

const previusPage = () => {
 if(page.value > 1) {
   page.value--;
 }
}

const nextPage = () => {
 if(page.value < pages.value.length) {
   page.value++;
 }
}

const setPages = () => {
  pages.value = Array.from({length: Math.ceil(storeGame.games.length / gamesPerPage)}, (_, index) => index + 1);
}

// Acá brindaremos el método para cargar el store del juego y
// el router push
</script>

<template>

<div class=" flex flex-col">
  <div class="flex flex-row justify-evenly flex-wrap  md:flex-row">    
    <div v-for="game in displayedGames" :key="game._id" class="container">
      <p>{{ game.name }}</p>
      <img :src="game.image" alt="" class="w-full h-3/4 object-cover" />
      
      <div class="container-button">
        <button class="button-play" @click="openGame(game._id)">PLAY</button>
        <button class="button-detail" @click="openDetailGame(game.name)">DETAIL</button>
      </div>
    </div>
    
  </div>

  <div class="flex flex-row w-full space-x-4 justify-center">
        <button
          type="button"
          class="bg-yellow-300 w-[80px] p-3 m-3 rounded-md text-black font-bold hover:bg-gray-800 hover:text-white"
          @click="previusPage"
          :disabled="page === 1"
        >
          Prev
        </button>

          <button
            type="button"
            v-for="pageNumber in pages"
            @click="page = pageNumber"
            :key="pageNumber"
            :class="['bg-yellow-300 p-2 m-2 w-10 rounded-md text-black font-bold hover:bg-gray-800 hover:text-white', { 'text-white bg-yellow-700': page === pageNumber }]"
          >
            {{ pageNumber }}
          </button>

        <button
          type="button"
          @click="nextPage"
          :disabled="page === pages.length"
          class="bg-yellow-300 p-2 m-2 w-[80px] rounded-md text-black font-bold hover:bg-gray-800 hover:text-white"
        >
          Next
        </button>
      </div>
</div>
  
  
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  width: 400px;
  height: fit-content;
  padding: 5px;
  margin: 10px;
  text-align: center;
  border: #f2e500 solid 2px;
  color: white;
  font-size: large;
}

.container:hover {
  background: linear-gradient(35deg, #969696, #f2e500,);
  opacity: 90%;
  color: black;
}

.container-button {
  display: flex;
  justify-content: space-evenly;
  margin-top: 10px;
}

.button-detail {
  color: black;
  background-color: #f2e500;
  width: 25%;
}

.button-play {
  color: black;
  background-color: #f2e500;
  width: 25%;
}

.button-detail:hover{
  color: black;
  background-color: red;
  width: 25%;
}

.button-play:hover{
  color: black;
  background-color: green;
  width: 25%;
}

.button-detail:hover{
  color: black;
  background-color: red;
  width: 25%;
}

.button-play:hover{
  color: black;
  background-color: green;
  width: 25%;
}
</style>
