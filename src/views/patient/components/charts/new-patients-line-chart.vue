<template>
  <div>

    <div id="current-year-new-patients" />

  </div>
</template>

<script>

import echarts from 'echarts'
import { getCurrentYearMonthlyNewPatients } from '@/api/patient'

export default {
  data() {
    return {
      data: []
    }
  },

  mounted() {
    this.get_new_monthly_patients_current_year()
  },

  methods: {
    get_new_monthly_patients_current_year() {
      getCurrentYearMonthlyNewPatients().then((response) => {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('current-year-new-patients'))

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
            data: ['销量']
          },
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [
            {
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
            }
          ]
        }

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
      })
    }
  }
}

</script>

<style scoped>
#current-year-new-patients {
    width: 40%;
    height: 400px;
}
</style>
