<template>
  <div>
    <!--  <div class="button">
            <button @click="get_monthly_patients"><svg-icon icon-class="refresh"></svg-icon></button>
        </div> -->
    <div ref="chart" v-html="no_data" class="chart" />
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from '@/components/Charts/mixins/resize'
import { getCurrentYearMonthlyNewPatients } from '@/api/patient'
require('echarts/theme/macarons')

export default {
  mixins: [resize],
  data() {
    return {
      chart: null,
      chart_data: [],
      xAxis: [],
      yAxis: [],
      no_data: '',
    }
  },
  mounted() {
    this.get_monthly_patients()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    get_monthly_patients() {
      getCurrentYearMonthlyNewPatients().then((response) => {
        if (Array.isArray(response.data)) {

          response.data.forEach((data, index) => {
            this.xAxis[index] = data.short_month
            this.yAxis[index] = data.count
          })

          this.initChart()
        } else {
          this.no_data = "<h5>"+response.data+"</h5>"
        }

      })
    },

    initChart() {
      this.chart = echarts.init(this.$refs.chart, 'macarons')

      this.chart.setOption({
        title: {
          text: 'Monthly New Patients',
          subtext: 'Current Year'
        },
        toolbox: {
          feature: {
            /* mytool1: {
                            show: true,
                            title: 'hello tool1',
                            icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
                            onclick: function () {
                                get_monthly_patients();
                            }
                        } */
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/> {b}: {c} <span> new patients</span>'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: this.xAxis
        },
        xAxis: {
          data: this.xAxis
        },
        yAxis: {
          type: 'value'
        },

        series: [
          {
            name: 'Current Year Monthly New Patients',
            type: 'line',
            data: this.yAxis,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]

      })
    }
  }

}

</script>

<style scoped>
.chart {
  width: 100%;
  height: 300px;
}
</style>
