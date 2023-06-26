<script>
export default {
    data() {
        return {
            rankingOptions: [
                { id: 1, name: 'Global', active: true },
                { id: 2, name: 'Cohorte', active: false },
                { id: 3, name: 'Grupo', active: false }
            ],
            selectedRanking: 1,
            allUsers: [
                { id: 1, name: 'User 1', totalScore: 100, cohort: 'cohort1', group: 'group1' },
                { id: 2, name: 'User 2', totalScore: 80, cohort: 'cohort2', group: 'group1' },
                { id: 3, name: 'User 3', totalScore: 120, cohort: 'cohort1', group: 'group2' }
                // ...
            ],
            selectedCohort: '',
            cohorts: [
                { id: 'cohort1', name: 'Cohort 1' },
                { id: 'cohort2', name: 'Cohort 2' },
                { id: 'cohort3', name: 'Cohort 3' }
                // ...
            ],
            selectedGroup: '',
            groups: [
                { id: 'group1', name: 'Group 1' },
                { id: 'group2', name: 'Group 2' },
                { id: 'group3', name: 'Group 3' }
                // ...
            ]
        };
    },
    computed: {
        filteredUsersByCohort() {
            if (this.selectedCohort === '') {
                return this.allUsers;
            } else {
                return this.allUsers.filter(user => user.cohort === this.selectedCohort);
            }
        },
        filteredUsersByGroup() {
            if (this.selectedGroup === '') {
                return this.allUsers;
            } else {
                return this.allUsers.filter(user => user.group === this.selectedGroup);
            }
        }
    },
    methods: {
        selectRanking(selectedOption) {
            this.rankingOptions.forEach(option => {
                option.active = option.id === selectedOption.id;
            });
            this.selectedRanking = selectedOption.id;
        }
    },
    mounted() {
        this.rankingOptions.forEach(option => {
            option.active = option.id === 1;
        });
    }
};
</script>

<template>
    <div class="ranking-container">
        <div v-for="option in rankingOptions" :key="option.id" :class=" { 'ranking-option': true, 'active': option.active }"
            @click="selectRanking(option)">
            {{ option.name }}
        </div>
        <div class="text-white text-xl m-3 p-3 self-start border border-yellow-400 bg-black  text-center" v-if="selectedRanking === 1">
            <h2>Puntajes totales de todos los usuarios</h2>
            <ul>
                <li v-for="user in allUsers" :key="user.id">
                    {{ user.name }} - Puntaje: {{ user.totalScore }}
                </li>
            </ul>
        </div>
        <div class="text-white text-xl m-3 self-start border border-yellow-400 bg-black text-center" v-if="selectedRanking === 2">
            <h2>Puntajes por cohorte</h2>
            <label for="cohortFilter">Selecciona una cohorte:</label>
            <select class="text-white text-lg w-fit bg-gray-800 p-3 m-3 rounded-md border border-yellow-300 hover:bg-yellow-400 hover:text-black" id="cohortFilter" v-model="selectedCohort">
                <option value='DEFAULT' selected>Select </option>
                <option v-for="cohort in cohorts" :value="cohort.id" :key="cohort.id">{{ cohort.name }}</option>
            </select>
            <ul>
                <li v-for="user in filteredUsersByCohort" :key="user.id">
                    {{ user.name }} - Puntaje: {{ user.totalScore }}
                </li>
            </ul>
        </div>
        <div class="text-white text-xl m-3 p-3 self-start border border-yellow-400 bg-black text-center" v-if="selectedRanking === 3">
            <h2>Puntajes por grupo</h2>
            <label for="groupFilter">Selecciona un grupo:</label>
            <select class="text-white text-lg w-fit bg-gray-800 p-3 m-3 rounded-md border border-yellow-300 hover:bg-yellow-400 hover:text-black" id="groupFilter" v-model="selectedGroup">
                <option value='DEFAULT' selected>Select </option>
                <option v-for="group in groups" :value="group.id" :key="group.id">{{ group.name }}</option>
            </select>
            <ul>
                <li v-for="user in filteredUsersByGroup" :key="user.id">
                    {{ user.name }} - Puntaje: {{ user.totalScore }}
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
  