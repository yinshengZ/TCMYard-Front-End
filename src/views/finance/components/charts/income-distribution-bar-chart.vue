<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import { getAllTimeServiceCounts } from '@/api/finance'
import echart from 'echarts'
require('echarts/theme/macarons') // echarts theme

import resize from '@/components/Charts/mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      chart_data: [],
      xAxis: []

    }
  },
  mounted() {
    this.get_service_counts()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    get_service_counts() {
      getAllTimeServiceCounts().then((response) => {
        response.data.forEach((data, index) => {
          this.chart_data.push(data.total_count)
          this.xAxis.push(data.service.categories)
        })

        this.initChart()
      })
    },

    initChart() {
      console.log(this.xAxis)
      console.log(this.chart_data)
      this.chart = echart.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: this.xAxis

        },
        xAxis: {
          data: this.xAxis
        },
        yAxis: {},
        series: [
          {
            name: 'All Services Sold',
            type: 'bar',
            data: this.chart_data
          }
        ]
      })
    }

  }
}

</script>

<style scoped>
/* #chart {
    width: 100%;
    height: 300px;
} */
</style>
