<template>
    <div class="popover-chart" v-loading="loading">


        <div class="data-table">
            <span class="table-header">Showing data from <span class="year-span">{{ year }}</span></span>
            <el-table :data="monthly_inventory_usage" v-loading="table_loading">
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


        <div :id="chart_id" class="chart" :ref="inventory_id">

        </div>


    </div>
</template>


<script>
import echart from 'echarts';
require('echarts/theme/macarons')
import { getMonths } from "@/utils/date"


export default {
    props: ['id', 'monthly_usage', 'year'],

    data() {
        return {
            monthly_inventory_usage: this.monthly_usage,
            inventory_id: this.id,
            component_year: this.year,
            chart_id: 'most-used-chart' + this.year + '-' + this.id,
            date_xAxis: [],
            date_yAxis: [],
            loading: false,
            chart: '',
            line_chart: '',
            chart_loading: true,
            table_loading: true,
        }
    },


    mounted() {

        this.get_inventory_usage_history()

    },


    methods: {


        get_inventory_usage_history() {

            this.loading = true
            this.table_loading = true;
            this.chart_loading = true;
            this.date_xAxis = getMonths('short')

            for (let i = 0; i < this.monthly_inventory_usage.length; i++) {
                this.date_yAxis.push(this.monthly_inventory_usage[i].counts)
            }
            this.table_loading = false;
            this.chart_loading = false;
            this.loading = false

            /*     console.log('id: ' + this.inventory_id)
                console.log(this.date_xAxis)
                console.log(this.date_yAxis) */
            this.initChart()
/*             console.log('initChart triggered!')
 */        },

        initChart() {

            this.chart = document.getElementById(this.chart_id)
            this.line_chart = echart.init(this.chart, 'macarons');



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

            option && this.line_chart.setOption(option, true);

        }
    }
}
</script>


<style scoped>
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
    display: flex;
    flex-direction: row;


}

.data-table>.table-header>.year-span {
    font-size: 1.2em;
    font-weight: bold;
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