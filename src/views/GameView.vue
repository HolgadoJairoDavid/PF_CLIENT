<script setup>
import { onMounted } from 'vue';
import { useAccessStore } from "../stores/userStore";
import Game from '../components/Game.vue';
import MessageForm from "../components/MessageForm.vue";
import Sidebar from '../components/Sidebar.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useAccessStore()

onMounted(() => {
  if (!store.access) {
    router.push({ name: "login" });
    return
  }
})

</script>

<template>
  <div class="boxppal" v-if="store.access">
    <div class="game">
      <Game/>
    </div>
    <div class="box">
      <div class="grow">
        <Sidebar/>
      </div>
      <div class="boxinter">
        <div class="boxchat">
          <MessageForm/>
        </div>
      </div>
    </div>  
  </div>
</template>



<style lang="scss" scoped>
.boxppal{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 100px;
  justify-content: center;
}

.boxinter{
  position: relative;
}
.game{
  scale: 1;
}

.boxchat{
  width: 350px;
  height: 70vh;
  overflow: auto;
}

/* .box{
  margin-top: 50px;
  width: 400px;
  height: 85vh;
  overflow: auto;
} */

</style>
