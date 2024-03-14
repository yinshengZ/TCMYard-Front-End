<template>
    <div>
        <el-card>

            <div class="card-header">

                <div class="header-title">
                    <h2>All Incomes By Year</h2>
                    <p>Showing Incomes From Year <span class="year-text">{{ year }}</span> </p>
                </div>
                <!-- <div class="year-selector">
                    <div class="years" v-for="year in income_years">
                        <el-link @click="set_year(year.year)"><span>{{ year.year }}</span></el-link>
                        <el-divider direction="vertical"></el-divider>
                    </div>
                </div> -->


                <div class="year-selector">
                    <span class="year-selector-title">Select a year to show: </span>
                    <el-select v-model="year" placeholder="year">
                        <el-option v-for="year in income_years" :key="year.year" :value="year.year"
                            :label="year.year"></el-option>
                    </el-select>
                </div>
            </div>



            <el-table :data="paged_incomes" v-loading="loading_data">
                <el-table-column label="ID">
                    <template slot-scope="{row}">
                        <div>
                            {{ row.id }}
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="Category">

                    <template slot-scope="{row}">
                        <div>
                            <span class="capitalize">{{ row.service.categories }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="Income">

                    <template slot-scope="{row}">
                        <div>
                            <span>{{ row.amount / 100 }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="Before Discount">

                    <template slot-scope="{row}">
                        <div>
                            <span>{{ row.original_amount / 100 }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="Discount">

                    <template slot-scope="{row}">
                        <div>
                            <span>{{ row.discount }}%</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="Payment Method">

                    <template slot-scope="{row}">
                        <div>
                            <span class="capitalize">{{ row.payment_method.payment_type }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="Date" fit="true">

                    <template slot-scope="{row}">
                        <div>
                            <span>{{ row.date }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column>

                    <template slot-scope="{row}">
                        <div>
                            <el-button type="primary" @click="load_income_details_drawer(row.id)">Patient's
                                Info</el-button>

                        </div>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination background layout="sizes, prev, pager, next " :page-size="pagination.page_size"
                :page-sizes="pagination.page_sizes" :total="incomes.length" @size-change="change_page_size"
                @current-change="set_page"></el-pagination>

        </el-card>

        <el-drawer :visible.sync="drawer_loaded" direction="ltr" :before-close="get_income_by_year">
            <income-details :income_id="income_id" :key="key"></income-details>
        </el-drawer>
    </div>
</template>


<script>
import { getIncomeYears, getIncomeByYear } from '@/api/finance';
import { getCurrentYear } from '@/utils/date';
import IncomeDetails from './income-details.vue'
export default {
    components: {
        IncomeDetails,
    },
    data() {
        return {
            loading_data: true,
            income_years: [],
            year: 0,
            incomes: [],
            drawer_loaded: false,
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

        load_income_details_drawer(id) {
            this.drawer_loaded = true
            this.income_id = id
            this.key++

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

            this.drawer_loaded = false


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

.year-text {
    font-weight: bold;
    font-size: 1.2em;
}

.capitalize {
    text-transform: capitalize;
}
</style>