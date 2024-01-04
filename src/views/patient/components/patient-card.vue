<template>
  <div>

    <el-card>
      <div slot="header" class="clearfix">
        <div class="card-header">
          <span>About Patient</span>
        </div>

      </div>
      <!--{{patient_details}}-->

      <div class="patient-profile">
        <div class="box-center">
          <div class="patient-name text-center">
            {{ patient_info.first_name | capitalize }}
            {{ patient_info.last_name | capitalize }}
            <el-button @click="load_update_patient_form"><svg-icon icon-class="edit" /></el-button>

          </div>
        </div>

        <div class="patient-bio">
          <div class="patient-info patient-bio-section">
            <div class="patient-bio-section-header">
              <svg-icon icon-class="profile" /><span>Basic Info</span>
            </div>
            <div class="patient-bio-section-body">
              <div>
                <p>
                  Date of Birth:
                  <span class="text-muted">{{
                    patient_info.date_of_birth
                  }}</span>
                </p>
                <p>
                  Age: <span class="text-muted">{{ age }}</span>
                </p>
                <p>
                  Gender:
                  <span class="text-muted">{{
                    gender.gender | capitalize
                  }}</span>
                </p>
                <p>
                  Marital Status:
                  <span class="text-muted">{{
                    marital_status.marital_status | capitalize
                  }}</span>
                </p>
                <p>
                  Occupation:
                  <span class="text-muted">{{
                    patient_info.occupation | capitalize
                  }}</span>
                </p>
              </div>
            </div>
          </div>

          <div class="patient-conditions patient-bio-section">
            <div class="patient-bio-section-header">
              <svg-icon icon-class="patient_record" />
              <span>Patient Conditions</span>
            </div>

            <div class="patient-bio-section-body">
              <div>
                <p>Main Issue: <span class="text-mute">{{ patient_info.current_issue }}</span></p>
                <p>Past History: <span class="text-mute">{{ patient_info.past_history }}</span></p>
                <p>HIV Status: <span v-if="patient_info.hiv_status" class="text-mute">Postive</span><span
                  v-else
                >Negative</span>
                </p>

                <el-collapse>
                  <el-collapse-item title="Diseases">
                    <div class="grid-container">

                      <div class="tags-container">
                        <div v-for="disease in patient_info.diseases" class="tags">
                          <el-tag
                            :key="disease.id"
                            type="danger"
                            effect="dark"
                            closable
                            @close="delete_patient_tag(disease.id, patient_info.id, 'disease')"
                          >
                            {{ disease.disease }}
                          </el-tag>
                        </div>
                      </div>

                      <div class="add-tag-button">
                        <el-tooltip effect="dark" content="Add Patient Disease" placement="top">
                          <el-button class="add-button" size="mini" @click="load_add_patient_disease_form">
                            <svg-icon icon-class="add" />
                          </el-button>
                        </el-tooltip>

                      </div>
                    </div>

                  </el-collapse-item>

                  <el-collapse-item title="Symptoms">

                    <div class="tags-container">
                      <div class="tags">
                        <el-tag
                          v-for="symptom in patient_info.symptoms"
                          :key="symptom.id"
                          type=""
                          effect="dark"
                          closable
                          @close="delete_patient_tag(symptom.id, patient_info.id, 'symptom')"
                        >
                          {{ symptom.symptom }}
                        </el-tag>
                      </div>
                    </div>

                    <el-tooltip effect="dark" content="Add Patient Symptom" placement="top">
                      <el-button size="mini" @click="load_add_patient_symptom_form">
                        <svg-icon icon-class="add" />
                      </el-button>
                    </el-tooltip>

                  </el-collapse-item>

                  <el-collapse-item title="Medications">
                    <div v-if="patient_info.medications">
                      <div class="tags-container">
                        <div class="tags">
                          <el-tag
                            v-for="medication in patient_info.medications"
                            :key="medication.id"
                            type="success"
                            effect="dark"
                            closable
                            @close="delete_patient_tag(medication.id, patient_info.id, 'medication')"
                          >
                            {{ medication.medication }}
                          </el-tag>
                        </div>

                        <div class="add-tag-button">
                          <el-tooltip effect="dark" content="Add Patient Medication" placement="top">
                            <el-button size="mini" @click="load_add_patient_medication_form">
                              <svg-icon icon-class="add" />

                            </el-button>
                          </el-tooltip>

                        </div>
                      </div>

                    </div>
                  </el-collapse-item>

                  <el-collapse-item title="Allergies">
                    <div v-if="patient_info.allergies">

                      <div class="tags-container">
                        <div class="tags">
                          <el-tag
                            v-for="allergy in patient_info.allergies"
                            :key="allergy.id"
                            type="info"
                            effect="dark"
                            closable
                            @close="delete_patient_tag(allergy.id, patient_info.id, 'allergy')"
                          >
                            {{ allergy.allergies }}

                          </el-tag>
                        </div>
                      </div>

                      <div class="add-tag-button">
                        <el-tooltip effect="dark" content="Add Patient Allergy" placement="top">
                          <el-button size="mini" @click="load_add_patient_allergy_form">
                            <svg-icon icon-class="add" />
                          </el-button>
                        </el-tooltip>

                      </div>

                    </div>
                  </el-collapse-item>

                </el-collapse>

              </div>
            </div>
          </div>

          <div class="contact-info patient-bio-section">
            <div class="patient-bio-section-header">
              <svg-icon icon-class="contact" />
              <span>Contact Info</span>
            </div>

            <div class="patient-bio-section-body">
              <div>
                <p>Email:
                  <span class="text-muted">
                    {{ patient_info.email }}
                  </span>
                </p>

                <p>Telephone:
                  <span class="text-muted">
                    {{ patient_info.telephone }}
                  </span>
                </p>

                <p>Postcode:
                  <span class="text-muted">
                    {{ patient_info.postcode }}
                  </span>
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </el-card>

    <el-dialog :visible.sync="update_patient_form_loaded" :before-close="get_patient_info">

      <update-patient :patient_id="patient_id" />
    </el-dialog>

    <el-dialog :visible.sync="add_patient_disease_form_loaded" :before-close="get_patient_info">

      <add-patient-disease :patient_id="patient_id" />

    </el-dialog>

    <el-dialog :visible.sync="add_patient_symptom_form_loaded" :before-close="get_patient_info">
      <add-patient-symptom :patient_id="patient_id" />
    </el-dialog>

    <el-dialog :visible.sync="add_patient_allergy_form_loaded" :before-close="get_patient_info">
      <add-patient-allergy :patient_id="patient_id" />
    </el-dialog>

    <el-dialog :visible.sync="add_patient_medication_form_loaded" :before-close="get_patient_info">
      <add-patient-medication :patient_id="patient_id" />
    </el-dialog>

  </div>
