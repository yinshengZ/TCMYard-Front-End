<template>
  <div>

    <div slot="header">
      <h3>Patient Info Update</h3>
    </div>
    <el-form :model="patient_info" label-width="120px" label-position="left">

      <el-divider>Personal Info</el-divider>

      <div class="grid-container name">

        <div class="first-name">
          <el-form-item label="First Name">
            <el-input v-model="patient_info.first_name" />
          </el-form-item>
        </div>

        <div class="last-name">
          <el-form-item label="Last Name">
            <el-input v-model="patient_info.last_name" />
          </el-form-item>
        </div>

      </div>

      <div class="grid-container">
        <div class="gender">

          <el-form-item label="Gender">

            <el-select v-model="patient_info.gender_id" filterable>
              <el-option v-for="gender in genders" :key="gender.id" :label="gender.gender" :value="gender.id" />

            </el-select>

          </el-form-item>

        </div>

        <div class="postcode">
          <el-form-item label="Postcode">
            <el-input v-model="patient_info.postcode" />
          </el-form-item>

        </div>

      </div>

      <el-divider>Contacts</el-divider>
      <el-form-item label="Telephone">
        <el-input v-model="patient_info.telephone" />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="patient_info.email" />
      </el-form-item>

      <el-divider>About</el-divider>
      <el-form-item label="Marital Status">

        <el-select v-model="patient_info.marital_status_id" filterable>
          <el-option
            v-for="marital in maritals"
            :key="marital.id"
            :label="marital.marital_status"
            :value="marital.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Occupation">
        <el-input v-model="patient_info.occupation" />
      </el-form-item>
      <el-form-item label="Past History">
        <el-input v-model="patient_info.past_history" type="textarea" />
      </el-form-item>
      <el-form-item label="Current Issue">
        <el-input v-model="patient_info.current_issue" type="textarea" />
      </el-form-item>

      <el-form-item label="Disease">

        <el-select v-model="patient_disease_ids" multiple filterable>
          <el-option v-for="disease in diseases" :key="disease.id" :label="disease.disease" :value="disease.id" />
        </el-select>

        <el-button class="add-button" plain @click="load_add_disease_form"> <svg-icon
          icon-class="add"
        /></el-button>

      </el-form-item>

      <el-form-item label="Medication">

        <el-select v-model="patient_medication_ids" multiple filterable>
          <el-option
            v-for="medication in medications"
            :key="medication.id"
            :label="medication.medication"
            :value="medication.id"
          />
        </el-select>

        <el-button class="add-button" plain @click="load_add_medication_form"><svg-icon
          icon-class="add"
        /></el-button>

      </el-form-item>

      <el-form-item label="Allergies">

        <el-select v-model="patient_allergy_ids" multiple filterable>
          <el-option
            v-for="allergy in allergies"
            :key="allergy.id"
            :label="allergy.allergies"
            :value="allergy.id"
          />

        </el-select>

        <el-button class="add-button" plain @click="load_add_allergy_form"><svg-icon
          icon-class="add"
        /></el-button>

      </el-form-item>

      <el-form-item label="Symptoms">

        <el-select v-model="patient_symptom_ids" multiple filterable>
          <el-option v-for="symptom in symptoms" :key="symptom.id" :label="symptom.symptom" :value="symptom.id" />
        </el-select>
        <el-button class="add-button" plain @click="load_add_symptom_form"><svg-icon
          icon-class="add"
        /></el-button>

      </el-form-item>

      <el-form-item label="Date of Birth">
        <el-date-picker v-model="patient_info.date_of_birth" type="date" />
      </el-form-item>
      <el-form-item label="HIV">
        <el-switch v-model="patient_info.hiv_status" />

      </el-form-item>

      <el-form-item label="Date Joined">
        <el-date-picker v-model="patient_info.date_joined" type="date" />
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="update_patient_info">Submit</el-button>
      </el-form-item>

    </el-form>

    <el-dialog :visible.sync="add_medication_form_loaded" :before-close="get_medications" append-to-body>
      <add-medication />
    </el-dialog>

    <el-dialog :visible.sync="add_disease_form_loaded" :before-close="get_diseases" append-to-body>
      <add-disease />
    </el-dialog>

    <el-dialog :visible.sync="add_allergy_form_loaded" :before-close="get_allergies" append-to-body>
      <add-allergy />
    </el-dialog>

    <el-dialog :visible.sync="add_symptom_form_loaded" :before-close="get_symptoms" append-to-body>
      <add-symptom />
    </el-dialog>

  </div>
