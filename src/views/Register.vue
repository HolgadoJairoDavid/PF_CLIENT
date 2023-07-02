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
const countries = ref([])
import socket from "./../lib/socket";
import { onMounted } from "vue";
import Helpers from "../helpers";

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

let uploadedImage = ref("Users/nx0xistql7jbamjxca5u");

const handleSubmit = async (dataForm) => {
  // ANTES QUE NADA DEBEMOS REALIZAR LA CONSULTA
  dataForm.image = uploadedImage.value;
  // dataForm.cohort = cohort.value;
  const create = ref(false);
  ClienteService.findUserByEmail({ email: dataForm.email })
    .then(async ({ data }) => {
      if(data.length) {
        if (data[0].isBanned) {
          router.push({ name: "banned" });
          return;
        } else if (data[0].isDeleted) {
          store.updateProfile(data[0])
          router.push({ name: "recover" });
          return;
        }
      } else {
        create.value = true;
      }
    })
    .then(async () => {
      if (create.value) {
        try {
          const { data } = await ClienteService.register(dataForm);
          if (data.access) {
            //AUFER ESTÁ TRABAJANDO EN LAS OTRAS PROPIEDADES
            store.login(data.user);
            store.updateAdmin(dataForm);
            socket.emit("new-user");
            router.push({ name: "home" });
          }
        } catch (error) {
          toast.warning("That user already exists", {
            autoClose: 3000,
          });
        }
      }
    });
};

const cohorts = ref([])

onMounted(async ()=> {
  const response = await ClienteService.getAllCohorts()
  cohorts.value = ['---', ...response.data]
  
  const {data: countriesData} = await ClienteService.getAllCountries()
  countries.value = [...Helpers.beautifyCountries(countriesData)]
})

// Validaciones Cohorte
/* const cohort = ref('');
const validationError = ref(false);
const validationErrorMessage = ref(''); */


const validate_Cohort_Group = (cohort,group) => {

  return (cohort !== '---' && group !== '---')

  /* const expReg = /^\d{2}[a-zA-Z]$/;

  if(!expReg.test(cohort.value)) {
    validationError.value = true;
    validationErrorMessage.value = 'Formato de cohorte inválido. Por favor, ingresa 2 números seguidos de una letra.'
  } else {
    validationError.value = false;
    validationErrorMessage.value = '';
  } */
}

const groups = ref(['---'])

const findGroup = async (e) => {
  if(e.target.value !== '---') {
    const {data} = await ClienteService.getAllGroups(e.target.value)
    if(groups.value.lenth <= 1) {
      groups.value = [...data]
    } else {
      groups.value = ['---', ...data]
    }
  }
}

const select_cohort = (value) => {
  return value !== '---'
}

const select_group = (value) => {
  return value !== '---'
}

