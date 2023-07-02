<script setup>
import { onMounted, ref} from 'vue';
import { useRoute } from 'vue-router';
import  clienteService  from '../services/ClienteService'
import { useAccessStore } from "./../stores/userStore";
import { useGames } from "./../stores/gameStore";

const userStore = useAccessStore()
const gameStore = useGames()
const link = ref('')
const route = useRoute()
const props = ref('')
const store = useAccessStore()
onMounted(async() =>  {
  // const {data} = await clienteService.getGameById(route.params.name)
if (userStore.access) {
  
  // if(!gameStore.game.isOwn) {
  //   const {data: ranking} = await clienteService.countRankingThird({
  //     userID: userStore.user._id,
  //     gameID: route.params.name,
  //     cohort: userStore.user.cohort,
  //     group: userStore.user.group,
  //     isOwn: gameStore.game.isOwn,
  //   })
  //   console.log(ranking)
  // } else {
  //   console.log('Es propio')
  // }

  props.value = route.params.name
  // if(data._id === '649c47dd071df698e23c571a'){
  // link.value = `${data.url}?email=${data.email}` 
  // } else {
  //   link.value = data.url
  // }
  link.value = gameStore.game.url
}
  });

</script>

<template>
  <div class="box">
    <div class="game">
      <iframe :src="`${link}?email=${store.user.email}`" :class="props === '649c47dd071df698e23c571a' ? 'slimes':'iframe'">
      </iframe>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.iframe{
  width: 100%;
  height: 100%;
  overflow: hidden
}

.slimes{
  //margin-top: 400px;
  //margin-left: 350px;
  //scale: 1.5;
  width: 100%;
  height: 100%;
  overflow: hidden
}

.box{
  display: flex;
  flex-direction: row;
  padding: 10px;
  justify-content: center;
}
.game{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 2px solid #F2E500;
  border-radius: 10px;
  width: 1200px;
  height: 750px;
  overflow: hidden
}
</style>
