<script setup>
import { onMounted, ref } from "vue";
import ClienteService from "../../services/ClienteService";
import { useRouter } from "vue-router";
import { useGames, useComments } from "../../stores/gameStore";
import { useAccessStore } from "./../../stores/userStore";

const storeGame = useGames();
const storeComment = useComments()
const router = useRouter();
const allUsers = ref([])
const userStore = useAccessStore()

const playGame = async (id) => {
  if(!storeGame.game.isOwn) {
    const {data: ranking} = await ClienteService.countRankingThird({
      userID: userStore.user._id,
      gameID: id,
      cohort: userStore.user.cohort,
      group: userStore.user.group,
      isOwn: storeGame.game.isOwn,
    })
    console.log(ranking)
  }
  router.push(`/game/${id}`);
}

onMounted(async ()=> {
const {data} = await ClienteService.gameRanking(storeGame.game._id)
allUsers.value = [...data]
})
</script>

<template>
  <div class="container">
    <h1>
      {{ storeGame.game.name }} <span class="block text-yellow-300">{{ storeComment.average }}     ★ </span> 
    </h1>
    <img
    :src="storeGame.game.image"
    class="w-full h-1/3 object-cover"
    alt=""
    />
    <p>
      {{ storeGame.game.description }}
    </p>
    <button class="bg-yellow-300 p-3 m-3 rounded-md text-black font-bold w-[150px] text-2xl hover:bg-green-800 hover:text-white"
      @click="playGame(storeGame.game._id)">PLAY</button>
  </div>
  <div
      class="text-white text-xl m-3 p-3 self-start border border-yellow-400 bg-black text-center"
      v-if="storeGame.game.isOwn"
    >
      <h2>Podium</h2>
      <ul>
        <li v-for="user in allUsers" :key="user.id">
          {{ user.user[0].name }} - Puntaje: {{ user.total }}
        </li>
      </ul>
    </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: fit-content;
  padding: 5px;
  margin: 10px;
  border: solid 1px yellow;
}
.container h1{
  text-align: center;
  color: white;
  font-size: xx-large;
  margin: 10px;
  padding: 5px;
}
.container p{
  text-align: justify;
  color: white;
  font-size:larger;
  margin: 10px;
  padding: 5px;
}

</style>
