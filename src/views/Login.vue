<script setup>
import { FormKit } from "@formkit/vue";
import BackgroundParticles from "../components/UI/BackgroundParticles.vue";
import ClienteService from "../services/ClienteService";
import { useRouter, useRoute } from "vue-router";
import Authentication from "../components/Authentication.vue";
import welcome from "../assets/img/HenryMoon.svg";
import { useAccessStore } from "../stores/userStore";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const store = useAccessStore();
import socket from "./../lib/socket";

const router = useRouter();

const handleSubmit = async (dataForm) => {
  try {
    const { data } = await ClienteService.login(dataForm);
    if (data.access) {
      //AUFER ESTÁ TRABAJANDO EN LAS OTRAS PROPIEDADES
      store.login(data.user);
      store.updateAdmin(dataForm);
      socket.emit('new-user')
      router.push({ name: "home" });
    } else {
      router.push({name: 'banned'})
    }
  } catch (error) {
    toast.warning(error.response.data.error, {
      autoClose: 3000,
    });
  }
};

</script>
<template>
  <div
    class="h-screen w-screen flex items-center justify-center overflow-hidden"
  >
    <BackgroundParticles />
    <div
      class="--container-- rounded-xl border-yellow-200 bg-black relative border-2 p-5 w-[30%] grid place-items-center"
    >
      <img :src="welcome" alt="" class="h-36" />
      <FormKit
        type="form"
        :actions="false"
        incomplete-message="Make sure all fields are filled"
        form-class="w-[100%] grid"
        messages-class="text-red-500"
        @submit="handleSubmit"
      >
        <FormKit
          type="email"
          name="email"
          placeholder="Email"
          placeholder-class="input:focus:placeholder-transparent"
          validation="required | email"
          :validation-messages="{
            required: 'Email is required',
            email: 'Please enter a valid email address',
          }"
          validation-visibility="blur"
          input-class="pb-2 pl-2 mt-2 caret-yellow-400 bg-black border-b-2 border-white focus:outline-none w-[100%]  focus:placeholder-transparent"
          messages-class="text-red-500"
        />
        <FormKit
          outer-class="background"
          type="password"
          name="password"
          placeholder="Password"
          validation="required"
          :validation-messages="{
            required: 'Password is required',
          }"
          validation-visibility="blur"
          v-model="passwordValidation"
          @Change="handleChange"
          input-class="pb-2 pl-2 mt-7 caret-yellow-400 bg-black border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-500"
        />
        <input
          type="submit"
          class="text-black text-xl mt-9 rounded-md p-2 tracking-wider font-medium cursor-pointer justify-items-end"
          value="Login"
        />
        <!-- <p v-if=""> {{  }}</p> -->
      </FormKit>

      <span class="mt-4"
        >Do not you have an account yet?
        <RouterLink :to="{ name: 'register' }"
          ><span class="underline text-lg text-yellow-500"
            >Sign up here</span
          ></RouterLink
        >
      </span>

      <span class="mt-4">
        <RouterLink :to="{ name: 'register' }"
          ><span class="underline text-lg text-yellow-500"
            >Did you forget your password?</span
          ></RouterLink
        >
      </span>
      <span class="mt-4">or Login with </span>
      <Authentication />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.--container-- {
  color: var(--content);
  background-color: (--container);
  z-index: 10000;
  animation: container 2s linear forwards;

  @keyframes container {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}

@media (max-width: 900px) {
  .--container-- {
    width: 60%;
  }
}
@media (max-width: 500px) {
  .--container-- {
    width: 90%;
  }
}

input[type="submit"] {
  background-color: var(--principal);
  transition: 0.5s;
}

input[type="submit"]:hover {
  background-color: #ffef5c;
}

input[type="submit"]:disabled {
  background-color: #ffe6008c;
  color: #00000087;
}
</style>
