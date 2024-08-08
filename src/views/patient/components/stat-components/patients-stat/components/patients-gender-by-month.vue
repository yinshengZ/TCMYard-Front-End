<template>
    <div>
        <div class="top-row">

            <div class="year-selector">
                <span>Year: </span><!-- <el-select></el-select> -->
                <el-select v-model="year">
                    <el-option v-for="year_select in years" :label="year_select.year" :value="year_select.year"
                        :key="year_select.year"></el-option>
                </el-select>
            </div>

            <div class="gender-selector-container">
                <span>Genders: </span>
                <span @click="set_gender_id(gender.gender.id)" class="capitalize text-link"
                    v-for="gender in patients_genders_list" :key="gender.gender_id">{{
                        gender.gender.gender }}
                    <el-divider direction="vertical"></el-divider>
                </span>
            </div>
        </div>

        <div class="content-row">
            <div class="data-table">
                <div class="table">
                    <el-table :data="patients">
                        <el-table-column label="Month">
                            <template slot-scope="{row}">
                                <div>
                                    {{ row.month }}

                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="Total Patients">
                            <template slot-scope="{row}">
                                <div>
                                    {{ row.total }}
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>


                </div>
            </div>

            <div class="chart-area">
                <div class="chart" id="gender_by_year_chart">
                </div>
            </div>
        </div>




    </div>
</template>


<script>
import echarts from 'echarts'
import { getCurrentYear } from '@/utils/date';
import { getPatientGendersListByYear, getPateintsByGenderYear } from '@/api/patient';
export default {
    props: ['patient_years'],
    data() {
        return {
            year: getCurrentYear(),
            years: this.patient_years,
            gender_id: 0,
            patients_gender: [],
            patients_genders_list: [],
            patients: [],
            chart_data: {
                date: [],
                count: []
            },

        }
    },
    mounted() {
        this.get_patients_genders_list_by_year()
    },

    watch: {
        gender_id() {
            this.get_gender_from_year(this.gender_id)
        },
        year() {
            this.get_patients_genders_list_by_year()
            this.get_gender_from_year(this.gender_id)
        },

        patients() {
            this.construct_chart_data()
        },


    },

    methods: {
        get_patients_genders_list_by_year() {
            getPatientGendersListByYear(this.year).then((response) => {
                this.patients_genders_list = response.data
                if (this.gender_id == 0) {

                    this.gender_id = this.patients_genders_list[0].gender_id
                }
            })
        },
        set_gender_id(id) {
            this.gender_id = id
        },
        get_gender_from_year(id) {
            this.gender_id = id
            this.patients = []
            getPateintsByGenderYear(this.gender_id, this.year).then((response) => {
                this.patients = response.data
                this.patients_gender = response.data[0].gender
            })
        },

        construct_chart_data() {
            this.chart_data.date = []
            this.chart_data.count = []
            this.patients.forEach(element => {
                this.chart_data.date.push(element.short_month)
                this.chart_data.count.push(element.total)
            })
            this.initChart()
        },

        initChart() {
            echarts.init(document.getElementById('gender_by_year_chart')).dispose()

            let chart = echarts.init(document.getElementById('gender_by_year_chart'), 'macarons')

            console.log(chart)
            let option = {
                title: {
                    show: true,
                    text: 'Showing ' + this.patients_gender.gender + ' patients in ' + this.year
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },

                legend: {},
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                xAxis: {
                    type: 'value',
                },
                yAxis: {
                    type: 'category',
                    data: this.chart_data.date
                },
                series: [
                    {
                        name: 'Patients',
                        type: 'bar',
                        stack: 'total',
                        /* label: {
                            show: true
                        }, */
                        emphasis: {
                            focus: 'series'
                        },
                        data: this.chart_data.count
                    }
                ]
            }
            chart.setOption(option);
            chart.resize()

        }

    }
}
</script>


<style scoped lang="scss">
.capitalize {
    text-transform: capitalize;
}

.top-row {
    display: flex;
    gap: 2%;

    .gender-selector-container {
        padding-top: 1%;
        padding-left: 5%;
    }

    .text-link:hover {
        text-decoration: underline;
        cursor: pointer;
    }

}

.content-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 3%;

    .chart-area {
        .chart {
            width: 100%;
            min-height: 500px;

        }
    }
}
</style>