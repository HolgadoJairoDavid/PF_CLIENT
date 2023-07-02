<script setup>
import { onMounted, ref, watch, computed } from "vue";
import ClienteService from "../services/ClienteService";
import { useAccessStore } from "../stores/userStore";
import { useUsers } from "../stores/userStore";
import { useRouter } from "vue-router";
import SearchBar from "../components/SearchBar.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const storeAccess = useAccessStore();
const storeUsers = useUsers();
const cohorts = ref(new Set());
const groups = ref(new Set());
const cohortsAndStudents = ref(new Object());
const groupsAndStudents = ref(new Object());
const router = useRouter();

///////////////////////////////////////////////////////
const currentUsers = ref(storeUsers.users);
const page = ref(1);
const usersPerPage = 5;
const pages = ref([]);

watch(currentUsers, () => {
  setPages();
});

const displayedUsers = computed(() => {
  const from = (page.value - 1) * usersPerPage;
  const to = page.value * usersPerPage;
  return storeUsers.users.slice(from, to);
})

const previusPage = () => {
 if(page.value > 1) {
   page.value--;
 }
}

const nextPage = () => {
 if(page.value < pages.value.length) {
   page.value++;
 }
}

const setPages = () => {
  pages.value = Array.from({length: Math.ceil(storeUsers.users.length / usersPerPage)}, (_, index) => index + 1);
}

////////////////////////////////////////////////////////
onMounted(() => {
  if (!storeAccess.access || !storeAccess.admin) {
    router.push({ name: "login" });
  } else {
    setPages();
    if (
      !Object.values(storeAccess.types)[0] &&
      !Object.values(storeAccess.types)[1]
    ) {
      reload();
    }
  }
});
///////////////////////////////////////////////

