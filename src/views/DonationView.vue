<script setup>
import { FormKit } from "@formkit/vue";
import BackgroundParticles from "../components/UI/BackgroundParticles.vue";
import { useAccessStore } from "../stores/userStore"
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import Donation from "../components/Donation.vue";

const store = useAccessStore()
const router = useRouter()

const donations = ref([])

onMounted(async () => {
  if (!store.access) {
    router.push({ name: 'login' })
  }

  const response = await fetch("https://pfapi-production.up.railway.app/payment/all-donations", {
    method: "GET"
  });

  const data = await response.json()

  donations.value = data

})

const payPal = async (formData) => {

  const { name, email, _id } = store.user

  const paymentInfo = {
    _id,
    name,
    email,
    ...formData,
  }

  const response = await fetch("https://pfapi-production.up.railway.app/payment/create-order", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(paymentInfo)
  });

  const data = await response.json();

  window.location.href = data.links[1].href;
};

</script>

<template>
  <BackgroundParticles />
  <div class="flex flex-col items-center justify-center mt-24 relative overflow-x-hidden" v-if="store.access">
    <h1 class="text-white text-2xl mt-5">Make your donation here!💰</h1>
    <div class="h-auto my-14 w-[70%] md:w-[30%] border-2 border-yellow-400 bg-gray-700 flex flex-col items-center p-5 ">
      <FormKit type="form" form-class="bg-black h-full w-full m-2 p-3 flex flex-col items-center"
        incomplete-message="Please enter donation amount" :actions="false" @submit="payPal">
        <FormKit type="number" name="donation" placeholder="Enter Amount"
          placeholder-class="input:focus:placeholder-transparent" validation="required | number" :validation-messages="{
            required: 'Amount is required',
            number: 'Amount must be a number'
          }" validation-visibility="blur"
          input-class="text-white text-lg p-2 m-2 bg-black border-2 border-white focus:outline-none w-full md:w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600 text-lg" />
        <input type="submit" value="Donate"
          class="bg-yellow-300 p-3 m-3 justify-center rounded-md cursor-pointer text-black font-bold w-fit text-lg hover:bg-gray-800 hover:text-white" />
      </FormKit>

      <div class="flex flex-col flex-wrap items-center w-full">
        <Donation v-for="donation in donations" :donation="donation" />
      </div>
    </div>



    <!-- <div class="border-2 border-yellow-400 flex-row items-center">

      <button @click="payPal"
        class="btn rounded-lg border text-center font-mono tracking-wider p-3 font-semibold text-3xl ov-btn-slide-left mt-7 bg-black"
      >
        DONATION
      </button> 

    </div> -->
  </div>
</template>

<style lang="scss" scoped>
button {
  color: var(--principal);
  border: 3px var(--principal) solid;
  border-radius: 2rem;
}

button {
  text-shadow: 1px 1px 0.2rem #f8e007aa;
  transition: all 0.3s;
}

/*** ESTILOS BOTÓN SLIDE LEFT ***/
.ov-btn-slide-left {
  position: absolute;
  bottom: -12rem;
  z-index: 100000;
  overflow: hidden;
  display: inline-block;
}

.ov-btn-slide-left:hover {
  color: #fff;
  /* color de fuente hover */
  text-shadow: 1px 1px 0.2rem rgb(144, 144, 144),
    1px 1px 0.2rem rgb(144, 144, 144), 1px 1px 0.2rem rgb(144, 144, 144);
  box-shadow: 1px 1px 1rem var(--principal);
  transform: scale(1.05);
}

.ov-btn-slide-left::after {
  content: "     ";
  background: var(--principal);
  /* color de fondo hover */
  position: absolute;
  z-index: -1;
  display: block;
  top: 0;
  bottom: 0;
  left: -100%;
  right: 100%;
  border: 7px var(--principal) solid;
  -webkit-transition: all 0.35s;
  transition: all 0.35s;
  border-radius: -2rem;
}

.ov-btn-slide-left:hover::after {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  -webkit-transition: all 0.35s;
  transition: all 0.35s;
  box-shadow: 1px 1px 3px var(--principal);
}
</style>
