<template>
    <div>


        <div class="patient-details">
            <div>
                <p>
                    <span class="label">Name: </span>
                    <el-popconfirm title="Move to patient's profile?" @onConfirm="redirect_to_patient(patient_id)">
                        <span slot="reference" class="capitalize link">{{ patient_first_name }} {{ patient_last_name
                            }}</span>
                    </el-popconfirm>

                </p>
            </div>

            <div>
                <p>
                    <span class="label">Phone: </span>
                    <span>{{ patient_telephone }}</span>
                </p>
            </div>


            <div>
                <p>
                    <span class="label">Email: </span>
                    <span>{{ patient_email }}</span>
                </p>

            </div>



        </div>
        <el-table :data="patient_treatments" v-loading="loading">
            <el-table-column label="Category">
                <template slot-scope="{row}">
                    <div>
                        <span class="capitalize">{{ row.category.categories }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="Treatments">
                <template slot-scope="{row}">
                    <div>
                        <span>{{ row.count }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="Total Earning">
                <template slot-scope="{row}">
                    <div>
                        <span>{{ row.income.total }}</span>
                    </div>
                </template>
            </el-table-column>

        </el-table>
    </div>


</template>

<script>
import { getPatientTreatmentDistributions } from '@/api/treatment';

export default {
    props: ['id', 'first_name', 'last_name', 'telephone', 'email'],
    data() {
        return {
            patient_id: this.id,
            patient_first_name: this.first_name,
            patient_last_name: this.last_name,
            patient_telephone: this.telephone,
            patient_email: this.email,
            patient_treatments: [],
            loading: true,
        }
    },

    mounted() {
        this.get_patient_treatments()
    },

    methods: {
        get_patient_treatments() {
            this.loading = true
            getPatientTreatmentDistributions(this.patient_id).then((response) => {
                this.patient_treatments = response.data
                this.loading = false
            })
        },

        redirect_to_patient(id) {
            this.$router.push({ path: '/patient/details/' + id })
        }
    }


}

</script>


<style scoped lang="scss">
.patient-details {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 1%;
}

.label {
    font-weight: bold;
}

.capitalize {
    text-transform: capitalize;
}

.link:hover {
    text-decoration: underline;
    cursor: pointer;

}
</style>