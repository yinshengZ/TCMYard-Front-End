<template>
  <div>

    <div class="forecast-accordion">
      <ul>
        <li v-for="weather_forecast in forecast_data">
          <div class="daily-forecast-cover">
            <div class="forecast-heading">
              <svg-icon icon-class="cloudy" />
              <span class="weather-heading">
                {{ weather_forecast[0].weather }}
              </span>
            </div>
            <div class="forecast-body">
              <span class="weather-temp">
                {{ weather_forecast[0].temp }}
              </span>
            </div>
            <div class="forecast-date">
              <span class="weather-date">
                {{ weather_forecast[0].date }}
              </span>
            </div>
          </div>
          <div class="hourly-forecast">
            <div v-for="weather in weather_forecast" class="hourly-details">
              <div class="hourly-heading">
                <svg-icon icon-class="cloudy" />
                <span class="hourly-heading">
                  {{ weather.weather }}
                </span>
              </div>
              <div class="hourly-body">
                <span class="hourly-temp">
                  {{ weather.temp }}
                </span>
                <span class="hourly-temp-max">
                  {{ weather.temp_max }}
                </span>
                <span class="hourly-temp-min">
                  {{ weather.temp_min }}
                </span>

                <span class="hourly-time">
                  {{ weather.hour }}
                </span>
              </div>
            </div>

          </div>

          <!--
                    <div v-for="weather in weather_forecast" class="daily-details">

                        <div class="forecast-daily">
                            <p>{{ weather.weather }}</p>
                            <p> {{ weather.date }}</p>
                            <p>{{ weather.hour }}</p>
                            <p>{{ weather.temp }}</p>
                        </div>

                    </div> -->
        </li>
      </ul>

    </div>

  </div>
</template>

<script>

import Axios from 'axios'

export default {
  data() {
    return {
      api_key: process.env.VUE_APP_OPENWEATHER_API_KEY,
      forecast: {},
      forecast_hourly: {
        time: '',
        weather: '',
        temp: '',
        temp_max: '',
        temp_min: ''
      },

      forecast_daily: [],
      forecast_data: [],
      img_url: '',
      icon_url: ''
    }
  },
  created() {
    this.get_forecast()
  },

  methods: {

    get_forecast() {
      Axios({
        method: 'get',
        url: 'https://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&cnt=40&APPID=' + this.api_key

      }).then((response) => {
        this.forecast = response.data.list

        const date = this.forecast[0].dt_txt.split(' ')
        let initial_date = date[0]
        let forecast_daily_index = 0

        let forecast_index = 0

        this.forecast.forEach(element => {
          const forecast_date = element.dt_txt.split(' ')

          if (forecast_date[0] != initial_date) {
            initial_date = forecast_date[0]
            // reset forecast_daily_index to 0 as forecast entered a new day
            forecast_daily_index = 0

            // using this.$set to make the array reactive. directly assigning will not be rendered correctly
            this.$set(this.forecast_data, forecast_index, this.forecast_daily)
            // adding a new day to the index
            forecast_index++
            this.forecast_daily = []
          } else {
            this.forecast_hourly = {}

            this.forecast_hourly.weather = element.weather[0].main
            this.forecast_hourly.date = forecast_date[0]
            this.forecast_hourly.hour = forecast_date[1]
            this.forecast_hourly.temp = Math.round(element.main.temp)
            this.forecast_hourly.temp_min = Math.round(element.main.temp_min)
            this.forecast_hourly.temp_max = Math.round(element.main.temp_max)

            this.forecast_daily[forecast_daily_index] = this.forecast_hourly

            forecast_daily_index++
          }
        })

        console.log(this.forecast_data)
      })
    }

  }

}

</script>

<style scoped lang="scss">
.forecast-accordion {
    /* display: grid;
    grid-template-columns: repeat(5, 1fr); */

    ul {
        display: table;
        table-layout: fixed;

        li {
            display: table-cell;
            vertical-align: bottom;
            width: 20%;
        }
    }

}

.daily-forecast {

    border: solid;
}
</style>
