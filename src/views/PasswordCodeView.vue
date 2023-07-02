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
import { ref } from "vue";

const router = useRouter();



function passCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters.charAt(randomIndex);
}

function passChain(length) {
    let chain = '';
    for (let i = 0; i < length; i++) {
        chain += passCode();
    }
    return chain;
}

const chainLength = 4;
const saveCode = ref("") //Acá se guarda el codigo

const email = ref("")

const handleCode = async ()=>{
  if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) ){
      try{
        const randomChain = passChain(chainLength);
        saveCode.value = randomChain
        const {data} = await ClienteService.sendEmail({email: email.value, code: saveCode.value})
        store.email = email.value
        if(data.success){
          toast.success('email sent, please check your inbox', {
          autoClose: 3000,
        });
        }
      } catch(error){
        toast.warning(error.message, {
      autoClose: 3000,
    });
    }
  }
}

const handleSubmit = async (dataForm) => {
    try {
        dataForm.code === saveCode.value ? router.push({ name: "setNewPassword" }) : toast.warning("Code does not match, try again", {
      autoClose: 3000,
    });
  } catch (error) {
    toast.warning(error.message, {
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
    class="--container--"
    >
    <h1>Reset Your Password</h1>
    <FormKit
        type="form"
        :actions="false"
        incomplete-message="Make sure all fields are filled"
        form-class="w-[100%] grid"
        messages-class="text-red-500 mt-2"
        @submit="handleSubmit"
      >
        <FormKit
          type="email"
          name="email"
          v-model="email"
          placeholder="Email to send confirmation"
          placeholder-class="input:focus:placeholder-transparent"
          validation="required | email"
          :validation-messages="{
            required: 'Email is required',
            email: 'Please enter a valid email address',
          }"
          validation-visibility="blur"
          input-class="pb-2 pl-2 mt-2 caret-yellow-400 bg-black border-b-2 border-white focus:outline-none w-[100%]  focus:placeholder-transparent"
          messages-class="text-red-500 mt-2"
        />
        <span>
            <input
          type="button"
          class="text-black text-xl mt-9 rounded-md p-2 w-[100%] tracking-wider font-medium cursor-pointer"
          value="Send email"
         @click="handleCode"
        />
        </span>
        <FormKit
          outer-class="background"
          type="text"
          name="code"
          placeholder="Enter code"
          validation="required"
          :validation-messages="{
            required: 'Code is required',
          }"
          validation-visibility="blur"
          input-class="pb-2 pl-2 mt-7 caret-yellow-400 bg-black border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-500 mt-2"
        />
        <input
          type="submit"
          class="text-black text-xl mt-9 rounded-md p-2 tracking-wider font-medium cursor-pointer"
          value="Check code ⌨️"
        />
        <!-- <p v-if=""> {{  }}</p> -->
      </FormKit>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.--container-- {
  color: var(--title);
  background-color: black;
  z-index: 10000;
  animation: container 2s linear forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: solid 2px var(--border);
  border-radius: 15px;
  width: 50%;
  font-size: 20px;
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
  background-color: var(--details);
  transition: 0.5s;
  border: solid 1px var(--details);
}

input[type="submit"]:hover {
  background-color: var(--container);
  color: var(--title);
  border: solid 1px var(--details);
}

input[type="submit"]:disabled {
  background-color: #d4bf0489;
  color: #00000087;
}

input[type="button"] {
  background-color: var(--details);
  transition: 0.5s;
  border: solid 1px var(--details)
}

input[type="button"]:hover {
  background-color: var(--container);
  color: var(--title);
  border: solid 1px var(--details)
}

input[type="button"]:disabled {
  background-color: #d4bf0489;
  color: #00000087;
}
</style>
