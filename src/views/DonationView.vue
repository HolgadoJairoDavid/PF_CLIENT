<script setup>
import { FormKit } from "@formkit/vue";
import { useAccessStore } from "../stores/userStore";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import Donation from "../components/Donation.vue";
import ClienteService from "../services/ClienteService";

const store = useAccessStore();
const router = useRouter();

const donations = ref([]);

onMounted(async () => {
  if (!store.access) {
    router.push({ name: "login" });
    return
  }

  const {data} = await ClienteService.getAllDonations()
  donations.value = data;
});

const payPal = async (formData) => {
  const { name, email, _id } = store.user;
  const newName = name.replace(" ", "%20");
  const paymentInfo = {
    _id,
    newName,
    email,
    ...formData,
  };

  const response = await fetch("https://henrymoonback.onrender.com/payment/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(paymentInfo),
  });

  const data = await response.json();

  window.location.href = data.links[1].href;
};
</script>

<template>
  <!-- <BackgroundParticles class="particle"/> -->
  <div
    class="flex flex-col items-center justify-center mt-10 relative overflow-x-hidden"
    v-if="store.access"
  >
    <h1 class="title">Make your donation here!💰</h1>
    <div
      class="container"
    >
      <FormKit
        type="form"
        form-class="container2"
        incomplete-message="Please enter donation amount"
        :actions="false"
        messages-class="text-red-600 text-lg flex justify-center"
        @submit="payPal"
      >
        <FormKit
          type="number"
          name="donation"
          placeholder="Enter Amount"
          input-class="text-white text-lg p-2 m-2 border-2 rounded-[5px] border-yellow-300 focus:outline-none focus:placeholder-transparent text-center placeholder-black"
          placeholder-class="input:focus:placeholder-transparent"
          validation="required | number"
          :validation-messages="{
            required: 'Amount is required',
            number: 'Amount must be a number',
          }"
          validation-visibility="blur"
          messages-class="text-red-600 text-lg flex justify-center"
        />
        <input
          type="submit"
          value="Donate"
          class="botonDonate"
        />
      </FormKit>

      <div class="flex flex-row flex-wrap items-center w-[103%] justify-center">
        <Donation v-for="donation in donations" :donation="donation" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.title {
  color: var(--title);
  font-size: 25px;
  font-weight: bold;
}

.container {
  height: auto;
  margin-top: 2rem;
  border-radius: 10px;
  margin-bottom: 3.5rem;
  width: 80%;
  border-width: 5px;
  border-color: var(--details);
  background-color: var(--body);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem;
}

.container2 {
  background-color: black;
  border: 1px solid var(--details);
  border-radius: 10px;
  width: 98%;
  margin: 0.5rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.botonDonate {
  background-color: var(--details);
  padding: 0.5rem;
  margin: 0.5rem;
  justify-content: center;
  border-radius: 0.375rem;
  cursor: pointer;
  color: var(--body);
  font-weight: bold;
  width: 40%;
  font-size: 1.125rem;
  border: 1px solid var(--details);

}

.botonDonate:hover {
  background-color: var(--container);
  color: var(--title);
  border: 1px solid var(--details);
}

// button {
//   color: var(--principal);
//   border: 3px var(--principal) solid;
//   border-radius: 2rem;
// }

// button {
//   text-shadow: 1px 1px 0.2rem #f8e007aa;
//   transition: all 0.3s;
// }

/* ESTILOS BOTÓN SLIDE LEFT */
// .ov-btn-slide-left {
//   position: absolute;
//   bottom: -12rem;
//   z-index: 100000;
//   overflow: hidden;
//   display: inline-block;
// }

// .ov-btn-slide-left:hover {
//   color: #fff;
//   /* color de fuente hover */
//   text-shadow: 1px 1px 0.2rem rgb(144, 144, 144),
//     1px 1px 0.2rem rgb(144, 144, 144), 1px 1px 0.2rem rgb(144, 144, 144);
//   box-shadow: 1px 1px 1rem var(--principal);
//   transform: scale(1.05);
// }

// .ov-btn-slide-left::after {
//   content: "     ";
//   background: var(--principal);
//   /* color de fondo hover */
//   position: absolute;
//   z-index: -1;
//   display: block;
//   top: 0;
//   bottom: 0;
//   left: -100%;
//   right: 100%;
//   border: 7px var(--principal) solid;
//   -webkit-transition: all 0.35s;
//   transition: all 0.35s;
//   border-radius: -2rem;
// }

// .ov-btn-slide-left:hover::after {
//   left: 0;
//   right: 0;
//   top: 0;
//   bottom: 0;
//   -webkit-transition: all 0.35s;
//   transition: all 0.35s;
//   box-shadow: 1px 1px 3px var(--principal);
// }
</style>