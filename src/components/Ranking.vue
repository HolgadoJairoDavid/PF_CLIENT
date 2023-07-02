<script setup>
import { ref, onMounted } from "vue";
import ClienteService from "../services/ClienteService";
import { useAccessStore } from "../stores/userStore";
const storeAccess = useAccessStore()
const rankingOptions = [
  { id: 1, name: "Global", active: true },
  { id: 2, name: "Cohorte", active: false },
  { id: 3, name: "Grupo", active: false },
];
const selectedRanking = ref(1);
const selectRanking = (selectedOption) => {
  rankingOptions.forEach((option) => {
    option.active = option.id === selectedOption.id;
  });
  selectedRanking.value = selectedOption.id;
};
const allUsers = ref([]);

onMounted(async () => {

  rankingOptions.forEach((option) => {
    option.active = option.id === 1;
  });

  const resultsGlobal = await ClienteService.getGlobalRanking();
  const resultCohorts = await ClienteService.getAllCohorts();
  const resultGroups = await ClienteService.getAllGroups(storeAccess.user.cohort)

  allUsers.value = resultsGlobal.data;
  cohorts.value = resultCohorts.data;
  groups.value = resultGroups.data
});

const selectedCohort = ref("DEFAULT");
const cohorts = ref([]);
const usersByCohort = ref([]);
const usersByGroup = ref([]);
const selectedGroup = ref("DEFAULT");
const groups = ref([]);

const filteredUsersByCohort = async () => {

  const { data } = await ClienteService.getCohortRanking(selectedCohort.value);
  usersByCohort.value = [...data]
};

const filteredUsersByGroup = async () => {
    const { data } = await ClienteService.getGroupRanking(storeAccess.user.cohort, selectedGroup.value);
  usersByGroup.value = [...data]
};
</script>

<template>
  <div class="ranking-container">
    <div
      v-for="option in rankingOptions"
      :key="option.id"
      :class="{ 'ranking-option': true, active: option.active }"
      @click="selectRanking(option)"
    >
      {{ option.name }}
    </div>
    <div
      class="text-white text-xl m-3 p-3 self-start border border-yellow-400 bg-black text-center"
      v-if="selectedRanking === 1"
    >
      <h2>Puntajes totales de todos los usuarios</h2>
      <ul>
        <li v-for="user in allUsers" :key="user.id">
          {{ user?.user[0]?.name }} - Puntaje: {{ user.total }}
        </li>
      </ul>
    </div>
    <div
      class="text-white text-xl m-3 self-start border border-yellow-400 bg-black text-center"
      v-if="selectedRanking === 2"
    >
      <h2>Puntajes por cohorte</h2>
      <label for="cohortFilter">Selecciona una cohorte:</label>
      <select
        class="text-white text-lg w-fit bg-gray-800 p-3 m-3 rounded-md border border-yellow-300 hover:bg-yellow-400 hover:text-black"
        id="cohortFilter"
        @change="filteredUsersByCohort"
        v-model="selectedCohort"
      >
        <option value="DEFAULT" selected>Select</option>
        <option v-for="cohort in cohorts" :value="cohort" :key="cohort">
          {{ cohort }}
        </option>
      </select>
      <ul>
        <li v-for="user in usersByCohort" :key="user.user[0]._id">
          {{ user.user[0].name }} - Puntaje: {{ user.total }}
        </li>
      </ul>
    </div>
    <div
      class="text-white text-xl m-3 p-3 self-start border border-yellow-400 bg-black text-center"
      v-if="selectedRanking === 3"
    >
      <h2>Puntajes por grupo de la {{ storeAccess.user.cohort }}</h2>
      <label for="groupFilter">Selecciona un grupo:</label>
      <select
        class="text-white text-lg w-fit bg-gray-800 p-3 m-3 rounded-md border border-yellow-300 hover:bg-yellow-400 hover:text-black"
        id="groupFilter"
        @change="filteredUsersByGroup"
        v-model="selectedGroup"
      >
        <option value="DEFAULT" selected>Select</option>
        <option v-for="group in groups" :value="group" :key="group">
          {{ group }}
        </option>
      </select>
      <ul>
        <li v-for="user in usersByGroup" :key="user.user[0]._id">
          {{ user?.user[0]?.name }} - Puntaje: {{ user.total }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.ranking-container {
  display: flex;
  flex-wrap: wrap;

  height: 70vh;
  justify-content: space-between;
}

.ranking-option {
  flex: 1;
  margin: 5px;
  padding: 5px;
  color: var(--principal);
  cursor: pointer;
  text-align: center;
  height: fit-content;
  border: solid 1px var(--border);
  font-weight: bold;
}

.ranking-option:hover {
  background-color: var(--principal);
  color: black;
  font-weight: bold;
}

.ranking-option.active {
  background-color: black;
  color: white;
  border: solid 1px var(--principal);
}
</style>
