<template>
    <div class="popover-chart" v-loading="loading">

        <!--   <span>inventory id is {{ id }}</span>
        {{ inventory_usage }}
 -->
        <div class="year-selector">
            <el-link><span>2023</span></el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link><span>2024</span></el-link>
        </div>
        <div class="data-table">

            <el-table :data="inventory_usage">
                <el-table-column label="Used Times" width="120px">
                    <template slot-scope="{row}">
                        <div>
                            <span>{{ row.counts }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="Month">
                    <template slot-scope="{row}">
                        <div>
                            <span>{{ row.month }}</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>


        <div :id="inventory_id" class="chart" :ref="inventory_id">

        </div>


    </div>
</template>


<script>
import echart from 'echarts';
require('echarts/theme/macarons')
import { getMonths } from "@/utils/date"



import { get_inventory_usage_counts } from '@/api/inventory';


export default {
    props: ['id'],

    data() {
        return {
            inventory_usage: [],
            inventory_id: this.id,
            year: 2023,
            date_xAxis: [],
            date_yAxis: [],
            loading: true,
        }
    },


    mounted() {
        this.get_inventory_usage_history()

    },
    beforeDestroy() {
        if (!this.chart) {
            return
        }
        this.chart.dispose()
        this.chart = null
    },
    watch: {
        year() {
            this.get_inventory_usage_history()
        }
    },

    updated() {
    },

    methods: {

        get_inventory_usage_history() {
            get_inventory_usage_counts(this.id, this.year).then((response) => {
                this.inventory_usage = response.data
                let data = [];

                for (let i = 0; i < this.inventory_usage.length; i++) {
                    data.push(this.inventory_usage[i].counts);
                }

                this.date_yAxis = data;
                this.date_xAxis = getMonths('short')
                this.initChart()

                this.loading = !this.loading
            })








        },

        initChart() {

            let chart = document.getElementById(this.inventory_id)

            let line_chart = echart.init(chart, 'macarons');
            let option;
            option = {
                xAxis: {
                    type: 'category',
                    data: this.date_xAxis
                },
                yAxis: {
                    type: 'value',
                    data: this.date_yAxis
                },
                series: [
                    {
                        data: this.date_yAxis,
                        type: 'line'
                    }
                ]
            };

            option && line_chart.setOption(option, true);

        }
    }
}
</script>


<style>
.popover-chart {
    display: grid;
    /* grid-template-columns: 0.2fr 1.8fr; */
    grid-template:
        "top top top"
        "table chart chart"
}

.year-selector {
    grid-area: top;
    margin-bottom: 2%;
    margin-top: 1%;
}

.data-table {
    grid-area: table;
    width: 400px;
    height: 400px;
    overflow-y: scroll;
}

.chart {
    grid-area: chart;
    width: 400px;
    height: 400px;
}
</style>