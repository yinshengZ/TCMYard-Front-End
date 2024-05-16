<template>
    <div>
        <el-card>

            <div class="card-header">

                <div class="header-title">
                    <h2>All Incomes By Year</h2>
                    <p>Showing Incomes From Year <span class="year-text">{{ year }}</span> </p>

                </div>



                <div class="year-selector">
                    <span class="year-selector-title">Select a year to show: </span>
                    <el-select v-model="year" placeholder="year">
                        <el-option v-for="year in income_years" :key="year.year" :value="year.year"
                            :label="year.year"></el-option>
                    </el-select>
                    <el-tooltip effect="dark" placement="top" content="Add Income">
                       <el-button plain @click="load_add_income_form"><svg-icon icon-class="add"></svg-icon></el-button>
                    </el-tooltip>
                </div>
            </div>



            <el-table :data="paged_incomes" v-loading="loading_data">
                <el-table-column label="ID" width="70">
                    <template slot-scope="{row}">
                        <div>
                            {{ row.id }}
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="Category" width="120px">

                    <template slot-scope="{row}">
                        <div>
                            <span class="capitalize">{{ row.service.categories }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="Income" width="120px">

                    <template slot-scope="{row}">
                        <div>
                            <span>{{ row.amount / 100 }}</span>
                        </div>
                    </template>
                </el-table-column>

             <!--    <el-table-column label="Before Discount">

                    <template slot-scope="{row}">
                        <div>
                            <span>{{ row.original_amount / 100 }}</span>
                        </div>
                    </template>
                </el-table-column> -->

                <el-table-column label="Discount" width="120px">

                    <template slot-scope="{row}">
                        <div>
                            <span>{{ row.discount }}%</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="Payment Method" width="150px">

                    <template slot-scope="{row}">
                        <div>
                            <span class="capitalize">{{ row.payment_method.payment_type }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="Date" fit="true" width="150px">

                    <template slot-scope="{row}">
                        <div>
                            <span>{{ row.date }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="Patient" width="350px">

                    <template slot-scope="{row}">
                        <!-- <div>
                            <el-button type="primary" @click="load_income_details_drawer(row.id)">Patient's
                                Info</el-button>

                        </div> -->
                        <el-popconfirm
                        confirmButtonText="Go"
                        cancelButtonText="Cancel"
                        title="Move to the patient's profile page?"
                        @onConfirm="get_patient_details(row.patient.id)">

                        <div slot="reference" class="patient-name">
                            <span class="capitalize">{{ row.patient.first_name }} </span>
                            <span class="capitalize"> {{ row.patient.last_name }}</span>
                        </div>
                        </el-popconfirm>
                       
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="Add New Income"
            :visible.sync="add_income_form_loaded"
            :before-close="get_income_by_year"
            >
            <add-income-form></add-income-form>
            </el-dialog>

            <el-pagination background layout="sizes, prev, pager, next " :page-size="pagination.page_size"
                :page-sizes="pagination.page_sizes" :total="incomes.length" @size-change="change_page_size"
                @current-change="set_page"></el-pagination>

        </el-card>

        
    </div>
</template>


<script>
import { getIncomeYears, getIncomeByYear } from '@/api/finance';
import { getCurrentYear } from '@/utils/date';
import IncomeDetails from './income-details.vue'
import addIncomeForm from './add-income-form.vue';
export default {
    components: {
        IncomeDetails,
        addIncomeForm
    },
    data() {
        return {
            loading_data: true,
            income_years: [],
            year: 0,
            incomes: [],
            add_income_form_loaded:false,
            income_id: '',
            key: 0,
            pagination: {
                page_size: 5,
                page: 1,
                page_sizes: [5, 10, 15, 20, 50, 70, 100]
            }
        }
    },
    created() {
        this.get_current_year()
    },

    mounted() {
        this.get_income_years()
        this.get_income_by_year()
    },

    watch: {
        year() {
            this.get_income_by_year()
        }
    },
    computed: {
        paged_incomes() {
            console.log(this.incomes)
            return this.incomes
                .slice(this.pagination.page_size * this.pagination.page - this.pagination.page_size, this.pagination.page_size * this.pagination.page)
        },
    },

    methods: {
       get_patient_details(id){
            this.$router.push({path:'/patient/details/'+id})
       },
        get_current_year() {
            this.year = getCurrentYear()
        },



        change_page_size(val) {
            console.log(val)
            this.pagination.page_size = val
        },
        set_page(val) {
            console.log(val)
            this.pagination.page = val
        },

        load_add_income_form(){
            this.key+=1
            this.add_income_form_loaded = true
            
        },
        set_year(year) {
            this.year = year
        },
        get_income_years() {
            getIncomeYears().then((response) => {
                this.income_years = response.data
            })
        },
        get_income_by_year() {
            this.loading_data = true
            getIncomeByYear(this.year).then((response) => {
                this.incomes = response.data
                this.loading_data = false
            })

            this.add_income_form_loaded = false


        }
    }
}

</script>


<style scoped>
.year-selector {
    display: flex;
    flex-direction: row;
}

.year-selector-title {
    margin-top: 0.5%;
}

.quick-add-button {

    margin-left: auto;
    margin-right: 5%;
}

.year-text {
    font-weight: bold;
    font-size: 1.2em;
}

.patient-name:hover{
    text-decoration: underline;
    cursor: pointer;
}

.capitalize {
    text-transform: capitalize;
}
</style>