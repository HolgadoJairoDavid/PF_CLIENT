
<script setup>

  defineProps({
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

</script>

<template>
  <div>
    <p class="text-black">{{ room }} 
      <span v-if="room !== currentRoom">{{ newMessages }}</span>
    </p>
  </div>
  

</template>

<style lang="scss" scoped>

</style>