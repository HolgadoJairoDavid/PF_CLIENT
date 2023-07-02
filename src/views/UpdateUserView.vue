<script setup>
import { FormKit } from "@formkit/vue";
import { useRouter } from "vue-router";
import ClienteService from "../services/ClienteService";
import BackgroundParticles from "../components/UI/BackgroundParticles.vue";
import { useAccessStore } from "../stores/userStore";
import CloudImage from "../components/CloudImage.vue";
import { onMounted, ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import Helpers from "../helpers";

const store = useAccessStore();
const router = useRouter();

let user = ref({});
const countries = ref([])

onMounted(async () => {
  if (!store.access) {
    router.push({ name: "login" });
    return;
  } else {
    user = {...store.user}
   

    const {data: countriesData} = await ClienteService.getAllCountries()
    countries.value = [...Helpers.beautifyCountries(countriesData)]
  }
});

const widget = window.cloudinary.createUploadWidget(
  { cloud_name: "HenryMoon", upload_preset: "sm7kib26" },
  (error, result) => {
    if (!error && result && result.event === "success") {
      uploadedImage.value = result.info.public_id;
      user.image = uploadedImage;
      checkImage = 2;
    }
  }
);

function openUploadWidget() {
  widget.open();
}
let uploadedImage = ref(store.user.image);
const handleSubmit = async (dataForm) => {
  dataForm.image = uploadedImage.value;
  try {
    const { data } = await ClienteService.updateUserById(
      user._id,
      dataForm
    );

    store.updateProfile(data);
    router.push({ name: "profile" });
  } catch (error) {
    toast.warning("Wrong", {
      autoClose: 3000,
    });
  }
};
const date = store.user.birthdate
  ? store.user.birthdate.slice(0, 10)
  : "01/01/2000";

const redirectToProfile = () => {
  router.push({ name: "profile" });
};

const checkImage = user.image?.split("/").length;
</script>
<template>
  <div
    class="overflow-x-hidden h-screen w-screen flex items-center justify-center"
  v-if="store.access"
    >
    <BackgroundParticles />
    <div
      class="--container-- rounded-xl border-yellow-200 bg-black mt-9 border-2 p-5 w-[50%] grid place-items-center"
    >
      <FormKit
        type="form"
        :actions="false"
        incomplete-message="Make sure all fields are filled"
        form-class="w-full grid"
        messages-class="text-red-600"
        @submit="handleSubmit"
      >
        <FormKit
          type="text"
          name="name"
          placeholder="Name"
          v-model="user.name"
          placeholder-class="input:focus:placeholder-transparent"
          validation="required"
          :validation-messages="{
            required: 'Name is required',
          }"
          validation-visibility="blur"
          input-class="pb-2 mt-7 bg-black border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        />
        <FormKit
          type="text"
          name="lastName"
          placeholder="Last Name"
          v-model="user.lastName"
          placeholder-class="input:focus:placeholder-transparent"
          validation="required"
          :validation-messages="{
            required: 'Last Name is required',
          }"
          validation-visibility="blur"
          input-class="pb-2 mt-7 bg-black border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        />

        <FormKit
          type="select"
          name="country"
          :options="countries"
          placeholder="Country"
          v-model="user.country"
          placeholder-class="input:focus:placeholder-transparent"
          validation="required"
          :validation-messages="{
            required: 'Country is required',
          }"
          validation-visibility="blur"
          input-class="pb-2 mt-7 bg-black border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        />
        <FormKit
          type="text"
          name="birthdate"
          placeholder="Birthdate"
          v-model="date"
          disabled
          placeholder-class="input:focus:placeholder-transparent"
          validation="required"
          :validation-messages="{
            required: 'Birthdate is required',
          }"
          validation-visibility="blur"
          input-class="pb-2 mt-7 bg-black border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        />

        <div class="flex flex-col md:flex-row mt-5 justify-evenly items-center">
          <input
            type="button"
            class="text-black text-xl mt-9 rounded-md p-2 tracking-wider font-bold cursor-pointer justify-items-end"
            @click="openUploadWidget()"
            value="Update profile image"
          />

          <img
            :src="user.image"
            alt=""
            v-if="checkImage > 2"
            class="w-60 border border-yellow-400 rounded-full object-cover"
          />
          <CloudImage
            :image-name="uploadedImage"
            :key="uploadedImage"
            v-if="checkImage === 2"
            style="width: 150px; height: 150px"
          />
        </div>
        <div class="flex flex-row justify-evenly mt-6">
          <button
            type="button"
            class="w-fit px-10 bg-red-400 hover:bg-red-700 text-black text-center font-bold rounded-lg"
            @click="redirectToProfile"
          >
            Cancel
          </button>
          <input
            type="submit"
            class="text-black text-xl w-[50%] px-10 bg-yellow-400 hover:bg-yellow-700 rounded-md font-bold p-2 tracking-wider cursor-pointer justify-items-end"
            value="Update"
          />
        </div>
      </FormKit>

      <!-- La variable "uploadedImage" es la que tiene el id de la imagen que se busca en Cloudinary para mostrar, eso deberia ser lo que se mande en el form -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.--container-- {
  color: var(--content);
  background-color: (--container);
  z-index: 10000;
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

input[type="button"] {
  background-color: var(--principal);
  transition: 0.5s;
}

input[type="button"]:hover {
  background-color: #ffef5c;
}

input[type="button"]:disabled {
  background-color: #ffe6008c;
  color: #00000087;
}
</style>