const handleSearch = async (dataForm) => {
  if (!dataForm.email) {
    toast.warning("Make sure you enter the email of a user", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  } else {
    const { data } = await ClienteService.searchByName({
      email: dataForm.email,
    });
    storeUsers.uploadUsers(data);
    currentUsers.value = storeUsers.users;
    storeUsers.uploadEmail("");
  }
};
const DEFAULT = ref("DEFAULT");
const COHORT = ref("COHORT");
const GROUP = ref("GROUP");
const reload = () => {
  DEFAULT.value = "DEFAULT";
  COHORT.value = "COHORT";
  GROUP.value = "GROUP";
  cohorts.value = new Set()
  groups.value = new Set()
  setPages();
  cohortsAndStudents.value = new Object();
  groupsAndStudents.value = new Object();
  storeAccess.resetTypes();
  ClienteService.getAllUsers().then(({ data }) => {
    storeUsers.uploadUsers(data);
    storeUsers.uploadUsersAllAlways(data);

    currentUsers.value = storeUsers.users;
    page.value = 1;
    for (let i = 0; i < storeUsers.users.length; i++) {
      if (!cohorts.value.has(storeUsers.users[i].cohort)) {
        cohorts.value.add(storeUsers.users[i].cohort);
      }
    }
    const cohortsArray = [...cohorts.value];
    cohortsArray.sort();
    cohorts.value = new Set(cohortsArray);
    for (let i = 0; i < storeUsers.users.length; i++) {
      if (storeUsers.users[i].cohort === storeAccess.user.cohort) {
        if (!groups.value.has(storeUsers.users[i].group)) {
          groups.value.add(storeUsers.users[i].group);
        }
      }
    }
    ///////////////////////////////////////////
    cohorts.value.forEach((cohort) => {
      let estudiantes = 0;
      for (let i = 0; i < storeUsers.users.length; i++) {
        if (cohort === storeUsers.users[i].cohort) {
          estudiantes++;
        }
      }
      cohortsAndStudents.value[cohort] = estudiantes;
    });

    ///////////////////////////////////////

    groups.value.forEach((group) => {
      let estudiantes = 0;
      for (let i = 0; i < storeUsers.users.length; i++) {
        if (storeUsers.users[i].cohort === storeAccess.user.cohort) {
          if (group === storeUsers.users[i].group) {
            estudiantes++;
          }
        }
      }
      groupsAndStudents.value[group] = estudiantes;
    });
  });
};
////////////////////////////////////////

const valueOfOrder = (event) => {
  storeAccess.orderUsers(event.target.value);
  currentUsers.value = storeUsers.users;
  setPages();
};
const valueOfFilterOne = (event) => {
  storeAccess.filterUsers(event.target.value);
  currentUsers.value = storeUsers.users;
  setPages();
};

const handleUser = (id) => {
  router.push({ path: `/admin/student-detail/${id}` });
};
</script>
<template>
  <div
    class="h-screen flex flex-col justify-evenly m-auto mt-10 overflow-x-hidden"
  v-if="storeAccess.access"
    >
    <div
      class="flex flex-col justify-evenly md:justify-evenly items-center space-y-2 md:space-y-0 mt-20 md:mt-24 p-3 text-white text-2xl font-bold overflow-hidden"
    >
      <h1>ADMIN DASHBOARD</h1>
      <h2>Cohorts</h2>
      <div class="w-[70%] flex justify-around">
        <div class="text-white" v-for="cohort in cohorts" :key="cohort">
          <p>
            {{ cohort }}=
            <span class="font-light">{{ cohortsAndStudents[cohort] }}</span>
          </p>
        </div>
      </div>
      <h2>Groups</h2>
      <div class="w-[70%] flex justify-around">
        <div class="text-white" v-for="group in groups" :key="group">
          <p>
            {{ group }}=
            <span class="font-light">{{ groupsAndStudents[group] }}</span>
          </p>
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
      >
        <select
          class="text-white text-lg bg-gray-800 p-3 rounded-md border border-yellow-300 hover:bg-yellow-400 hover:text-black"
          name="valueOfOrder"
          id=""
          @change="valueOfOrder"
          v-model="DEFAULT"
        >
          <option value="DEFAULT" selected>Order</option>
          <option value="DEFAULT" disabled>-- Order By Email --</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="DEFAULT" disabled>-- Order By Cohort --</option>
          <option value="CohortA">Lower to Higher</option>
          <option value="CohortD">Higher to Lower</option>
          <option value="DEFAULT" disabled>-- Order By Group --</option>
          <option value="GroupA">Lower to Higher</option>
          <option value="GroupD">Higher to Lower</option>
        </select>
        <select
          class="text-white text-lg w-fit bg-gray-800 p-3 rounded-md border border-yellow-300 hover:bg-yellow-400 hover:text-black"
          name=""
          id=""
          v-model="COHORT"
          @change="valueOfFilterOne"
        >
          <option value="COHORT" selected>Filter By Cohort</option>
          <option
            v-for="cohort in cohorts"
            :value="cohort"
            :key="`${cohort}filter`"
          >
            {{ cohort }}
          </option>
        </select>
        <select
          class="text-white text-lg w-fit bg-gray-800 p-3 rounded-md border border-yellow-300 hover:bg-yellow-400 hover:text-black"
          name=""
          id=""
          v-model="GROUP"
          @change="valueOfFilterOne"
        >
          <option value="GROUP" selected>Filter By Group</option>
          <option
            v-for="group in groups"
            :value="group"
            :key="`${group}filter`"
          >
            {{ group }}
          </option>
        </select>
        <button
          class="bg-yellow-300 p-3 rounded-md text-black font-bold w-fit text-lg hover:bg-gray-800 hover:text-white"
          @click="reload"
        >
          RELOAD
        </button>
        <a
          class="bg-yellow-300 p-3 rounded-md text-black font-bold w-fit text-lg hover:bg-gray-800 hover:text-white cursor-pointer"
          href="https://henry-sup.netlify.app/" 
          target="_blank"
        >
          ASISTENCIA
        </a>
      </div>
      <h1>STUDENTS</h1>
      <SearchBar @handle-search="handleSearch" :emailProp="email" />
      <div
        class="text-sky-50 text-lg flex flex-wrap justify-center items-center md:h-[70%] max-h-full overflow-y-auto"
        v-if="storeAccess.admin"
      >
        <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div
            v-for="user in displayedUsers"
            class="bg-gray-800 p-2 m-2 border border-yellow-300 hover:bg-black hover:text-white cursor-pointer"
            :key="user._id"
            @click="handleUser(user._id)"
          >
            <p>{{ user.email }}</p>
            <p>Cohort: {{ user.cohort }}</p>
            <p>Group: {{ user.group }}</p>
          </div>
        </div>
      </div>
      <!-- ACÁ COMIENZA LO QUE SON LOS BOTONES DEL PAGINADO -->
      <div class="text-white flex m-auto w-full mt-2 md:w-[30%] md:mt-3 justify-center">
        <button
          v-if="pages.length > 1"
          type="button"
          class="bg-yellow-300 p-2 m-2 rounded-md text-black font-bold hover:bg-gray-800 hover:text-white"
          @click="previusPage"
          :disabled="page === 1"
        >
          Prev
        </button>
        <div class="flex space-x-2">
          <button
            type="button"
            v-for="pageNumber in pages"
            @click="page = pageNumber"
            :key="pageNumber"
            :class="['bg-yellow-300 p-2 m-2 rounded-md text-black font-bold hover:bg-gray-800 hover:text-white', { 'bg-gray-800 text-white': page === pageNumber }]"
          >
            {{ pageNumber }}
          </button>
        </div>
        <button
          v-if="pages.length > 1"
          type="button"
          @click="nextPage"
          :disabled="page === pages.length"
          class="bg-yellow-300 p-2 m-2 rounded-md text-black font-bold hover:bg-gray-800 hover:text-white"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>