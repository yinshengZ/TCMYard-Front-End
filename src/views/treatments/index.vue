<template>
  <div class="app-container">

    <treatments-table :patient_id="patient_id" :user_id="user_id" />

    <add-herbs-alt></add-herbs-alt>


  </div>
</template>

<script>
import TreatmentsTable from './components/TreatmentsTable.vue'
import addHerbsAlt from './components/add-herbs-alt.vue';

export default {
  components: { TreatmentsTable, addHerbsAlt },
  props: ['patient_id', 'user_id'],
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped></style>
