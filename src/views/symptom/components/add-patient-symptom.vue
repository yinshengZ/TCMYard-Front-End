<template>
  <div>
    <el-form>
      <el-form-item label="Patient ID:">
        <el-input v-model="id" disabled />
      </el-form-item>

      <el-form-item label="Symptoms:">
        <el-select v-model="symptoms" multiple filterable>
          <el-option
            v-for="symptom in all_symptoms"
            :key="symptom.id"
            :label="symptom.symptom"
            :value="symptom.id"
          />
        </el-select>

        <el-button @click="load_add_symptoms_form"><svg-icon icon-class="add" /></el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="add_patient_symptom">Submit</el-button>
      </el-form-item>
    </el-form>

    <el-dialog width="30%" :visible.sync="add_symptoms_form_loaded" :before-close="get_all_symptoms" append-to-body>
      <add-symptom />
    </el-dialog>

  </div>
</template>

<script>

import AddSymptom from '@/views/patient/add-symptom.vue'

import { getSymptoms } from '@/api/symptom'

import { addPatientSymptom } from '@/api/patient'
export default {
  components: {
    AddSymptom
  },
  props: ['patient_id'],
  data() {
    return {
      id: '',
      all_symptoms: [],
      symptoms: [],
      add_symptoms_form_loaded: false
    }
  },

  mounted() {
    this.id = this.patient_id
    this.get_all_symptoms()
  },

  methods: {
    get_all_symptoms() {
      getSymptoms().then((response) => {
        this.all_symptoms = response.data
        this.add_symptoms_form_loaded = false
      })
    },

    load_add_symptoms_form() {
      this.add_symptoms_form_loaded = true
    },

    add_patient_symptom() {
      const patient_symptoms = {
        patient_id: this.id,
        symptom_id: this.symptoms
      }
      addPatientSymptom(patient_symptoms).then((response) => {
        this.$notify({
          title: 'Notification',
          type: 'success',
          message: response.data
        })
      })
    }

  }
}

</script>

<style scoped></style>
