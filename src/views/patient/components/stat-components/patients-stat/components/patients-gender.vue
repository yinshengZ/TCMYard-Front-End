<template>
    <div>
        <div class="top-row">
            <div class="year-selector">
                <span>Year:
                    <el-select v-model="patient_year">
                        <el-option v-for="year in patient_years" :key="year.year" :label="year.year" :value="year.year">

                        </el-option>
                    </el-select>
                </span>
            </div>

            <div class="all-years">
                <el-button @click="get_all_patient_genders" type="primary">All Years</el-button>
            </div>

            <div class="trends">
                <div v-if="loading">
                    <el-button v-loading="loading" type="success">Trends</el-button>
                </div>
                <div v-else>
                    <el-button v-loading="loading" @click="load_patient_gender_trends" type="success">Trends</el-button>

                </div>
            </div>

        </div>

        <div class="bottom-row">
            <div class="table-area">
                <el-card shadow="hover">
                    <el-table :data="patient_genders" v-loading="loading">
                        <el-table-column label="Gender">
                            <template slot-scope="{row}">
                                <div>
                                    <span class="capitalize">{{ row.gender.gender }}</span>
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column label="Total">
                            <template slot-scope="{row}">
                                <div>
                                    <span>{{ row.total }}</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>

            </div>

            <div class="chart-area">
                <el-card shadow="hover" v-loading="chart_loading">
                    <div id="chart">

                    </div>
                </el-card>

            </div>


        </div>

        <el-dialog :visible.sync="patient_trends_loaded" width="90%">
            <patient-gender-trends :patient_years="patient_years" :key="key"></patient-gender-trends>
        </el-dialog>

    </div>
</template>

<script>
import echarts from 'echarts'
import { getPatientYears, getPatientGendersByYear, getMostPatientsGender } from '@/api/patient';
import { getCurrentYear } from '@/utils/date';
import PatientGenderTrends from '@/views/patient/components/stat-components/patients-stat/components/patient-gender-trends.vue';
require('echarts/theme/macarons')
export default {
    components: {
        PatientGenderTrends
    },
    data() {
        return {
            loading: true,
            chart_loading: true,
            patient_years: [],
            patient_year: getCurrentYear(),
            patient_genders: [],
            chart_data: [],
            chart: '',
            patient_trends_loaded: false,
            key: 0,

        }
    },
    mounted() {
        this.get_patient_joined_years()
        this.get_patient_genders_by_year()
    },
    watch: {
        patient_year: function () {
            this.get_patient_genders_by_year()
        }
    },

    beforeDestroy() {
        if (!this.chart) {
            return
        }
        this.chart.dispose()
        this.chart = null
    },

    methods: {
        get_patient_joined_years() {
            getPatientYears().then((response) => {
                this.patient_years = response.data
            })
        },

        get_patient_genders_by_year() {
            this.loading = true
            this.chart_loading = true
            this.chart_data = []
            getPatientGendersByYear(this.patient_year).then((response) => {
                this.patient_genders = response.data
                this.loading = false
                this.patient_genders.forEach((data, index) => {
                    this.chart_data.push({ 'name': data.gender.gender, 'value': data.total })
                })
                this.chart_loading = false
                this.initChart()
            })
        },

        get_all_patient_genders() {
            this.loading = true
            this.chart_loading = true
            this.chart_data = []
            getMostPatientsGender().then((response) => {
                this.patient_genders = response.data
                this.loading = false
                this.patient_genders.forEach((data, index) => {
                    this.chart_data.push({ 'name': data.gender.gender, 'value': data.total })
                })
                this.chart_loading = false
                this.initChart()
            })
        },
        load_patient_gender_trends() {
            this.patient_trends_loaded = true
            this.key += 1
        },

        initChart() {

            this.chart = echarts.init(document.getElementById('chart'), 'macarons')

            this.chart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    left: 'center',
                    bottom: '10',
                },
                series: [
                    {
                        name: 'Patient Gender Distribution',
                        type: 'pie',
                        data: this.chart_data,
                        animationEasing: 'cubicInOut',
                        animationDuration: 2600
                    }
                ]
            })


        }




    },
}
</script>

<style lang="scss" scoped>
.capitalize {
    text-transform: capitalize;
}


#chart {
    width: 100%;
    height: 300px;
    padding: 20px;
}

.top-row {
    display: flex;

    .all-years {
        margin-left: 1%;
    }

    .trends {
        margin-left: 1%;
    }

    margin-bottom: 1%;

}

.bottom-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2%;

    .chart-area {}
}
</style>