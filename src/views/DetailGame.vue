<script setup>
    import StarsComments from '../components/Clasificacion/StarsComments.vue';
    import DetailGame from '../components/Clasificacion/DetailGame.vue'
    import { useComments } from '../stores/gameStore';
 import { onMounted, ref } from "vue";
 import { useAccessStore } from "../stores/userStore";
import { useRouter } from 'vue-router';

 const store = useAccessStore()
const router = useRouter();

onMounted(() => {
  if (!store.access) {
    router.push({ name: "login" });
    return
  }
})

const storeComment = useComments();
// let averageFinal =( storeComment.comments?.reduce((total, comment) => {
//   return total + Number(comment.stars);
// }, 0) / storeComment.comments.length).toFixed(1)
// console.log(averageFinal);
</script>

<template>

    <div class="mt-28 flex flex-row justify-around w-[100%]" v-if="store.access">
        <DetailGame/>




        <StarsComments/>
    </div>
</template>


<style lang="scss" scoped>

</style>