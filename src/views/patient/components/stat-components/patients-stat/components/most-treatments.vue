<template>
    <div>
        <div class="select-box">
            <span>No. of Patients </span>
            <el-select v-model="no_of_patients" filterable>
                <el-option v-for="no in no_of_patients_select" :key="no" :label="no" :value="no">
                    {{ no }}
                </el-option>
            </el-select>
        </div>

        <div class="data-table">
            <el-table :data="patient_treatments" border v-loading="loading">
                <el-table-column label="ID" class="table-columns">
                    <template slot-scope="{row}">
                        <div>
                            {{ row.patients.id }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="First Name">
                    <template slot-scope="{row}">
                        <div>
                            <el-popconfirm title="Move to patient's profile page?"
                                @onConfirm="redirect_to_patient(row.patient_id)">
                                <span slot="reference" class="capitalize clickable">{{
                                    row.patients.first_name }}</span>
                            </el-popconfirm>

                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="Last Name">
                    <template slot-scope="{row}">
                        <div>
                            <span class="capitalize clickable">{{ row.patients.last_name }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="Email">
                    <template slot-scope="{row}">
                        <div>
                            {{ row.patients.email }}
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="Telephone">
                    <template slot-scope="{row}">
                        <div>
                            {{ row.patients.telephone }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="Treatments">
                    <template slot-scope="{row}">
                        <div>
                            {{ row.total }}
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="">
                    <template slot-scope="{row}">

                        <div class="table-actions">
                            <div>
                                <el-button type="primary"
                                    @click="load_patient_treatment_distributions(row.patient_id, row.patients.first_name, row.patients.last_name, row.patients.telephone, row.patients.email)">Details</el-button>

                            </div>

                            <div>
                                <el-popconfirm title="Move to patient's profile?"
                                    @onConfirm="redirect_to_patient(row.patient_id)">

                                    <el-button type="warning" slot="reference">Profile</el-button>
                                </el-popconfirm>
                            </div>

                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>


        <el-dialog :visible.sync="patient_treatment_distributions_loaded" :before-close="get_patient_treatments">
            <patient-treatment-distributions :id="patient_id" :first_name="patient_first_name"
                :last_name="patient_last_name" :telephone="patient_telephone" :email="patient_email"
                :key="key"></patient-treatment-distributions>

        </el-dialog>
    </div>
</template>

<script>
import { getPatientTreatmentStats } from '@/api/patient.js'

import patientTreatmentDistributions from './patient-treatment-distributions.vue'
export default {
    components: {
        patientTreatmentDistributions,
    },
    data() {
        return {
            loading: true,
            patient_treatments: [],
            no_of_patients: 10,
            no_of_patients_select: [10, 20, 30, 50, 100],
            patient_id: 0,
            patient_first_name: '',
            patient_last_name: '',
            patient_telephone: '',
            patient_email: '',
            patient_treatment_distributions_loaded: false,
            key: 0,

        }
    },
    mounted() {
        this.get_patient_treatments()
    },
    watch: {
        no_of_patients: function () {
            this.get_patient_treatments()
        }
    },

    methods: {
        get_patient_treatments() {
            this.loading = true
            this.patient_treatment_distributions_loaded = false
            getPatientTreatmentStats(this.no_of_patients).then(response => {

                this.patient_treatments = response.data
                this.loading = false

            })
        },
        load_patient_treatment_distributions(id, first_name, last_name, telephone, email) {
            this.key += 1
            this.patient_id = id
            this.patient_first_name = first_name
            this.patient_last_name = last_name
            this.patient_telephone = telephone
            this.patient_email = email
            this.patient_treatment_distributions_loaded = true
        },
        redirect_to_patient(id) {
            this.$router.push({ path: '/patient/details/' + id })
        }
    }
}
</script>

<style scoped lang="scss">
.data-table {
    width: 100%;
    display: flex;
    justify-content: center;
}

.table-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 3%;
}

.select-box {
    width: fit-content;
}



.capitalize {
    text-transform: capitalize;

}

.clickable:hover {
    text-decoration: underline;
    cursor: pointer;
}
</style>
