<template>
    <div>
        <div class="top-row">
            <span>
                Genders:
            </span>
            <el-select v-model="gender_id" class="capitalize">
                <el-option v-for="gender in genders" :key="gender.id" :label="gender.gender" :value="gender.id"
                    class="capitalize">

                </el-option>
            </el-select>

        </div>
        <!-- TODO: add chart display -->
        <div class="content">
            <div class="table-area">
                <el-table :data="pagedPatientsData" size="mini" style="min-height: 450px;">

                    <el-table-column label="Year">
                        <template slot-scope="{row}">
                            <div>
                                <span>{{ row.year }}</span>
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
                <el-pagination background layout="prev,pager,next" :total="patients.length" @current-change="setPage">

                </el-pagination>
            </div>

            {{ chart_data }}

            <div class="chart-area">
                <div id="gender_trend_by_year_chart">

                </div>
            </div>



        </div>
    </div>
</template>


<script>
import echarts from 'echarts';
import { getYearlyPatientsCountByGender, getGenders } from "@/api/patient"

export default {
    data() {
        return {
            patients: [],
            genders: [],
            gender_id: '',
            gender: '',
            gender_msg: '',
            page: 1,
            pageSize: 10,
            chart_data: {
                year: [],
                total: [],
            },

        }
    },
    computed: {
        pagedPatientsData() {
            return this.patients.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
        }
    },
    watch: {
        gender_id() {
            this.get_yearly_pateints_by_gender(this.gender_id)
        },
        gender() {
            this.gender_msg = "Showing " + this.gender + " patients"
        },
        patients() {
            this.construct_chart_data()
        }
    },
    mounted() {
        this.get_all_genders()
    },

    methods: {
        get_all_genders() {
            getGenders().then((response) => {
                this.genders = response.data
                this.gender_id = response.data[0].id

            })
        },
        get_yearly_pateints_by_gender(id) {
            getYearlyPatientsCountByGender(id).then((response) => {
                this.patients = response.data
            })
        },
        construct_chart_data() {
            if (this.chart_data.year.length < 1 && this.chart_data.total.length < 1) {
                this.patients.forEach((patient) => {
                    this.chart_data.year.push(patient.year)
                    this.chart_data.total.push(patient.total)
                })
            } else {
                this.chart_data.year = []
                this.chart_data.total = []
            }
        },
        setPage(val) {
            this.page = val
        },

        initChart() {
            echarts.init(document.getElementById('gender_trend_by_year_chart')).dispose()
            let chart = echarts.init(document.getElementById('gender_trend_by_year_chart', 'macarons'))
            //TODO: finish chart options
            let option = {
                title: {
                    show: true,
                    text: 'Showing patients '
                },
                legend: {
                    type: 'plain',
                    show: true,
                },
                xAxis: {
                    show: true,
                    type: 'category',
                    name: 'year',
                    data: this.chart_data.year
                },

            }
        }
    }
}

</script>


<style lang="scss" scoped>
.content {
    display: grid;
    grid-template-columns: 0.2fr 1.8fr;
    column-gap: 1%;
}

.capitalize {
    text-transform: capitalize;
}
</style>