</template>

<script>
import moment from 'moment'
import UpdatePatient from './update-patient.vue'
import AddPatientDisease from '@/views/disease/components/add-patient-disease.vue'
import AddPatientSymptom from '@/views/symptom/components/add-patient-symptom.vue'
import AddPatientAllergy from '@/views/allergy/components/add-patient-allergy.vue'
import AddPatientMedication from '@/views/medication/components/add-patient-medication.vue'
import { getSingle, deletePatientDisease, deletePatientSymptom, deletePatientMedication, deletePatientAllergy } from '@/api/patient'
export default {
  components: {
    UpdatePatient,
    AddPatientDisease,
    AddPatientSymptom,
    AddPatientAllergy,
    AddPatientMedication
  },
  filters: {
    capitalize: function(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  props: ['patient_id'],

  data() {
    return {
      update_patient_form_loaded: false,
      add_patient_disease_form_loaded: false,
      add_patient_allergy_form_loaded: false,
      add_patient_symptom_form_loaded: false,
      add_patient_medication_form_loaded: false,

      id: '',
      patient_info: {
        age: 0
      },
      gender: '',
      marital_status: ''

    }
  },
  computed: {
    age() {
      return moment().diff(this.patient_info.date_of_birth, 'year')
    }
  },
  mounted() {
    this.id = this.patient_id,
    this.get_patient_info('none')
  },

  methods: {
    get_patient_info(category) {
      getSingle(this.id).then((response) => {
        this.patient_info = response.data
        this.gender = response.data.gender
        this.marital_status = response.data.marital_status
        this.reset_dialogs(category)
      })
    },

    load_update_patient_form() {
      this.update_patient_form_loaded = true
    },

    load_add_patient_disease_form() {
      this.add_patient_disease_form_loaded = true
    },

    load_add_patient_symptom_form() {
      this.add_patient_symptom_form_loaded = true
    },

    load_add_patient_allergy_form() {
      this.add_patient_allergy_form_loaded = true
    },

    load_add_patient_medication_form() {
      this.add_patient_medication_form_loaded = true
    },

    reset_dialogs(category) {
      switch (category) {
        case 'none':
          break
        case 'update':
          this.update_patient_form_loaded = false
          break
        case 'disease':
          this.add_patient_disease_form_loaded = false
          break
        case 'symptom':
          this.add_patient_symptom_form_loaded = false
          break
        case 'medication':
          this.add_patient_medication_form_loaded = false
          break
        case 'allergy':
          this.add_patient_allergy_form_loaded = false
          break
      }
      this.update_patient_form_loaded = false,
      this.add_patient_disease_form_loaded = false,
      this.add_patient_allergy_form_loaded = false,
      this.add_patient_symptom_form_loaded = false,
      this.add_patient_medication_form_loaded = false
    },

    delete_patient_tag(id, patient_id, category) {
      switch (category) {
        case 'disease':
          if (confirm('Are you sure you want to delete patient disease?')) {
            deletePatientDisease(patient_id, id).then((response) => {
              this.$notify({
                title: 'Notification',
                type: 'success',
                message: response.data
              })
              this.get_patient_info('disease')
            })
          }
          break

        case 'symptom':
          if (confirm('Are you sure you want to delete patient symptom?')) {
            deletePatientSymptom(patient_id, id).then((response) => {
              this.$notify({
                title: 'Notification',
                type: 'success',
                message: response.data
              })
              this.get_patient_info('symptom')
            })
          }
          break

        case 'medication':
          if (confirm('Are you sure you want to delete patient medication?')) {
            deletePatientMedication(patient_id, id).then((response) => {
              this.$notify({
                title: 'Notification',
                type: 'success',
                message: response.data
              })
              this.get_patient_info('medication')
            })
          }
          break

        case 'allergy':
          if (confirm('Are you sure you want to delete patient allergy?')) {
            deletePatientAllergy(patient_id, id).then(response => {
              this.$notify({
                title: 'Notification',
                type: 'success',
                message: response.data
              })
              this.get_patient_info('allergy')
            })
          }
          break
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.el-tag+.el-tag {
  margin-left: 10px;
}

.grid-container {
  display: flex;
}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.card-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2em;
}

.patient-profile {
  .patient-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.patient-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .patient-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .patient-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }

  .tags-container {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 10px;

  }

  .add-button {
    margin-left: 10%;
  }

}
</style>
