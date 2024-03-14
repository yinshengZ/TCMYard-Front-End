<template>
    <div class="popover-chart" v-loading="loading">



        <div class="data-table">
            <span class="table-header">Showing data from <span class="year-span">{{ year }}</span> </span>
            <el-table :data="monthly_inventory_usage">

                <el-table-column label="Month">

                    <template slot-scope="{row}">
                        <div>
                            <span>{{ row.month }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="Units Used" width="120px">
                    <template slot-scope="{row}">
                        <div>
                            <span>{{ row.units }}</span>
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

import { get_inventoy_usage_units, get_inventory_used_years } from '@/api/inventory';

import { getMonths } from '@/utils/date';

import echart from 'echarts';
require('echarts/theme/macarons')

export default {
    props: ['id', 'monthly_usage', 'year'],
    data() {
        return {
            monthly_inventory_usage: this.monthly_usage,
            inventory_id: this.id,
            component_year: this.year,
            chart_id: 'most-units-used-chart' + this.year + '-' + this.id,
            data_xAxis: [],
            data_yAxis: [],
            loading: true,
            years: [],
            chart_loading: true,
            chart: '',
            line_chart: ''
        }
    },

    mounted() {
        /*  this.get_current_year()
         this.get_inventory_years() */
        this.get_inventory_usage_units_history()
    },
    /*     beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        }, */
    methods: {
        get_year(year) {
            this.year = year

            this.get_inventory_usage_units_history()

        },
        get_current_year() {
            this.year = new Date().getFullYear()

        },
        get_inventory_years() {
            get_inventory_used_years(this.inventory_id).then((response) => {
                this.years = response.data
            })
        },

        get_inventory_usage_units_history() {
            this.loading = true
            /*     get_inventoy_usage_units(this.id, this.year)
                    .then((response) => {
                        this.inventory_usage_units = response.data
                        let data = [];
                        
    
                    }) */

            for (let i = 0; i < this.monthly_inventory_usage.length; i++) {
                this.data_yAxis.push(this.monthly_inventory_usage[i].units);
            }

            /*  this.data_yAxis = data; */
            this.data_xAxis = getMonths('short')
            this.initChart()

            this.loading = false

        },

        initChart() {


            if (this.line_chart) {
                this.line_chart.dispose()
            }
            this.chart = document.getElementById(this.chart_id);

            this.line_chart = echart.init(this.chart, 'macarons');



            let option;

            option = {
                xAxis: {
                    type: 'category',
                    data: this.data_xAxis
                },
                yAxis: {
                    type: 'value',
                    data: this.data_yAxis
                },
                series: [
                    {
                        data: this.data_yAxis,
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