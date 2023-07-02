
<script setup>
import { watch } from 'vue';

const props = defineProps({
    currentRoom: {
      type: String
    },
    room: {
      type: String
    },
    newMessages: {
      type: Number
    }
  })

watch(props, ()=>{
  console.log(props.newMessages);
})

</script>

<template>
  <div >
    <div :class="room === props.currentRoom ? 'selec': 'room'">
        <span class="notification"  v-if="room !== currentRoom && newMessages">
           <div >
             {{ newMessages }}
            </div> 
        </span>{{ room }}
    </div>
  </div>
  

</template>

<style lang="scss" scoped>
.room{
  font-size: 15px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 90px;
  height: 30px;
  background-color: #111827;
  border-radius: 5px 5px 0 0;
}

.room:hover{
  font-size: 18px;
  cursor: pointer;
}

.selec{
  cursor: pointer;
  font-size: 16px;
  justify-content: center;
  display: flex;
  align-items: center;
  text-align: center;
  color: #111827;
  width: 80px;
  height: 45px;
  background-color: #F2E500;
  border-radius: 8px 8px 0px 0px;
  box-shadow: 3px -2px 5px rgb(0, 0, 0);
}

.notification{
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 10px;
  margin: 3px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background-color: red;
  color: white;
}

</style>