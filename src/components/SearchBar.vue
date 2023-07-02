<script setup>
import { FormKit } from "@formkit/vue";
import { ref } from "vue";
import { useUsers } from "../stores/userStore";
const store = useUsers();

defineEmits(["handle-search"]);
const props = defineProps({
  emailProp: {
    type: String,
    required: true,
  },
});
const dataForm = ref({ email: '' });
const handleChange = (event) => {
  store.uploadEmail(event.target.value);
  dataForm.value.email = event.target.value
};


</script>
<template>
  <div class="w-[50%] pb-10 pt-10">
    <form
      @submit.prevent="$emit('handle-search', dataForm)"
      class="w-[100%] flex justify-center items-center"
    >
      <input
        type="search"
        name="email"
        class="input:focus:placeholder-transparent bg-transparent pb-2 pl-2 caret-yellow-400 bg-black border-b-2 border-white focus:outline-none focus:placeholder-transparent"
        v-model="store.email"
        placeholder="Enter a user's email"
        @change="handleChange"
      />
      <input
        type="submit"
        class="text-black text-xl ml-3 rounded-md p-2 tracking-wider font-medium cursor-pointer justify-items-end"
        value="Search"
      />
    </form>
    <!-- <FormKit
      type="form"
      form-class="w-[100%] flex justify-center items-center"
      v-model="dataForm"
      @submit="$emit('handle-search', dataForm)"
    >
      <FormKit
        type="search"
        name="email"
        :value="props.emailProp"
        placeholder="Enter a user's email"
        placeholder-class="input:focus:placeholder-transparent"
        :validation-messages="{
          required: '',
        }"
        input-class="pb-2 pl-2 caret-yellow-400 bg-black border-b-2 border-white focus:outline-none w-[100%] focus:placeholder-transparent"
        messages-class="text-red-500"
      />
      <input
        type="submit"
        class="text-black text-xl ml-3 rounded-md p-2 tracking-wider font-medium cursor-pointer justify-items-end"
        value="Search"
      /> <p v-if=""> {{  }}</p> -->
  </div>
</template>

<style lang="scss" scoped>
input[type="submit"] {
  background-color: var(--principal);
  transition: 0.5s;
  display: block;
}

input[type="submit"]:hover {
  background-color: #ffef5c;
}

input[type="submit"]:disabled {
  background-color: #ffe6008c;
  color: #00000087;
}
</style>