</template>

<script>

import { getSingle, getGenders, getMarital, updatePatient } from '@/api/patient'

import { getMedications } from '@/api/medication'
import { getDiseases } from '@/api/disease'
import { getAllergies } from '@/api/allergy'
import { getSymptoms } from '@/api/symptom'

import AddMedication from '@/views/medication/components/add-medication.vue'
import AddDisease from '@/views/disease/components/add-disease.vue'
import AddAllergy from '../add-allergy.vue'
import AddSymptom from '../add-symptom.vue'
export default {
  components: {
    AddMedication,
    AddDisease,
    AddAllergy,
    AddSymptom
  },
  props: ['patient_id'],
  data() {
    return {
      patient_info: {
        first_name: '',
        last_name: '',
        gender_id: 0

      },
      patient_allergy_ids: [],
      patient_disease_ids: [],
      patient_symptom_ids: [],
      patient_medication_ids: [],

      id: '',
      genders: [],
      maritals: [],
      diseases: [],
      allergies: [],
      symptoms: [],
      medications: [],
      data_change: false,
      add_medication_form_loaded: false,
      add_disease_form_loaded: false,
      add_allergy_form_loaded: false,
      add_symptom_form_loaded: false

    }
  },

  watch: {
    patient_info: function() {
      this.data_change = true
    },

    id: function(newVal) {
      this.id = newVal
    }
  },

  mounted() {
    this.id = this.patient_id
    this.get_patient_info()
    this.get_genders()
    this.get_maritals()
    this.get_diseases()
    this.get_allergies()
    this.get_medications()
    this.get_symptoms()
  },

  created() {

  },

  methods: {
    get_genders() {
      getGenders().then((response) => {
        this.genders = response.data
      })
    },

    get_maritals() {
      getMarital().then((response) => {
        this.maritals = response.data
      })
    },
    get_patient_info() {
      getSingle(this.id).then((response) => {
        this.patient_info = response.data

        for (let i = 0; i < this.patient_info.allergies.length; i++) {
          this.patient_allergy_ids.push(this.patient_info.allergies[i].id)
        }

        for (let i = 0; i < this.patient_info.symptoms.length; i++) {
          this.patient_symptom_ids.push(this.patient_info.symptoms[i].id)
        }

        for (let i = 0; i < this.patient_info.diseases.length; i++) {
          this.patient_disease_ids.push(this.patient_info.diseases[i].id)
        }

        for (let i = 0; i < this.patient_info.medications.length; i++) {
          this.patient_medication_ids.push(this.patient_info.medications[i].id)
        }
      })
    },

    load_add_medication_form() {
      this.add_medication_form_loaded = true
    },
    load_add_disease_form() {
      this.add_disease_form_loaded = true
    },

    load_add_allergy_form() {
      this.add_allergy_form_loaded = true
    },

    load_add_symptom_form() {
      this.add_symptom_form_loaded = true
    },

    update_patient_info() {
      this.patient_info.allergy_ids = this.patient_allergy_ids
      this.patient_info.disease_ids = this.patient_disease_ids
      this.patient_info.symptom_ids = this.patient_symptom_ids
      this.patient_info.medication_ids = this.patient_medication_ids
      console.log(this.patient_info.hiv_status)
      updatePatient(this.patient_info, this.id).then((response) => {
        this.$notify({
          title: 'Notification',
          type: 'success',
          message: response.data
        })
      })
    },

    get_diseases() {
      getDiseases().then((response) => {
        this.diseases = response.data
        this.add_disease_form_loaded = false
      })
    },

    get_medications() {
      getMedications().then((response) => {
        this.medications = response.data
        this.add_medication_form_loaded = false
      })
    },

    get_allergies() {
      getAllergies().then((response) => {
        this.allergies = response.data
        this.add_allergy_form_loaded = false
      })
    },
    get_symptoms() {
      getSymptoms().then((response) => {
        this.symptoms = response.data
        this.add_symptom_form_loaded = false
      })
    }

  }
}

</script>

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2%;
}

.add-button {
    margin-left: 2%;
}
</style>
