<template>
  <div>
    <el-form>
      <el-form-item label="Patient ID:">
        <el-input v-model="id" disabled />
      </el-form-item>

      <el-form-item label="Medications:">
        <el-select v-model="medications" multiple filterable>
          <el-option
            v-for="medication in all_medications"
            :key="medication.id"
            :label="medication.medication"
            :value="medication.id"
          />
        </el-select>

        <el-button @click="load_add_medications_form">
          <svg-icon icon-class="add" />
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="add_patient_medications">Submit</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      :visible.sync="add_medications_form_loaded"
      :before-close="get_all_medications"
      append-to-body
      width="30%"
    >
      <add-medication />
    </el-dialog>
  </div>
</template>

<script>
import AddMedication from './add-medication.vue'
import { getMedications } from '@/api/medication'
import { addPatientMedication } from '@/api/patient'
export default {
  components: {
    AddMedication
  },
  props: ['patient_id'],

  data() {
    return {
      id: '',
      all_medications: [],
      medications: [],
      add_medications_form_loaded: false

    }
  },

  mounted() {
    this.id = this.patient_id
    this.get_all_medications()
  },

  methods: {
    get_all_medications() {
      getMedications().then((response) => {
        this.all_medications = response.data
        this.add_medications_form_loaded = false
      })
    },

    load_add_medications_form() {
      this.add_medications_form_loaded = true
    },

    add_patient_medications() {
      const patient_info = {
        patient_id: this.id,
        medication_id: this.medications
      }
      addPatientMedication(patient_info).then((response) => {
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
