<script setup>
import { FormKit } from "@formkit/vue";
import { useRouter } from "vue-router";
import ClienteService from "../services/ClienteService";
import BackgroundParticles from "../components/UI/BackgroundParticles.vue";
import { useAccessStore } from "../stores/userStore";
import CloudImage from "../components/CloudImage.vue";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const store = useAccessStore();
const router = useRouter();

const widget = window.cloudinary.createUploadWidget(
  { cloud_name: "HenryMoon", upload_preset: "sm7kib26" },
  (error, result) => {
    if (!error && result && result.event === "success") {
      uploadedImage.value = result.info.public_id;
    }
  }
);

function openUploadWidget() {
  widget.open();
}
let uploadedImage = ref(store.user.image);
const handleSubmit = async (dataForm) => {
  dataForm.image = uploadedImage.value;
   console.log(dataForm)
  try {
    const { data } = await ClienteService.updateUserById(store.user._id, dataForm);
    store.updateProfile(data);
    router.push({ name: "profile" });
  } catch (error) {
    toast.warning('That user already exists', {
        autoClose: 3000,
      });
  }
};
</script>
<template>
  <div
    class="overflow-x-hidden h-screen w-screen flex items-center justify-center"
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
          v-model="store.user.name"
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
          v-model="store.user.lastName"
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
          type="text"
          name="cohort"
          disabled
          v-model="store.user.cohort"
          placeholder="Cohorte, example: 37a"
          placeholder-class="input:focus:placeholder-transparent"
          validation-visibility="blur"
          input-class="pb-2 mt-7 bg-black border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        />
        <FormKit
          type="number"
          min="1"
          name="group"
          v-model="store.user.group"
          placeholder="Group, example: 11"
          placeholder-class="input:focus:placeholder-transparent"
          validation="required"
          disabled
          :validation-messages="{
            required: 'Group is required',
          }"
          validation-visibility="blur"
          input-class="pb-2 mt-7 bg-black border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        />
        <FormKit
          type="email"
          name="email"
          placeholder="Email"
          placeholder-class="input:focus:placeholder-transparent"
          disabled
          v-model="store.user.email"
          validation="required | email"
          :validation-messages="{
            required: 'Email is required',
            email: 'Please enter a valid email address',
          }"
          validation-visibility="blur"
          input-class="pb-2 mt-7 bg-black border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        />

        <div class="flex flex-col md:flex-row mt-5 justify-evenly items-center">
          <input
            type="button"
            class="text-black text-xl mt-9 rounded-md p-2 tracking-wider font-medium cursor-pointer justify-items-end"
            @click="openUploadWidget()"
            value="Update profile image"
          />

          <CloudImage
            :image-name="uploadedImage"
            :key="uploadedImage"
            style="width: 150px; height: 150px"
          />
          
        </div>
        <input
          type="submit"
          class="text-black text-xl mt-9 rounded-md p-2 tracking-wider font-medium cursor-pointer justify-items-end"
          value="Update"
        />
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
