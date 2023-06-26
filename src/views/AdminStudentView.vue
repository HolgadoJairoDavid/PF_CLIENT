<script setup>
import { useRoute } from "vue-router";
import { onMounted, onUnmounted, ref } from "vue";
import ClienteService from "../services/ClienteService";
import { useUsers } from "../stores/userStore";
import CloudImage from "../components/CloudImage.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const storeUsers = useUsers();
const route = useRoute();
const id = route.params.id;
const user = ref({});
const banUser = async () => {
  if (user.value.isDeleted) {
    const { data } = await ClienteService.unBanUser(id);
    toast.success("Unbanned", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
    ClienteService.getAllUsers().then(({ data }) => {
      storeUsers.uploadUsers(data);

      user.value = storeUsers.users.find((user) => user._id === id);
    });
  } else {
    const { data } = await ClienteService.banUser(id);
    toast.warning("Banned", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
    ClienteService.getAllUsers().then(({ data }) => {
      storeUsers.uploadUsers(data);

      user.value = storeUsers.users.find((user) => user._id === id);
    });
  }
};
const checkImage = ref(0);
onMounted(() => {
  user.value = storeUsers.users.find((user) => user._id === id);
  checkImage.value = user.value.image.split("/").length;
});
onUnmounted(() => {
  user.value = {};
});
</script>
<template>
  <div
    class="--container-- border border-yellow-300 m-2 p-2 flex flex-col mt-40 items-center md:flex-row"
  >
    <div class="flex flex-col items-center">
      <div
        class="border border-yellow-300 w-[200px] m-3 rounded-full overflow-hidden"
      >
        <img
          :src="user.image"
          alt=""
          v-if="checkImage > 2"
          class="w-60 border border-yellow-400 rounded-full object-cover"
        />
        <CloudImage :imageName="user.image" :key="user.image" v-else />
      </div>
      <div class="text-white text-3xl font-bold">
        <p>{{ `${user.name} ${user.group}` }}</p>
      </div>
    </div>

    <div class="md:w-2/3 m-3 bg-black text-white">
      <h2 class="text-3xl mt-2 font-bold text-center">
        {{ user.name }}
      </h2>

      <div class="text-2xl m-4 text-left">
        <p>{{ user.email }}</p>
        <p>Group {{ user.group }}</p>
        <p>TA: TA-Name</p>
        <p>Total Points: 500</p>
      </div>
      <span class="text-lg"
        ><button
          type="button"
          :class="[
            user.isDeleted
              ? 'bg-red-400 hover:bg-red-700'
              : 'bg-green-400 hover:bg-green-700',
          ]"
          class="w-fit px-10 text-black text-center font-bold uppercase rounded-lg"
          @click="banUser"
        >
          {{ !user.isDeleted ? "unbanned" : "banned" }}
        </button></span
      >
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