</script>
<template>
  <div
    class="overflow-x-hidden h-screen w-screen flex items-center justify-center"
  >
    <BackgroundParticles />
    <div class="--container--">
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
          placeholder-class="input:focus:placeholder-transparent"
          validation="required"
          :validation-messages="{
            required: 'Name is required',
          }"
          validation-visibility="blur"
          input-class="pb-2 mt-7 caret-yellow-400 bg-black border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        />

        <FormKit
          type="text"
          name="lastName"
          placeholder="Last Name"
          placeholder-class="input:focus:placeholder-transparent"
          validation="required"
          :validation-messages="{
            required: 'Last Name is required',
          }"
          validation-visibility="blur"
          input-class="pb-2 mt-7 caret-yellow-400 bg-black border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        />

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
          input-class="pb-2 mt-7 caret-yellow-400 bg-black border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
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
          input-class="pb-2 mt-7 caret-yellow-400 bg-black border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        />
        <div class=" mt-2 flex flex-row justify-between items-center">
          <div class=" w-[45%] text-center">
            <FormKit
          type="select"
          name="country"
          :options="countries"
          placeholder="Country"
          placeholder-class="input:focus:placeholder-transparent"
          validation="required"
          :validation-messages="{
            required: 'Country is required',
          }"
          validation-visibility="blur"
          input-class="pb-2 mt-5  bg-black border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        />
          </div>
          <div class=" w-[45%] text-center">
            <FormKit
          type="date"
          name="birthdate"
          placeholder="Birthdate"
          placeholder-class="input:focus:placeholder-transparent"
          validation="required"
          :validation-messages="{
            required: 'Birthdate is required',
          }"
          validation-visibility="blur"
          input-class="pb-2 mt-5 bg-black border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        >
        <i class="fa-regular fa-calendar fa-sm" style="color: #f2e600;"></i>
        </FormKit>
          </div>
        </div>    
        

        <!-- ! /////////////////////// -->

        <!-- <FormKit
          type="text"
          name="cohort"
          placeholder="Cohorte, example: 37a"
          placeholder-class="input:focus:placeholder-transparent"
          validation="required"
          :validation-messages="{
            required: 'Cohorte is required',
            format: 'Formato de cohorte inválido. Por favor, ingresa 2 números seguidos de una letra.'
          }"
          @blur="validateCohort"
          validation-visibility="blur"
          input-class="pb-2 mt-7 bg-black border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        /> -->

        <div class="mt-2 flex flex-row justify-around items-center">
          <div>
            <FormKit
              type="select"
              label="Cohort :"
              name="cohort"
              validation="select_cohort"
              validation-visibility="live"
              :validation-rules="{ select_cohort }"
              :validation-messages="{
                select_cohort: 'Cohort is required'
              }"
              
              :classes="{
                outer: 'w-32 text-center flex flex-col items-center',
                inner: 'mt-2 shadow border border-slate-600 appearance-none rounded py-2 px-2 w-24',
                input: 'w-18 bg-black text-white border-none p-0 focus:outline-none focus:border-transparent',
                messages: 'text-red-600 pt-3'
              }"
              :options="cohorts"
              @click="findGroup"
            />
          </div>
          <div>
            <FormKit
              type="select"
              label="Group :"
              name="group"
              validation="select_group"          
              validation-visibility="live"
              :validation-rules="{ select_group }"
              :validation-messages="{
                select_group: 'Group is required'
              }"
              :classes="{
                outer: 'w-32 text-center flex flex-col items-center',
                inner: 'mt-2 shadow border border-slate-600 appearance-none rounded py-2 px-2 w-24',
                input: 'w-18 bg-black text-white border-none p-0 focus:outline-none focus:border-transparent',
                messages: 'text-red-600 pt-3'
              }"
              :options="groups"
            />
          </div>
        </div>
        <!-- <FormKit
          type="number"
          min="1"
          name="group"
          placeholder="Group, example: 11"
          placeholder-class="input:focus:placeholder-transparent"
          validation="required"
          :validation-messages="{
            required: 'Group is required',
          }"
          validation-visibility="blur"
          input-class="pb-2 mt-7 bg-black border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
          messages-class="text-red-600"
        /> -->

        <!-- ! /////////////////////// -->

        

        <div class="flex flex-col md:flex-row mt-3 justify-evenly items-center">
          <input
            type="button"
            class="text-black text-lg  rounded-md p-2 tracking-wider font-medium cursor-pointer "
            @click="openUploadWidget()"
            value="Upload profile image"
          />
          <CloudImage
            :image-name="uploadedImage"
            :key="uploadedImage"
            style="width: 120px; height: 120px; border-radius: 50%; border: solid 1px var(--border);"
          />
        </div>
        <input
          type="submit"
          class="text-black bg- text-lg mt-2  rounded-md p-2 tracking-wider font-medium cursor-pointer"
          value="Register"
        />
      </FormKit>

      <!-- La variable "uploadedImage" es la que tiene el id de la imagen que se busca en Cloudinary para mostrar, eso deberia ser lo que se mande en el form -->

      <span class="mt-2 text-center"
        >Do you already have an account?
        <RouterLink :to="{ name: 'login' }"
          ><span class="link"
            >Sign in here</span
          ></RouterLink
        >
      </span>
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
  font-size: 16px;

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
  border: solid 1px var(--details);
}

input[type="button"]:hover {
  background-color: var(--container);
  color: var(--title);
  border: solid 1px var(--details);
}

input[type="button"]:disabled {
  background-color: #d4bf0489;
  color: #00000087;
}
.link{
  text-decoration: underline;
  font-size: 18px;
  color: var(--details);
}
.link:hover{
  color: var(--title);
}
.calendar-icon {
  color: red;
}
</style>
