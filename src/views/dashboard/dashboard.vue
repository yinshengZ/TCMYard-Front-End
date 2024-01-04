<template>
  <div class="dashboard-editor-container">

    <el-card>
      <forecast-card />

    </el-card>
    <div class="top-row">

      <div class="weather-container">
        <weather-card />
      </div>

      <div class="todo-container">
        <to-do />
      </div>

    </div>

    <div class="bottom-row">

      <div class="chart-wrapper">
        <income-distribution-bar-chart />
      </div>

      <div class="chart-wrapper">

        <income-distribution-pie-chart />
      </div>

      <div class="chart-wrapper">

        <current-year-montly-new-patients />
      </div>

    </div>

  </div>
</template>

<script>

import ToDo from '@/views/Todo/index.vue'
import CalculatorComponent from '@/views/components/CalculatorComponent'
import WeatherCard from './admin/components/WeatherCard'
import incomeDistributionPieChart from '../finance/components/charts/income-distribution-pie-chart.vue'
import incomeDistributionBarChart from '../finance/components/charts/income-distribution-bar-chart.vue'
import currentYearMontlyNewPatients from '../finance/components/charts/current-year-montly-new-patients.vue'
import ForecastCard from './admin/components/ForecastCard.vue'

export default {
  name: 'DashboardAdmin',
  components: {
    ToDo,
    WeatherCard,
    incomeDistributionPieChart,
    incomeDistributionBarChart,
    currentYearMontlyNewPatients,
    CalculatorComponent,
    ForecastCard
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  overflow-y: scroll;
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  height: 100vh;

  .top-row {
    display: grid;
    /* height: 300px; */
    grid-template-columns: 1.5fr 0.5fr;
    column-gap: 2%;
    padding: 20px;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    /*     margin-bottom: 60px;
 */
  }

  .bottom-row {
    margin-top: 32px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1%;

  }
}

@media only screen and (max-width:1024px) {
  .dashboard-editor-container {
    .top-row {
      display: grid;
      padding: 10px 0px;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
      row-gap: 1%;

    }

    .bottom-row {
      margin-top: 3%;
      display: block;
      grid-template-columns: 1fr;
    }

    .chart-wrapper {
      margin-top: 2%;
      display: block;
      padding: 8px;
      width: 100%;
    }

  }

}
</style>
