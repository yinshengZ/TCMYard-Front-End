<template>
    <div>



        <div class="income-details-container">
            <div class="patient-info">
                <el-divider>Customer's Info</el-divider>

                <div class="customer-name">

                    <div class="content">
                        <span class="label">Customer Name: </span>
                        <el-popconfirm confirmButtonText="Go" cancelButtonText="Cancel"
                            title="Move to the patient's profile page?"
                            @onConfirm="get_patient_details(patient_details.id)">

                            <span slot="reference" class="capitalize link-text">{{
                                patient_details.first_name }} {{
                                patient_details.last_name
                            }}</span>
                        </el-popconfirm>

                    </div>

                </div>

            </div>
            <div class="customer-contatcs">
                <div><el-divider>
                        Contacts
                    </el-divider></div>

                <div class="content">
                    <div class="email">
                        <span class="label">Email: </span>
                        <span>{{ patient_details.email }}</span>
                    </div>
                    <div class="telephone">
                        <span class="label">Telephone: </span>
                        <span>
                            {{ patient_details.telephone }}
                        </span>
                    </div>

                    <div class="postcode">
                        <span class="label">Postcode: </span>
                        <span>{{ patient_details.postcode }}</span>

                    </div>

                </div>

            </div>


            <div class="income-details">
                <div class="divider">
                    <el-divider>Other Details</el-divider>
                </div>

                <div class="service">
                    <span class="label">Income Type: </span>
                    <span class="capitalize">
                        {{ service.categories }}
                    </span>
                </div>

                <div class="payment-type">
                    <span class="label">Payment Type: </span>
                    <span class="capitalize">
                        {{ payment_method.payment_type }}
                    </span>
                </div>
            </div>










        </div>

    </div>
</template>


<script>
import { getIncomeById } from '@/api/finance';

export default {
    props: ['income_id'],
    data() {
        return {
            income_details: [],
            id: this.income_id,
            patient_details: [],
            payment_method: [],
            service: [],
            user: [],
        }
    },
    mounted() {
        this.get_income_by_id()
    },
    methods: {
        get_patient_details(id) {
            this.$router.push({ path: '/patient/details/' + id })
        },
        get_income_by_id() {
            getIncomeById(this.id).then((response) => {
                this.income_details = response.data
                this.patient_details = response.data[0].patient
                this.payment_method = response.data[0].payment_method
                this.service = response.data[0].service
                this.user_details = response.data[0].user


            })
        }
    }


}
</script>


<style scoped>
.income-details-container {

    display: flex;
    flex-direction: column;
    /*     justify-content: center;
 */
    width: 100%;
    height: 100vh;
}

.label {
    font-size: 1.1em;
    padding-left: 3%;
    padding-right: 5%;
    text-align: end;

}

.patient-info {}

.income_details_container {}

.link-text:hover {
    text-decoration: underline;
    cursor: pointer;
}


.capitalize {
    text-transform: capitalize;
}
</style>